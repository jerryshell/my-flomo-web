import './App.css'
import {useEffect, useRef, useState} from "react"
import memoApi from "./api/memoApi"
import uploadApi from "./api/uploadApi"
import MemoCreatePlane from "./compoments/MemoCreatePlane"
import MemoImportPlane from "./compoments/MemoImportPlane"
import MemoList from "./compoments/MemoList"
import Footer from "./compoments/Footer"

function App() {
    const [memoList, setMemoList] = useState([])
    const [newMemo, setNewMemo] = useState('')
    const [uploadFileList, setUploadFileList] = useState([])
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
    }, [])

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
        uploadFileList.forEach(uploadFile => {
            formData.append('uploadFileList[]', uploadFile)
        })
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

    return (
        <>
            <MemoCreatePlane
                newMemo={newMemo}
                handleNewMemoTextareaChange={handleNewMemoTextareaChange}
                handleSaveBtnClick={handleSaveBtnClick}
            />
            <MemoImportPlane
                fileUploadInputRef={fileUploadInputRef}
                handleFileInputChange={handleFileInputChange}
                handleImportBtnClick={handleImportBtnClick}
            />
            <MemoList
                memoList={memoList}
                handleDeleteBtnClick={handleDeleteBtnClick}
                handleMemoUpdate={handleMemoUpdate}
            />
            <Footer/>
        </>
    )
}

export default App
