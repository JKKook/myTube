import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom';
import VideoCard from '../components/VideoCard';

export default function Videos() {
  const { keyword } = useParams();

  const {
    isLoading,
    error,
    // videos 배열에 관심
    data: videos,
    // useQuery cache
  } = useQuery({
    // key : videos , variable : keyword
    queryKey: ['videos', keyword],
    queryFn: async () => {
      // 경로에 대해서 자세하게 살펴볼 필요가 있다!
      return fetch(
        `/data/${keyword ? 'list-by-keyword' : 'list-by-popular'}.json`,
      )
        .then((res) => res.json())
        .then((data) => data.items);
    },
  });

  return (
    <>
      <div>Videos {keyword ? `🔎${keyword}` : '😋'}</div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Something is wrong</p>}
      {videos && (
        <ul>
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </ul>
      )}
    </>
  );
}
