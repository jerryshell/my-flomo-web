import './App.css'
import {useEffect, useState} from "react";
import memoApi from "./api/memoApi";

function App() {
    const [memoList, setMemoList] = useState([])
    const [newMemo, setNewMemo] = useState('')

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

    const handleImportBtnClick = () => {
        alert('施工中🚀')
        console.log('handleImportBtnClick')
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

    const handleEditBtnClick = (id) => {
        alert('施工中🚀')
        console.log('handleEditBtnClick', id)
    }

    return (
        <div>
            <textarea placeholder="开始记录你的想法..." value={newMemo} onChange={handleNewMemoTextareaChange}/>
            <button onClick={handleImportBtnClick}>从 flomo 导入</button>
            <button onClick={handleSaveBtnClick}>保存</button>
            {
                memoList.map(memo => (
                    <details open key={memo.id}>
                        <summary>
                            {memo.createdAt}
                        </summary>
                        <p style={{whiteSpace: 'pre-line'}}>
                            {memo.content}
                            <button
                                style={{color: '#9E3B37', float: 'right'}}
                                onClick={() => handleDeleteBtnClick(memo.id)}
                            >
                                删除
                            </button>
                            <button
                                style={{marginLeft: '10px', float: 'right'}}
                                onClick={() => handleEditBtnClick(memo.id)}
                            >
                                编辑
                            </button>
                        </p>
                    </details>
                ))
            }
            <p>Created by <a href="https://github.com/jerryshell" target='_blank'>Jerry</a></p>
        </div>
    )
}

export default App
