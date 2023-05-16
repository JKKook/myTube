import axios from 'axios';
import React from 'react';
// import { useState } from 'react';
import { BsGoogle, BsGithub } from 'react-icons/bs';
import { useRecoilState } from 'recoil';
import { userAuthState, userFormState } from '../recoil/recoil-auth';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const SERVER_URL = 'http://localhost:8005/users/login';

export default function SignIn() {
    const [signForm, setSignForm] = useRecoilState(userFormState);
    // console.log(signForm); // 나중에 디바운스 리팩터링 해야해!!
    const [isAuthenticated, setIsAuthenticated] = useRecoilState(userAuthState);

    const navigate = useNavigate();

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
            console.log('responseData', response.data);
            const { loginSuccess } = response.data;

            // 서버에서 로그인 생성 응답이 떨어지면
            if (loginSuccess) {
                // 서버에서 보낸 토큰을 쿠키에 저장, Auth : true
                document.cookie = `x_auth=${response.data.token}; path=/`;
                console.log('서버에서 받아온 토큰 값:', response.data.token);
                setIsAuthenticated(isAuthenticated.true);
            }
            // 로그인 성공 후 루트 경로로 이동
            navigate('/');
        } catch (error) {
            console.log(`클라이언트에서 request 요청이 실패했습니다 ${error}`);
        }

        setSignForm({ email: '', password: '' });
    };

    // 로그인 상태 유지
    useEffect(() => {
        const token = getCookie('x_auth'); // cookie에서 토큰 가져오기
        console.log('TOKEN:', token);
        if (token) {
            setIsAuthenticated(isAuthenticated.true);
        }
    }, []);

    const getCookie = (name) => {
        const cookieString = document.cookie;
        // document.cookie에서 받아온 전체 쿠키 문자열을 세미콜론을 기준으로 분리하여 배열 만듦.
        const cookies = cookieString.split(';'); // ["cookie1=value1", " cookie2=value2", " cookie3=value3"]
        console.log('cookies:', cookies);
        // 배열 순회하면서 주어진 name과 일치하는 쿠키를 찾는다
        // * forloop을 사용한 이유, 1.return문을 사용해서 루프 중지 / 2."i" 값 직접적으로 제어 (고차함수는 순차적으로 진행되기에 직접제어는 불가)
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            console.log('cookie:', cookie);
            // cookie의 이름과 name이 일치 유무 파악
            if (cookie.startsWith(name + '=')) {
                // 일치하는 쿠키를 찾으면 추출해서 반환
                // name의 길이 다음부터 쿠키의 끝까지의 문자열 추출
                // * 여기서 name.length + 1은 "name="을 건너뛰기 위한 값
                return cookie.substring(name.length + 1, cookie.length);
                // ex) name이 cookie2고, 주어진 쿠키가 "cookie2=value2"일 때, "value2"를 반환
            }
        }
        // 만약 일치하는 쿠키가 없다면 null값 리턴
        return null;
    };

    return (
        <>
            {/* {token} */}
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
