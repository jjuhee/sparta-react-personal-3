import { useState } from "react";
import styled from "styled-components";
import { v4 as uuid } from "uuid";
import Button from "./common/Button";
import { useDispatch, useSelector } from "react-redux";
import { addLetter } from "redux/modules/letters";
import api from "../shared/api";

export default function AddForm() {
  const user = useSelector((state) => state.auth);
  //const localUser = localStorage.getItem('user');
  const dispatch = useDispatch();

  //const [nickname, setNickname] = useState("");
  const [content, setContent] = useState("");
  const [member, setMember] = useState("카리나");

  /** 서버에 letter 하나 추가 */
  const postLetter = async (newLetter) => {
    await api.post("/letters", newLetter);
  }

  const onAddLetter = (event) => {
    event.preventDefault();
    //    if (!nickname ||  !content) return alert("닉네임과 내용은 필수값입니다.");
    if (!content) return alert("내용을 입력해주세요.");


    const newLetter = {
      id: uuid(),
      nickname: user.nickname,
      content,
      avatar: user.avatar,
      writedTo: member,
      createdAt: new Date().toString(),
      userId: user.userId
    };

    postLetter(newLetter);
    dispatch(addLetter(newLetter));
    //setNickname("");
    setContent("");
  };

  return (
    <Form onSubmit={onAddLetter}>
      <InputWrapper>
        <label>닉네임:</label>
        {/* <input
          onChange={(event) => setNickname(event.target.value)}
          value={nickname}
          placeholder="최대 20글자까지 작성할 수 있습니다."
          maxLength={20}
        /> */}
        {user.nickname}
      </InputWrapper>
      <InputWrapper>
        <label>내용:</label>
        <textarea
          placeholder="최대 100글자까지 작성할 수 있습니다."
          maxLength={100}
          onChange={(event) => setContent(event.target.value)}
          value={content}
        />
      </InputWrapper>
      <SelectWrapper>
        <label>누구에게 보내실 건가요?</label>
        <select onChange={(event) => setMember(event.target.value)}>
          <option>카리나</option>
          <option>윈터</option>
          <option>닝닝</option>
          <option>지젤</option>
        </select>
      </SelectWrapper>
      <Button text="팬레터 등록" />
    </Form>
  );
}

const Form = styled.form`
  background-color: gray;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 500px;
  border-radius: 12px;
  margin: 20px 0;
`;

const InputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  & label {
    width: 80px;
  }
  & input,
  textarea {
    width: 100%;
    padding: 12px;
  }
  & textarea {
    resize: none;
    height: 80px;
  }
`;

const SelectWrapper = styled(InputWrapper)`
  justify-content: flex-start;
  & label {
    width: 170px;
  }
`;
