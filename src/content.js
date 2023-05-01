import { convertToRaw, EditorState } from "draft-js";
import { getCurrentDate } from "./utils";
import { initialConfiguration } from "./assets/global";

/* 監聽從 background || popup.js 的通信 */
chrome.runtime.onMessage.addListener((req) => {
    if (req.type === 'fromBackground') {
        fetchMsg('Juuten_Storage', [])
            .then((res) => {
                chrome.storage.local.set({
                    ['Juuten_Storage']: JSON.stringify([addNewMsg(req), ...res])
                })
            })
            .catch((error) => {
                console.error(error)
            })
    }
    return true
})

let selectionText = ''
fetchMsg('Juuten_Configuration', initialConfiguration)
    .then(res => {
        if (!!document.querySelector('#Juuten_root')) return
        document.addEventListener("mouseup", (event) => {
            const { isShowSelectionTool, toolbarY, toolbarX } = res
            if (!isShowSelectionTool && event.button === 0) {
                const selection = window.getSelection()
                if (!selection.isCollapsed && selection.toString() !== selectionText) {
                    selectionText = selection.toString()
                    const tooltip = document.createElement("div")
                    tooltip.classList.add('Juuten-tool-container')
                    tooltip.innerHTML = `<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35.72 47.13"><defs><style>.cls-1{fill:#fff;}</style></defs><path class="cls-1" d="M294.76,426.19H283.4v27.36H267.45v10a9.8,9.8,0,0,0,9.79,9.79h17.51a8.44,8.44,0,0,0,8.42-8.43V434.6A8.42,8.42,0,0,0,294.76,426.19ZM283.4,469.5h-6.16a6,6,0,0,1-6-6v-6.16H283.4Zm16-4.61a4.61,4.61,0,0,1-4.6,4.61h-7.53V430h7.54a4.6,4.6,0,0,1,4.59,4.59Z" transform="translate(-267.45 -426.19)"/></svg>`
                    tooltip.style.position = 'absolute'
                    tooltip.style.top = `${(event.pageY - 15) - toolbarY}px`
                    tooltip.style.left = `${(event.pageX - 15) + toolbarX}px`
                    document.body.appendChild(tooltip)
                    document.addEventListener("mouseup", function hideTooltip(event) {
                        if (tooltip.contains(event.target)) {
                            chrome.runtime.sendMessage({
                                key: 'Juuten_toolbar',
                                msg: selectionText
                            })
                        }
                        tooltip.remove()
                        document.removeEventListener("mouseup", hideTooltip)
                        selectionText = ''
                    }, false)
                }
            }
        }, false)
    })


async function fetchMsg(dataName, initailData) {
    try {
        return new Promise((resolve) => {
            chrome.storage.local.get(
                [dataName],
                (obj) => resolve(obj[dataName] ? JSON.parse(obj[dataName]) : initailData)
            )
        })
    } catch (error) {
        console.error(error)
        throw []
    }
}

function addNewMsg(obj) {
    const { pageTitle, favIconUrl, url, msg } = obj
    let selection
    if (!msg) selection = document.getSelection().toString()
    else selection = msg
    const position = document.documentElement.scrollTop
    const currentDate = getCurrentDate()
    const key = `Juuten_${Date.now()}`
    return {
        key,
        msg: JSON.stringify(convertToRaw(EditorState.createWithText(selection).getCurrentContent())),
        type: 'storage',
        url,
        favIconUrl,
        pageTitle,
        currentDate,
        position,
        comment: [],
        isOpenComment: false,
    }
}
