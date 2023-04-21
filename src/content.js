'use strict';
import {convertToRaw, EditorState} from "draft-js";
import store from "./redux/store";

/* 監聽從 background || popup.js 的通信 */
chrome.runtime.onMessage.addListener((req) => {
    if (req.type === 'fromBackground') {
        fetchMsg('Juuten_Storage')
            .then(res => {
                console.log(res)
                let newData = [addNewMsg(req), ...res]
                chrome.storage.sync.set({
                    ['Juuten_Storage']: JSON.stringify(newData)
                })
            })
            .catch(error => {
                console.error(error)
            })
    }
    return true
})

let mouseupFlag = false
document.addEventListener("mouseup", (event) => {
    if (mouseupFlag) return
    const selection = window.getSelection()
    const {isShowSelectionTool, toolbarLeft, toolbarTop} = getGlobalConfiguration()

    if (isShowSelectionTool && event.button === 0) {
        if (!selection.isCollapsed) {
            const tooltip = document.createElement("div")
            tooltip.classList.add('Juuten-tool-container')
            tooltip.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width=16 height=16 fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
                </svg>`
            tooltip.style.top = `${event.pageY + toolbarTop}px`
            tooltip.style.left = `${event.pageX + toolbarLeft}px`
            document.body.appendChild(tooltip);
            mouseupFlag = true
            document.addEventListener(
                "mouseup",
                function hideTooltip(event) {
                    mouseupFlag = false
                    if (!tooltip.contains(event.target)) {
                        tooltip.remove()
                        document.removeEventListener("mouseup", hideTooltip)
                    } else {
                        chrome.runtime.sendMessage({key: 'Juuten_toolbar'},
                            () => {
                            }
                        )
                        tooltip.remove();
                        return document.removeEventListener("mouseup", hideTooltip)
                    }
                }
            );
        }
    }
})

async function fetchMsg(dataName) {
    try {
        return new Promise((resolve) => {
            chrome.storage.sync.get(
                [dataName],
                (obj) => {
                    resolve(obj[dataName] ? JSON.parse(obj[dataName]) : [])
                }
            )
        })
    } catch (error) {
        console.error(error)
        return []
    }
}

function addNewMsg(obj) {
    const {pageTitle, favIconUrl, url} = obj
    const selection = document.getSelection().toString()
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
        comment: []
    }
}

function getCurrentDate() {
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    return `${year}/${month}/${day} ${hour}:${minute}`
}

function getGlobalConfiguration() {
    const config = store.getState().global.configuration
    return {
        isShowSelectionTool: !config.isShowSelectionTool,
        toolbarLeft: config.toolbarLeft,
        toolbarTop: config.toolbarTop
    }
}

