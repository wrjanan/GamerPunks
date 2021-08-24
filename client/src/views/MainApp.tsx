import React, { useCallback, useEffect, useState } from 'react';
import logo from '../logo.svg';
import '../css/App.css';
import { useContractContext } from '../context/contract-context';
import Layout from 'antd/lib/layout/layout';
import { Button, Col, Row } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import MintPopover from './components/MintPopover';

function Main() {
  const { contracts } = useContractContext();
  const [ maxRangers, setMaxRangers ] = useState('');
  const [ mintedRangers, setMintedRangers ] = useState('');
  const { CyberPunkRangersContract } = contracts;

  const getMaxRangers = useCallback(async() => {
    const maxRangers = await CyberPunkRangersContract?.methods.MAX_NFT_SUPPLY().call();
    setMaxRangers(maxRangers);

    const mintedRangers = await CyberPunkRangersContract?.methods.totalSupply().call()
    setMintedRangers(mintedRangers);
  },[CyberPunkRangersContract?.methods])

  useEffect(() => {
    getMaxRangers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getMaxRangers]);

  return (
    <Layout>
      <Row style={{ padding: 24, textAlign: 'center' }}>
        <Col span={24}>
          <img src={logo} className="App-logo" alt="logo" />
          <h1>
            Total Minted Rangers
          </h1>
          <h2>
            {mintedRangers} / {maxRangers}
          </h2>
          <MintPopover>
            <Button type="primary" shape="round" icon={<DownloadOutlined />} size={"large"}>Mint</Button>
          </MintPopover>
        </Col>
      </Row>
    </Layout>
  );
}

export default Main;
