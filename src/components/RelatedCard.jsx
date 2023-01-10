import React from 'react';
import { formatAgo } from '../utils/date';
import { useNavigate } from 'react-router-dom';

export default function RelatedCard({ video, type }) {
  const { title, thumbnails, channelTitle, publishedAt } = video.snippet;
  const navigate = useNavigate();
  const handleClick = () =>
    navigate(`/videos/watch/${video.id}`, { state: { video } });
  const isList = type === 'list';

  return (
    <>
      <li className={isList ? 'flex gap-1 ml-2' : ''} onClick={handleClick}>
        <img
          className={
            isList ? 'w-40 m-2 rounded-md' : 'w-80 h-40 ml-4 rounded-md'
          }
          src={thumbnails.medium.url}
          alt={title}
        />
        <div>
          <div>
            <p className='ml-4 text-sm font-semibold my-2 line-clamp-2'>
              {title}
            </p>
            <p className='mx-4 text-sm opacity-80'>{channelTitle}</p>
            <p className='mx-4 text-xs opacity-60'>
              {formatAgo(publishedAt, 'ko')}
            </p>
          </div>
        </div>
      </li>
    </>
  );
}
