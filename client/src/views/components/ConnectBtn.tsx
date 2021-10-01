import { Button } from "antd";
import { CSSProperties, useEffect, useState } from "react";
import appConfig from "../../config";
import MetaMaskOnboarding from '@metamask/onboarding'
import React from "react";

declare global {
  interface Window { ethereum: any; }
}

const forwarderOrigin = appConfig.url;

const isMetaMaskInstalled = () => {
  const { ethereum } = window;
  return Boolean(ethereum && ethereum.isMetaMask);
};

interface ConnectBtnProps {
  style?: CSSProperties
}

const ShortenAccount = (account: string | null) => {
  if(!account) return account;
  if(account.length > 10) {
    return account.substring(0,4) + "..." + account.substr(account.length - 4);
  }
}

const ConnectBtn: React.FC<ConnectBtnProps> = ({style}): React.ReactElement => {
  const [btnText, setBtnText] = useState("Install Metamask");
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [metamaskEnabled, setMetamaskEnabled] = useState(false);

  const onboardButton = React.createRef<HTMLElement>();

  const onClickConnect = async () => {
    try {
      // Will open the MetaMask UI
      // You should disable this button while the request is pending!
      setBtnDisabled(true);
      const accountsReq: Promise<string[]> = window.ethereum.request({ method: 'eth_requestAccounts' });
      accountsReq.then((accounts) => {
        //We take the first address in the array of addresses and display it
        setBtnText(ShortenAccount(accounts[0]) || 'Not able to get accounts');
      });
    } catch (error) {
      console.error(error);
    } finally {
      setBtnDisabled(false);
    }
  };

  //This will start the onboarding proccess
  const onClickInstall = async () => {
    setBtnText('Onboarding in progress');
    setBtnDisabled(true);
    const onboarding = new MetaMaskOnboarding({ forwarderOrigin });

    //On this object we have startOnboarding which will start the onboarding process for our end user
    onboarding.startOnboarding();
  };

  const btnOnClick = () => {
    if(metamaskEnabled) {
      onClickConnect();
    } else {
      onClickInstall();
    }
  }
  useEffect(() => {
    //------Inserted Code------\\
    const MetaMaskClientCheck = () => {
      //Now we check to see if MetaMask is installed
      if (!isMetaMaskInstalled()) {
        //If it isn't installed we ask the user to click to install it
        setBtnText('Click here to install MetaMask!');

        setMetamaskEnabled(false);
        //The button is now disabled
        setBtnDisabled(false);
      } else {

        window.ethereum.on('accountsChanged', function () {
          onClickConnect();
        })

        window.ethereum.on('networkChanged', function () {
          window.location.reload();
        })
        //If it is installed we change our button text
        setBtnText('Connect');
        setMetamaskEnabled(true);
        //When the button is clicked we call this function to connect the users MetaMask Wallet
        //The button is now disabled
        setBtnDisabled(false);
      }
    };
    MetaMaskClientCheck();
    //------/Inserted Code------\\
  }, [])

  return (
    <Button
      ref={onboardButton}
      disabled={btnDisabled}
      onClick={btnOnClick}
      style={style}
    >
      {btnText}
    </Button>
  );
}

export default ConnectBtn