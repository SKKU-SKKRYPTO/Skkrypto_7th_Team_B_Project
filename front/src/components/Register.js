import React, { useState } from 'react';
import styled from 'styled-components';
import { register } from '../lib/api/auth';
import Header from './Header';

const StyledLogin = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  background-color: #fbf9f7;
`;
const StyledMain = styled.div`
  width: 40rem;
  h3 {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .content {
    display: flex;
    flex-direction: column;
    background: white;
    .row {
      height: 50px;
      display: grid;
      grid-template-columns: 150px 200px 1fr;
      margin: 0 10px;
      border-bottom: 1px solid gray;
      span {
        display: flex;
        align-items: center;
        padding-left: 10px;
        font-size: 1rem;
      }

      .necessary::after {
        content: '*';
        color: red;
        padding-left: 3px;
      }
      input {
        height: 30px;
        display: flex;
        margin: auto 0;
      }
    }
    .row:last-child {
      border-bottom: none;
    }
  }
`;
const Register = () => {
  return (
    <>
      <Header />
      <StyledLogin>
        <StyledMain>
          <h3>회원가입</h3>
          <div className="content">
            <div className="row">
              <span className="necessary">아이디</span>
              <input type="text" />
              <span style={{ color: 'gray', fontSize: '0.75rem' }}>
                (영문 소문자 / 숫자 4-16자)
              </span>
            </div>
            <div className="row">
              <span className="necessary">비밀번호</span>
              <input type="password" />
              <span style={{ color: 'gray', fontSize: '0.75rem' }}>
                (영문 대소문자/숫자/특수문자중 2가지 이상 조합, 8~16자)
              </span>
            </div>
            <div className="row">
              <span className="necessary">비밀번호 확인</span>
              <input type="password" />
            </div>
            <div className="row">
              <span className="necessary">닉네임</span>
              <input type="text" />
            </div>
            <div className="row">
              <span>생년월일</span>
              <input type="text" />
            </div>
            <div className="row">
              <span>이메일</span>
              <input type="text" />
            </div>
          </div>
        </StyledMain>
      </StyledLogin>
    </>
  );
};
export default Register;
