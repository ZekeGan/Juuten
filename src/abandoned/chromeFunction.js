const set = () => {
    chrome.storage.sync.set({
        ['Juuten']: JSON.stringify([...currentMsg, newMsgData])
    })
}

const get = () => {
    return new Promise((resolve) => {
        chrome.storage.sync.get(['Juuten_folder'], (obj) => {
            resolve(obj['Juuten_folder'] ? JSON.parse(obj['Juuten_folder']) : [])
        })
    })
}

export default {set}