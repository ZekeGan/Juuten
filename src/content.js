console.log('content script 正常運作')
let currentURL, currentMsg, position, currentDate;


/* 從 sync storage 獲取 Juuten 數據 */
const fetchMsg = async () => {
    console.log('fetch 運作中')
    return new Promise((resolve) => {
        chrome.storage.sync.get(['Juuten'], (obj) => {
            resolve(obj['Juuten'] ? JSON.parse(obj['Juuten']) : [])
        })
    })
}

/*
* function => void
* 先同步資料加入新資料後再次儲存
* */
const addNewMsg = async (obj) => {
    position = document.documentElement.scrollTop
    currentDate = getCurrentDate()
    const {msg, pageTitle, favIconUrl, url} = obj
    console.log('inside addNewMsg')
    currentMsg = await fetchMsg()
    const newMsgData = {
        url,
        currentDate,
        pageTitle,
        favIconUrl,
        position,
        msg,
    }
    chrome.storage.sync.set({
        ['Juuten']: JSON.stringify([...currentMsg, newMsgData])
    })
}


/* 監聽從 background 的通信 */
chrome.runtime.onMessage.addListener((req, sender) => {
    console.log('inside send new message')
    console.log(req)
    void addNewMsg(req)
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

const getMax = (data) => {
    return Math.max(...data)
}

