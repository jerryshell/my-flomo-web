import {useState} from "react";
import userApi from "../api/userApi";

const UserUpdateEmailPlane = (props) => {
    const [email, setEmail] = useState('')
    const handleUpdateEmailBtnClick = () => {
        const postData = {
            email
        }
        userApi.updateEmail(postData)
            .then(response => {
                const message = response.data.message
                alert(message)
            })
    }
    return (
        <details>
            <summary>更新邮箱</summary>
            <input
                type="text"
                onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={handleUpdateEmailBtnClick}>提交</button>
        </details>
    )
}

export default UserUpdateEmailPlane
