/* 從 sync storage獲取 dataName數據 */
'use strict';


import {convertToRaw, EditorState} from "draft-js";

const fetchMsg = async (dataName) => {
    try {
        return new Promise((resolve) => {
            chrome.storage.sync.get(
                [dataName],
                (obj) => {
                    resolve(obj[dataName] ? JSON.parse(obj[dataName]) : [])
                }
            )
        })
    } catch (error) {
        console.error(error)
    }

}

const addNewMsg = (obj) => {
    const { pageTitle, favIconUrl, url} = obj
    const selection = document.getSelection().toString()
    const position = document.documentElement.scrollTop
    const currentDate = getCurrentDate()
    const key = `Juuten_${Date.now()}`
    console.log(selection)
    return {
        key,
        msg: JSON.stringify(convertToRaw(EditorState.createWithText(selection).getCurrentContent())),
        type: 'storage',
        url,
        favIconUrl,
        pageTitle,
        currentDate,
        position,
        comment: []
    }
}


/* 監聽從 background || popup.js 的通信 */
chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {

    if (req.type !== 'fromBackground') return
    fetchMsg('Juuten_Storage')
        .then(res => {
            console.log(res)
            let newData = [addNewMsg(req), ...res]

            console.log(newData)

            chrome.storage.sync.set({
                ['Juuten_Storage']: JSON.stringify(newData)
            })
        })
        .catch(error => {
            console.error(error)
        })
    return true
})


const getCurrentDate = () => {
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    return `${year}/${month}/${day} ${hour}:${minute}`
}


document.addEventListener("mouseup", function (event) {
    const selection = window.getSelection().toString();
    if (selection) {
        const tooltip = document.createElement("div");
        tooltip.innerText = "Click to do something";
        tooltip.style.position = 'fixed'
        tooltip.style.top = event.pageY + "px";
        tooltip.style.left = event.pageX + "px";
        document.body.appendChild(tooltip);
        document.addEventListener("click", function hideTooltip(event) {
            if (!tooltip.contains(event.target)) {
                document.removeEventListener("click", hideTooltip);
                tooltip.remove();
            }
        });
    }
});


// 監聽來自 backgroundscript.js 的消息
// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//     // 判斷消息是否為請求將選中的文字發送到 backgroundscript.js 的請求
//     if (request.action === "copyText") {
//         // 獲取選中的文字
//         const selectedText = window.getSelection().toString();
//         // 將選中的文字發送到 backgroundscript.js
//         chrome.runtime.sendMessage({ action: "copyText", text: selectedText });
//     }
// });
