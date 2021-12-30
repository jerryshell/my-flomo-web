const MemoCreatePlane = (props) => {
    return (
        <>
            <textarea
                placeholder="开始记录你的想法..."
                value={props.newMemo}
                onChange={props.handleNewMemoTextareaChange}
            />
            <button onClick={props.handleSaveBtnClick}>保存</button>
        </>
    )
}

export default MemoCreatePlane
