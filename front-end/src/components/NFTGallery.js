import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Header from './Header';

const StyledHead = styled.div`
    display: flex;
    justify-content: center;
    div {
        margin-top 100px;
        text-align: center;
        h1 {
            font-size: 2rem;
            margin-bottom: 10px;
        }
        p {
            color: gray;
            margin-bottom: 30px;
        }
        nav > ul {
            display: flex;
            justify-content: center;
            li {
                padding 0 5px;
                color: gray;
            }
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

const Article = () => {
  return (
    <Link to="/article">
      <Gallery />
    </Link>
  );
};

const NFTGallery = () => {
  return (
    <>
      <Header />
      <StyledHead>
        <div>
          <h1>SKKU Art Community</h1>
          <p>
            성균 커뮤니티에서 창작된 사진, 그림, 만화, 영상 등이 전시되는
            공간입니다.
            <br />
            전시 중인 작품을 설명과 함께 확인해 보실 수 있습니다.
          </p>
          <nav>
            <ul>
              <li>ALL /</li>
              <li>성미회 /</li>
              <li>보도사진학회 /</li>
              <li>영상촌 /</li>
              <li>SAPA /</li>
              <li>그림마당 /</li>
              <li>그린나래</li>
            </ul>
          </nav>
        </div>
      </StyledHead>
      <StyledMain>
        <div>
          <Article />
          <Article />
        </div>
        <div>
          <Article />
          <Article />
        </div>
        <div>
          <Article />
          <Article />
        </div>
      </StyledMain>
    </>
  );
};
export default NFTGallery;
