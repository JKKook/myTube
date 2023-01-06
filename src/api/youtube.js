import axios from 'axios';

export default class Youtube {
  constructor() {
    //   axios 통신에 필요한 기본 값을 저장해서 httpClient에 할당
    this.httpClient = axios.create({
      baseURL: 'https://www.googleapis.com/youtube/v3',
      //   key 보완 철저하게!!
      params: { key: process.env.REACT_APP_YOUTUBE_API_KEY },
    });
  }

  async search(keyword) {
    return keyword
      ? this.#searchByKeyword(keyword)
      : this.#searchByPopular(keyword);
  }
  async #searchByKeyword(keyword) {
    return (
      this.httpClient
        .get('search', {
          params: {
            part: 'snippet',
            maxResults: 25,
            type: 'video',
            q: keyword,
          },
        })
        .then((res) => res.data.items)
        //   items의 id는 객체로 포함되어 있고, id안에 videoId가 실질적인 id 역할
        .then((items) =>
          items.map((item) => ({ ...item, id: item.id.videoId })),
        )
    );
  }

  async #searchByPopular() {
    return this.httpClient
      .get('videos', {
        params: {
          part: 'snippet',
          maxResults: 25,
          chart: 'mostPopular',
        },
      })
      .then((res) => res.data.items);
  }
}
