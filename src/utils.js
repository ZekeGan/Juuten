import {convertFromRaw, convertToRaw, EditorState} from 'draft-js'
import {saveAs} from 'file-saver'
import {initialConfiguration} from "./assets/global";

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
                    resolve(obj[dataName]
                        ? JSON.parse(obj[dataName])
                        : defaultProp)
                })
        })
    } catch (error) {
        console.error(error)
        return defaultProp = ''
    }
}



/*
* 如果要使用 npm run dev 進行調適，需要停止的函數或變數為以下幾個
* 1. setDataToLocal()
* 2. collectionSlice.js 使用 fetchData 的變數
* 3. folderSlice.js 使用 fetchData 的變數
* 6. globalSlice 的 configuration
* 4. folderBlock.jsx 的 goIntoFolder()
* 5. webpack.config.js 的 mode
* */


export function setDataToLocal(name, data = []) {
    // chrome.storage.sync.set({
    //     [name]: JSON.stringify(data)
    // })
}

export function deepCopy(obj) {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }
    const newObj = Array.isArray(obj) ? [] : {};
    Object.keys(obj).forEach(key => {
        newObj[key] = deepCopy(obj[key]);
    });
    return newObj;
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

export const isEqual = (prevProps, nextProps) => {
    console.log('prev ', prevProps)
    console.log('next ', nextProps)
    return prevProps === nextProps
}

export function downloadDocx(str, fileName) {
    // 将字符串转换为二进制数据
    const content = str;
    const data = new Blob([content], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });

    // 使用 FileSaver.js 库保存二进制数据
    saveAs(data, `${fileName}.docx`);
}


export function findData(_data, _key, fn) {
    _data.map((item) => {
        if (item.key === _key) {
            fn()
            return
        }
        item.comment.map(comment => {
            if (comment.key === _key) {
                fn()
                return
            }
        })
    })

    function findData(_data, _key) {
        if (!_data) return
        _data.map((item) => {
            if (item.key === _key) {
                item.msg = action.payload.msg
            }
            const note = {...item}
            return findData(note.comment, key)
        })
    }


    function getData(_data, _key) {
        if (_data === undefined) return
        _data.map((item, idx) => {
            if (item.key === _key) {
                _data.splice(idx, 1)
                return
            }
            return getData(item.comment, _key)
        })
    }
}





