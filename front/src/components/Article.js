import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';
import { Link } from 'react-router-dom';
const StyledHead = styled.header`
  width: 100%;
  height: 80px;
  background: rgba(18, 36, 20, 1);
  color: white;
  padding: 0 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  h1 {
    display: inline-block;
    font-size: 2rem;
  }
`;

const StyledMain = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #ffc0cb 0 30%, #ffffff 30% 100%);
  .image {
    position: relative;
    width: 400px;
    height: 500px;
    top: 100px;
    left: 15%;
    background: gray;
    box-shadow: 10px 5px 5px gray;
    border: 1px solid black;
    ${(props) => css`
      background-image: url('${props.image}');
      background-repeat: no-repeat;
      background-size: cover;
    `}
  }
  .text {
    position: relative;
    width: 650px;
    height: 500px;
    left: 47%;
    top: -53%;
    h1 {
      font-size: 2rem;
      margin-bottom: 70px;
    }
    ul {
      display: flex;
      margin-bottom: 50px;
    }
  }
`;
const StyledDescription = styled.div`
  line-height: 1.5rem;
`;

const StyledBuy = styled.div`
  line-height: 1.5rem;
  .description {
    padding: 50px 30px;
    div {
      padding-bottom: 10px;
      span:first-child {
        display: inline-block;
        text-align: center;
        width: 100px;
      }
    }
  }
  .container {
    width: 330px;
    border-top: 3px solid black;
    padding-bottom: 30px;
    .info {
      margin-top: 10px;
      display: flex;
      justify-content: space-between;
      font-size: 1.5rem;
    }
  }
  .buttons {
    display: flex;
    span {
      padding: 10px 50px;
      margin: 10px 10px 0 0;
      color: white;
    }
    .button1 {
      background: rgba(18, 36, 20, 0.62);
    }
    .button2 {
      background: rgba(18, 36, 20, 0.82);
    }
  }
`;

const StyledComment = styled.div`
  position: relative;
  height: 150px;
  width: 50%;
  margin-bottom: 20px;
  background: rgba(243, 239, 219, 1);
  border-radius: 10px;
  padding: 10px 15px;
  .comment {
    position: relative;
    height: 70%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .author {
    display: flex;
    justify-content: flex-end;
  }
`;

const StyledList = styled.li`
  margin-right: 50px;
  padding-bottom: 5px;
  cursor: pointer;
  ${(props) =>
    props.current &&
    css`
      border-bottom: 3px solid rgba(18, 36, 20, 1);
    `}
`;
const Description = ({ description }) => {
  return <StyledDescription>{description}</StyledDescription>;
};

const Author = () => {
  return (
    <StyledDescription>
      안녕하세요. 신진작가 염기남입니다. <br />
      현재까지 가장 중점적으로 이어나가고 있는 시리즈인 {'<Traces of Time>'}은
      아크릴을 여려 겹 채색을 한 뒤 수없이 표면을 밀어내고 다시 채색을 하는
      작업을 반복한다. 이 과정을 통해 안에 있던 선과 색들이 드러나고 반복적으로
      서로 중첩된다.
      <br /> 선의 규칙성 속에 엇갈리는 불규칙적인 패턴들로 하여금 조형에 영향을
      미치며 서로 하나로 어우러지게 된다. 반복된 움직임의 흔적들을 끊임없이
      모색해 나가는 이 행위의 과정 자체가 시간의 의미라고 생각한다.
    </StyledDescription>
  );
};

const Comment = () => {
  return (
    <StyledComment>
      <div className="comment">"예뻐요. 마음이 따뜻해져요."</div>
      <span className="author">SKKYPTO</span>
    </StyledComment>
  );
};
const Comments = () => {
  return (
    <>
      <Comment />
      <Comment />
    </>
  );
};
const Buy = () => {
  return (
    <StyledBuy>
      <div className="description">
        <div>
          <span>제작연도</span>
          <span>2020</span>
        </div>
        <div>
          <span>크기</span>
          <span>116 X 80cm</span>
        </div>
        <div>
          <span>파일형식</span>
          <span>JPG</span>
        </div>
      </div>
      <div className="container">
        <div className="info">
          <span>판매금액</span>
          <span>100토큰</span>
        </div>
      </div>
      <div className="buttons">
        <span className="button1">관심 작품</span>
        <span className="button2">구매 하기</span>
      </div>
    </StyledBuy>
  );
};
const Article = ({ location }) => {
  const {
    state: { name, image, description },
  } = location;
  console.log(name, image, description);
  const [category, setCategory] = useState('description');
  const onClick = (e) => {
    const {
      target: {
        dataset: { name },
      },
    } = e;
    setCategory(name);
  };
  return (
    <>
      <StyledHead>
        <h1>작품 상세보기</h1>
        <Link to="/nftgallery">
          <AiOutlineClose size={50} style={{ color: 'white' }} />
        </Link>
      </StyledHead>
      <StyledMain current={category} image={image}>
        <div className="image"></div>
        <div className="text">
          <h1>{name}</h1>
          <nav>
            <ul>
              <StyledList
                onClick={onClick}
                data-name="description"
                current={category === 'description'}
              >
                작품소개
              </StyledList>
              <StyledList
                onClick={onClick}
                data-name="author"
                current={category === 'author'}
              >
                작가소개
              </StyledList>
              <StyledList
                onClick={onClick}
                data-name="comments"
                current={category === 'comments'}
              >
                댓글
              </StyledList>
              <StyledList
                onClick={onClick}
                data-name="buy"
                current={category === 'buy'}
              >
                구매
              </StyledList>
            </ul>
          </nav>
          {category === 'description' ? (
            <Description description={description} />
          ) : category === 'author' ? (
            <Author />
          ) : category === 'comments' ? (
            <Comments />
          ) : (
            <Buy />
          )}
        </div>
      </StyledMain>
    </>
  );
};

export default Article;
