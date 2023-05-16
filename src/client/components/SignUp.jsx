import axios from 'axios';
import React from 'react';
import { useRecoilState } from 'recoil';
import { userFormState } from '../recoil/recoil-auth';

const SERVER_URL = 'http://localhost:8005/users/register';

export default function SignUp() {
    const [registerForm, setRegisterForm] = useRecoilState(userFormState);

    const handleSignUpValue = (e) => {
        const { name, value } = e.target;

        setRegisterForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSignUpSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(SERVER_URL, registerForm);
            console.log('registerRes', response);
        } catch (error) {
            console.log(`클라이언트에서 request 요청이 실패했습니다 ${error}`);
        }

        setRegisterForm({
            nickName: '',
            email: '',
            password: '',
            passwordConfirm: '',
        });
    };

    return (
        <>
            <div className='flex flex-col justify-center items-center h-[80vh]'>
                <div className='relative translate-x-[-10%] m-10'>
                    <h2 className='mb-4 text-3xl font-bold'>회원가입</h2>
                    <em className='text-xl'>
                        만나서 반가워요, 마이튜브에서 재밌게 놀다가세요
                    </em>
                </div>
                <form
                    action='/users/register'
                    method='POST'
                    className='max-w-[500px] bg-gray-200 p-8 rounded shadow-md w-7/12 '
                    onSubmit={handleSignUpSubmit}
                >
                    <div className='mb-4'>
                        <label
                            htmlFor='nickName'
                            className='block text-gray-700 font-semibold mb-2'
                        >
                            Nick-Name:
                        </label>
                        <input
                            type='text'
                            id='nickName'
                            name='nickName'
                            className='w-full py-2 px-4 border border-gray-300 text-gray-700 rounded focus:outline-none focus:border-indigo-500'
                            value={registerForm.nickName}
                            onChange={handleSignUpValue}
                        />
                    </div>
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
                            value={registerForm.email}
                            onChange={handleSignUpValue}
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
                            value={registerForm.password}
                            onChange={handleSignUpValue}
                        />
                    </div>
                    <div className='mb-4'>
                        <label
                            htmlFor='passwordConfirm'
                            className='block text-gray-700 font-semibold mb-2'
                        >
                            Password 재확인:
                        </label>
                        <input
                            type='password'
                            id='passwordConfirm'
                            name='passwordConfirm'
                            className='w-full py-2 px-4 border border-gray-300 text-gray-900 rounded focus:outline-none focus:border-indigo-500'
                            value={registerForm.passwordConfirm}
                            onChange={handleSignUpValue}
                        />
                    </div>

                    <div className='flex justify-end'>
                        <button
                            type='submit'
                            className='mt-12 bg-indigo-500 font-bold text-white py-2 px-4 rounded hover:bg-indigo-600'
                        >
                            myTube 생성
                        </button>
                    </div>
                    <div className='text-gray-800'>
                        <span>ID가 이미 있으신가요?</span>
                        {/* register routing */}
                        <span className='ml-2 cursor-pointer font-semibold text-indigo-900 hover:text-gray-600'>
                            로그인 하러가기
                        </span>
                    </div>
                </form>
            </div>
        </>
    );
}

// nickName, email, password
