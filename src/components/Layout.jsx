// import axios from 'axios';
import api from '../shared/api';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom'
import { setLogout } from 'redux/modules/auth';
import { updateLetters } from 'redux/modules/letters';
import styled from 'styled-components'

function Layout(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /** 서버에서 읽어오고 redux에 업데이트 함 */
  const fetchLetters = async () => {
    const { data } = await api.get(`/letters?_sort=createdAt&_order=desc`);
    console.log("fetchLetters data", data);
    dispatch(updateLetters(data))
  }
  useEffect(() => {
    fetchLetters();
  }, []);


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