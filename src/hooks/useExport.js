import React, {useState} from 'react';
import {convertFromRaw, EditorState} from "draft-js";

const useExport = (data) => {
    const [oldData, setOldData] = useState(() =>{
        if (!Array.isArray(data)) return [data]
        else return data
    })
    const [output, setOutput] = useState('')
    const [comment, setComment] = useState('註釋:')

    oldData.forEach(oneData => {
        oneData.forEach((item, idx) => {
            const msg = EditorState
                .createWithContent(convertFromRaw(JSON.parse(item.msg)))
                .getCurrentContent()
                .getPlainText()
            let txt = `****
創建日期: ${item.currentDate}${item.url && `
網站: ${item.url}`}
內文: ${msg}`

            item.comment.forEach((comm, idx2) => {
                const commMsg = EditorState
                    .createWithContent(convertFromRaw(JSON.parse(comm.msg)))
                    .getCurrentContent()
                    .getPlainText()
                let commTXT = `
    創建日期: ${comm.currentDate}
    內文: ${commMsg}\n`
                setComment((prev) => prev.concat(commTXT))
                if (item.comment.length !== idx2 + 1) {
                    setComment((prev) => prev.concat('         ------------------'))
                }
                setComment('')
            })

            setOutput((prev) => prev.concat(txt, comment))
            setOutput((prev) => prev.concat(txt, comment, '\n\n'))
        })
        setOutput((prev) => prev.concat('\n\n\n\n'))
    })
    return output
}


export default useExport;
