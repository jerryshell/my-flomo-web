const CsvExport = (props: { handleCsvExportBtnClick: () => void }) => {
    return (
        <details>
            <summary>CSV 导出</summary>
            <button onClick={props.handleCsvExportBtnClick}>CSV 导出</button>
        </details>
    );
}

export default CsvExport;
