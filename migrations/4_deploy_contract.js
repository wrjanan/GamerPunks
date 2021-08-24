const Contract = artifacts.require("./CyberPunkRangers.sol");

module.exports = function(deployer) {
  deployer.deploy(Contract, "CyberPunkRangers", "CPRNFT", "0xbE811d83Ab1976230282c7FdA307C1c0F8Ff30a9", "https://api.pudgypenguins.io/penguin/");
};