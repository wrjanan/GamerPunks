import React, { PropsWithChildren, useCallback, useContext, useEffect } from "react";
import { ApiRequestStatus } from "../constants/api-request-status";
import getWeb3 from "../utils/getWeb3";
import { reducer, SET_FAILED, SET_LOADING, SET_WEB3_CONTEXT, Web3State } from "./web3-reducer";

export interface Web3ContextState extends Web3State {
  fetchWeb3: () => void
};

const initialState: Web3ContextState = {
  status: ApiRequestStatus.none,
  isWeb3: false,
  web3Provider: null,
  web3: null,
  accounts: null,
  account: null,
  fetchWeb3: (): void => {},
};

const Web3Context = React.createContext(initialState);

const useWeb3Context = (): Web3ContextState => useContext(Web3Context);

const checkTime = (time: number = 0) => {
  console.log((Date.now() - time) / 1000 + "s");
}

export const Web3ContextProvider = ({ children }: PropsWithChildren<unknown>):React.ReactElement => {
  const [ state, dispatch ] = React.useReducer(reducer, initialState);

  const fetchingNow = React.useRef(false);

  const fetchWeb3Function = useCallback(async () => {
    try{
      const time = Date.now();
      console.log((Date.now() - time) / 1000 + "s");

      const web3 = await getWeb3();
      console.log((Date.now() - time) / 1000 + "s");


      const web3Provider = web3.currentProvider;
      const accounts = await web3.eth.getAccounts();
      console.log((Date.now() - time) / 1000 + "s");

      const account = accounts[0];
      const payload = {
        status: ApiRequestStatus.isSuccessful,
        isWeb3:true,
        account,
        accounts,
        web3Provider,
        web3,
      }

      console.log((Date.now() - time) / 1000 + "s");

      dispatch({ type: SET_WEB3_CONTEXT, payload })
      return(payload)
    } catch(e) {
      console.log("error", e);
      return({...state, status: ApiRequestStatus.isFailed})
    }
  },[]);

  const fetchWeb3 = useCallback(async () => {

    const time = Date.now();
    console.log((Date.now() - time) / 1000 + "s");

    if (fetchingNow.current) {
      return;
    }
    fetchingNow.current = true;
    try {
      dispatch({ type: SET_LOADING });
      console.log((Date.now() - time) / 1000 + "s");

      const fetchedWeb3 = await fetchWeb3Function();
      console.log((Date.now() - time) / 1000 + "s");

      fetchingNow.current = false;
      dispatch({ type: SET_WEB3_CONTEXT, payload: fetchedWeb3 });
      console.log((Date.now() - time) / 1000 + "s");

    } catch (e) {
      console.log("error", e)
      fetchingNow.current = false;
      dispatch({ type: SET_FAILED });
    }
  },[]);

  useEffect(() => {
    fetchWeb3();
  }, [])

  return (
    <Web3Context.Provider value={{...state, fetchWeb3}}>
      {children}
    </Web3Context.Provider>
  );
};

export default Web3Context;
export { useWeb3Context };
