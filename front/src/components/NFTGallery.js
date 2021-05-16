import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { getTotal, getTotalTokens } from '../hooks/useNFTs';
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
  width: 90%;
  height: 300px;
  margin: 10px;
  ${(props) => css`
    background-image: url('${props.url}');
    background-repeat: no-repeat;
    background-size: cover;
  `}
`;

const Article = ({ name, image, description, id }) => {
  return (
    <Link
      to={{
        pathname: '/article',
        state: { name, image, description },
      }}
    >
      <Gallery url={image} />
    </Link>
  );
};

const NFTGallery = () => {
  const [tokens, setTokens] = useState([]);
  useEffect(() => {
    const getAllTokens = async () => {
      const allTokens = await getTotalTokens();
      setTokens(allTokens);
    };
    getAllTokens();

    return () => {
      setTokens([]);
    };
  }, []);

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
        {tokens.map((token, idx) => (
          <Article {...token} key={idx} />
        ))}
      </StyledMain>
    </>
  );
};
export default NFTGallery;
