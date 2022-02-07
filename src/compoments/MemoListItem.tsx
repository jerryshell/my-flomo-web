import React, {useState} from "react"

import memoApi from "../api/memoApi"

import Memo from "../interfaces/Memo"

const MemoListItem = (props: {
    memo: Memo,
    handleMemoUpdate: (memo: Memo) => void,
    handleMemoDeleteBtnClick: (memoId: string) => void,
}) => {
    const [editModeFlag, setEditModeFlag] = useState(false)
    const [memo, setMemo] = useState({...props.memo})

    const handleTextareaChange = (e: { target: { value: string } }) => {
        const content = e.target.value
        const newMemo = {...memo, content}
        setMemo(newMemo)
    }

    const handleUpdateBtnClick = () => {
        setEditModeFlag(false)
        memoApi.update(memo)
            .then(response => {
                const success = response.data.success
                if (success) {
                    const memo = response.data.data
                    props.handleMemoUpdate(memo)
                }
            })
    }

    const handleCancelBtnClick = () => {
        setEditModeFlag(false)
        setMemo({...props.memo})
    }

    return (
        <details open key={memo.id}>
            <summary>
                {memo.createdAt}
            </summary>
            <p style={{whiteSpace: 'pre-line'}}>
                {
                    editModeFlag
                        ? <textarea
                            value={memo.content}
                            onChange={handleTextareaChange}
                        />
                        : memo.content
                }
            </p>
            <p>
                {
                    editModeFlag
                        ? <>
                            <button
                                style={{float: 'right'}}
                                onClick={handleUpdateBtnClick}
                            >
                                更新
                            </button>
                            <button
                                style={{float: 'right'}}
                                onClick={handleCancelBtnClick}
                            >
                                取消
                            </button>
                        </>
                        : <button
                            style={{float: 'right'}}
                            onClick={() => setEditModeFlag(true)}
                        >
                            编辑
                        </button>
                }

                <button
                    style={{color: '#9E3B37', float: 'right'}}
                    onClick={() => props.handleMemoDeleteBtnClick(memo.id)}
                >
                    删除
                </button>
            </p>
        </details>
    )
}

export default MemoListItem
