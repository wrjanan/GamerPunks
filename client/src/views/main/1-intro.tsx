import { Row, Col } from "antd";
import { useEffect, useState } from "react";
import { ReactComponent as Logo  } from '../../images/PunkGamer.svg';

const Intro = (): React.ReactElement => {
  const [logo, setLogo] = useState(<></>);
  useEffect(() => {
    setLogo(<Logo style={{width:"71vw"}}/>);
  }, []); 

  return (
    <>
      <Row>
        <Col span={24}>
          {logo}
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

export default Intro;
