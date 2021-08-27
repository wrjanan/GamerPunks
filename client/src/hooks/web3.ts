import { useState, useEffect } from 'react';
import Web3 from 'web3';
import getWeb3 from '../utils/getWeb3';

type state = {
  isLoading: boolean;
  isWeb3: boolean;
  web3: Web3 | null;
  accounts: string[];
  account: string | null;
};

const Web3Hook = (): state => {
  const [state, setState] = useState<state>({
    isLoading: true,
    isWeb3: false,
    web3: null,
    accounts: [],
    account: null,
  });

  useEffect(() => {
    (async(): Promise<void> => {
      try {
        const web3: Web3 = await getWeb3();
        const accounts = await web3.eth.getAccounts();
        setState({
          ...state,
          isLoading: false,
          isWeb3: true,
          web3,
          accounts,
          account: accounts[0],
        });
      } catch {
        setState({
          ...state,
          isLoading: false,
        });
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { isLoading, isWeb3, web3, accounts, account } = state;
  return { isLoading, isWeb3, web3, accounts, account };
};
export default Web3Hook;
