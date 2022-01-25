import './App.css'
import {useEffect, useRef, useState} from "react"
import memoApi from "./api/memoApi"
import uploadApi from "./api/uploadApi"
import MemoCreatePlane from "./compoments/MemoCreatePlane"
import MemoImportPlane from "./compoments/MemoImportPlane"
import MemoList from "./compoments/MemoList"
import Footer from "./compoments/Footer"
import LoginPlane from "./compoments/LoginPlane";
import Header from "./compoments/Header";
import PluginToken from "./compoments/PluginToken";
import UserUpdateEmailPlane from "./compoments/UserUpdateEmailPlane";
import userApi from "./api/userApi";
import Memo from "./interfaces/Memo";
import LoginResponse from "./interfaces/LoginResponse";
import deleteMyAccountApi from "./api/deleteMyAccountApi";
import api from "./api/api";

function App() {
    const [memoList, setMemoList] = useState<Memo[]>([])
    const [newMemo, setNewMemo] = useState('')
    const [uploadFileList, setUploadFileList] = useState<FileList | null>(null)
    const [username, setUsername] = useState(localStorage.getItem('username') || '')
    const [email, setEmail] = useState(localStorage.getItem('email') || '')
    const [token, setToken] = useState(localStorage.getItem('token') || '')
    const [expiresAt, setExpiresAt] = useState(localStorage.getItem('expiresAt') || '')
    const fileUploadInputRef = useRef<HTMLInputElement>(null)

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

    const handleNewMemoTextareaChange = (content: string) => {
        setNewMemo(content)
    }

    const handleSaveBtnClick = () => {
        const postData = {
            content: newMemo,
        }
        setNewMemo('')
        memoApi.create(postData)
            .then(response => {
                const success = response.data.success
                if (success) {
                    fetchMemoList()
                }
            })
    }

    const handleFileInputChange = (fileList: FileList | null) => {
        setUploadFileList(fileList)
    }

    const handleImportDataBtnClick = () => {
        if (uploadFileList === null) {
            return
        }
        const formData = new FormData()
        for (let i = 0; i < uploadFileList.length; i++) {
            formData.append('uploadFileList[]', uploadFileList[i])
        }
        setUploadFileList(null)
        fileUploadInputRef.current?.setAttribute('value', '')
        uploadApi.upload(formData)
            .then(() => {
                fetchMemoList()
            })
    }

    const handleMemoDeleteBtnClick = (id: string) => {
        setMemoList(memoList.filter(item => item.id !== id))
        memoApi.deleteById(id)
            .then(() => {
            })
    }

    const handleMemoUpdate = (memo: Memo) => {
        setMemoList(memoList.map(item => item.id === memo.id ? memo : item))
    }

    const handleLoginSuccess = (loginResponse: LoginResponse) => {
        setUsername(loginResponse.username)
        setEmail(loginResponse.email)
        setToken(loginResponse.token)
        setExpiresAt(expiresAt)
        localStorage.setItem('username', loginResponse.username)
        localStorage.setItem('email', loginResponse.email)
        localStorage.setItem('token', loginResponse.token)
        localStorage.setItem('expiresAt', loginResponse.expiresAt)
    }

    const handleLogoutBtnClick = () => {
        setUsername('')
        setEmail('')
        setToken('')
        setExpiresAt('')
        localStorage.removeItem('username')
        localStorage.removeItem('email')
        localStorage.removeItem('token')
        localStorage.removeItem('expiresAt')
    }

    const handleUpdateEmailBtnClick = (newEmail: string) => {
        const postData = {
            email: newEmail
        }
        console.log('updateEmail postData', postData)
        userApi.updateEmail(postData)
            .then(response => {
                console.log('updateEmail response', response)
                const message = response.data.message
                alert(message)
                const success = response.data.success
                if (success) {
                    setEmail(newEmail)
                    localStorage.setItem('email', newEmail)
                }
            })
    }

    const deleteMyAccount = () => {
        deleteMyAccountApi.deleteMyAccount()
            .then(response => {
                const success = response.data.success
                if (success) {
                    alert(response.data.message)
                    handleLogoutBtnClick()
                }
            })
    }

    const handleCsvExportBtnClick = () => {
        const token = localStorage.getItem('token')
        window.open(`${api.defaults.baseURL}/csvExport/token/${token}`)
    }

    return (
        <>
            <Header/>
            {
                token ?
                    <>
                        <MemoCreatePlane
                            newMemo={newMemo}
                            handleNewMemoTextareaChange={handleNewMemoTextareaChange}
                            handleSaveBtnClick={handleSaveBtnClick}
                        />

                        <button onClick={handleLogoutBtnClick} style={{color: '#9E3B37'}}>注销</button>

                        <MemoImportPlane
                            handleFileInputChange={handleFileInputChange}
                            handleImportDataBtnClick={handleImportDataBtnClick}
                            fileUploadInputRef={fileUploadInputRef}
                        />

                        <details>
                            <summary>CSV 导出</summary>
                            <button onClick={handleCsvExportBtnClick}>CSV 导出</button>
                        </details>

                        <details>
                            <summary>️⚠️ 危险区 ⚠️</summary>
                            <button onClick={deleteMyAccount}>⚠️ 账号注销，永久抹除数据，无法恢复，点击立刻生效 ⚠️</button>
                        </details>

                        <PluginToken/>

                        <UserUpdateEmailPlane
                            username={username}
                            email={email}
                            handleUpdateEmailBtnClick={handleUpdateEmailBtnClick}
                        />

                        <MemoList
                            memoList={memoList}
                            handleMemoDeleteBtnClick={handleMemoDeleteBtnClick}
                            handleMemoUpdate={handleMemoUpdate}
                        />
                    </>
                    :
                    <LoginPlane handleLoginSuccess={handleLoginSuccess}/>
            }
            <Footer/>
        </>
    )
}

export default App
