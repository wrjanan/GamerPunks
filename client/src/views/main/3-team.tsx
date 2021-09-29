import React from 'react'
import { Row, Col } from "antd";
import "../components/MintPopover.css";
import Title from "antd/lib/typography/Title";
import TeamCard from '../components/TeamCard';

const Team = (): React.ReactElement => {
  return (
    <>
      <Row>
        <Col span={24}>
          <Title>Punk Gaming Team</Title>
          <Row gutter={[32, 32]} style={{ textAlign: 'center', justifyContent: "center" }}>
            <Col>
              <TeamCard
                src="./images/0.png"
                description="Artist"
                title="Johnathan"/>
            </Col>
            <Col>
              <TeamCard
                src="./images/1.png"
                description="Developer"
                title="Janan"/>
            </Col>
            <Col>
              <TeamCard
                src="./images/2.png"
                description="Marketeer"
                title="Wyner"/>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}

export default Team;
