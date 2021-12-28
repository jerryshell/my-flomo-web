import './App.css'
import {useEffect, useRef, useState} from "react"
import memoApi from "./api/memoApi"
import MemoListItem from "./compoments/MemoListItem"
import uploadApi from "./api/uploadApi"

function App() {
    const [memoList, setMemoList] = useState([])
    const [newMemo, setNewMemo] = useState('')
    const [uploadFileList, setUploadFileList] = useState([])
    const fileUploadInputRef = useRef()

    const fetchMemoList = () => {
        memoApi.list()
            .then(response => {
                console.log('fetchMemoList response', response)
                const success = response.data.success
                console.log('fetchMemoList success', success)
                if (success) {
                    const memoList = response.data.data
                    console.log('fetchMemoList memoList', memoList)
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
        console.log('handleSaveBtnClick', newMemo)
        const postData = {
            content: newMemo,
        }
        setNewMemo('')
        memoApi.create(postData)
            .then(response => {
                console.log('handleSaveBtnClick response', response)
                const success = response.data.success
                console.log('handleSaveBtnClick success', success)
                if (success) {
                    const memo = response.data.data
                    console.log('handleSaveBtnClick memo', memo)
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
            formData.append(`uploadFileList[]`, uploadFileList[i])
        }
        setUploadFileList([])
        fileUploadInputRef.current.value = ''
        uploadApi.upload(formData)
            .then(response => {
                console.log('upload response', response)
                fetchMemoList()
            })
    }

    const handleDeleteBtnClick = (id) => {
        console.log('handleDeleteBtnClick', id)
        setMemoList(memoList.filter(item => item.id !== id))
        memoApi.deleteById(id)
            .then(response => {
                console.log('handleDeleteBtnClick response', response)
                const success = response.data.success
                console.log('handleDeleteBtnClick success', success)
                if (success) {
                    console.log('handleDeleteBtnClick success')
                }
            })
    }

    const handleMemoUpdate = memo => {
        console.log('handleMemoUpdate', memo)
        setMemoList(memoList.map(item => item.id === memo.id ? memo : item))
    }

    return (
        <div>
            <textarea placeholder="开始记录你的想法..." value={newMemo} onChange={handleNewMemoTextareaChange}/>
            <button onClick={handleSaveBtnClick}>保存</button>
            <details>
                <summary>从 flomo 导入</summary>
                <p>请选择从 flomo 导出的 HTML 文件，可以一次性选择多个</p>
                <input
                    type="file"
                    name="uploadFileList"
                    accept="text/html"
                    multiple="multiple"
                    ref={fileUploadInputRef}
                    onChange={handleFileInputChange}
                />
                <button onClick={handleImportBtnClick}>提交</button>
            </details>
            {
                memoList.map(memo => (
                    <MemoListItem
                        memo={memo}
                        handleDeleteBtnClick={handleDeleteBtnClick}
                        fetchMemoList={fetchMemoList}
                        handleMemoUpdate={handleMemoUpdate}
                        key={memo.id}
                    />
                ))
            }
            <p>Created by <a href="https://github.com/jerryshell" target='_blank'>Jerry</a></p>
        </div>
    )
}

export default App
