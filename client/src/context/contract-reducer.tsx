import { ApiRequestStatus } from "../constants/api-request-status";
import Web3 from 'web3';
import { provider } from "web3-core";
import { Contract } from "web3-eth-contract";

export interface ContractState {
  status: ApiRequestStatus;
  isWeb3: boolean;
  web3Provider: provider | null;
  web3: Web3 | null;
  account: string | null;
  contracts: GamerPunksContracts;
}
export type GamerPunksContracts = {
  GamerPunksContract?: Contract,
  GamerPunksTokenContract?: Contract,
}

export interface ContractContextState {
  status: ApiRequestStatus;
  isWeb3: boolean;
  web3Provider: provider | null;
  web3: Web3 | null;
  account: string | null;
  contracts: GamerPunksContracts;
}

export const initialState: ContractState = {
  contracts: {},
  status: ApiRequestStatus.none,
  isWeb3: false,
  web3Provider: null,
  web3: null,
  account: null,
};

export const SET_CONTRACTS = "SET_CONTRACTS";
export const SET_LOADING = "SET_LOADING";
export const SET_FAILED = "SET_FAILED";
export const SET_CONTEXT = "SET_CONTEXT";

export interface ContractActions {
  type: string;
  payload?: Partial<ContractState>;
}

export const reducer = (state: ContractState, action: ContractActions): ContractState => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, status: ApiRequestStatus.isLoading };
    case SET_FAILED:
      return { ...state, status: ApiRequestStatus.isFailed };
    case SET_CONTRACTS:
      return { ...state, ...action.payload, status: ApiRequestStatus.isSuccessful };
    case SET_CONTEXT:
      return { ...state, ...action.payload, status: ApiRequestStatus.isSuccessful };
    default:
      return state;
  }
};
