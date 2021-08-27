const ETH = {
  prettifyEther: (ether: number) => {
    return Math.floor(ether / 10 ** 16) / 100;
  }
}

export default ETH;
