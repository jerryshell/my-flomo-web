import './App.css'
import {useEffect, useState} from "react";
import memoApi from "./api/memoApi";

const mockMemoList = [
    {
        id: '3',
        content: '2016年，WhatsApp 的用户超过10亿，但是只有50个工程师。每个小团队由1到3名工程师组成，拥有很大的自主权。\n-- https://www.quastor.org/p/how-whatsapp-scaled-to-1-billion',
        createTime: '2021-12-01 14:29:24',
    },
    {
        id: '2',
        content: '一个可运行的复杂系统，总是从一个简单系统演变而来的。似乎可以因此推断：从头开始设计一个复杂系统，永远不会奏效，必须从一个简单系统开始设计。\n-- https://www.ivanmontilla.com/blog/galls-law-and-how-i-ignored-it',
        createTime: '2021-10-25 17:51:25',
    },
    {
        id: '1',
        content: '切勿交浅言深',
        createTime: '2021-10-06 17:49:11',
    },
]

function App() {
    const [memoList, setMemoList] = useState([])
    const [newMemo, setNewMemo] = useState('')

    useEffect(() => {
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
        fetchMemoList()
    }, [])

    const handleNewMemoTextareaChange = (e) => {
        setNewMemo(e.target.value)
    }

    const handleSaveBtnClick = () => {
        alert('施工中🚀')
        console.log('handleSaveBtnClick', newMemo)
        setNewMemo('')
    }

    const handleImportBtnClick = () => {
        alert('施工中🚀')
        console.log('handleImportBtnClick')
    }

    const handleDeleteBtnClick = (id) => {
        alert('施工中🚀')
        console.log('handleDeleteBtnClick', id)
        setMemoList(memoList.filter(item => item.id !== id))
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
                            {memo.createTime}
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
