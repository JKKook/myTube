import axios from 'axios';

export default class FakeYoutubeClient {
  async search() {
    return axios.get('/data/list-by-keyword.json');
  }

  async videos() {
    return axios.get('/data/list-by-popular.json');
  }
}
