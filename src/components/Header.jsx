import React, { useState, useEffect } from 'react';
import { BsYoutube, BsSearch } from 'react-icons/bs';
import { FaRegLaughBeam } from 'react-icons/fa';

import { Link, useNavigate, useParams } from 'react-router-dom';

export default function Header() {
    const { keyword } = useParams();
    const [text, setText] = useState('');
    const navigate = useNavigate();
    //
    const handleChange = (e) => setText(e.target.value);
    const handleSubmit = (e) => {
        e.preventDefault();
        // 라우트 경로로 submit 이벤트 발생
        navigate(`/videos/${text}`);
    };

    // input창에 새로고침을 해도 keyword가 남도록 기능 구현
    // useEffect 특성 상 특정 값이 변경 될 때만 렌더링
    useEffect(() => setText(keyword || ''), [keyword]);

    return (
        <header className='w-full flex p-4 text-2xl border-b border-zinc-600 mb-4'>
            <Link to='/' className='flex items-center'>
                <BsYoutube className='ml-4 text-4xl text-brand' />
                <h1 className='font-bold ml-2 text-3xl'>myTube</h1>
                <FaRegLaughBeam className='ml-2 mb-4 text-2xl text-yellow-500 animate-spin' />
            </Link>
            <form
                className='w-full h-10 flex justify-center'
                onSubmit={handleSubmit}
            >
                <input
                    className='w-7/12 p-2 outline-none rounded-l-2xl bg-black text-gray-50 text-base pl-4'
                    id='search'
                    type='text'
                    placeholder='search...'
                    value={text}
                    onChange={handleChange}
                />
                <label htmlFor='search' id='search'></label>
                <button className='bg-zinc-600 px-4 rounded-r-2xl'>
                    <BsSearch />
                </button>
            </form>
        </header>
    );
}
