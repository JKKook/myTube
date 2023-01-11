import { createContext, useContext } from 'react';
// import FakeYoutubeClient from '../api/fake-youtube-client';
import Youtube from '../api/youtube';
import YoutubeClient from '../api/youtube-client';

// context를 사용해서 유튜브 api를 담당하는 우산을 만들어서 필요한 요소만 뽑아오도록 하자!
export const YoutubeApiContext = createContext();

// provider
export function YoutubeApiProvider({ children }) {
  return (
    <YoutubeApiContext.Provider value={{ youtube }}>
      {children}
    </YoutubeApiContext.Provider>
  );
}
// client 정의 (실제 유튜브 API, MockData)
const client = new YoutubeClient();
// const client = new FakeYoutubeClient(); // Mock data
export const youtube = new Youtube(client);

// context 로직 사용
export function useYoutubeApi() {
  return useContext(YoutubeApiContext);
}
