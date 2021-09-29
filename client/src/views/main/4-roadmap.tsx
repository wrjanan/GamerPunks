import React from 'react'
import { Row, Col, Button } from "antd";
import "../components/MintPopover.css";
import Title from "antd/lib/typography/Title";
import Text from 'antd/lib/typography/Text';


const Rarity = (): React.ReactElement => {
/*
print("Count Chair:",countChair)
print("Count Desktop:",countDesktop)
print("Count Base:",countBase)
print("Count Ear:",countEar)
print("Count Eye:",countEye)
print("Count Nose:",countNose)
print("Count Mouth:",countMouth)
print("Count Hair:",countHair)
print("Count Brow:",countBrow)
print("Count Shirt:",countShirt)
print("Count Special:",countSpecial)
print("1/1:",oneofonecounts)
*/
  return (
    <>
      <Row>
        <Col span={24}>
          <Title>Rarity of PunkGamer</Title>
          <h2>100% Traits</h2>
          <Row style={{ textAlign: 'center', justifyContent: "center", backgroundColor:"biege" }}>
            <Col>
              <ul style={{textAlign:"left"}}>
                <li>Chair</li>
                <li>Desktop</li>
                <li>Base</li>
              </ul>
            </Col>
          </Row>
          <br></br>
          <h2>Attributes Count</h2>
          <Row style={{ textAlign: 'center', justifyContent: "center", backgroundColor:"biege" }}>
            <Col>
              <Text>0</Text>
              <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
                <path d="M 0 80 Q 50 -50, 100 80" stroke="purple" fill="transparent"/>
              </svg>
              <Text>8</Text>
            </Col>
          </Row>
          <br></br>
          <h2>Weighted Random Attributes</h2>
          <Row style={{ textAlign: 'center', justifyContent: "center", backgroundColor:"biege" }}>
            <Col>
              <ul style={{textAlign:"left"}}>
                <li>Ear</li>
                <li>Eye</li>
                <li>Nose</li>
                <li>Mouth</li>
                <li>Hair</li>
                <li>Brow</li>
                <li>Shirt</li>
                <li>Special</li>
              </ul>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}

export default Rarity;
