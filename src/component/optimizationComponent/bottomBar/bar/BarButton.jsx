import React from 'react';
import styled from "styled-components";
import {useSelector} from "react-redux";
import {selectGlobal} from "../../../../redux/slice/globalSlice";
import {downloadDocx, exportToTXT} from "../../../../utils";
import {getCurrentDate} from "../../../../utils";
import {renderToString} from "react-dom/server";
import ExportToHTML from "../../ExportToHTML.jsx";
import store from "../../../../redux/store";


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

const MyComponent = React.memo((
    {
        text,
        type,
        area
    }) => {
    const {configuration: config} = useSelector(selectGlobal)



    console.log('barBtn')



    function getData() {
        const {Juuten_folderLists} = store.getState().folder
        const collectionObj = store.getState().collection
        if (area !== 'folder') return {[collectionObj.folderData.name]: collectionObj[collectionObj.folderData.key]}
        const data = Juuten_folderLists
            .reduce((output, {key, name}) => {
                if (!output[name] && !!collectionObj[key]) {
                    output[name] = []
                    output[name].push(...collectionObj[key])
                }
                return output
            }, {})
        return {
            ...data,
            Storage: collectionObj.Juuten_Storage,
        }
    }

    function exportData() {
        const data = getData(area)
        if (!data) return
        let newData

        if (type === 'plain' || type === 'docx') newData = exportToTXT(data)
        if (type === 'html') newData = renderToString(<ExportToHTML data={data} config={config}/>)

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
