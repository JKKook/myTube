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
