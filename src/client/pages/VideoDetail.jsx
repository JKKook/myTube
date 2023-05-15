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
            {/* flex지만, col의 규칙을 유지하고, 스크린이 lg사이즈일 떄, row형태로 배열 */}
            <section className='flex flex-col lg:flex-row'>
                <article className='basis-4/6'>
                    <iframe
                        title={title}
                        id='player'
                        type='text/html'
                        width='100%'
                        height='640'
                        src={`http://www.youtube.com/embed/${video.id}`}
                        frameBorder='0'
                    />
                    <div className='p-8'>
                        <h2 className='text-xl font-bold'>{title}</h2>
                        <ChannelInfo
                            channelId={channelId}
                            channelTitle={channelTitle}
                        />
                        {/* pre의 텍스트를 공간에 맞춰서 wrapping */}
                        <pre className='whitespace-pre-wrap'>{description}</pre>
                    </div>
                </article>
                <aside className='basis-2/6'>
                    <RelatedVideo channelId={channelId} />
                </aside>
            </section>
        </>
    );
}
