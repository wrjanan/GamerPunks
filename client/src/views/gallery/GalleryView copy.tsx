import React, { useState, useEffect, useCallback } from 'react';
import { ApiRequestStatus } from '../../constants/api-request-status';
import { useContractContext } from '../../context/contract-context';
import { usePunkContext } from '../../context/punk-contract-context';

const GalleryView: React.VFC = () => {
  const { isWeb3, account, fetchContract, contracts } = useContractContext();
  const { punks, status, getPunks } = usePunkContext();
  const [value, setValue] = useState('');


  const getAllPunksOfUser = useCallback(async() => {
    if(status === ApiRequestStatus.none || !punks) {
      const temp = await getPunks();
      console.log("temp", temp);
      console.log("getting punks")
    }
    console.log("got punk,", punks)

    console.log(punks);
    setValue(punks?.join(",") || '');

    return punks;
  },[account]);

  useEffect(() => {
    const fetchData = async() => {
      if(!contracts.CyberPunkRangersContract) {
        await fetchContract();
      }
      await getAllPunksOfUser();
    }

    fetchData();
  }, []);

  useEffect(() => {
    getAllPunksOfUser();
  }, [punks]);

  const printDetails = () => {
    if(status === ApiRequestStatus.isLoading) {
      return (<div>Loading Web3, accounts, and contract...</div>);
}

    if(isWeb3) {
      return (
      <>
        <h1>Good to Go! {account}</h1>
        <p>Your Truffle Box is installed and ready.</p>
        <h2>Smart Contract Example</h2>
        <p>
          If your contracts compiled and migrated successfully, below will show
          a stored value of "hello World" (by default).
        </p>
        <p>
          Try changing the value stored on <strong> {status} {status.toString()} </strong> of Gallery.ts.
        </p>
        <div>The stored value is: {value}</div>

        <p>Click here to run the ACcount : {account} </p>
        <button onClick={getAllPunksOfUser}>click</button>
      </>
      )
    } else {
      <div>
        <p>none web3</p>
      </div>
    }
  };

  return (
    <div className="GalleryView">
      { printDetails() }
    </div>
  );
}

export default GalleryView;
