import React, { useState, useEffect, useCallback } from 'react';
import { ApiRequestStatus } from '../../constants/api-request-status';
import { useContractContext } from '../../context/contract-context';
import { usePunkContext } from '../../context/punk-contract-context';
import ContractHook from '../../hooks/contract';
import Web3Hook from '../../hooks/web3';
import { Contract } from 'web3-eth-contract';
import { useWeb3Context } from '../../context/web3-context';
import { stat } from 'fs';

const GalleryView: React.VFC = () => {
  const { status, isWeb3, account } = useWeb3Context();
  const [value, setValue] = useState('');

  const getPunks = () => {
    
  }

  useEffect(() => {

    // const fetchPunks = async (contract: Contract): Promise<any[]> => {
    //   const results = await contract.methods.balanceOf(account).call().then((accountPunks: any) => {
    //     console.log("accountPunks",accountPunks);
    //     const getPunkAddress = async (index: number) => {
    //       return contract.methods.tokenOfOwnerByIndex(account, index).call();
    //     }
    //     const getPunkURI = async (index: number) => {
    //       return contract.methods.tokenURI(index).call();
    //     }

    //     let promises = []
    //     for (let i = 0; i < accountPunks; i++) {
    //       promises.push(getPunkAddress(i));
    //     }
    //     return Promise.all(promises).then((result) => {
    //       console.log("result", result);
    //       const punkAddresses: any[] = [];
    //       result.forEach(punk => punkAddresses.push(punk));
    //       promises = [];
    //       console.log("punkAddresses", punkAddresses);
    //       for (let i = 0; i < punkAddresses.length; i++) {
    //         promises.push(getPunkURI(i));
    //       }
    //       return Promise.all(promises);
    //     });
    //   });
    //   console.log("results", results);
    //   return results;

    // }

    // if(cyberPunkRangerContract) {
    //   fetchPunks(cyberPunkRangerContract)
    // }
  }, []);

  const printDetails = () => {
    console.log(status);
    console.log(isWeb3);
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
          Try changing the value stored on <strong> </strong> of Gallery.ts.
        </p>
        <div>The stored value is: {value}</div>

        <p>Click here to run the ACcount : {account} </p>
        <button onClick={() => console.log()}>click</button>
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
