import Memo from "../interfaces/Memo"

import MemoListItem from "./MemoListItem"

const MemoList = (props: {
    memoList: Memo[],
    handleMemoUpdate: (memo: Memo) => void,
    handleMemoDeleteBtnClick: (memoId: string) => void,
}) => {
    return (
        <>
            {
                props.memoList.map(memo => (
                    <MemoListItem
                        memo={memo}
                        handleMemoUpdate={props.handleMemoUpdate}
                        handleMemoDeleteBtnClick={props.handleMemoDeleteBtnClick}
                        key={memo.id}
                    />
                ))
            }
        </>
    )
}

export default MemoList
