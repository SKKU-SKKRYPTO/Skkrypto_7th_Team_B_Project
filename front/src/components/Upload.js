import { useWeb3React } from '@web3-react/core';
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { mintNFT } from '../util/interact';
import Header from './Header';
import { connect } from 'react-redux';
import { getNFT } from '../modules/nft';

const StyledMain = styled.div`
  padding: 70px 200px;
  .head {
    display: flex;
    justify-content: space-between;
    .title {
      font-size: 2rem;
    }
    .upload {
      display: flex;
      align-items: center;
      padding: 0 20px;
      background: rgba(18, 36, 20, 0.73);
      color: white;
      font-size: 1.125rem;
      cursor: pointer;
    }
  }
  .main {
    margin-top: 20px;
    display: grid;
    grid-template-rows: 50px 50px 300px;
    grid-template-columns: 100px 1fr;
    border-top: 3px solid black;
    border-bottom: 3px solid black;
    span {
      display: flex;
      justify-content: center;
      align-items: center;
      background: rgba(18, 36, 20, 0.34);
      border-bottom: 1px solid gray;
    }
    .input {
      border: none;
      border-bottom: 1px solid gray;
    }
    .input:focus {
      outline: none;
    }
  }
`;

const Upload = ({ getNFT }) => {
  const imageInput = useRef();
  const [isConnected, setConnectedStatus] = useState(false);
  const [status, setStatus] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [url, setURL] = useState('');
  const { account } = useWeb3React();
  const previewFile = () => {
    const file = imageInput.current.files[0];
    const reader = new FileReader();

    reader.addEventListener(
      'load',
      function () {
        imageInput.current.src = reader.result;
        setURL(imageInput.current.src);
      },
      false,
    );
    if (file) {
      reader.readAsDataURL(file);
    }
  };
  const onUpload = async () => {
    const { success, status } = await mintNFT(url, name, description, account); // NFT 생성
    setStatus(status);
    setConnectedStatus(success);

    if (success) {
      setName('');
      setDescription('');
      setURL('');
      imageInput.current.value = '';
      getNFT();
    }
  };
  return (
    <>
      <Header />
      <StyledMain>
        <div className="head">
          <span className="title">작품 등록</span>
          <span className="upload" onClick={onUpload}>
            UPLOAD
          </span>
        </div>
        <div className="main">
          <span>작품이름</span>
          <input
            className="input"
            type="text"
            onChange={(event) => setName(event.target.value)}
          ></input>
          <span>작품 파일</span>
          <input
            className="input"
            type="file"
            ref={imageInput}
            onChange={() => previewFile()}
          ></input>
          <span>작품 설명</span>
          <textarea
            className="input"
            onChange={(event) => setDescription(event.target.value)}
          ></textarea>
        </div>
      </StyledMain>
      <div>{status}</div>
    </>
  );
};

export default connect(null, { getNFT })(Upload);
