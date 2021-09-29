import React, { PropsWithChildren, useCallback, useContext } from "react";
import Web3 from 'web3';
import { ApiRequestStatus } from "../constants/api-request-status";
import GamerPunksTokenContract from "../contracts/GamerPunksToken.json";
import GamerPunksContract from "../contracts/GamerPunks.json";
import getWeb3 from "../utils/getWeb3";
import { ContractActions, ContractState, GamerPunksContracts, reducer, SET_CONTEXT, SET_CONTRACTS, SET_FAILED, SET_LOADING } from "./contract-reducer";
export interface ContractContextState extends ContractState {
  getContract: () => Promise<GamerPunksContracts>
  fetchContract: () => void
  dispatch: (action: ContractActions) => void
};

const initialState: ContractContextState = {
  contracts: {},
  status: ApiRequestStatus.none,
  isWeb3: false,
  web3Provider: null,
  web3: null,
  account: null,
  getContract: (): Promise<GamerPunksContracts> => {
    return new Promise<GamerPunksContracts>((resolve) => {
      resolve({});
    });
  },
  fetchContract: (): void => {},
  dispatch: (): void => {}
};

initialState.web3 = new Web3(initialState.web3Provider)

const ContractContext = React.createContext(initialState);

const useContractContext = (): ContractContextState => useContext(ContractContext);

export const ContractContextProvider = ({ children }: PropsWithChildren<unknown>):React.ReactElement => {
  const [ state, dispatch ] = React.useReducer(reducer, initialState);

  const fetchingNow = React.useRef(false);

  const fetchContractFunction = useCallback(async () => {
    try{
      const web3 = await getWeb3();
      dispatch({ type: SET_CONTEXT, payload: { web3 } });
      const web3Provider = web3.currentProvider;
      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];

      const deployedNetwork = GamerPunksTokenContract.networks[5777];
      const abi: any = GamerPunksTokenContract.abi;
      const deployedNetwork2 = GamerPunksContract.networks[5777];
      const abi2: any = GamerPunksContract.abi;
      const contracts:GamerPunksContracts = {
        GamerPunksTokenContract: new web3.eth.Contract(
          abi,
          deployedNetwork && deployedNetwork.address
          ),
        GamerPunksContract: new web3.eth.Contract(
            abi2,
            deployedNetwork2 && deployedNetwork2.address
          )
      }

      return({
        status: ApiRequestStatus.isSuccessful,
        isWeb3:true,
        account,
        web3Provider,
        web3,
        contracts
      })
    } catch(e) {
      console.log("error", e);
      return({...state, status: ApiRequestStatus.isFailed})
    }
  },[]);

  const fetchContract = useCallback(async () => {
    if(state.contracts.GamerPunksContract && state.contracts.GamerPunksTokenContract) {
      return;
    }

    if (fetchingNow.current) {
      return;
    }

    fetchingNow.current = true;
    try {
      dispatch({ type: SET_LOADING });

      const fetchedContracts = await fetchContractFunction();
      fetchingNow.current = false;
      dispatch({ type: SET_CONTEXT, payload: fetchedContracts });
    } catch (e) {
      console.log("error", e)
      fetchingNow.current = false;
      dispatch({ type: SET_FAILED });
    }
  },[]);

  const getContract = useCallback(async () => {
    return state.contracts;
  },[]);
  return (
    <ContractContext.Provider value={{ ...state, getContract, fetchContract, dispatch }}>
      {children}
    </ContractContext.Provider>
  );
};

export default ContractContext;
export { useContractContext };
