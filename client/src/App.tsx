import React, { useEffect, useState } from 'react';
import './css/App.css';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from "history";
import { RouteContainer } from './views/routes/RouteContainer';
import MainHeader from './views/MainHeader';
import { ContractContextProvider, useContractContext } from './context/contract-context';
import { Layout } from 'antd';
import { Content, Footer } from 'antd/lib/layout/layout';
import { PunkContextProvider, usePunkContext } from './context/punk-contract-context';
import getWeb3 from './utils/getWeb3';
import { SET_CONTRACTS } from './context/contract-reducer';
import Web3Context, { useWeb3Context, Web3ContextProvider } from './context/web3-context';
import { ApiRequestStatus } from './constants/api-request-status';
import StrobeLights from './views/components/StrobeLights';


const App: React.VFC = () => {
  const { status, fetchWeb3 } = useWeb3Context();
  const { contracts, fetchContract } = useContractContext();

  const customHistory = createBrowserHistory();

  useEffect(() => {
    const initWeb3 = async () => {
      if (status === ApiRequestStatus.none) {
        await fetchWeb3();
        await fetchContract();
      }
    }
    initWeb3();
  }, [])


  return (
    <Router history={customHistory}>

      <Layout style={{ maxHeight: '100vh', minHeight: '100vh', background: "transparent" }}>
        <Layout style={{ maxHeight: '10.4vh', minHeight: '10.4vh',backgroundColor: "transparent" }}>
          <MainHeader></MainHeader>
        </Layout>
        <Layout style={{ maxHeight: '79.2vh', minHeight: '79.2vh', background: "transparent", top: "11vh", minWidth: "100vw", padding: "0 10vw"}}>
          <Content style={{ overflow: 'overlay' }}>
            <RouteContainer></RouteContainer>
          </Content>
        </Layout>
        <Layout style={{ maxHeight: '11vh', minHeight: '11vh', backgroundColor: "transparent" }}>
        </Layout>
        <StrobeLights />
      </Layout>
      {/* <Footer style={{ textAlign: 'center', backgroundColor: "transparent" }}>Gamer Punks© 2021 - {new Date().getFullYear()} created by HippieTechie</Footer>  */}
    </Router>
  );
};

export default App;
