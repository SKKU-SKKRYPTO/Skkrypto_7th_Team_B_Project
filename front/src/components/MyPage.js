import { useWeb3React } from '@web3-react/core';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';
import { transferToken } from '../hooks/useNFTs';
import { getNFT } from '../modules/nft';
import Header from './Header';
const StyledDarkBackground = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.8);
`;
const StyledMain = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  margin-top: 10px;
  background-color: #fbf9f7;
  .container {
    width: 1000px;
    margin-top: 100px;
    .head {
      padding-bottom: 10px;
      span:first-child {
        font-weight: 350;
        font-size: 1.75rem;
        margin-right: 30px;
      }
      span:nth-child(2) {
        font-size: 1.25rem;
      }
    }
    .section {
      display: flex;
      .column {
        flex-grow: 1;
        margin-right: 10px;
        height: 550px;
        width: 490px;
      }
      .column.first {
        background: white;
        padding: 0 30px;
        .part1,
        .part2 {
          padding-top: 30px;
          h4 {
            font-size: 1.5rem;
            padding-bottom: 30px;
          }
          span:first-child {
            font-size: 1.5rem;
          }
          div {
            display: flex;
            justify-content: space-between;
            padding-bottom: 30px;
            border-bottom: 1px solid black;
          }
        }
        .part3 {
          ul {
            padding-top: 30px;
            font-size: 1.2rem;
            li {
              padding-bottom: 10px;
              display: grid;
              grid-template-columns: 1fr 3fr 1.5fr;
            }
          }
        }
      }
    }
    .second {
      .part1 {
        background: white;
        padding: 40px 30px;
        margin-bottom: 10px;
        height: 300px;
        .header {
          font-size: 1.5rem;
          display: flex;
          justify-content: space-between;
          margin-bottom: 40px;
        }
        .pictures {
          display: flex;
        }
      }
      .part2 {
        padding: 30px 30px;
        height: 240px;
        background: white;
        .header {
          font-size: 1.5rem;
          margin-bottom: 16px;
        }
        .container-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          .header {
            padding-right: 20px;
            font-size: 1rem;
            display: flex;
            justify-content: space-between;
          }
          .first {
            border-right: 1px solid black;
            .interestPictuer {
              display: flex;
              div {
                width: 70px;
                height: 100px;
                margin-right: 10px;
                background: gray;
              }
            }
          }
          .second {
            padding-left: 10px;
            .comments {
              div {
                width: 100%;
                height: 50px;
                background: gray;
                margin-bottom: 10px;
              }
            }
          }
        }
      }
    }
  }
`;
const StyledArticle = styled.div`
  width: 100px;
  height: 150px;
  margin-right: 15px;
  ${(props) => css`
    background-image: url('${props.url}');
    background-repeat: no-repeat;
    background-size: cover;
  `}
`;
const StyledDialogBlock = styled.div`
  width: 320px;
  padding: 1.5rem;
  background: white;
  border-radius: 2px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .image {
    width: 100px;
    height: 150px;
    ${(props) => css`
      background-image: url('${props.url}');
      background-repeat: no-repeat;
      background-size: cover;
    `}

    margin-bottom: 10px;
  }
  .toAddr {
    width: 100%;
    margin-bottom: 10px;
  }
`;
const Article = ({ url, tokenId, onClick, setTransferToken }) => {
  return (
    <StyledArticle
      url={url}
      onClick={() => {
        onClick((prev) => !prev);
        setTransferToken({
          url: url,
          tokenId: tokenId,
        });
      }}
    />
  );
};

const Dialog = ({ url, tokenId, onToggle, fromAddr }) => {
  const [toAddr, setToAddr] = useState('');
  const onTransfer = async () => {
    const { success, status } = await transferToken(
      fromAddr,
      toAddr,
      parseInt(tokenId),
    );
    console.log(success, status);
    getNFT();
  };
  return (
    <StyledDarkBackground>
      <StyledDialogBlock url={url}>
        <div className="image" />
        <input
          type="text"
          className="toAddr"
          placeholder="수신 주소를 입력하세요."
          value={toAddr}
          onChange={(e) => setToAddr(e.target.value)}
        />
        <div className="buttons">
          <button onClick={() => onToggle((prev) => !prev)}>취소하기</button>
          <button onClick={onTransfer}>전송하기</button>
        </div>
      </StyledDialogBlock>
    </StyledDarkBackground>
  );
};

const MyPage = ({ nfts }) => {
  const { account } = useWeb3React();
  const [myArticle, setMyArticle] = useState([]);
  const [transferToken, setTransferToken] = useState({});
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (nfts && account) {
      const myaritcle = nfts.filter(
        (nft) => nft.owner.toLowerCase() === account.toLowerCase(),
      );
      setMyArticle(myaritcle);
      console.log(myArticle);
    }
    return () => {
      setMyArticle([]);
    };
  }, [nfts, account]);
  return (
    <>
      <Header />
      <StyledMain>
        <div className="container">
          <div className="head">
            <span>내 계정</span>
            <span>내 계정 주소: {account}</span>
          </div>
          <div className="section">
            <div className="column first">
              <div className="part1">
                <h4>내 정보 수정</h4>
                <div>
                  <span>SKKRYPTO</span>
                  <span>닉네임 변경 {'>'}</span>
                </div>
              </div>
              <div className="part2">
                <h4>보유 토큰</h4>
                <div>
                  <span>500토큰</span>
                  <span>더 보기 {'>'}</span>
                </div>
              </div>
              <div className="part3">
                <ul>
                  <li>
                    <span>05.08</span> <span>로그인 보상</span>
                    <span>+100토큰</span>
                  </li>
                  <li>
                    <span>05.07</span> <span>댓글 작성</span>
                    <span>+200토큰</span>
                  </li>
                  <li>
                    <span>05.06</span> <span>작품 구매</span>
                    <span>-500토큰</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="column second">
              <div className="part1">
                <div className="header">
                  <span>판매중인 작품</span>
                  <span>더 보기 {'>'}</span>
                </div>
                <div className="pictures">
                  {myArticle.map((article, idx) => (
                    <Article
                      url={article.image}
                      tokenId={article.id}
                      key={idx}
                      onClick={setVisible}
                      setTransferToken={setTransferToken}
                    />
                  ))}
                </div>
              </div>
              <div className="part2">
                <div className="header">
                  <span>내 활동</span>
                </div>
                <div className="container-2">
                  <div className="first">
                    <div className="header">
                      <span>관심 작품</span>
                      <span>더보기 {'>'}</span>
                    </div>
                    <div className="interestPictuer">
                      <div />
                      <div />
                    </div>
                  </div>
                  <div className="second">
                    <div className="header">
                      <span>남긴 댓글</span>
                      <span>더보기 {'>'}</span>
                    </div>
                    <div className="comments">
                      <div />
                      <div />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </StyledMain>
      {visible && (
        <Dialog onToggle={setVisible} {...transferToken} fromAddr={account} />
      )}
    </>
  );
};

export default connect(
  ({ nft }) => ({
    nfts: nft.nfts,
  }),
  {
    getNFT,
  },
)(MyPage);
