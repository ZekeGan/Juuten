import React, {useMemo} from 'react';
import styled from "styled-components";
import {useSelector} from "react-redux";
import {selectGlobal} from "../../../../redux/slice/globalSlice";
import {downloadDocx, exportToTXT} from "../../../../utils";
import {selectCollection} from "../../../../redux/slice/collectionSlice";
import {getCurrentDate} from "../../../../utils";
import {renderToString} from "react-dom/server";
import ExportToHTML from "../../ExportToHTML.jsx";


const Btn = styled.div`
    width: 20%;
    height: 60%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    color: ${({config}) => config.main};
    border: 1px solid ${({config}) => config.main};
    border-radius: 5px;
    transition: 0.1s ease-in;
    &:hover {
        background-color: ${({config}) => config.main};
        color: ${({config}) => config.WandB};
    }
`

const MyComponent = React.memo(({text, data, type}) => {
    const {configuration: config} = useSelector(selectGlobal)

    console.log('barBtn')

    function exportData() {
        let getData
        if (type === 'plain' || type === 'docx') getData = exportToTXT(data)
        if (type ==='html') getData = renderToString(<ExportToHTML data={data} config={config}/>)

        if (type === 'docx') {
            downloadDocx(getData, `Juuten_Note_${getCurrentDate()}`)
        }
        else {
            const filename = `Juuten_Note_${getCurrentDate()}`
            const link = document.createElement("a");
            link.href = window.URL.createObjectURL(new Blob([getData], { type: `text/${type}` }));
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(link.href);
        }

    }


    return (
        <Btn config={config} onClick={exportData}>
            {text}
        </Btn>
    );
})

export default MyComponent;
