import './App.css'

import React, {useEffect, useState} from "react"
import Footer from "./compoments/Footer"
import LoginPage from "./pages/LoginPage"
import Header from "./compoments/Header"

import memoApi from "./api/memoApi"

import Memo from "./interfaces/Memo"
import LoginResponse from "./interfaces/LoginResponse"
import IndexPage from "./pages/IndexPage";

function App() {
    const [memoList, setMemoList] = useState<Memo[]>([])
    const [username, setUsername] = useState(localStorage.getItem('username') || '')
    const [email, setEmail] = useState(localStorage.getItem('email') || '')
    const [token, setToken] = useState(localStorage.getItem('token') || '')

    const fetchMemoList = () => {
        memoApi.list()
            .then(response => {
                const success = response.data.success
                if (success) {
                    const memoList = response.data.data
                    setMemoList(memoList)
                }
            })
    }

    useEffect(() => {
        fetchMemoList()
    }, [token])

    const handleLoginSuccess = (loginResponse: LoginResponse) => {
        setUsername(loginResponse.username)
        setEmail(loginResponse.email)
        setToken(loginResponse.token)
        localStorage.setItem('username', loginResponse.username)
        localStorage.setItem('email', loginResponse.email)
        localStorage.setItem('token', loginResponse.token)
        localStorage.setItem('expiresAt', loginResponse.expiresAt)
    }

    return (
        <>
            <Header/>
            {
                token ?
                    <IndexPage
                        memoList={memoList}
                        username={username}
                        email={email}
                        token={token}
                        setMemoList={setMemoList}
                        setUsername={setUsername}
                        setEmail={setEmail}
                        setToken={setToken}
                        fetchMemoList={fetchMemoList}
                    />
                    :
                    <LoginPage handleLoginSuccess={handleLoginSuccess}/>
            }
            <Footer/>
        </>
    )
}

export default App
