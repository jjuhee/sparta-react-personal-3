import React from 'react'
import { useState } from 'react'
import styled, { css } from 'styled-components'
import { setLogin } from 'redux/modules/auth';
import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';
import { current } from '@reduxjs/toolkit';

function Login() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginPage, setIsLoginPage] = useState(true);
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.auth.isLogin);
  //const focusRef = useRef(null);

  const handleSignIn = (event) => {
    event.preventDefault();
    // 아이디 비번 확인이 되었으면 로그인 처리
    setId("");
    setPassword("");
    dispatch(setLogin(true));
  }

  const handleSignUp = (event) => {
    event.preventDefault();
    // 아이디 비번 확인 되었으면 회원가입 처리 & 로그인 모드로 전환
    setId("");
    setPassword("");
    alert("회원가입 완료");
    setIsLoginPage(true);
  }

  const handleButtonToggle = () => {
    setId("");
    setPassword("");
    setIsLoginPage(!isLoginPage);
  }

  return (
    <Container>
      {isLoginPage ?
        <LoginForm onSubmit={handleSignIn}>
          <h1>로그인</h1>
          <input type="text" placeholder='아이디(4~10글자)' maxLength="10" minLength="4"
            value={id}
            onChange={(e) => setId(e.target.value)}
            autoFocus
          />
          <input type="text" placeholder='비밀번호(4~15글자)' maxLength="15" minLength="4"
            value={password} onChange={(e) => setPassword(e.target.value)} />
          {
            <LoginButton type='submit' disabled={(id && password) ? false : true} >로그인</LoginButton>
          }
          <p onClick={handleButtonToggle}> 회원가입</p>
          {/* <p> 회원가입</p> */}
        </LoginForm>
        :
        <LoginForm onSubmit={handleSignUp}>
          <h1>회원가입</h1>
          <input type="text" placeholder='아이디(4~10글자)' maxLength="10" minLength="4"
            value={id}
            onChange={(e) => setId(e.target.value)}
            autoFocus />
          <input type="text" placeholder='비밀번호(4~15글자)' maxLength="15" minLength="4"
            value={password} onChange={(e) => setPassword(e.target.value)} />
          <input type="text" placeholder='닉네임(1~10글자)' maxLength="10" minLength="1"
            value={password} onChange={(e) => setPassword(e.target.value)} />
          <LoginButton type='submit' disabled={(id && password) ? false : true} >회원 가입</LoginButton>

          <p onClick={handleButtonToggle}> 로그인</p>
        </LoginForm>
      }
    </Container>
  )
}

export default Login

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: lightgray;
`

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 450px;
  height: 320px;
  background-color: white;
  
  padding: 10px 20px;
  justify-content: space-around;

  & h1 {
    font-size: 2rem;
    margin-bottom: 2rem;
    /* margin : 10px 20px 40px 0px; */
  }

  & input {
    font-size: 1rem;
    padding: 0.5rem;
  }

  & p {
    cursor: pointer;
    font-size: 0.8rem;
    align-self: center;
    border-bottom:1px solid black;
  }

`
const LoginButton = styled.button`
  cursor: pointer;
  font-size: 1rem;
  padding: 0.5rem;

  ${(props) => {
    if (props.disabled)
      return css`
      color: black;
      background-color: white;
      `;
    else
      return css`
        color: white;
        background-color: black;
      `
  }}
`
