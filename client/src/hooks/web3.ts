import { useState, useEffect } from 'react';
import Web3 from 'web3';
import getWeb3 from '../utils/getWeb3';
import { Contract } from 'web3-eth-contract';

type state = {
  isLoading: boolean;
  isWeb3: boolean;
  web3: Web3 | null;
  accounts: string[];
  contracts: { [path: string]: Contract }
};

const Hooks = (): state => {
  const [state, setState] = useState<state>({
    isLoading: true,
    isWeb3: false,
    web3: null,
    accounts: [],
    contracts: {},
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
          contracts
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

  const { isLoading, isWeb3, web3, accounts, contracts } = state;
  return { isLoading, isWeb3, web3, accounts, contracts };
};
export default Hooks;
