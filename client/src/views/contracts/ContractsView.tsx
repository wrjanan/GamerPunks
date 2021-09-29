import React, { useCallback, useEffect, useState } from 'react';
import { ApiRequestStatus } from '../../constants/api-request-status';
import { useContractContext } from '../../context/contract-context';

const ContractsView: React.VFC = () => {
  const { status, isWeb3, account, contracts } = useContractContext();
  const [value, setValue] = useState('');
  const contract = contracts.GamerPunksTokenContract;

  const runExample = useCallback(async() => {
    const response = await contract?.methods.name().call();
    setValue(response);
  },[contract?.methods])

  useEffect(() => {
    runExample();
  }, [runExample]);

  const printDetails = () => {
    return isWeb3 ?
    <>
      <h1>Good to Go! {account}</h1>
      <p>Your Truffle Box is installed and ready.</p>
      <h2>Smart Contract Example</h2>
      <p>
        If your contracts compiled and migrated successfully, below will show
        a stored value of "hello World" (by default).
      </p>
      <p>
        Try changing the value stored on <strong> line 63 </strong> of ContractsView.ts.
      </p>
      <div>The stored value is: {value}</div>

      <p>Click here to run the contract↓</p>
      <button onClick={runExample} >click</button>
    </>
    : <div>
      <p>none web3</p>
    </div>
  }
  return (
    <div className="ContractsView">
    { status === ApiRequestStatus.isLoading ? <div>Loading Web3, accounts, and contract...</div>
      : printDetails()
      }
    </div>
  );
}

export default ContractsView;
