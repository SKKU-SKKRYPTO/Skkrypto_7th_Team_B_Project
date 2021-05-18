require('dotenv').config();
const contractABI = require('../contract-abi.json');
const { createAlchemyWeb3 } = require('@alch/alchemy-web3');
const { pinJSONToIPFS } = require('./pinata');
const contractAddress = '0x76c529E61d1D0C3b4D08FDeAA175A2c307ceA15b';
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;
const web3 = createAlchemyWeb3(alchemyKey);
const BN = require('bn.js');
export const mintNFT = async (url, name, description, account, price) => {
  if (url.trim() === '' || name.trim() === '' || description.trim() === '') {
    return {
      success: false,
      status: '❗Please make sure all fields are completed before minting.',
    };
  }
  const metadata = {
    name,
    image: url,
    description,
  };
  const pinataResponse = await pinJSONToIPFS(metadata);
  if (!pinataResponse.success) {
    return {
      success: false,
      status: '😢 Something went wrong while uploading your tokenURI.',
    };
  }
  const tokenURI = pinataResponse.pinataUrl;

  window.contract = await new web3.eth.Contract(contractABI, contractAddress);
  const transactionParameters = {
    to: contractAddress, // Required except during contract publications.
    from: account, // must match user's active address.
    data: window.contract.methods
      .mintNFT(account, tokenURI, web3.utils.toWei(price))
      .encodeABI(),
  };
  try {
    const txHash = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [transactionParameters],
    });
    return {
      success: true,

      status:
        '✅ Check out your transaction on Etherscan: https://ropsten.etherscan.io/tx/' +
        txHash,
    };
  } catch (error) {
    return {
      success: false,
      status: '😥 Something went wrong: ' + error.message,
    };
  }
};
