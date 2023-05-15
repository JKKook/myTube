import React from 'react';
import { useYoutubeApi } from '../context/youtubeApiContext';
import { useQuery } from '@tanstack/react-query';
import RelatedCard from './RelatedCard';

export default function RelatedVideo({ channelId }) {
    const { youtube } = useYoutubeApi();
    const {
        isLoading,
        error,
        data: videos,
    } = useQuery(['related', channelId], () => youtube.search(channelId), {
        staleTime: 5 * 60 * 1000,
    });
    return (
        <>
            {isLoading && <p>Loading...</p>}
            {error && <p>Something is wrong</p>}
            {videos && (
                <ul>
                    <div>
                        <button className='bg-zinc-800 rounded-xl p-2 text-sm ml-4'>
                            모두
                        </button>
                        <button className='bg-zinc-800 rounded-xl p-2 text-sm ml-2'>
                            관련 콘텐츠
                        </button>
                        <button className='bg-zinc-800 rounded-xl p-2 text-sm ml-2'>
                            최근에 업로드된 동영상
                        </button>
                    </div>
                    {videos.map((video) => (
                        <RelatedCard video={video} key={video.id} type='list' />
                    ))}
                </ul>
            )}
        </>
    );
}
