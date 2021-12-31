import {useEffect, useState} from "react";
import pluginApi from "../api/pluginApi";

const PluginToken = (props) => {
    const [pluginToken, setPluginToken] = useState('test')

    const fetchPluginToken = () => {
        pluginApi.getToken()
            .then(res => {
                console.log('res', res)
                setPluginToken(res.data.data)
            })
    }

    useEffect(() => {
        fetchPluginToken()
    }, [])

    const handleGeneratePluginTokenBtnClick = () => {
        pluginApi.createToken()
            .then(res => {
                console.log('res', res)
                setPluginToken(res.data.data)
            })
    }

    return (
        <details>
            <summary>插件令牌</summary>
            <p>{pluginToken}</p>
            <button onClick={handleGeneratePluginTokenBtnClick}>重新生成</button>
        </details>
    )
}

export default PluginToken
