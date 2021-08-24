import React from 'react';
import './css/App.css';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from "history";
import { RouteContainer } from './views/routes/RouteContainer';
import MainHeader from './views/MainHeader';
import { ContractContextProvider } from './context/contract-context';
import { Layout } from 'antd';
import { Content } from 'antd/lib/layout/layout';


const App: React.VFC = () => {
  const customHistory = createBrowserHistory();

  return (
    <ContractContextProvider>
      <Router history={customHistory}>
        <MainHeader></MainHeader>
        <Layout>
          <Content style={{ margin: '48px 32px 0', overflow: 'initial' }}>
            <RouteContainer></RouteContainer>
          </Content>
        </Layout>
      </Router>
    </ContractContextProvider>
  );
};

export default App;
