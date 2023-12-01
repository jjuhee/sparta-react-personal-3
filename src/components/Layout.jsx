import React from 'react'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'

function Layout(props) {
  return (
    <>
      <Header>
        <button>Home</button>
        헤더입니다
        <button>내 프로필</button>
        <button>로그아웃</button>
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