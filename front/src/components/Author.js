import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Header from './Header';
import { BsSearch } from 'react-icons/bs';
const StyledHead = styled.div`
  .description {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    h1 {
      padding: 40px 0 10px;
      font-size: 2rem;
      margin-bottom: 10px;
      border-bottom: 3px solid black;
    }
    div {
      padding: 30px 0 0;
      color: gray;
      margin-bottom: 30px;
    }
  }
  div {
    padding: 0 120px 0 110px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    .upload {
      border: 1px solid black;
      padding: 10px 40px;
      position: relative;
      top: -65px;
      background: rgba(18, 36, 20, 0.73);
    }
    input {
      padding: 8px 40px 8px 10px;
      border: none;
      border-bottom: 3px solid black;
    }
    input:focus {
      outline: none;
    }
    .icon {
      padding: 0;
      position: relative;
      top: -35px;
      right: 7px;
    }
  }
`;
const StyledMain = styled.div`
  padding: 10px 100px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  div {
    padding-right: 30px;
  }
`;
const Gallery = styled.div`
  display: inline-block;
  width: 100%;
  height: 300px;
  margin: 10px;
  background: gray;
`;

const Author = () => {
  return (
    <>
      <Header />
      <StyledHead>
        <div className="description">
          <h1>작품 등록</h1>
          <div>
            성균인이라면 누구나 자유롭게 창작물을 올릴 수 있습니다.
            <br />
            업로드한 창작물은 NFT화 되어 거래되고 보호됩니다.
          </div>
        </div>
        <div>
          <span className="upload">
            <Link
              to="/upload"
              style={{ textDecoration: 'none', color: 'white' }}
            >
              UPLOAD
            </Link>
          </span>
          <input type="text" placeholder="작가 검색" />
          <div className="icon">
            <BsSearch size={28} />
          </div>
        </div>
      </StyledHead>
      <StyledMain>
        <div>
          <Gallery />
          <Gallery />
        </div>
        <div>
          <Gallery />
          <Gallery />
        </div>
        <div>
          <Gallery />
          <Gallery />
        </div>
      </StyledMain>
    </>
  );
};
export default Author;
