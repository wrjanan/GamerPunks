import { useState, useEffect } from 'react';
import Web3 from 'web3';
import getWeb3 from '../utils/getWeb3';
import { Contract } from 'web3-eth-contract';
import Web3Hook from './web3';
import CyberPunkRangersTokenContract from "../contracts/CyberPunkRangersToken.json";
import CyberPunkRangersContract from "../contracts/CyberPunkRangers.json";

type ContractState = {
  cyberPunkRangerContract: Contract | null,
  cyberPunkRangerTokenContract: Contract | null
};

const ContractHook = (): ContractState => {
  const { isLoading, isWeb3, web3, accounts } = Web3Hook();
  const [state, setState] = useState<ContractState>({
    cyberPunkRangerContract: null,
    cyberPunkRangerTokenContract: null
  });

  useEffect(() => {
    (async(): Promise<void> => {
      try {
        if(web3) {
          const deployedNetwork = CyberPunkRangersTokenContract.networks[5777];
          const abi: any = CyberPunkRangersTokenContract.abi;
          const cyberPunkRangerTokenContract = new web3.eth.Contract(
            abi,
            deployedNetwork && deployedNetwork.address
          );
          const deployedNetwork2 = CyberPunkRangersContract.networks[5777];
          const abi2: any = CyberPunkRangersContract.abi;
          const cyberPunkRangerContract = new web3.eth.Contract(
            abi2,
            deployedNetwork2 && deployedNetwork2.address
          );
          setState({ cyberPunkRangerContract, cyberPunkRangerTokenContract });
        }
      } catch {
        setState({
          ...state,
        });
      }
    })();
  }, [isWeb3, isLoading]);

  const { cyberPunkRangerContract, cyberPunkRangerTokenContract } = state;
  return { cyberPunkRangerContract, cyberPunkRangerTokenContract };
};
export default ContractHook;
