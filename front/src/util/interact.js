require('dotenv').config();
const contractABI = require('../contract-abi.json');
const { createAlchemyWeb3 } = require('@alch/alchemy-web3');
const { pinJSONToIPFS } = require('./pinata');
const contractAddress = '0x4b67AaFff227333A920F3f4ECf0E3799F63412fD';
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;
const web3 = createAlchemyWeb3(alchemyKey);

export const mintNFT = async (url, name, description, account) => {
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
    data: window.contract.methods.mintNFT(account, tokenURI).encodeABI(),
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
