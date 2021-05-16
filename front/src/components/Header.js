import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';
import { injected } from '../constants/connector';

const StyleHeader = styled.header`
  padding: 0 20px;
  display: felx;
  justify-content: space-between;
  box-shadow: 0px 8px 5px rgba(0, 0, 0, 0.25);
  background: #fbf9f7;
  * {
    font-weight: bold;
    margin: 20px;
    font-size: 2rem;
  }
  ul {
    display: flex;
    align-items: center;
    margin: 0;
    li {
      font-size: 1rem;
      font-weight: 300;
      margin: 0;
    }
  }
`;

const Header = () => {
  const [address, setAddress] = useState('');
  const { account, activate } = useWeb3React();
  useEffect(() => {
    const connectWallet = async () => {
      await activate(injected);
    };
    connectWallet();
    if (account) {
      setAddress(account);
    }
  }, [account, activate]);
  const connect = async () => {
    await activate(injected);
    setAddress(account);
  };
  return (
    <>
      <StyleHeader>
        <h1>
          <Link style={{ textDecoration: 'none', color: 'black' }} to="/">
            SKKU NFT Gallery
          </Link>
        </h1>
        <ul>
          <Link
            to="/nftgallery"
            style={{ textDecoration: 'none', color: 'black' }}
          >
            <li>NFT 갤러리</li>
          </Link>
          <Link to="/author" style={{ textDecoration: 'none', color: 'black' }}>
            <li>작품 등록</li>
          </Link>
          <Link to="/guide" style={{ textDecoration: 'none', color: 'black' }}>
            <li>이용가이드</li>
          </Link>
          <Link to="/mypage" style={{ textDecoration: 'none', color: 'black' }}>
            <li>My Page</li>
          </Link>
        </ul>
      </StyleHeader>
    </>
  );
};

export default Header;
