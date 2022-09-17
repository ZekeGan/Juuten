console.log('content script 正常運作')
let currentURL, currentMsg, position, currentDate, folderLists;


/* 從 sync storage獲取 dataName數據 */
const fetchMsg = async (dataName) => {
    console.log('fetch 運作中')
    return new Promise((resolve) => {
        chrome.storage.sync.get([dataName], (obj) => {
            resolve(obj[dataName] ? JSON.parse(obj[dataName]) : [])
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

}

const renewDataToStorage = (dataName) => {

}


/* 監聽從 background || popup.js 的通信 */
chrome.runtime.onMessage.addListener((req, sender, res) => {
    console.log('inside send new message')
    console.log(req)
    void addNewMsg(req)

    /* 獲取儲存在storage 的folderLists */
    if (req.type === 'folderLists') {
        folderLists = fetchMsg('Juuten_folderLists')
        res(folderLists)

        /* 儲存新的資料夾進storage */
    } else if (req.type === 'addNewFolderToFolderLists') {
        chrome.storage.sync.set({
            ['Juuten_folderLists']: JSON.stringify([...folderLists, req.payload])
        })
    }
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

