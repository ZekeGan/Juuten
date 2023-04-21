/*
* 安裝在右鍵設置快捷
* 只有選取事件才啟動
* */
chrome.runtime.onInstalled.addListener((
    () => {
        chrome.contextMenus.create({
            id: 'addToJuuten',
            title: "加入選擇文字至 Juuten",
            contexts: ['selection'],
            type: 'normal'
        });
    }
))

chrome.contextMenus.onClicked.addListener(
    (info, tab) => {
        if (info.menuItemId === 'addToJuuten') {
            getTabAndSend(tab)
        }
    }
)

chrome.runtime.onMessage.addListener(
    (req) => {
        if (req.key === 'Juuten_toolbar') {
            getCurrentTab()
                .then((res) => {
                    getTabAndSend(res)
                })
        }
    }
)

function getTabAndSend(tab) {
    chrome.tabs.sendMessage(
        tab.id,
        {
            type: 'fromBackground',
            pageTitle: tab.title,
            favIconUrl: tab.favIconUrl,
            url: tab.url,
        }
    )
}

async function getCurrentTab() {
    let queryOptions = {active: true, lastFocusedWindow: true};
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}