import axios from 'axios';

export default class YoutubeClient {
  constructor() {
    //   axios 통신에 필요한 기본 값을 저장해서 httpClient에 할당
    this.httpClient = axios.create({
      baseURL: 'https://www.googleapis.com/youtube/v3',
      //   key 보완 철저하게!!
      params: { key: process.env.REACT_APP_YOUTUBE_API_KEY },
    });
  }
  async search(params) {
    return this.httpClient.get('search', params);
  }

  async videos(params) {
    return this.httpClient.get('videos', params);
  }

  async channels(params) {
    return this.httpClient.get('channels', params);
  }
}
