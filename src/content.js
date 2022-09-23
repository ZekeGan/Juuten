/* 從 sync storage獲取 dataName數據 */
const fetchMsg = async (dataName) => {
    return new Promise((resolve) => {
        chrome.storage.sync.get([dataName], (obj) => {
            resolve(obj[dataName] ? JSON.parse(obj[dataName]) : [])
        })
    })
}

const addNewMsg = async (obj) => {
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
    let oldData = fetchMsg('Juuten_Storage')
    const newData = addNewMsg(req)
    console.log(newData)

    chrome.storage.sync.set({
        ['Juuten_Storage']: JSON.stringify([newData, ...oldData])
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

