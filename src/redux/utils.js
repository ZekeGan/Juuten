export const getCurrentDate = () => {
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    return `${year}/${month}/${day} ${hour}:${minute < 10 ? `0${minute}` : minute}`
}

export const fetchData = async (dataName) => {
    // return new Promise((resolve) => {
    //     chrome.storage.sync.get([dataName], (obj) => {
    //         resolve(obj[dataName] ? JSON.parse(obj[dataName]) : [])
    //     })
    // })
}

export const setDataToLocal = (name, data = []) => {
    // const current = [...data]
    // chrome.storage.sync.set({
    //     [name]: JSON.stringify(current)
    // })
}










