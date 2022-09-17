import {createSlice} from "@reduxjs/toolkit";


export const CollectionSlice = createSlice({
    name: 'collection',
    initialState: {
        openStorage: false,
        openBar: false,
        openEditToolbar: false,
        openEditId: '',
        test: '',



        folder: '',
        simFolderName: ['N1', 'N2', 'N3'],
        storage: [{
            url: 'http://google.com',
            favIconUrl: 'https://developer.mozilla.org/favicon-48x48.cbbd161b.png',
            msg: '索尼互動娛樂（SIE）旗下聖塔摩尼卡工作室製作，預定 11 ',
        }, {
            url: 'http://google.com',
            favIconUrl: 'https://developer.mozilla.org/favicon-48x48.cbbd161b.png',
            msg: '還是要改寫既定的未來，開闢自己的道路',
        }, {
            url: 'http://google.com',
            favIconUrl: 'https://developer.mozilla.org/favicon-48x48.cbbd161b.png',
            msg: '更飾有熊與狼的圖騰',
        },],


        N1: [{

            url: 'http://google.com',
            favIconUrl: 'https://developer.mozilla.org/favicon-48x48.cbbd161b.png',
            msg: 'The Object.entries() method returns an array of a given object\'s own enumerable string-keyed property [key, value]',
            currentDate: '2022/07/03 12:30',
            key: 1,
        }, {
            url: 'http://google.com',
            favIconUrl: 'https://developer.mozilla.org/favicon-48x48.cbbd161b.png',
            msg: '　SEGA 旗下人中之龍工作室（龍が如くスタジオ / RGG Studio）今日於 2022 東京電玩展前夕舉辦的「人中之龍工作室新作發表會」中，正式發表兩部《人中之龍》系列新作《人中之龍 8》及《人中之龍 7 外傳 英雄無名》，同時公布今早發表的《人中之龍 維新！極》的上市日期。',
            currentDate: '2022/07/03 12:30',
            key: 2,
        }, {
            url: 'http://google.com',
            favIconUrl: 'https://developer.mozilla.org/favicon-48x48.cbbd161b.png',
            msg: 'punk',
            currentDate: '2022/07/03 12:30',
            key: 3,
        },{
            url: 'http://google.com',
            favIconUrl: 'https://developer.mozilla.org/favicon-48x48.cbbd161b.png',
            msg: '索尼互動娛樂（SIE）旗下聖塔摩尼卡工作室製作，預定 s11 ',
            currentDate: '2022/07/03 12:30',
            key: 4,
        },{
            url: 'http://google.com',
            favIconUrl: 'https://developer.mozilla.org/favicon-48x48.cbbd161b.png',
            msg: '索尼互動娛樂（SIE）旗下聖塔摩尼卡工作室製作，預定 1d1 ',
            currentDate: '2022/07/03 12:30',
            key: 5,
        },],


        N2: [{
            url: 'http://google.com',
            favIconUrl: 'https://developer.mozilla.org/favicon-48x48.cbbd161b.png',
            msg: 'The Object.entries() method returns an array of a given object\'s own enumerable string-keyed property [key, value] ',
            currentDate: '2022/07/03 12:30',
            key: 1,
        }, {
            url: 'http://google.com',
            favIconUrl: 'https://developer.mozilla.org/favicon-48x48.cbbd161b.png',
            msg: '　SEGA 旗下人中之龍工作室（龍が如くスタジオ / RGG Studio）今日於 2022 東京電玩展前夕舉辦的「人中之龍工作室新作發表會」中，正式發表兩部《人中之龍》系列新作《人中之龍 8》及《人中之龍 7 外傳 英雄無名》，同時公布今早發表的《人中之龍 維新！極》的上市日期。',
            currentDate: '2022/07/03 12:30',
            key: 2,
        }, {
            url: 'http://google.com',
            favIconUrl: 'https://developer.mozilla.org/favicon-48x48.cbbd161b.png',
            msg: 'punk',
            currentDate: '2022/07/03 12:30',
            key: 3,
        }],


        N3: [{
            url: 'http://google.com',
            favIconUrl: 'https://developer.mozilla.org/favicon-48x48.cbbd161b.png',
            msg: 'The <strong>Object</strong>.entries() method returns an array of a given object\'s own enumerable string-keyed property [key, value] ',
            currentDate: '2022/07/03 12:30',
            key: 1,
        }, {
            url: 'http://google.com',
            favIconUrl: 'https://developer.mozilla.org/favicon-48x48.cbbd161b.png',
            msg: '　SEGA 旗下人中之龍工作室（龍が如くスタジオ / RGG Studio）今日於 2022 東京電玩展前夕舉辦的「人中之龍工作室新作發表會」中，正式發表兩部《人中之龍》系列新作《人中之龍 8》及《人中之龍 7 外傳 英雄無名》，同時公布今早發表的《人中之龍 維新！極》的上市日期。',
            currentDate: '2022/07/03 12:30',
            key: 2,
        }, {
            url: 'http://google.com',
            favIconUrl: 'https://developer.mozilla.org/favicon-48x48.cbbd161b.png',
            msg: 'punk',
            currentDate: '2022/07/03 12:30',
            key: 3,
        }],


    },
    reducers: {
        openStorage: (state, action) => {
            state.openStorage = action.payload === 'open'
        },
        openBar: (state, action) => {
            state.openBar = action.payload === 'open'
        },
        openEditToolbar: (state, action) => {
            state.openEditId = action.payload

        },
        test: (state) => {
            console.log('可以 reducer 對接 reducer')
        },
        addNewNote: (state, action) => {

        }
    }


})

export default CollectionSlice.reducer
export const selectCollection = (state) => state.collection

export const addOpenStorage = (payload) => CollectionSlice.actions.openStorage(payload)
export const addOpenBar = (payload) => CollectionSlice.actions.openBar(payload)
export const addOpenEditToolbar = (payload) => CollectionSlice.actions.openEditToolbar(payload)