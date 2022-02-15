import './App.css'

import React, {useEffect, useState} from "react"
import {Route, Routes, useNavigate} from "react-router-dom"

import Footer from "./compoments/Footer"
import LoginPage from "./pages/LoginPage"
import Header from "./compoments/Header"

import memoApi from "./api/memoApi"

import Memo from "./interfaces/Memo"
import LoginResponse from "./interfaces/LoginResponse"
import HomePage from "./pages/HomePage"

function App() {
    const [memoList, setMemoList] = useState<Memo[]>([])
    const [username, setUsername] = useState(localStorage.getItem('username') || '')
    const [email, setEmail] = useState(localStorage.getItem('email') || '')
    const [token, setToken] = useState(localStorage.getItem('token') || '')
    const navigate = useNavigate()

    const fetchMemoList = () => {
        return memoApi.list()
            .then(response => {
                const success = response.data.success
                if (success) {
                    const memoList = response.data.data
                    setMemoList(memoList)
                }
            })
    }

    useEffect(() => {
        if (token) {
            fetchMemoList().then(() => navigate('/home'))
        } else {
            navigate('/login')
        }
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

            <Routes>

                <Route
                    path="/login"
                    element={
                        <LoginPage handleLoginSuccess={handleLoginSuccess}/>
                    }
                />

                {token &&
                    <Route
                        path="/home"
                        element={
                            <HomePage
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
                        }
                    />
                }

                <Route path="*" element={<>404</>}/>

            </Routes>

            <Footer/>
        </>
    )
}

export default App
