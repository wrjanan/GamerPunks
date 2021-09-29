import { Row, Col, Card, Button, Divider } from "antd";
import "../components/MintPopover.css";
import Title from "antd/lib/typography/Title";
import { useState, useEffect } from "react";
import { useContractContext } from "../../context/contract-context";
import PunkCard, { PunkCardProps } from "./PunkCard";
import { sum } from "lodash";
import ETH from "../../utils/math-utils";

const { Meta } = Card;

const cardStyle = {
}

const MyPunkGallery = (): React.ReactElement => {
  const { account, contracts, fetchContract } = useContractContext();
  const [ totalTokens, setTotalTokens ] = useState(0);
  const [ claimableTokens, setClaimableTokens ] = useState(0);
  const [ myPunks, setMyPunks ] = useState<number[]>([]);
  const [ myPunksProps, setMyPunksProps ] = useState<PunkCardProps[]>([]);
  const contract = contracts.GamerPunksContract;
  const contractTokens = contracts.GamerPunksTokenContract;


  const getPunkURI = async (index: number) => {
    return contract?.methods.tokenURI(index).call();
  }
  const getPunkName = async (index: number) => {
    return contract?.methods.tokenNameByIndex(index).call();
  }
  const getPunkDescription = async (index: number) => {
    return contract?.methods.tokenDescriptionByIndex(index).call();
  }

  const getPunkAddress = async (index: number) => {
    return contract?.methods.tokenOfOwnerByIndex(account, index).call();
  }

  const getAccumulatedTokens = async (index: number) => {
    const tokens = await contractTokens?.methods.accumulated(index).call();
    return tokens;
  }

  const claimTokens = async (tokenIndexes: number[]) => {
    const tokens = await contractTokens?.methods.claim(tokenIndexes).send({from:account});
    getTotalTokens();
    return tokens;
  }

  const getTotalTokens = async () => {
    const tokens = await contractTokens?.methods.balanceOf(account).call();
    setTotalTokens(tokens);
    return tokens;
  }

  useEffect(() => {
    const getMaxPunks = async() => {
      if(!contract) {
        await fetchContract();
      }

      const accountPunks = await contract?.methods.balanceOf(account).call()
      let promises = []
      for (let i = 0; i < accountPunks; i++) {
        promises.push(getPunkAddress(i));
      }
      const myPunkProps = await Promise.all(promises).then((result) => {
        console.log("result", result);
        const punkAddresses: any[] = [];
        result.forEach(punk => punkAddresses.push(parseInt(punk)));
        const tokenPromises: any[] = [];
        console.log("punkAddresses", punkAddresses);
        setMyPunks(punkAddresses);
        punkAddresses.forEach((punkId) => {
          tokenPromises.push(punkCardProps(punkId));
        });
        return Promise.all(tokenPromises).then((result) => {
          console.log(result);
          return result;
        });
      })
      console.log("myPunkaProps", myPunkProps);
      setMyPunksProps(myPunkProps);
      console.log("myPunks end");
    }
    getTotalTokens();
    getMaxPunks();
  }, [contract]);

  useEffect(() => {
    const sumClaimableTokens = async ()=> {
      let temp = 0;
      await myPunksProps.forEach((props) => {
        temp += Math.floor(props.punkClaimableTokens / 10 ** 16) / 100
      });
      setClaimableTokens(temp);
    }
    sumClaimableTokens();
  }, [myPunksProps])

  const punkCardProps = async (index: number): Promise<PunkCardProps> => {
    const punkURI = await getPunkURI(index);
    const punkName = await getPunkName(index);
    const punkTokens = await getAccumulatedTokens(index);
    const punkDescription = await getPunkDescription(index);
    return {
      punkName,
      punkURI,
      punkToken: index,
      punkDescription: punkDescription,
      punkClaimableTokens: punkTokens
    }
  }
  const printMyPunks = () => {
    if(!myPunksProps) return <></>;

    return myPunksProps.map((props) => {
      return (
        <Col span={4} key={props.punkToken} style={{marginBottom:"24px"}}>
          <PunkCard
            punkName={props.punkName}
            punkURI={props.punkURI}
            punkToken={props.punkToken}
            punkDescription={props.punkDescription}
            punkClaimableTokens={props.punkClaimableTokens}
            claimTokens={() => claimTokens([props.punkToken])}
            />
        </Col>
        )
      });
  }

  return (
    <>
      <Row>
        <Col span={24}>
          <Title>
            My Punks Gallery
          </Title>
          <h2>Claim Gamer Punk Tokens!</h2>

          <h3>Total Tokens: {ETH.prettifyEther(totalTokens)} </h3>
          <h3>Total Tokens Claimable: {claimableTokens} </h3>
          <Button onClick={() => claimTokens(myPunks)}>Claim</Button>
          <Divider></Divider>
        </Col>
      </Row>
      <Row className="force-center">
          { printMyPunks() }
      </Row>
    </>
  );
}

export default MyPunkGallery;
