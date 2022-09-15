export const getActiveTabURL = async () => {
    const tab = await chrome.tabs.query({
        currentWindow: true,
        active: true
    })
    return tab[0]
}