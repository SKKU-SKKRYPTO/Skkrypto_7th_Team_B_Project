import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { login } from '../lib/api/auth';
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
  width: 35rem;
  height: 20rem;
  background: white;
  padding: 30px 60px;
  h3 {
    font-size: 1.5rem;
  }
  .login {
    padding: 30px 0 0px;
    display: grid;
    grid-template-columns: 5fr 1fr;
    .loginInput {
      div {
        height: 40px;
        span {
          margin-right: 10px;
          display: inline-block;
          width: 70px;
        }
        input {
          height: 25px;
          width: 250px;
        }
      }
    }
    button {
      display: inline-block;
      height: 67.5px;
      color: white;
      background: #122414;
    }
  }
  .save {
    position: relative;
    left: 75px;
  }
  ul {
    display: flex;
    margin-top: 70px;
    justify-content: space-around;
    li {
      padding: 5px 20px;
      background: #f2f1ed;
    }
  }
`;
const Login = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const onLogin = async () => {
    const response = await login(id, password);
    console.log(response);
  };
  return (
    <>
      <Header />
      <StyledLogin>
        <StyledMain>
          <h3>성균인 로그인</h3>
          <div>
            <form className="login">
              <div className="loginInput">
                <div>
                  <span>아이디</span>
                  <input
                    type="text"
                    value={id}
                    onChange={(e) => {
                      setId(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <span>비밀번호</span>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>
              </div>
              <button type="submit" onClick={onLogin}>
                로그인
              </button>
            </form>
            <div class="save">
              <input type="checkbox" id="saveId" />
              <lable for="saveId">ID 저장하기</lable>
            </div>
          </div>
          <ul>
            <Link
              to="/register"
              style={{ color: 'black', textDecoration: 'none' }}
            >
              <li>성균인 가입</li>
            </Link>
            <li>ID 찾기</li>
            <li>PW 찾기</li>
            <li>회원탈퇴</li>
          </ul>
        </StyledMain>
      </StyledLogin>
    </>
  );
};
export default Login;
