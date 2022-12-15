import {atom} from 'recoil'
import Memo from '../interfaces/Memo'

export const atoms = {
    token: atom({
        key: 'token',
        default: localStorage.getItem('token') || '',
    }),
    username: atom({
        key: 'username',
        default: localStorage.getItem('username') || '',
    }),
    email: atom({
        key: 'email',
        default: localStorage.getItem('email') || '',
    }),
    memoList: atom({
        key: 'memoList',
        default: Array<Memo>(),
    }),
    memoKeyword: atom({
        key: 'memoKeyword',
        default: '',
    }),
}
