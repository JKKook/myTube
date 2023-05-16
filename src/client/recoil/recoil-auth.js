import { atom } from 'recoil';

export const userFormState = atom({
    key: 'userFormState', // unique ID
    default: {
        nickName: '',
        email: '',
        password: '',
        passwordConfirm: '',
    },
});

export const userAuthState = atom({
    key: 'userAuthState',
    default: {
        true: true,
        false: false,
    },
});
