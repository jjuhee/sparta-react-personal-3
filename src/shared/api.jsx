import axios from "axios";
import store from "redux/config/configStore";

const BASE_URL = 'https://moneyfulpublicpolicy.co.kr';

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

instance.interceptors.request.use(
  //요청을 보내기 전 수행되는 함수
  async function (config) {
    console.log('인터셉터 요청 성공!', config);
    //토큰이 유효한지, 유저 정보 확인
    const localAccessToken = localStorage.getItem("accessToken");

    try {
      const { data } = await axios.get(`${BASE_URL}/user`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localAccessToken}`,
        },
      });
      if (data.success)
        return config;
    } catch (error) {
      if (error.request.statusText === "Unauthorized") {
        localStorage.clear();
        window.location.replace('/login');
        alert("로그인 만료");
      }
    }
  },

  //오류 요청을 보내기 전 수행되는 함수
  function (error) {
    alert("인터셉터 요청 에러");
    console.log('인터셉터 요청 오류!', error);
    return Promise.reject(error);
  },

);

instance.interceptors.response.use(
  //응답을 내보내기 전 수행되는 함수
  function (response) {
    console.log('인터셉터 응답 받았습니다!', response);
    return response;
  },
  //오류 응답을 내보내기 전 수행되는 함수 
  function (error) {
    console.log('서버에서 data를 가져오지 못했습니다.', error);
    return Promise.reject(error);
  },
);

export default instance;