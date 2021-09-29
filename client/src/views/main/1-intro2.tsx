import { Row, Col, Button } from "antd";
import MintPopover from "../components/MintPopover";
import "../components/MintPopover.css";
import Title from "antd/lib/typography/Title";
import { DownloadOutlined } from '@ant-design/icons';
import { useState, useEffect } from "react";
import { useContractContext } from "../../context/contract-context";

const Intro2 = (): React.ReactElement => {
  const { contracts, fetchContract } = useContractContext();
  const [ maxPunks, setMaxPunks ] = useState('');
  const [ mintedPunks, setMintedPunks ] = useState('');
  const contract = contracts.GamerPunksContract;

  useEffect(() => {
    const getMaxPunks = async() => {
      if(!contract) {
        await fetchContract();
      }
      const maxPunks = await contract?.methods.MAX_NFT_SUPPLY().call();
      setMaxPunks(maxPunks);

      const mintedPunks = await contract?.methods.totalSupply().call()
      setMintedPunks(mintedPunks);
    }
    getMaxPunks();
  }, [contract]);


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
