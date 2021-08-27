import React from 'react';
import '../css/App.css';
import Layout from 'antd/lib/layout/layout';
import Intro from './main/1-intro';
import Rarity from './main/2-rarity';
import RangerGallery from './main/3-ranger';
import MyRangerGallery from './main/4-myrangers';


function Main() {


  return (
    <>
      <Layout style={{ minHeight: "90vh", textAlign: 'center', justifyContent: "center" }}>
        <Intro />
      </Layout>
      <Layout style={{ minHeight: "100vh", textAlign: 'center', justifyContent: "center", backgroundColor:"biege" }}>
        <Rarity />
      </Layout>
      <Layout style={{ minHeight: "100vh", textAlign: 'center', justifyContent: "center", backgroundColor:"biege" }}>
        <RangerGallery />
      </Layout>
      <Layout style={{ minHeight: "100vh", textAlign: 'center', justifyContent: "center", backgroundColor:"biege" }}>
        <MyRangerGallery />
      </Layout>
    </>
  );
}

export default Main;
