console.log('content script 正常運作')
let currentURL, currentMsg, position;


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
    const {msg, pageTitle, favIconUrl, url} = obj
    console.log('inside addNewMsg')
    currentMsg = await fetchMsg()
    const newMsgData = {
        url,
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