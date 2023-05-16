import axios from 'axios';
import React from 'react';
// import { useState } from 'react';
import { BsGoogle, BsGithub } from 'react-icons/bs';
import { useRecoilState } from 'recoil';
import { userFormState } from '../recoil/recoil-auth';
import { Link } from 'react-router-dom';

const SERVER_URL = 'http://localhost:8005/users/login';

export default function SignIn() {
    const [signForm, setSignForm] = useRecoilState(userFormState);
    // console.log(signForm); // 나중에 디바운스 리팩터링 해야해!!

    // signIn *실제 데이터는 백엔드에서 받아 올 것임!
    const handleSignInValue = (e) => {
        // input name
        const { name, value } = e.target;
        // console.log(e.target.name);
        // setSignForm({ ...signForm, [name]: value });

        // ** BUG : input value가 submit했음에도 초기화 되지 않음
        // ** DEBUG setState 동기적인 처리
        setSignForm((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSignInSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(SERVER_URL, signForm);
            console.log('responseData', response);
        } catch (error) {
            console.log(`클라이언트에서 request 요청이 실패했습니다 ${error}`);
        }

        setSignForm({ email: '', password: '' });
    };

    return (
        <>
            <div className='flex flex-col justify-center items-center h-[80vh]'>
                <div className='relative translate-x-[-100%] m-10'>
                    <h2 className='mb-4 text-3xl font-bold'>로그인</h2>
                    <em className='text-xl'>마이튜브 계속 이동</em>
                </div>
                <form
                    action='/users/login'
                    method='POST'
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
                            className='w-full py-2 px-4 border border-gray-300 text-gray-700 rounded focus:outline-none focus:border-indigo-500'
                            value={signForm.email}
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
                            className='w-full py-2 px-4 border border-gray-300 text-gray-900 rounded focus:outline-none focus:border-indigo-500'
                            value={signForm.password}
                            onChange={handleSignInValue}
                        />
                    </div>
                    <div>
                        <p className='text-gray-700 font-semibold mt-8 mb-2 '>
                            소셜 로그인
                        </p>
                        <button className='p-4 text-2xl bg-red-500 rounded mr-4 transform hover:scale-105 transition duration-300'>
                            <BsGoogle />
                        </button>
                        <button className='p-4 text-2xl bg-gray-500 rounded transform hover:scale-105 transition duration-300'>
                            <BsGithub />
                        </button>
                    </div>
                    <div className='flex justify-end'>
                        <button
                            type='submit'
                            className='mt-12 bg-indigo-500 font-bold text-white py-2 px-4 rounded hover:bg-indigo-600'
                        >
                            시작하기
                        </button>
                    </div>
                    <div className='text-gray-800'>
                        <span>이용이 처음이신가요?</span>
                        {/* register routing */}
                        <Link to='/users/register'>
                            <span className='ml-2 cursor-pointer font-semibold text-indigo-900 hover:text-gray-600'>
                                처음 시작하기
                            </span>
                        </Link>
                    </div>
                </form>
            </div>
        </>
    );
}
