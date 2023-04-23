import {convertFromRaw, EditorState} from 'draft-js'
import {saveAs} from 'file-saver'

/*
* 如果要使用 npm run dev 進行調適，需要停止的函數或變數為以下幾個
* 1. setDataToLocal()
* 2. collectionSlice.js 使用 fetchData 的變數
* 3. folderSlice.js 使用 fetchData 的變數
* 6. globalSlice 的 configuration
* 4. folderBlock.jsx 的 goIntoFolder()
* 5. webpack.config.js 的 mode
* 6. webpack.config.js 的 optimization 取消
* */

export function getCurrentDate() {
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    return `${year}/${month}/${day} ${hour}:${minute < 10 ? `0${minute}` : minute}`
}

export async function fetchData(dataName, defaultProp = '') {
    try {
        return new Promise((resolve) => {
            chrome.storage.sync.get(
                [dataName],
                (obj) => {
                    resolve(obj[dataName] ? JSON.parse(obj[dataName]) : defaultProp)
                })
        })
    } catch (error) {
        console.error(error)
        throw defaultProp
    }
}

export const changeFontColor = (colorValue) => {
    let cut = colorValue.replace('#', '')
    return 0.213 * parseInt(cut[0] + cut[1], 16)
        + 0.715 * parseInt(cut[2] + cut[3], 16)
        + 0.072 * parseInt(cut[4] + cut[5], 16)
        > 255 / 2;
}

export function setDataToLocal(name, data = []) {
    console.log(JSON.stringify(data))
    chrome.storage.sync.set({
        [name]: JSON.stringify(data)
    })
}

export function exportToTXT(data) {
    let newOutput = ''
    Object.keys(data).forEach((folder) => {
        newOutput = newOutput.concat(`**********${folder}**********\n`)
        data[folder].forEach((item, idx) => {
            let comment = `
註釋:`
            const msg = EditorState
                .createWithContent(convertFromRaw(JSON.parse(item.msg)))
                .getCurrentContent()
                .getPlainText()
            let txt = `創建日期: ${item.currentDate}${item.url ? `
網站: ${item.url}` : ''}
內文: ${msg}`
            item.comment.forEach((comm, idx2) => {
                const commMsg = EditorState
                    .createWithContent(convertFromRaw(JSON.parse(comm.msg)))
                    .getCurrentContent()
                    .getPlainText()
                let commTXT = `
    創建日期: ${comm.currentDate}
    內文: ${commMsg}\n`
                comment = comment.concat(commTXT)
                if (item.comment.length !== idx2 + 1) comment = comment.concat('         ------------------')
            })
            newOutput = newOutput.concat(txt, comment, '\n\n')
        })
        newOutput = newOutput.concat('\n\n\n\n')
    })
    return newOutput
}

export function downloadDocx(str, fileName) {
    const data = new Blob([str], {
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    });
    saveAs(data, `${fileName}.docx`);
}




