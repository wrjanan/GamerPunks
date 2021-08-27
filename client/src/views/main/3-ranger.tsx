import { Row, Col, Button } from "antd";
import "../components/MintPopover.css";
import Title from "antd/lib/typography/Title";
import { useState, useEffect } from "react";
import { useContractContext } from "../../context/contract-context";
import RangerCard from "./RangerCard";

const RangerGallery = (): React.ReactElement => {
  const { account, contracts, fetchContract } = useContractContext();
  const [ maxRangers, setMaxRangers ] = useState('');
  const [ mintedRangers, setMintedRangers ] = useState('');
  const contract = contracts.CyberPunkRangersContract;
  const contractTokens = contracts.CyberPunkRangersTokenContract;

  const [ randomRangerToken, setRandomRangerToken ] = useState(0);
  const [ randomRangerURI, setRandomRangerURI ] = useState('');
  const [ randomRangerName, setRandomRangerName ] = useState('');
  const [ randomRangerDescription, setRandomRangerDescription ] = useState('');
  const [ randomClaimableToken, setRandomClaimableToken ] = useState(0);

  useEffect(() => {
    const getMaxRangers = async() => {
      if(!contract) {
        await fetchContract();
      }
      const maxRangers = await contract?.methods.MAX_NFT_SUPPLY().call();
      setMaxRangers(maxRangers);
      console.log(maxRangers)

      const mintedRangers = await contract?.methods.totalSupply().call()
      setMintedRangers(mintedRangers);
    }
    getMaxRangers();
    getRanger(randomRangerToken);
  }, [contract]);


  const getAccumulatedTokens = async (index: number) => {
    const tokens = await contractTokens?.methods.accumulated(index).call();
    return tokens;
  }

  const getPunkDescription = async (index: number) => {
    return contract?.methods.tokenDescriptionByIndex(index).call();
  }

  const getRanger = async (tokenId: number) => {
    const rangerURI = await contract?.methods.tokenURI(tokenId).call();
    const rangerName = await contract?.methods.tokenNameByIndex(tokenId).call();
    const rangerTokens = await getAccumulatedTokens(tokenId);
    const rangerDescription = await getPunkDescription(tokenId);
    setRandomRangerToken(tokenId);
    setRandomRangerURI(rangerURI);
    setRandomRangerName(rangerName);
    setRandomClaimableToken(rangerTokens);
    setRandomRangerDescription(rangerDescription);
  }
  const getRandomRanger = async () => {
    // await contractTokens?.methods.setRangersAddress("0x32E971c70B34B8e77469a56558286562eC09E583").estimateGas().then((gas: any) => {
    //   console.log("gas estimation: ", gas)
    //   return contractTokens?.methods.setRangersAddress("0x32E971c70B34B8e77469a56558286562eC09E583").send({ from: account }).then((response: any) => {
    //     console.log("successful transaction", response);
    //   });
    // });


    const randomToken = Math.floor(Math.random() * parseInt(mintedRangers));
    return getRanger(randomToken);
  }
  return (
    <>
      <Row className="force-center">
        <Col span={24}>
          <Title>
            Random Ranger Gallery
          </Title>
          <Button onClick={getRandomRanger}>Get Random Cyber Punk Ranger</Button>
          <h2>
            {randomRangerToken} / {maxRangers}
          </h2>
          <RangerCard
            rangerToken={randomRangerToken}
            rangerURI={randomRangerURI}
            rangerName={randomRangerName}
            rangerDescription={randomRangerDescription}
            rangerClaimableTokens={randomClaimableToken} />
        </Col>
      </Row>
    </>
  );
}

export default RangerGallery;
