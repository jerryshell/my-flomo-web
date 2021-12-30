const MemoImportPlane = (props) => {
    return (
        <details>
            <summary>从 Flomo 导入</summary>
            <p>
                请选择从 <a href="https://flomoapp.com/mine?source=account" target="_blank">Flomo</a> 导出的 HTML 文件，可以一次性选择多个
            </p>
            <input
                type="file"
                name="uploadFileList"
                accept="text/html"
                multiple="multiple"
                ref={props.fileUploadInputRef}
                onChange={props.handleFileInputChange}
            />
            <button onClick={props.handleImportBtnClick}>提交</button>
        </details>
    )
}

export default MemoImportPlane
