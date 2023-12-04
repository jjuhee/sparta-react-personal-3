import axios from 'axios';
import Avatar from 'components/common/Avatar';
import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUserAvatar, setUserNickname } from 'redux/modules/auth';
import styled from 'styled-components'

function Profile() {
  const user = useSelector((state) => state.auth);
  //const userLocal = JSON.parse(localStorage.getItem('user'));
  const accessToken = localStorage.getItem('accessToken');
  const [isEditing, setIsEditing] = useState(false);
  const [nickname, setNickname] = useState(user.nickname);
  const [imageSrc, setImageSrc] = useState(user.Avatar);
  const dispatch = useDispatch();
  const inputRef = useRef();



  const onComplete = () => {
    if (nickname.trim() === user.nickname && imageSrc === user.Avatar) {
      alert('변경된 내용이 없습니다.')
      return
    }
    //postData();
    dispatch(setUserNickname(nickname));
    dispatch(setUserAvatar(imageSrc));
    setIsEditing(false);
  }

  const onCancelEdit = () => {
    setImageSrc(user.Avatar)
    setNickname(user.nickname)
    setIsEditing(false)
  }

  const onEditProfile = () => {
    //localStorage.setItem('user')
    setIsEditing(true)
  }

  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);

    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result);
        resolve();
      };
    });
  };

  const onUploadImage = (e) => {

    if (!e.target.files[0]) {
      alert("선택 없음");
      //setImageSrc(user.Avatar)
      return;
    }
    encodeFileToBase64(e.target.files[0]);
    //dispatch(setUserAvatar(e.target.files[0].name))
    //console.log(e.target.files[0].name);

  }

  const onImageClicked = () => {
    if (!inputRef.current) {
      return;
    }
    console.log("click ??", inputRef.current);
    inputRef.current.click();

  }

  return (
    <Container>
      <ProfileContainer>
        <h1>프로필 관리</h1>

        {isEditing ?
          <>
            <Avatar src={imageSrc} size="large" onClick={onImageClicked} />
            <input value={nickname} onChange={(e) => setNickname(e.target.value)} />
            <FileInput type="file" accept="image/*" ref={inputRef} onChange={onUploadImage} />
          </>
          :
          <>
            <Avatar src={user.avatar} size="large" />
            <Nicname>{user.nickname}</Nicname>
          </>
        }
        {/* {userLocal.nickname} */}
        <UserID>{user.userId}</UserID>
        <ButtonBox>
          {isEditing ?
            <>
              <button onClick={onComplete}>완료</button>
              <button onClick={onCancelEdit}>취소</button>
            </>
            :
            <button onClick={onEditProfile}>수정</button>
          }
        </ButtonBox>
      </ProfileContainer>

    </Container>
  )
}

export default Profile

const FileInput = styled.input`
  display: none;
`

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
`
const ProfileContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 520px;
  height: 320px;
  background-color: #e1e1e1;
  border-radius: 20px;
  & h1 {
    margin-top: 20px;
    margin-bottom: 20px;
    font-size:2rem;
    font-weight: 600;
  }
  & input {
    margin-top: 10px;
    margin-bottom: 10px;
    font-size: 1.1rem;
    padding: 0.2rem;
  }
`
const UserID = styled.p`
  margin-top: 10px;
  color: gray;
  font-size: 1rem;
  font-weight: 200;
`
const Nicname = styled.p`
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 1.2rem;
  font-weight: 600;
`
const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  margin-top: auto;
  padding-bottom: 10px;
  & button {
    margin-right: 5px;
    margin-left: 5px;
    background-color: transparent;
    border: 2px solid gray;
    padding: 0.3rem 1rem;
    border-radius: 1rem;
    text-align: center;
    font-size: medium;
    font-weight: 500;

    cursor: pointer;
    transition: all 0.3s ease-in-out;
    &:hover {
      background-color:gray;
    }
  }
`
