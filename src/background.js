/*
* 安裝在右鍵設置快捷
* 只有選取事件才啟動
* */
chrome.runtime.onInstalled.addListener((() => {
    chrome.contextMenus.create({
        id: 'parent',
        type: 'normal',
        title: 'Juuten',
        contexts: ['selection']
    });
    chrome.contextMenus.create({
        id: 'addToJuuten',
        title: "加入  %s  至Juuten",
        contexts: ['selection'],
        parentId: 'parent',
        type: 'normal'
    });
    chrome.contextMenus.create({
        id: 'separator1',
        parentId: 'parent',
        type: 'separator'
    });
}))

/*
* 獲取選取的數據，右鍵點選後傳送至 contentScript
* */
chrome.contextMenus.onClicked.addListener((info) => {
    if (info.menuItemId !== 'addToJuuten') return

    chrome.tabs.query({currentWindow: true, active: true}, (tab) => {
        chrome.tabs.sendMessage(tab[0].id, {
            msg: info.selectionText,
            pageTitle: tab[0].title,
            favIconUrl: tab[0].favIconUrl,
            url: tab[0].url,
        })
    })
})

