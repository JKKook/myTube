import axios from 'axios';

export default class FakeYoutube {
  async search(keyword) {
    return keyword
      ? this.#searchByKeyword(keyword)
      : this.#searchByPopular(keyword);
  }
  async #searchByKeyword(keyword) {
    return (
      axios
        .get(`/data/list-by-keyword.json`)
        .then((res) => res.data.items)
        //   items의 id는 객체로 포함되어 있고, id안에 videoId가 실질적인 id 역할
        .then((items) =>
          items.map((item) => ({ ...item, id: item.id.videoId })),
        )
    );
  }

  async #searchByPopular(keyword) {
    return axios
      .get(`/data/list-by-popular.json`)
      .then((res) => res.data.items);
  }
}
