const MemoListItem = (props) => {
    return (
        <details open key={props.memo.id}>
            <summary>
                {props.memo.createdAt}
            </summary>
            <p style={{whiteSpace: 'pre-line'}}>
                {props.memo.content}
                <button
                    style={{color: '#9E3B37', float: 'right'}}
                    onClick={() => props.handleDeleteBtnClick(props.memo.id)}
                >
                    删除
                </button>
                <button
                    style={{marginLeft: '10px', float: 'right'}}
                    onClick={() => props.handleEditBtnClick(props.memo.id)}
                >
                    编辑
                </button>
            </p>
        </details>
    )
}

export default MemoListItem
