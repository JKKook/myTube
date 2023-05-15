import axios from 'axios';

export default class FakeYoutubeClient {
  async search({ params }) {
    return params.relatedToVideoId
      ? axios.get('/data/list-by-related.json')
      : axios.get('/data/list-by-keyword.json');
  }

  async videos() {
    return axios.get('/data/list-by-popular.json');
  }

  async channels() {
    return axios.get('/data/channel-description.json');
  }
}
