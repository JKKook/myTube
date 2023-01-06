import axios from 'axios';

// API를 따로 빼내서 사용하는 이유
// 1) 실제 API데이터와 MOCK의 Switching ISSUE
// 2) 비동기 형태의 전송 경로 등등이 너무 컴포넌트에 노출되어 있는 문제 해결
export async function search(keyword) {
  return axios
    .get(`/data/${keyword ? 'list-by-keyword' : 'list-by-popular'}.json`)
    .then((res) => res.data.items);
}
