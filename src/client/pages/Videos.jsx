import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom';
import VideoCard from '../components/VideoCard';
// import FakeYoutube from '../api/fake-youtube';
import { youtube } from '../context/youtubeApiContext';

export default function Videos() {
    const { keyword } = useParams();
    const {
        isLoading,
        error,
        // videos 배열에 관심
        data: videos,
        // useQuery cache
    } = useQuery(
        {
            queryKey: ['videos', keyword],
            queryFn: () => youtube.search(keyword),
        },
        { staleTime: 1 * 60 * 1000 },
    );

    return (
        <>
            {isLoading && <p>Loading...</p>}
            {error && <p>Something is wrong</p>}
            {videos && (
                // grid 형태로 반응형 화면이 작을 땐 col-1, sm사이즈 넘어가면 col-2, lg사이즈는 col-3, xl사이즈는 col-4
                // gap은 2, 수직은 4
                <ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 gap-y-4'>
                    {videos.map((video) => (
                        <>
                            <VideoCard video={video} key={video.id} />
                        </>
                    ))}
                </ul>
            )}
        </>
    );
}
