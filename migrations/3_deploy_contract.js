const ContractToken = artifacts.require("./GamerPunksToken.sol");
const Contract = artifacts.require("./GamerPunks.sol");
module.exports = async function(deployer) {
  await deployer.deploy(ContractToken, "GamerPunksToken", "GPT", 1629467100);
  const instance = await ContractToken.deployed();
  await deployer.deploy(Contract, "GamerPunks", "GPNFT", instance.address.toString(), "https://api.pudgypenguins.io/penguin/");
};
