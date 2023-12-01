import React from 'react'
import { useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom'
import { setLogout } from 'redux/modules/auth';
import styled from 'styled-components'

function Layout(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();



  return (
    <>
      <Header>
        <button onClick={() => navigate("/")}>Home</button>
        헤더입니다
        <button onClick={() => navigate("/profile")}>내 프로필</button>
        <button onClick={() => { navigate("/login"); dispatch(setLogout()); }}>로그아웃</button>
      </Header>
      <Outlet />
    </>
  )
}

export default Layout

const Header = styled.header`
  height:100px;
  background-color: lightgray;
`