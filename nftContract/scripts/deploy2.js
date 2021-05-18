const { ethers } = require("hardhat");

async function main() {
  const AuctionNFT = await ethers.getContractFactory("AuctionNFT");

  const actionNFT = await AuctionNFT.deploy();
  console.log("Contract deployed to address:", actionNFT.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
