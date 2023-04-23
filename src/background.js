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
    (msg) => {
        if (msg.key === 'Juuten_toolbar') {
            getCurrentTab()
                .then((tab) => {
                    getTabAndSend(tab)
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