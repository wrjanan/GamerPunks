import { Row, Col, Card, Button, Divider } from "antd";
import "../components/MintPopover.css";
import Title from "antd/lib/typography/Title";
import { useState, useEffect } from "react";
import { useContractContext } from "../../context/contract-context";
import RangerCard, { RangerCardProps } from "./RangerCard";
import { sum } from "lodash";
import ETH from "../../utils/math-utils";

const { Meta } = Card;

const cardStyle = {
}

const MyRangerGallery = (): React.ReactElement => {
  const { account, contracts, fetchContract } = useContractContext();
  const [ totalTokens, setTotalTokens ] = useState(0);
  const [ claimableTokens, setClaimableTokens ] = useState(0);
  const [ myRangers, setMyRangers ] = useState<number[]>([]);
  const [ myRangersProps, setMyRangersProps ] = useState<RangerCardProps[]>([]);
  const contract = contracts.CyberPunkRangersContract;
  const contractTokens = contracts.CyberPunkRangersTokenContract;


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
    console.log("claimed tokens response", tokens)
    getTotalTokens();
    return tokens;
  }

  const getTotalTokens = async () => {
    const tokens = await contractTokens?.methods.balanceOf(account).call();
    setTotalTokens(tokens);
    return tokens;
  }

  useEffect(() => {
    const getMaxRangers = async() => {
      if(!contract) {
        await fetchContract();
      }

      const accountPunks = await contract?.methods.balanceOf(account).call()
      let promises = []
      for (let i = 0; i < accountPunks; i++) {
        promises.push(getPunkAddress(i));
      }
      const myRangerProps = await Promise.all(promises).then((result) => {
        console.log("result", result);
        const punkAddresses: any[] = [];
        result.forEach(punk => punkAddresses.push(parseInt(punk)));
        const tokenPromises: any[] = [];
        console.log("punkAddresses", punkAddresses);
        setMyRangers(punkAddresses);
        punkAddresses.forEach((punkId) => {
          tokenPromises.push(rangerCardProps(punkId));
        });
        return Promise.all(tokenPromises).then((result) => {
          console.log(result);
          return result;
        });
      })
      console.log("myRangeraProps", myRangerProps);
      setMyRangersProps(myRangerProps);
      console.log("myRangers end");
    }
    getTotalTokens();
    getMaxRangers();
  }, [contract]);

  useEffect(() => {
    const sumClaimableTokens = async ()=> {
      let temp = 0;
      await myRangersProps.forEach((props) => {
        temp += Math.floor(props.rangerClaimableTokens / 10 ** 16) / 100
      });
      setClaimableTokens(temp);
    }
    sumClaimableTokens();
  }, [myRangersProps])

  const rangerCardProps = async (index: number): Promise<RangerCardProps> => {
    const rangerURI = await getPunkURI(index);
    const rangerName = await getPunkName(index);
    const rangerTokens = await getAccumulatedTokens(index);
    const rangerDescription = await getPunkDescription(index);
    return {
      rangerName,
      rangerURI,
      rangerToken: index,
      rangerDescription: rangerDescription,
      rangerClaimableTokens: rangerTokens
    }
  }
  const printMyRangers = () => {
    if(!myRangersProps) return <></>;

    return myRangersProps.map((props) => {
      return (
        <Col span={4} key={props.rangerToken} style={{marginBottom:"24px"}}>
          <RangerCard
            rangerName={props.rangerName}
            rangerURI={props.rangerURI}
            rangerToken={props.rangerToken}
            rangerDescription={props.rangerDescription}
            rangerClaimableTokens={props.rangerClaimableTokens}
            claimTokens={() => claimTokens([props.rangerToken])}
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
            My Rangers Gallery
          </Title>
          <h2>Claim Cyber Punk Ranger Tokens!</h2>

          <h3>Total Tokens: {ETH.prettifyEther(totalTokens)} </h3>
          <h3>Total Tokens Claimable: {claimableTokens} </h3>
          <Button onClick={() => claimTokens(myRangers)}>Claim</Button>
          <Divider></Divider>
        </Col>
      </Row>
      <Row className="force-center">
          { printMyRangers() }
      </Row>
    </>
  );
}

export default MyRangerGallery;
