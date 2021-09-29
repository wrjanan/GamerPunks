import React from 'react';
import '../css/App.css';
import Layout from 'antd/lib/layout/layout';
import Intro from './main/1-intro';
import Rarity from './main/2-rarity';
import PunkGallery from './main/5-punk';
import MyPunkGallery from './main/6-mypunks';
import Intro2 from './main/1-intro2';
import Team from './main/3-team';

const layoutStyle: React.CSSProperties = { 
  minHeight: "80vh", 
  textAlign: 'center', 
  justifyContent: "center", 
  backgroundColor: "transparent" 
};

function Main() {


  return (
    <>
      <Layout style={{ ...layoutStyle, minHeight: "70vh" }}>
        <Intro />
      </Layout>
      <Layout style={layoutStyle}>
        <Intro2 />
      </Layout>
      <Layout style={layoutStyle}>
        <Rarity />
      </Layout>
      <Layout style={layoutStyle}>
        <Team />
      </Layout>
      <Layout style={layoutStyle}>
        <PunkGallery />
      </Layout>
      <Layout style={layoutStyle}>
        <MyPunkGallery />
      </Layout>
    </>
  );
}

export default Main;
