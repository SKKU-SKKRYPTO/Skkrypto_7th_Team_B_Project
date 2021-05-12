import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Header from './Header';

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

const Upload = () => {
  return (
    <>
      <Header />
      <StyledMain>
        <div className="head">
          <span className="title">작품 등록</span>
          <span className="upload">
            <Link
              to="/nftgallery"
              style={{ textDecoration: 'none', color: 'white' }}
            >
              UPLOAD
            </Link>
          </span>
        </div>
        <div className="main">
          <span>작품이름</span>
          <input className="input"></input>
          <span>카테고리</span>
          <input className="input"></input>
          <span>작품 설명</span>
          <textarea className="input"></textarea>
        </div>
      </StyledMain>
    </>
  );
};
export default Upload;
