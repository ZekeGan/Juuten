/*
* 安裝在右鍵設置快捷
* 只有選取事件才啟動
* */
chrome.runtime.onInstalled.addListener((() => {
    chrome.contextMenus.create({
        id: 'addToJuuten',
        title: "加入所選文字至 Juuten",
        contexts: ['selection'],
        type: 'normal'
    });
}))

/*
* 獲取選取的數據，右鍵點選後傳送至 contentScript
* */
chrome.contextMenus.onClicked.addListener((info, tab) => {
    console.log(tab)
    if (info.menuItemId === 'addToJuuten') {
        chrome.tabs.sendMessage(
            tab.id,
            {
                type: 'fromBackground',
                msg: info.selectionText,
                pageTitle: tab.title,
                favIconUrl: tab.favIconUrl,
                url: tab.url,
            }
        )
    }
})


/*
* from chatGTP and me
* */

// 創建一個右鍵菜單，當選中文字時顯示該菜單

// chrome.runtime.onInstalled.addListener((() => {
//     chrome.contextMenus.create({
//         id: 'addToJuuten',
//         title: "加入所選文字至 Juuten",
//         contexts: ['selection'],
//         type: 'normal'
//     });
// }))

// 監聽來自 contentscript.js 的消息
// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//     // 判斷消息是否為請求將選中的文字複製到 popup.js 的請求
//     if (request.action === "copyText") {
//         // 將選中的文字發送到 popup.js
//         chrome.extension.getViews({ type: "popup" })[0].copyText(request.text);
//     }
// });
//
// // 監聽右鍵菜單的點擊事件
// chrome.contextMenus.onClicked.addListener((info, tab) => {
//     // 判斷是否點擊了 "複製選中文字" 菜單
//     if (info.menuItemId === "copyText") {
//         // 向 contentscript.js 發送請求，請求將選中的文字發送到 backgroundscript.js
//         chrome.tabs.sendMessage(tab.id, { action: "copyText" });
//     }
// });