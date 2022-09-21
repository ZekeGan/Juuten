let currentMsg, position, currentDate, folderLists;


/* 從 sync storage獲取 dataName數據 */
const fetchMsg = async (dataName) => {
    console.log('fetch 運作中')
    return new Promise((resolve) => {
        chrome.storage.sync.get([dataName], (obj) => {
            resolve(obj[dataName] ? JSON.parse(obj[dataName]) : ['新的東東'])
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


/* 監聽從 background || popup.js 的通信 */
chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
    console.log('type值為: ' + req.type)
    // void addNewMsg(req)

    /* 獲取儲存在storage 的folderLists */
    if (req.type === 'getFolderLists') {
        console.log('在content獲取中')
        fetchMsg('Juuten_folderLists').then((res) => {
            sendResponse({response: res})
        })
    } else if (req.type === 'addNewFolderToFolderLists') {
        /* 儲存新的資料夾進storage */
        chrome.storage.sync.set({
            ['Juuten_folderLists']: JSON.stringify([...folderLists, req.payload])
        })
    }
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

const getMax = (data) => {
    return Math.max(...data)
}

