import React from 'react';

export default function Header() {
  return (
    <div>
      <div>logo</div>
      <form>
        <input id='search' type='text' placeholder='search...' />
        <label htmlFor='search' id='search'></label>
      </form>
    </div>
  );
}
