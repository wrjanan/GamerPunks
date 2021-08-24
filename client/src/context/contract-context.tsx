import React, { PropsWithChildren, useContext, useEffect, useState } from "react";
import Web3 from 'web3';
import { provider } from "web3-core";
import { Contract } from "web3-eth-contract";
import CyberPunkRangersContract from "../contracts/CyberPunkRangers.json";
import CyberPunkRangersTokenContract from "../contracts/CyberPunkRangersToken.json";
import getWeb3 from "../utils/getWeb3";

type CyberPunkContracts = {
    CyberPunkRangersContract?: Contract,
    CyberPunkRangersTokenContract?: Contract,
}

export interface ContractContextState {
  isLoading: boolean;
  isWeb3: boolean;
  web3Provider: provider | null;
  web3: Web3 | null;
  account: string | null;
  contracts: CyberPunkContracts;
}

const initialState: ContractContextState = {
  isLoading: false,
  isWeb3: false,
  web3Provider: null,
  web3:null,
  account: "",
  contracts: {}
};

initialState.web3 = new Web3(initialState.web3Provider)

const ContractContext = React.createContext(initialState);

const useContractContext = (): ContractContextState => useContext(ContractContext);

export const ContractContextProvider = ({ children }: PropsWithChildren<unknown>):React.ReactElement => {
  const [ contractState, setContractState ] = useState(initialState);

  useEffect(() => {
    async function getData() {
      try{
        const web3 = await getWeb3();
        const web3Provider = web3.currentProvider;
        const accounts = await web3.eth.getAccounts();
        const account = accounts[0];
        console.log(accounts[0]);

        const deployedNetwork = CyberPunkRangersTokenContract.networks[5777];
        const abi: any = CyberPunkRangersTokenContract.abi;
        const deployedNetwork2 = CyberPunkRangersContract.networks[5777];
        const abi2: any = CyberPunkRangersContract.abi;
        const contracts:CyberPunkContracts = {
          CyberPunkRangersTokenContract: new web3.eth.Contract(
            abi,
            deployedNetwork && deployedNetwork.address
          ),
          CyberPunkRangersContract: new web3.eth.Contract(
              abi2,
              deployedNetwork2 && deployedNetwork2.address
          )
        }

        setContractState({isLoading: false, isWeb3:true, account, web3Provider, web3, contracts})
      } catch {
        setContractState({isLoading: false, isWeb3:false, account:null, web3Provider:null, web3:null, contracts:{}})
      }
    }
    getData();
  }, []);
  return (
    <ContractContext.Provider value={contractState}>
      {children}
    </ContractContext.Provider>
  );
};

export default ContractContext;
export { useContractContext };
