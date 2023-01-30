// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.

const hre = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  const weiAmount = (await deployer.getBalance()).toString();
  
  console.log("Account balance:", (await ethers.utils.formatEther(weiAmount)));

  const TestToken = await ethers.getContractFactory("TestToken");
  const testToken = await TestToken.deploy();

  const AnotherTestToken = await ethers.getContractFactory("AnotherTestToken");
  const anotherTestToken = await AnotherTestToken.deploy();

  console.log("Test Token address:", testToken.address);
  console.log("Another Test Token address:", anotherTestToken.address);

  const BalanceReader = await hre.ethers.getContractFactory("BalanceReader");
  const balanceReader = await BalanceReader.deploy();

  await balanceReader.deployed();

  console.log(
    `Balance Reader contract deployed to ${balanceReader.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
