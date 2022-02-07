const CsvImport = (props: {
    handleCsvFileInputChange: (files: FileList) => void;
    handleCsvImportBtnClick: () => void;
}) => {
    return (
        <details>
            <summary>CSV 导入</summary>
            <input
                type="file"
                name="file"
                accept="text/csv"
                onChange={e => {
                    const files = e.target.files
                    if (files != null && files.length > 0) {
                        props.handleCsvFileInputChange(files)
                    }
                }}
            />
            <button onClick={props.handleCsvImportBtnClick}>提交</button>
        </details>
    );
}

export default CsvImport;
