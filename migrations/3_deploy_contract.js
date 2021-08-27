const ContractToken = artifacts.require("./CyberPunkRangersToken.sol");
const Contract = artifacts.require("./CyberPunkRangers.sol");
module.exports = async function(deployer) {
  await deployer.deploy(ContractToken, "CyberPunkRangersToken", "CPRT", 1629467100);
  const instance = await ContractToken.deployed();
  console.log("janan", instance.address)
  await deployer.deploy(Contract, "CyberPunkRangers", "CPRNFT", instance.address.toString(), "https://api.pudgypenguins.io/penguin/");
};
