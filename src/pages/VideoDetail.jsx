import React from 'react';
import { useLocation } from 'react-router-dom';
import ChannelInfo from '../components/ChannelInfo';
import RelatedVideo from '../components/RelatedVideo';

export default function VideoDetail() {
  // Router를 통해 부수적으로 받아온 데이터 값을 locate 시키는 작업
  const {
    state: { video },
  } = useLocation();

  // 이제 video 데이터를 동일하게 사용할 수 있음!
  const { title, channelId, description, channelTitle } = video.snippet;

  return (
    <>
      <section>
        <article>
          <iframe
            title={title}
            id='player'
            type='text/html'
            width='100%'
            height='640'
            src={`http://www.youtube.com/embed/${video.id}`}
            frameBorder='0'
          />
        </article>
        <div>
          <h2>{title}</h2>
          <ChannelInfo channelId={channelId} channelTitle={channelTitle} />
          <pre>{description}</pre>
        </div>
      </section>
      <aside>
        <RelatedVideo channelId={channelId} />
      </aside>
    </>
  );
}
