import React from 'react';
import { formatAgo } from '../utils/date';
import { useNavigate } from 'react-router-dom';

export default function VideoCard({ video }) {
  const { title, thumbnails, channelTitle, publishedAt } = video.snippet;

  // 비디오 리스트 클릭 시, watch/Detail 경로로 보내기
  const navigate = useNavigate();
  const handleClick = () =>
    // 주의!! navigate는 반드시 절대경로로 지정해야 함!!
    navigate(`/videos/watch/${video.id}`, { state: { video } });

  return (
    <>
      <li onClick={handleClick}>
        <img className='w-full' src={thumbnails.medium.url} alt={title} />
        <div>
          {/* plugin : line-clamp-list */}
          <p className='font-semibold my-2 line-clamp-2'>{title}</p>
          <p className='text-sm opacity-80'>{channelTitle}</p>
          <p className='text-sm opacity-80'>{formatAgo(publishedAt, 'ko')}</p>
        </div>
      </li>
    </>
  );
}
