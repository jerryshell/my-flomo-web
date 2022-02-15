import React, {useRef, useState} from "react"

import MemoCreatePlane from "../compoments/MemoCreatePlane"
import MemoImportPlane from "../compoments/MemoImportPlane"
import CsvExport from "../compoments/CsvExport"
import CsvImport from "../compoments/CsvImport"
import DangerousArea from "../compoments/DangerousArea"
import PluginToken from "../compoments/PluginToken"
import UserUpdateEmailPlane from "../compoments/UserUpdateEmailPlane"
import MemoList from "../compoments/MemoList"

import Memo from "../interfaces/Memo"

import memoApi from "../api/memoApi"
import uploadApi from "../api/uploadApi"
import csvApi from "../api/csvApi"
import userApi from "../api/userApi"
import deleteMyAccountApi from "../api/deleteMyAccountApi"
import api from "../api/api"

const HomePage = (props: {
    memoList: Memo[]
    username: string
    email: string
    token: string
    setMemoList(memoList: Memo[]): void
    setUsername(username: string): void
    setEmail(email: string): void
    setToken(token: string): void
    fetchMemoList(): void
}) => {
    const [newMemo, setNewMemo] = useState('')
    const [uploadFileList, setUploadFileList] = useState<FileList | null>(null)
    const fileUploadInputRef = useRef<HTMLInputElement>(null)
    const [csvFile, setCsvFile] = useState<File | null>(null)

    const handleNewMemoTextareaChange = (content: string) => {
        setNewMemo(content)
    }

    const handleSaveBtnClick = () => {
        const postData = {
            content: newMemo,
        }
        setNewMemo('')
        memoApi.create(postData)
            .then(response => {
                const success = response.data.success
                if (success) {
                    props.fetchMemoList()
                }
            })
    }

    const handleFileInputChange = (fileList: FileList | null) => {
        setUploadFileList(fileList)
    }

    const handleCsvFileInputChange = (fileList: FileList | null) => {
        if (fileList && fileList.length > 0) {
            setCsvFile(fileList[0])
        } else {
            setCsvFile(null)
        }
    }

    const handleImportDataBtnClick = () => {
        if (uploadFileList === null) {
            return
        }
        const formData = new FormData()
        for (let i = 0; i < uploadFileList.length; i++) {
            formData.append('uploadFileList[]', uploadFileList[i])
        }
        setUploadFileList(null)
        fileUploadInputRef.current?.setAttribute('value', '')
        uploadApi.upload(formData)
            .then(() => {
                props.fetchMemoList()
            })
    }

    const handleCsvImportBtnClick = () => {
        if (csvFile === null) {
            return
        }
        const formData = new FormData()
        formData.append('csvFile', csvFile)
        setCsvFile(null)
        csvApi.csvImport(formData)
            .then(response => {
                const success = response.data.success
                if (success) {
                    props.fetchMemoList()
                } else {
                    alert(response.data.message)
                }
            })
            .catch(e => {
                console.log(e)
            })
    }

    const handleMemoDeleteBtnClick = (id: string) => {
        props.setMemoList(props.memoList.filter(item => item.id !== id))
        memoApi.deleteById(id)
            .then(() => {
            })
    }

    const handleMemoUpdate = (memo: Memo) => {
        props.setMemoList(props.memoList.map(item => item.id === memo.id ? memo : item))
    }

    const handleLogoutBtnClick = () => {
        props.setUsername('')
        props.setEmail('')
        props.setToken('')
        localStorage.removeItem('username')
        localStorage.removeItem('email')
        localStorage.removeItem('token')
        localStorage.removeItem('expiresAt')
    }

    const handleUpdateEmailBtnClick = (newEmail: string) => {
        const postData = {
            email: newEmail
        }
        console.log('updateEmail postData', postData)
        userApi.updateEmail(postData)
            .then(response => {
                console.log('updateEmail response', response)
                const message = response.data.message
                alert(message)
                const success = response.data.success
                if (success) {
                    props.setEmail(newEmail)
                    localStorage.setItem('email', newEmail)
                }
            })
    }

    const deleteMyAccount = () => {
        deleteMyAccountApi.deleteMyAccount()
            .then(response => {
                const success = response.data.success
                if (success) {
                    alert(response.data.message)
                    handleLogoutBtnClick()
                }
            })
    }

    const handleCsvExportBtnClick = () => {
        const token = localStorage.getItem('token')
        window.open(`${api.defaults.baseURL}/csvExport/token/${token}`)
    }

    return (
        <>
            <MemoCreatePlane
                newMemo={newMemo}
                handleNewMemoTextareaChange={handleNewMemoTextareaChange}
                handleSaveBtnClick={handleSaveBtnClick}
            />

            <button onClick={handleLogoutBtnClick} style={{color: '#9E3B37'}}>登出</button>

            <MemoImportPlane
                handleFileInputChange={handleFileInputChange}
                handleImportDataBtnClick={handleImportDataBtnClick}
                fileUploadInputRef={fileUploadInputRef}
            />

            <CsvExport handleCsvExportBtnClick={handleCsvExportBtnClick}/>

            <CsvImport
                handleCsvFileInputChange={handleCsvFileInputChange}
                handleCsvImportBtnClick={handleCsvImportBtnClick}
            />

            <DangerousArea deleteMyAccount={deleteMyAccount}/>

            <PluginToken/>

            <UserUpdateEmailPlane
                username={props.username}
                email={props.email}
                handleUpdateEmailBtnClick={handleUpdateEmailBtnClick}
            />

            <MemoList
                memoList={props.memoList}
                handleMemoDeleteBtnClick={handleMemoDeleteBtnClick}
                handleMemoUpdate={handleMemoUpdate}
            />
        </>
    )
}

export default HomePage
