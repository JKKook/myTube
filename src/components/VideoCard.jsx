import React from 'react';
import { formatAgo } from '../utils/date';
import { useNavigate } from 'react-router-dom';
import { useYoutubeApi } from '../context/youtubeApiContext';
import { useQuery } from '@tanstack/react-query';

export default function VideoCard({ video, type }) {
  const { title, thumbnails, channelTitle, publishedAt, channelId } =
    video.snippet;

  // 비디오 리스트 클릭 시, watch/Detail 경로로 보내기
  const navigate = useNavigate();
  const handleClick = () =>
    // 주의!! navigate는 반드시 절대경로로 지정해야 함!!
    navigate(`/videos/watch/${video.id}`, { state: { video } });
  // type을 지정하여, 스타일링(삼항 연산자)
  const isList = type === 'list';
  //
  const { youtube } = useYoutubeApi();
  const { data: url } = useQuery({
    queryKey: ['channel', channelId],
    queryFn: () => youtube.channelImageURL(channelId),
  });

  return (
    <>
      <li className={isList ? 'flex gap-1 ml-2' : ''} onClick={handleClick}>
        <img
          className={
            isList ? 'w-52 m-2 rounded-md' : 'w-80 h-40 ml-4 rounded-md'
          }
          src={thumbnails.medium.url}
          alt={title}
        />
        <div className='flex'>
          <div className='flex basis-1/8 ml-4 my-3'>
            {url && (
              <img
                className='w-10 h-10 rounded-full'
                src={url}
                alt={channelTitle}
              />
            )}
          </div>
          <div className='flex flex-col basis-4/6'>
            <p className='ml-4 text-sm font-semibold my-2 line-clamp-2'>
              {title}
            </p>
            <p className='ml-4 text-sm opacity-80'>{channelTitle}</p>
            <p className='ml-4 text-xs opacity-60'>
              {formatAgo(publishedAt, 'ko')}
            </p>
          </div>
        </div>
      </li>
    </>
  );
}
