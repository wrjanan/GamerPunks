import React, { useEffect } from 'react';
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


const App: React.VFC = () => {
  const { status, fetchWeb3 } = useWeb3Context();
  const { contracts, fetchContract } = useContractContext();
  const { getPunks } = usePunkContext();

  const customHistory = createBrowserHistory();

  useEffect(() => {
    const initWeb3 = async () => {
      if(status === ApiRequestStatus.none) {
        await fetchWeb3();
        await fetchContract();
        await getPunks();
      }
    }
    initWeb3();
  }, [])


  return (
    <Web3ContextProvider>
      <ContractContextProvider>
        <PunkContextProvider>
          <Router history={customHistory}>
            <MainHeader></MainHeader>
            <Layout>
              <Content style={{ margin: '48px 32px 0', overflow: 'initial' }}>
                <RouteContainer></RouteContainer>
              </Content>
            </Layout>
            <Footer style={{ textAlign: 'center' }}>Cyber Punk Rangers© 2021 - {new Date().getFullYear()} created by HippieTechie</Footer>
          </Router>
        </PunkContextProvider>
      </ContractContextProvider>
    </Web3ContextProvider>
  );
};

export default App;
