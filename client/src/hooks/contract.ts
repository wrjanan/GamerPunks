import { useState, useEffect } from 'react';
import Web3 from 'web3';
import getWeb3 from '../utils/getWeb3';
import { Contract } from 'web3-eth-contract';
import Web3Hook from './web3';
import GamerPunksTokenContract from "../contracts/GamerPunksToken.json";
import GamerPunksContract from "../contracts/GamerPunks.json";

type ContractState = {
  gamerPunksContract: Contract | null,
  gamerPunksTokenContract: Contract | null
};

const ContractHook = (): ContractState => {
  const { isLoading, isWeb3, web3, accounts } = Web3Hook();
  const [state, setState] = useState<ContractState>({
    gamerPunksContract: null,
    gamerPunksTokenContract: null
  });

  useEffect(() => {
    (async(): Promise<void> => {
      try {
        if(web3) {
          const deployedNetwork = GamerPunksTokenContract.networks[5777];
          const abi: any = GamerPunksTokenContract.abi;
          const gamerPunksTokenContract = new web3.eth.Contract(
            abi,
            deployedNetwork && deployedNetwork.address
          );
          const deployedNetwork2 = GamerPunksContract.networks[5777];
          const abi2: any = GamerPunksContract.abi;
          const gamerPunksContract = new web3.eth.Contract(
            abi2,
            deployedNetwork2 && deployedNetwork2.address
          );
          setState({ gamerPunksContract, gamerPunksTokenContract });
        }
      } catch {
        setState({
          ...state,
        });
      }
    })();
  }, [isWeb3, isLoading]);

  const { gamerPunksContract, gamerPunksTokenContract } = state;
  return { gamerPunksContract, gamerPunksTokenContract };
};
export default ContractHook;
