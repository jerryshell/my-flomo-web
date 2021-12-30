import MemoListItem from "./MemoListItem"

const MemoList = (props) => {
    return (
        <>
            {
                props.memoList.map(memo => (
                    <MemoListItem
                        memo={memo}
                        handleDeleteBtnClick={props.handleDeleteBtnClick}
                        fetchMemoList={props.fetchMemoList}
                        handleMemoUpdate={props.handleMemoUpdate}
                        key={memo.id}
                    />
                ))
            }
        </>
    )
}

export default MemoList
