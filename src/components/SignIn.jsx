import React from 'react';
import { useState } from 'react';

export default function SignIn() {
    const [signForm, setSignForm] = useState({ email: '', password: '' });
    console.log(signForm); // 나중에 디바운스 리팩터링 해야해!!

    // signIn *실제 데이터는 백엔드에서 받아 올 것임!
    const handleSignInValue = (e) => {
        // input name
        const { name, value } = e.target;
        console.log(e.target.name);
        setSignForm({ ...signForm, [name]: value });
    };

    const handleSignInSubmit = (e) => {
        e.preventDefault();
        console.log(signForm.email);
        console.log(signForm.password);
    };

    return (
        <div>
            <form action='POST' onSubmit={handleSignInSubmit}>
                <div>
                    <label htmlFor='email'>E-mail:</label>
                    <input
                        className='text-yellow-600'
                        type='text'
                        id='email'
                        name='email'
                        defaultValue={signForm.email}
                        onChange={handleSignInValue}
                    />
                </div>
                <div>
                    <label htmlFor='password'>Password:</label>
                    <input
                        type='text'
                        id='password'
                        name='passoword'
                        defaultValue={signForm.password}
                        onChange={handleSignInValue}
                    />
                </div>
                <button>시작하기</button>
            </form>
        </div>
    );
}
