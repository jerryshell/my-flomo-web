import React from 'react'
import MemoCreate from '../compoments/MemoCreate'
import FlomoImport from '../compoments/FlomoImport'
import CsvExport from '../compoments/CsvExport'
import CsvImport from '../compoments/CsvImport'
import DangerousArea from '../compoments/DangerousArea'
import PluginToken from '../compoments/PluginToken'
import UserEmailUpdate from '../compoments/UserEmailUpdate'
import MemoList from '../compoments/MemoList'
import { useSetRecoilState } from 'recoil'
import { atoms } from '../atoms/atoms'

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
                fetchMemoList={ props.fetchMemoList }
            />

            <button
                onClick={ logout }
                style={ { color: '#9E3B37' } }
            >
                登出
            </button>

            <FlomoImport
                fetchMemoList={ props.fetchMemoList }
            />

            <CsvExport/>

            <CsvImport
                fetchMemoList={ props.fetchMemoList }
            />

            <DangerousArea
                logout={ logout }
            />

            <PluginToken/>

            <UserEmailUpdate/>

            <MemoList/>
        </>
    )
}

export default HomePage
