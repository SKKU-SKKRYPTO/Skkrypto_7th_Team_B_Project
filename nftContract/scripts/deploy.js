const { ethers } = require("hardhat");

async function main() {
  const SKKUNFT = await ethers.getContractFactory("SKKUNFT");

  const skkuNFT = await SKKUNFT.deploy();
  console.log("Contract deployed to address:", skkuNFT.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
