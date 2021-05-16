const contractABI = require('../contract-abi.json');
const contractAddress = '0x70ddFBBbaFe2Ad40e580178C30271bD9b15F6F2f';
const { createAlchemyWeb3 } = require('@alch/alchemy-web3');
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;
const web3 = createAlchemyWeb3(alchemyKey);
const axios = require('axios');
export const getTotalSupply = async () => {
  const contract = await new web3.eth.Contract(contractABI, contractAddress);
  const total = await contract.methods.totalSupply().call();
  return total;
};

export const getTotalTokens = async () => {
  const total = await getTotalSupply();
  const tokens = [];
  const contract = await new web3.eth.Contract(contractABI, contractAddress);
  if (total < 1) return null;
  for (let i = 1; i <= total; i++) {
    const tokenUrl = await contract.methods.tokenURI(i).call();
    const tokenData = await axios.get(tokenUrl);
    tokens.push(tokenData.data);
  }
  return tokens;
};
