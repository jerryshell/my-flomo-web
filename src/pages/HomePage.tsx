import React from 'react'
import MemoCreate from '../components/MemoCreate'
import FlomoImport from '../components/FlomoImport'
import CsvExport from '../components/CsvExport'
import CsvImport from '../components/CsvImport'
import DangerousArea from '../components/DangerousArea'
import PluginToken from '../components/PluginToken'
import UserEmailUpdate from '../components/UserEmailUpdate'
import MemoList from '../components/MemoList'
import {useSetRecoilState} from 'recoil'
import {atoms} from '../atoms/atoms'
import UserPasswordUpdate from '../components/UserPasswordUpdate'

const HomePage = (props: {
    fetchMemoList(): void
}) => {
    const setUsername = useSetRecoilState(atoms.username)
    const setEmail = useSetRecoilState(atoms.email)
    const setToken = useSetRecoilState(atoms.token)

    const logout = () => {
        setUsername('')
        setEmail('')
        setToken('')
        localStorage.removeItem('username')
        localStorage.removeItem('email')
        localStorage.removeItem('token')
        localStorage.removeItem('expiresAt')
    }

    return (
        <>
            <MemoCreate
                fetchMemoList={props.fetchMemoList}
            />

            <button
                onClick={logout}
                style={{color: '#9E3B37'}}
            >
                登出
            </button>

            <FlomoImport
                fetchMemoList={props.fetchMemoList}
            />

            <CsvExport/>

            <CsvImport
                fetchMemoList={props.fetchMemoList}
            />

            <DangerousArea
                logout={logout}
            />

            <PluginToken/>

            <UserEmailUpdate/>

            <UserPasswordUpdate/>

            <MemoList/>
        </>
    )
}

export default HomePage
