export default class Youtube {
  // 필요한 defendency 외부에서 주입 받을 것임!
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  async search(keyword) {
    return keyword
      ? this.#searchByKeyword(keyword)
      : this.#searchByPopular(keyword);
  }

  // channelImageURL , items 배열들 중의 첫 번째 해당 썸네일을 받아올 것
  async channelImageURL(id) {
    return this.apiClient
      .channels({ params: { part: 'snippet', id } })
      .then((res) => res.data.items[0].snippet.thumbnails.default.url);
  }

  // RelatedVideo
  async relatedVideo(id) {
    return (
      this.apiClient
        .search({
          params: {
            part: 'snippet',
            maxResults: 25,
            type: 'video',
            // query대신, 연관된 비디오 아이디 값 필요, 공식홈페이지 참고
            relatedToVideoId: id,
          },
        })
        .then((res) => res.data.items)
        //   items의 id는 객체로 포함되어 있고, id안에 videoId가 실질적인 id 역할
        .then((items) =>
          items.map((item) => ({ ...item, id: item.id.videoId })),
        )
    );
  }

  async #searchByKeyword(keyword) {
    return (
      this.apiClient
        .search({
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
    return this.apiClient
      .videos({
        params: {
          part: 'snippet',
          maxResults: 25,
          chart: 'mostPopular',
        },
      })
      .then((res) => res.data.items);
  }
}
