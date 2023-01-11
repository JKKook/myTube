import React from 'react';
import { useYoutubeApi } from '../context/youtubeApiContext';
import { useQuery } from '@tanstack/react-query';

export default function ChannelInfo({ channelId, channelTitle }) {
  const { youtube } = useYoutubeApi();
  const {
    isLoading,
    error,
    data: url,
  } = useQuery(
    ['channel', channelId],
    () => youtube.channelImageURL(channelId),
    { staleTime: 5 * 60 * 1000 },
  );
  return (
    <div className='flex my-4 mb-8 items-center'>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error.messages}</p>}
      {url && (
        <img className='w-10 h-10 rounded-full' src={url} alt={channelTitle} />
      )}
      <p className='text-lg font-medium ml-2'>{channelTitle}</p>
    </div>
  );
}
