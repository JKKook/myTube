import React, { useState, useEffect } from 'react';
import { BsYoutube, BsSearch } from 'react-icons/bs';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function Header() {
  const { keyword } = useParams();
  const [text, setText] = useState('');
  const navigate = useNavigate();
  //
  const handleChange = (e) => setText(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    // 라우트 경로로 submit 이벤트 발생 , 작성한 콘텐츠는 일부로 남겨 둘 거야!
    navigate(`/videos/${text}`);
  };

  //
  useEffect(() => setText(keyword || ''), [keyword]);

  return (
    <header>
      <Link to='/'>
        <BsYoutube />
        <h1>Youtube</h1>
      </Link>
      <form onSubmit={handleSubmit}>
        <input
          id='search'
          type='text'
          placeholder='search...'
          value={text}
          onChange={handleChange}
        />
        <label htmlFor='search' id='search'></label>
        <button>
          <BsSearch />
        </button>
      </form>
    </header>
  );
}
