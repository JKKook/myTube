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
