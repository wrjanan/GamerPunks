import React, { useState, useEffect, useCallback } from 'react';
import { useContractContext } from '../../context/contract-context';

const ContractsView: React.VFC = () => {
  const { isLoading, isWeb3, account, contracts } = useContractContext();
  const [value, setValue] = useState('');
  const { CyberPunkRangersContract } = contracts;

  const runExample = useCallback(async() => {
    const response = await CyberPunkRangersContract?.methods.name().call();
    setValue(response);
  },[CyberPunkRangersContract?.methods])

  useEffect(() => {
    runExample();
  }, [runExample]);

  const printDetails = () => {
    if(isLoading) {
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
          Try changing the value stored on <strong> line 63 </strong> of Gallery.ts.
        </p>
        <div>The stored value is: {value}</div>

        <p>Click here to run the ACcount : {account} </p>
        <button>click</button>
      </>
      )
    } else {
      <div>
        <p>none web3</p>
      </div>
    }
  };

  return (
    <div className="ContractsView">
      { printDetails() }
    </div>
  );
}

export default ContractsView;
