const contractABI = require('../contract-abi.json');
const contractAddress = '0x4b67AaFff227333A920F3f4ECf0E3799F63412fD';
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
    const data = { ...tokenData.data, owner, id: i };
    tokens.push(data);
  }
  return tokens;
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
