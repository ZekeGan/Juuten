export function getCurrentDate() {
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    return `${year}/${month}/${day} ${hour}:${minute < 10 ? `0${minute}` : minute}`
}

export async function fetchData(dataName) {
    try {
        return new Promise((resolve) => {
            chrome.storage.sync.get(
                [dataName],
                (obj) => {
                    resolve(
                        obj[dataName]
                            ? JSON.parse(obj[dataName])
                            : []
                    )
                })
        })
    } catch (error) {
        console.error(error)
    }
}

/*
* 如果要使用 npm run dev 進行調適，需要停止的函數或變數為以下幾個
* 1. setDataToLocal()
* 2. collectionSlice.js 使用 fetchData 的變數
* 3. folderSlice.js 使用 fetchData 的變數
* 4. folder.jsx 的 goIntoFolder()
* 5. webpack.config.js 的 mode
* */


export function setDataToLocal(name, data = []) {
    // const current = [...data]
    // chrome.storage.sync.set({
    //     [name]: JSON.stringify(current)
    // })
}
export function deepCopy(obj) {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }

    const newObj = Array.isArray(obj) ? [] : {};

    Object.keys(obj).forEach(key => {
        newObj[key] = deepCopy(obj[key]);
    });

    return newObj;
}








