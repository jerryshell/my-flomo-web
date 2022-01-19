import {MouseEventHandler} from "react"

const MemoCreatePlane = (props: {
    newMemo: string,
    handleNewMemoTextareaChange: (content: string) => void,
    handleSaveBtnClick: MouseEventHandler<HTMLButtonElement>,
}) => {
    return (
        <>
            <textarea
                placeholder="开始记录你的想法..."
                value={props.newMemo}
                onChange={(e) => props.handleNewMemoTextareaChange(e.target.value)}
            />
            <button onClick={props.handleSaveBtnClick}>保存</button>
        </>
    )
}

export default MemoCreatePlane
