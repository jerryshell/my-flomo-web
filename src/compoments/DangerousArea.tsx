import React from "react"

const DangerousArea = (props: {
    deleteMyAccount: () => void;
}) => {
    return (
        <details>
            <summary>️⚠️ 危险区 ⚠️</summary>
            <button onClick={props.deleteMyAccount}>⚠️ 账号注销，永久抹除数据，无法恢复，点击立刻生效 ⚠️</button>
        </details>
    );
}

export default DangerousArea;
