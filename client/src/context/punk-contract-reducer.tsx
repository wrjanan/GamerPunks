import { ApiRequestStatus } from "../constants/api-request-status";
import { Contract } from "web3-eth-contract";
import _ from "lodash";

export interface PunkState {
  gamerPunksContract: Contract | null,
  punks: any[] | null;
  status: ApiRequestStatus;
}

export const initialPunkState: PunkState = {
  gamerPunksContract: null,
  punks: null,
  status: ApiRequestStatus.none
};

export const SET_PUNK_CONTEXT = "SET_PUNK_CONTEXT";
export const SET_LOADING = "SET_LOADING";
export const SET_FAILED = "SET_FAILED";

export interface AppActions {
  type: string;
  payload?: Partial<PunkState>;
}

export const reducer = (state: PunkState, action: AppActions): PunkState => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, status: ApiRequestStatus.isLoading };
    case SET_FAILED:
      return { ...state, status: ApiRequestStatus.isFailed };
    case SET_PUNK_CONTEXT:
      return { ...state, status: ApiRequestStatus.isSuccessful, ..._.pickBy(action.payload, _.identity)};
    default:
      return state;
  }
};
