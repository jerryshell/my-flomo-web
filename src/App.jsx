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

function App() {
    const [memoList, setMemoList] = useState([])
    const [newMemo, setNewMemo] = useState('')
    const [uploadFileList, setUploadFileList] = useState([])
    const [username, setUsername] = useState(localStorage.getItem('username'))
    const [email, setEmail] = useState(localStorage.getItem('email'))
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [expiresAt, setExpiresAt] = useState(localStorage.getItem('expiresAt'))
    const fileUploadInputRef = useRef()

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

    const handleNewMemoTextareaChange = (e) => {
        setNewMemo(e.target.value)
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

    const handleFileInputChange = e => {
        const uploadFileList = e.target.files
        setUploadFileList(uploadFileList)
    }

    const handleImportDataBtnClick = () => {
        const formData = new FormData()
        for (let i = 0; i < uploadFileList.length; i++) {
            formData.append('uploadFileList[]', uploadFileList[i])
        }
        setUploadFileList([])
        fileUploadInputRef.current.value = ''
        uploadApi.upload(formData)
            .then(() => {
                fetchMemoList()
            })
    }

    const handleMemoDeleteBtnClick = (id) => {
        setMemoList(memoList.filter(item => item.id !== id))
        memoApi.deleteById(id)
            .then(() => {
            })
    }

    const handleMemoUpdate = memo => {
        setMemoList(memoList.map(item => item.id === memo.id ? memo : item))
    }

    const handleLoginSuccess = ({username, email, token, expiresAt}) => {
        setUsername(username)
        setEmail(email)
        setToken(token)
        setExpiresAt(expiresAt)
        localStorage.setItem('username', username)
        localStorage.setItem('email', email)
        localStorage.setItem('token', token)
        localStorage.setItem('expiresAt', expiresAt)
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

    const handleUpdateEmailBtnClick = (newEmail) => {
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
