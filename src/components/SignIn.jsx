import React from 'react';
import { useState } from 'react';

export default function SignIn() {
    const [signForm, setSignForm] = useState({ email: '', password: '' });
    // console.log(signForm); // 나중에 디바운스 리팩터링 해야해!!

    // signIn *실제 데이터는 백엔드에서 받아 올 것임!
    const handleSignInValue = (e) => {
        // input name
        const { name, value } = e.target;
        // console.log(e.target.name);
        setSignForm({ ...signForm, [name]: value });
    };

    const handleSignInSubmit = (e) => {
        e.preventDefault();
        // console.log(signForm.email);
        // console.log(signForm.password);
    };

    return (
        <>
            <div className='flex flex-col justify-center items-center h-[80vh]'>
                <div className='relative translate-x-[-100%] m-10'>
                    <h2 className='mb-4 text-3xl font-bold'>로그인</h2>
                    <em className='text-xl'>마이튜브 계속 이동</em>
                </div>
                <form
                    className='max-w-[500px] bg-gray-200 p-8 rounded shadow-md w-7/12 '
                    onSubmit={handleSignInSubmit}
                >
                    <div className='mb-4'>
                        <label
                            htmlFor='email'
                            className='block text-gray-700 font-semibold mb-2'
                        >
                            E-mail:
                        </label>
                        <input
                            type='email'
                            id='email'
                            name='email'
                            className='w-full py-2 px-4 border border-gray-300 rounded focus:outline-none focus:border-indigo-500'
                            defaultValue={signForm.email}
                            onChange={handleSignInValue}
                        />
                    </div>
                    <div className='mb-4'>
                        <label
                            htmlFor='password'
                            className='block text-gray-700 font-semibold mb-2'
                        >
                            Password:
                        </label>
                        <input
                            type='password'
                            id='password'
                            name='password'
                            className='w-full py-2 px-4 border border-gray-300 rounded focus:outline-none focus:border-indigo-500'
                            defaultValue={signForm.password}
                            onChange={handleSignInValue}
                        />
                    </div>
                    <div className='flex justify-end'>
                        <button
                            type='submit'
                            className='bg-indigo-500 font-bold text-white py-2 px-4 rounded hover:bg-indigo-600'
                        >
                            시작하기
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
