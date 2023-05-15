import axios from 'axios';

export default class YoutubePlayItem {
  constructor() {
    // axios
    this.httpClient = axios.create({
      baseURL: 'https://www.googleapis.com/youtube/v3/playlistItems',
    });
  }
}
