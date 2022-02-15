import React, {useState} from "react"

import authApi from "../api/authApi";

import LoginResponse from "../interfaces/LoginResponse";

const LoginPage = (props: {
    handleLoginSuccess: (loginResponse: LoginResponse) => void,
}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLoginClick = () => {
        if (username.length <= 0 || password.length <= 0) {
            alert('用户名和密码不能为空');
            return;
        }
        const postData = {
            username,
            password,
        }
        authApi.login(postData)
            .then(response => {
                console.log('login response', response)
                const success = response.data.success
                if (!success) {
                    alert(response.data.message)
                    return
                }
                const data = response.data.data
                props.handleLoginSuccess(data)
            })
    }

    return (
        <fieldset>
            <legend>不存在的账号将自动注册</legend>
            <input
                type="text"
                placeholder="账号"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="密码"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLoginClick}>登录</button>
        </fieldset>
    )
}

export default LoginPage
