/* 從 sync storage獲取 dataName數據 */
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
    const {msg, pageTitle, favIconUrl, url} = obj
    const position = document.documentElement.scrollTop
    const currentDate = getCurrentDate()
    const key = Date.now()
    return {
        key,
        msg,
        type: 'collection',
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
    let oldData
    fetchMsg('Juuten_Storage')
        .then(res => {
            let newData = addNewMsg(req)
            oldData = res
            oldData.unshift(newData)

            chrome.storage.sync.set({
                ['Juuten_Storage']: JSON.stringify(oldData)
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
