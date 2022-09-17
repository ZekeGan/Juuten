export const getActiveTabURL = async () => {
    const tabs = await chrome.tabs.query({
        currentWindow: true,
        active: true
    });
    return tabs[0];
}

export const sendMessageToContentScript = async (data) => {
    const {type, value} = data
    // let activeTab = await getActiveTabURL()
    // chrome.tabs.sendMessage(activeTab.id, {
    //     type: "PLAY",
    //     value: bookmarkTime,
    // });
    // return tab[0]
    console.log(type)
    console.log(value)
}