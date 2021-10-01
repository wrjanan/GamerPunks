import { Row, Col, Button } from "antd";
import MintPopover from "../components/MintPopover";
import "../components/MintPopover.css";
import Title from "antd/lib/typography/Title";
import { DownloadOutlined } from '@ant-design/icons';
import { useState, useEffect } from "react";
import { BigNumber, ethers } from "ethers";
import PunkGamerABI from "../../abi/PunkGamer";

const Intro2 = (): React.ReactElement => {
  const [ maxPunks, setMaxPunks ] = useState('');
  const [ mintedPunks, setMintedPunks ] = useState('');

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // const signer = provider.getSigner();
    const contractAddress = "0xdf662Fd4E20Bd9E1c488Fd50f5265220EA203a1b"
    const contract = new ethers.Contract(contractAddress, PunkGamerABI.abi, provider);
    contract.deployed().then((result: any) => {
      console.log(result);
    });
    contract.MAX_NFT_SUPPLY().then((result: any) => {
      const punks = BigNumber.from(result).toString();
      console.log(punks);
      setMaxPunks(punks);
    });
    contract.totalSupply().then((result: any) => {
      const punks = BigNumber.from(result).toString();
      console.log(punks);
      setMintedPunks(punks);
    });
  }, []);

  return (
    <>
      <Row>
        <Col span={24}>
          <Title>
            Total Minted Punks
          </Title>
          <h2>
            {mintedPunks} / {maxPunks}
          </h2>
          <MintPopover>
            <Button type="primary" icon={<DownloadOutlined />} size={"large"}>Mint</Button>
          </MintPopover>
        </Col>
      </Row>
      {/* <Row>
        <Col>
          <h2>contracts</h2>
          <br />
          <p>NFT Contract: {contracts?.GamerPunksContract?.options.address}</p>
          <br />
          <p>NFT Token Contract: {contracts?.GamerPunksTokenContract?.options.address}</p>
          <br />
          <Button onClick={setAddress}>Set address</Button>
        </Col>

      </Row> */}
      {/* <Layout style={{ justifyContent: "flex-end" }}>

        <Row justify="space-around">
          <Col span={4} style={{...backgroundStyle, backgroundImage: `url(${background1})`}}></Col>
          <Col span={4} style={{...backgroundStyle, backgroundImage: `url(${background2})`}}></Col>
          <Col span={4} style={{...backgroundStyle, backgroundImage: `url(${background3})`}}></Col>
          <Col span={4} style={{...backgroundStyle, backgroundImage: `url(${background4})`, ...flippedStyle}}></Col>
          <Col span={4} style={{...backgroundStyle, backgroundImage: `url(${background5})`, ...flippedStyle}}></Col>
          <Col span={4} style={{...backgroundStyle, backgroundImage: `url(${background6})`, ...flippedStyle}}></Col>
        </Row>
      </Layout> */}
    </>
  );
}

export default Intro2;
