require('dotenv').config();
const contractABI = require('../contract-abi.json');
const contractAddress = '0x43f47d84e506Dac4b921854E15D0623A2A739463';
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
  if (total < 1) return tokens;
  for (let i = 1; i <= total; i++) {
    const tokenUrl = await contract.methods.tokenURI(i).call();
    const tokenData = await axios.get(tokenUrl);
    const owner = await contract.methods.ownerOf(i).call();
    const weiPrice = await contract.methods.getTokenPrice(i).call();
    const ethPrice = web3.utils.fromWei(weiPrice);
    console.log(ethPrice);
    const data = { ...tokenData.data, owner, id: i, ethPrice };
    tokens.push(data);
  }
  return tokens;
};

export const buyToken = async (tokenId, buyer, value, seller) => {
  const weiValue = web3.utils.toWei(value, 'ether');
  console.log('tokenId:', tokenId);
  window.contract = await new web3.eth.Contract(contractABI, contractAddress);
  const transactionParameters = {
    to: contractAddress,
    from: buyer,
    data: window.contract.methods.purchaseToken(parseInt(tokenId)).encodeABI(),
    value: web3.utils.toHex(weiValue),
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

export const transferToken = async (fromAddr, toAddr, tokenId) => {
  const reg = /0[x,X]([0-9,a-z,A-Z]{40})/;
  if (!reg.test(toAddr)) {
    return {
      success: false,
      status: '주소를 다시 입력하세요.',
    };
  }

  window.contract = await new web3.eth.Contract(contractABI, contractAddress);
  const trasactionParameters = {
    to: contractAddress,
    from: fromAddr,
    data: window.contract.methods
      .transferFrom(fromAddr, toAddr, tokenId)
      .encodeABI(),
  };

  try {
    const txHash = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [trasactionParameters],
    });
    return {
      success: true,
      status: '전송되었습니다!',
    };
  } catch (error) {
    return {
      success: false,
      status: '에러 발생!',
    };
  }
};
