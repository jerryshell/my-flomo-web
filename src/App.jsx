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

function App() {
    const [memoList, setMemoList] = useState([])
    const [newMemo, setNewMemo] = useState('')
    const [uploadFileList, setUploadFileList] = useState([])
    const [token, setToken] = useState(localStorage.getItem('token'))
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

    const handleImportBtnClick = () => {
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

    const handleDeleteBtnClick = (id) => {
        setMemoList(memoList.filter(item => item.id !== id))
        memoApi.deleteById(id)
            .then(() => {
            })
    }

    const handleMemoUpdate = memo => {
        setMemoList(memoList.map(item => item.id === memo.id ? memo : item))
    }

    const handleLoginSuccess = (token) => {
        setToken(token)
        localStorage.setItem('token', token)
    }

    const handleLogoutBtnClick = () => {
        setToken('')
        localStorage.removeItem('token')
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
                            handleImportBtnClick={handleImportBtnClick}
                            fileUploadInputRef={fileUploadInputRef}
                        />
                        <PluginToken/>
                        <UserUpdateEmailPlane/>
                        <MemoList
                            memoList={memoList}
                            handleDeleteBtnClick={handleDeleteBtnClick}
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
