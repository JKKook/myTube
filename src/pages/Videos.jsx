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
  } = useQuery({
    // key : videos , variable : keyword
    queryKey: ['videos', keyword],
    queryFn: () => youtube.search(keyword),
  });

  return (
    <>
      <div>Videos {keyword ? `🔎${keyword}` : 'keyword nothing 😋'}</div>
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
