import React, { useEffect, useState } from 'react'

import pluginApi from '../api/pluginApi'
import api from '../api/api'

const PluginToken = () => {
    const [pluginToken, setPluginToken] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const fetchPluginToken = () => {
        pluginApi.getToken()
            .then(response => {
                const success = response.data.success
                if (success) {
                    setPluginToken(response.data.data)
                } else {
                    setPluginToken('')
                    setErrorMessage(response.data.message)
                }
            })
    }

    useEffect(() => {
        fetchPluginToken()
    }, [])

    const handleGeneratePluginTokenBtnClick = () => {
        pluginApi.createToken()
            .then(response => {
                setPluginToken(response.data.data)
            })
    }

    return (
        <details>
            <summary>插件令牌</summary>
            {
                pluginToken
                    ? <p>{ api.defaults.baseURL }/plugin/createMemo/{ pluginToken }</p>
                    : <p>{ errorMessage }</p>
            }
            <button onClick={ handleGeneratePluginTokenBtnClick }>重新生成</button>
        </details>
    )
}

export default PluginToken
