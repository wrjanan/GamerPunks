import { Row, Col, Button } from "antd";
import "../components/MintPopover.css";
import Title from "antd/lib/typography/Title";
import { useState, useEffect } from "react";
import { useContractContext } from "../../context/contract-context";
import PunkCard from "./PunkCard";

const PunkGallery = (): React.ReactElement => {
  const { account, contracts, fetchContract } = useContractContext();
  const [ maxPunks, setMaxPunks ] = useState('');
  const [ mintedPunks, setMintedPunks ] = useState('');
  const contract = contracts.GamerPunksContract;
  const contractTokens = contracts.GamerPunksTokenContract;

  const [ randomPunkToken, setRandomPunkToken ] = useState(0);
  const [ randomPunkURI, setRandomPunkURI ] = useState('');
  const [ randomPunkName, setRandomPunkName ] = useState('');
  const [ randomPunkDescription, setRandomPunkDescription ] = useState('');
  const [ randomClaimableToken, setRandomClaimableToken ] = useState(0);

  useEffect(() => {
    const getMaxPunks = async() => {
      if(!contract) {
        await fetchContract();
      }
      const maxPunks = await contract?.methods.MAX_NFT_SUPPLY().call();
      setMaxPunks(maxPunks);
      console.log(maxPunks)

      const mintedPunks = await contract?.methods.totalSupply().call()
      setMintedPunks(mintedPunks);
    }
    getMaxPunks();
    getPunk(randomPunkToken);
  }, [contract]);


  const getAccumulatedTokens = async (index: number) => {
    const tokens = await contractTokens?.methods.accumulated(index).call();
    return tokens;
  }

  const getPunkDescription = async (index: number) => {
    return contract?.methods.tokenDescriptionByIndex(index).call();
  }

  const getPunk = async (tokenId: number) => {
    const punkURI = await contract?.methods.tokenURI(tokenId).call();
    const punkName = await contract?.methods.tokenNameByIndex(tokenId).call();
    const punkTokens = await getAccumulatedTokens(tokenId);
    const punkDescription = await getPunkDescription(tokenId);
    setRandomPunkToken(tokenId);
    setRandomPunkURI(punkURI);
    setRandomPunkName(punkName);
    setRandomClaimableToken(punkTokens);
    setRandomPunkDescription(punkDescription);
  }
  const getRandomPunk = async () => {
    // await contractTokens?.methods.setPunksAddress("0x32E971c70B34B8e77469a56558286562eC09E583").estimateGas().then((gas: any) => {
    //   console.log("gas estimation: ", gas)
    //   return contractTokens?.methods.setPunksAddress("0x32E971c70B34B8e77469a56558286562eC09E583").send({ from: account }).then((response: any) => {
    //     console.log("successful transaction", response);
    //   });
    // });


    const randomToken = Math.floor(Math.random() * parseInt(mintedPunks));
    return getPunk(randomToken);
  }
  return (
    <>
      <Row className="force-center">
        <Col span={24}>
          <Title>
            Random Punk Gallery
          </Title>
          <Button onClick={getRandomPunk}>Get Random Gamer Punk</Button>
          <h2>
            {randomPunkToken} / {maxPunks}
          </h2>
          <PunkCard
            punkToken={randomPunkToken}
            punkURI={randomPunkURI}
            punkName={randomPunkName}
            punkDescription={randomPunkDescription}
            punkClaimableTokens={randomClaimableToken} />
        </Col>
      </Row>
    </>
  );
}

export default PunkGallery;
