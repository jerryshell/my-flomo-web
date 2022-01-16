import {useState} from "react";

const UserUpdateEmailPlane = (props) => {
    const [email, setEmail] = useState('')
    const handleUpdateEmailBtnClick = () => {
        props.handleUpdateEmailBtnClick(email)
        setEmail('')
    }
    return (
        <details>
            <summary>更新邮箱</summary>
            <p>当前用户：{props.username}</p>
            <p>当前邮箱：{props.email}</p>
            <fieldset>
                <legend>将邮箱设置为空，即可退订每日回顾</legend>
                <input
                    type="text"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    placeholder="请输入新邮箱"
                />
            </fieldset>
            <button onClick={handleUpdateEmailBtnClick}>提交</button>
        </details>
    )
}

export default UserUpdateEmailPlane
