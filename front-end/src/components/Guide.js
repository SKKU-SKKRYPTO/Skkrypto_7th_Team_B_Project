import Header from './Header';
import React from 'react';
import styled from 'styled-components';

const StyledGuide = styled.div`
  margin-top: 10px;
  width: 100%;
  height: 100%;
  background: #fbf9f7;
  padding: 80px 100px;
  h3 {
    font-size: 2rem;
    padding-bottom: 10px;
  }
  div {
    position: relative;
    width: 100%;
    height: 500px;
    background: white;
    padding: 50px;
    p {
      line-height: 2rem;
      font-size: 1.5rem;
      font-weight: 300;
    }
  }
`;

const Guide = () => {
  return (
    <>
      <Header />
      <StyledGuide>
        <h3>이용 가이드</h3>
        <div>
          <p>
            SKKU NFT Gallery는 성균인들의 창작물이 NFT화 되어 보호되는
            갤러리입니다.
            <br /> 성균인들의 능력과 재능을 마음껏 드러낼 수 있는 공간이며
            성균관대학교와 관련된 각종 디지털 자료를 DB화 하여 아카이빙하는 것을
            목표로 합니다. <br />
            성균인이라면 누구나 로그인후 자료를 업로드할 수 있으며 제작자가
            아니더라도 다양한 보상으로 주어지는 성균 토큰을 통해 응원하고 싶은
            작가 혹은 작품을 성균토큰으로 구매하고 판매할 수 있습니다.
          </p>
          <br />
          <p>
            S-갤러리에 등록되는 자료는 반드시 성균인 본인이 제작한 이미지 이거나
            저작권에 문제가 없는 자료 이어야 합니다. 타인의 저작물을 불법으로
            등록 시 에는 법적인 제재가 가해질 수있습니다.
            <br /> SKKU NFT Gallery에 등록된 작품의 권리는 마지막 NFT 거래자에게
            있습니다.
          </p>
        </div>
      </StyledGuide>
    </>
  );
};

export default Guide;
