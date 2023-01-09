import React from 'react';
import { useYoutubeApi } from '../context/youtubeApiContext';
import { useQuery } from '@tanstack/react-query';

export default function ChannelInfo({ channelId, channelTitle }) {
  const { youtube } = useYoutubeApi();
  const {
    isLoading,
    error,
    data: url,
  } = useQuery({
    queryKey: ['channel', channelId],
    queryFn: () => youtube.channelImageURL(channelId),
  });
  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Something is wrong</p>}
      {url && <img src={url} alt={channelTitle} />}
      <p>{channelTitle}</p>
    </div>
  );
}
