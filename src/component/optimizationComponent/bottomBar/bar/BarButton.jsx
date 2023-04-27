import React from 'react';
import styled from "styled-components";
import {useSelector} from "react-redux";
import {selectGlobal} from "../../../../redux/slice/globalSlice";
import {downloadDocx, exportToTXT} from "../../../../utils";
import {getCurrentDate} from "../../../../utils";
import {renderToString} from "react-dom/server";
import ExportToHTML from "../../ExportToHTML.jsx";
import store from "../../../../redux/store";
import useGetData from "../../../../hooks/useGetData";


const Btn = styled.div`
    width: 20%;
    height: 60%;
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
    cursor: pointer;
    font-size: ${({config}) => config.font_size_m}px;
    color: ${({config}) => config.main};
    border: 1px solid ${({config}) => config.main};
    border-radius: 5px;
    transition: 0.1s ease-in;
    &:hover {
        background-color: ${({config}) => config.main};
        color: ${({config}) => config.WandB};
    }
`

const MyComponent = React.memo((
    {
        text,
        type,
        area,
        open = false
    }) => {
    const {configuration: config} = useSelector(selectGlobal)
    const allData = useGetData(open, true)

    console.log('barBtn')

    function getData() {
        const {folderData} = store.getState().collection
        if (area !== 'folder') {
            return {
                [folderData.name]: allData.filter(item => item.folderName === folderData.name)
            }
        } else {
            return allData.reduce((output, {folderName, ...res}) => {
                if (!(folderName in output)) output[folderName] = []
                output[folderName].push(res)
                return output
            }, {})
        }
    }

    function exportData() {
        const data = getData()
        if (!Object.keys(data).length) return

        let newData
        switch (type) {
            case 'plain':
            case 'docx':
                newData = exportToTXT(data)
                break
            case 'html':
                newData = renderToString(<ExportToHTML data={data} config={config}/>)
                break
            default:
                throw new Error(`Unsupported export type: ${type}`)
        }

        if (type === 'docx') {
            downloadDocx(newData, `Juuten_Note_${getCurrentDate()}`)
        } else {
            const filename = `Juuten_Note_${getCurrentDate()}`
            const link = document.createElement("a");
            link.href = window.URL.createObjectURL(new Blob([newData], {type: `text/${type}`}));
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(link.href);
        }
    }



    return (
        <Btn
            config={config}
            onClick={exportData}
        >
            {text}
        </Btn>
    );
})

export default MyComponent;
