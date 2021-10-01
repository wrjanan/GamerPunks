import React from 'react';
import './css/App.css';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from "history";
import { RouteContainer } from './views/routes/RouteContainer';
import MainHeader from './views/MainHeader';
import { Layout } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import StrobeLights from './views/components/StrobeLights';


const App: React.VFC = () => {
  const customHistory = createBrowserHistory();

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
