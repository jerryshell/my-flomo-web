import React, {useState} from 'react'
import {useRecoilState, useRecoilValue} from 'recoil'
import {atoms} from '../atoms/atoms'
import userApi from '../api/userApi'

const UserEmailUpdate = () => {
    const [email, setEmail] = useRecoilState(atoms.email)
    const username = useRecoilValue(atoms.username)

    const [newEmail, setNewEmail] = useState('')

    const handleUpdateEmailBtnClick = () => {
        userApi.updateEmail({
            email: newEmail
        })
            .then(response => {
                console.log('updateEmail response', response)
                const message = response.data.message
                alert(message)
                const success = response.data.success
                if (success) {
                    setEmail(newEmail)
                    localStorage.setItem('email', newEmail)
                }
            })
            .finally(() => {
                setNewEmail('')
            })
    }

    return (
        <details>
            <summary>更新邮箱</summary>
            <p>当前用户：{username}</p>
            <p>当前邮箱：{email}</p>
            <fieldset>
                <legend>将邮箱设置为空，即可退订每日回顾</legend>
                <input
                    type='text'
                    onChange={(e) => setNewEmail(e.target.value)}
                    value={newEmail}
                    placeholder='请输入新邮箱'
                />
            </fieldset>
            <button onClick={handleUpdateEmailBtnClick}>提交</button>
        </details>
    )
}

export default UserEmailUpdate
