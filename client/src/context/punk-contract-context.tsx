import React, { PropsWithChildren, useCallback, useContext, useEffect } from "react";
import { Contract } from "web3-eth-contract";
import { ApiRequestStatus } from "../constants/api-request-status";
import { useContractContext } from "./contract-context";
import { PunkState, reducer, SET_FAILED, SET_LOADING, SET_PUNK_CONTEXT } from "./punk-contract-reducer";
import GamerPunksContract from "../contracts/GamerPunks.json";
import { useWeb3Context } from "./web3-context";

export interface PunkContextState extends PunkState{
  getPunks: () => void
}

const initialState: PunkContextState = {
  gamerPunksContract: null,
  punks: null,
  status: ApiRequestStatus.none,
  getPunks: (): void => {
    // intentional
  }
};

const PunkContext = React.createContext(initialState);

const usePunkContext = (): PunkContextState => useContext(PunkContext);

export const PunkContextProvider = ({ children }: PropsWithChildren<unknown>):React.ReactElement => {
  const [ state, dispatch ] = React.useReducer(reducer, initialState);
  const { web3, account } = useWeb3Context();
  const deployedNetwork = GamerPunksContract.networks[5777];
  const abi: any = GamerPunksContract.abi;

  const fetchingNow = React.useRef(false);

  const setContract = (): Contract | undefined => {
    if(web3) {
      const contract = new web3.eth.Contract(
        abi,
        deployedNetwork && deployedNetwork.address
      );
      dispatch({ type: SET_PUNK_CONTEXT, payload: { gamerPunksContract: contract } });
      return contract;
    }
    return undefined;
  }

  useEffect(() => {
    fetchingNow.current = true;
    setContract();
    fetchingNow.current = false

    return () => {
      fetchingNow.current = false
    }
  }, [web3])

  const fetchPunks = useCallback(async () => {
    let contract: Contract | undefined;
    if(!state.gamerPunksContract) {
      contract = setContract();
    } else {
      contract = state.gamerPunksContract;
    }
    const results = await contract?.methods.balanceOf(account).call().then((accountPunks: any) => {
      const getPunkAddress = async (index: number) => {
        return contract?.methods.tokenOfOwnerByIndex(account, index).call();
      }
      const getPunkURI = async (index: number) => {
        return contract?.methods.tokenURI(index).call();
      }

      let promises = []
      for (let i = 0; i < accountPunks; i++) {
        promises.push(getPunkAddress(i));
      }
      return Promise.all(promises).then((result) => {
        const punkAddresses: any[] = [];
        result.forEach(punk => punkAddresses.push(punk));
        promises = [];
        for (let i = 0; i < punkAddresses.length; i++) {
          promises.push(getPunkURI(i));
        }
        return Promise.all(promises);
      })
    });
    return results;
  },[]);

  const getPunks = useCallback(async () => {
    if (fetchingNow.current) {
      return;    }

    fetchingNow.current = true;

    try {
      dispatch({ type: SET_LOADING });

      const punks = await fetchPunks();
      fetchingNow.current = false;
      dispatch({ type: SET_PUNK_CONTEXT, payload: punks });
    } catch (e) {
      console.log(e);
      fetchingNow.current = false;
      dispatch({ type: SET_FAILED });
    }
  }, []);
  return (
    <PunkContext.Provider value={{ ...state, getPunks}}>
      {children}
    </PunkContext.Provider>
  );
};

export default PunkContext;
export { usePunkContext };
