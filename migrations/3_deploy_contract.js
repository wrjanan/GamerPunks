const Contract = artifacts.require("./CyberPunkRangersToken.sol");

module.exports = function(deployer) {
  deployer.deploy(Contract, "CyberPunkRangersToken", "CPRT", 1629467100);

};