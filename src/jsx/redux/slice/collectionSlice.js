import {createSlice} from "@reduxjs/toolkit";
import chrome from '../chromeFunction.js'


export const CollectionSlice = createSlice({
    name: 'collection',
    initialState: {
        openStorage: false,
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
        }],
        N1: [{
            url: 'http://google.com',
            favIconUrl: 'https://developer.mozilla.org/favicon-48x48.cbbd161b.png',
            msg: 'The Object.entries() method returns an array of a given object\'s own enumerable string-keyed property [key, value] ',
        }, {
            url: 'http://google.com',
            favIconUrl: 'https://developer.mozilla.org/favicon-48x48.cbbd161b.png',
            msg: '　SEGA 旗下人中之龍工作室（龍が如くスタジオ / RGG Studio）今日於 2022 東京電玩展前夕舉辦的「人中之龍工作室新作發表會」中，正式發表兩部《人中之龍》系列新作《人中之龍 8》及《人中之龍 7 外傳 英雄無名》，同時公布今早發表的《人中之龍 維新！極》的上市日期。',
        }, {
            url: 'http://google.com',
            favIconUrl: 'https://developer.mozilla.org/favicon-48x48.cbbd161b.png',
            msg: 'punk',
        }],
        N2: [{
            url: 'http://google.com',
            favIconUrl: 'https://developer.mozilla.org/favicon-48x48.cbbd161b.png',
            msg: 'The Object.entries() method returns an array of a given object\'s own enumerable string-keyed property [key, value] ',
        }, {
            url: 'http://google.com',
            favIconUrl: 'https://developer.mozilla.org/favicon-48x48.cbbd161b.png',
            msg: '　SEGA 旗下人中之龍工作室（龍が如くスタジオ / RGG Studio）今日於 2022 東京電玩展前夕舉辦的「人中之龍工作室新作發表會」中，正式發表兩部《人中之龍》系列新作《人中之龍 8》及《人中之龍 7 外傳 英雄無名》，同時公布今早發表的《人中之龍 維新！極》的上市日期。',
        }, {
            url: 'http://google.com',
            favIconUrl: 'https://developer.mozilla.org/favicon-48x48.cbbd161b.png',
            msg: 'punk',
        }],
        N3: [{
            url: 'http://google.com',
            favIconUrl: 'https://developer.mozilla.org/favicon-48x48.cbbd161b.png',
            msg: 'The Object.entries() method returns an array of a given object\'s own enumerable string-keyed property [key, value] ',
        }, {
            url: 'http://google.com',
            favIconUrl: 'https://developer.mozilla.org/favicon-48x48.cbbd161b.png',
            msg: '　SEGA 旗下人中之龍工作室（龍が如くスタジオ / RGG Studio）今日於 2022 東京電玩展前夕舉辦的「人中之龍工作室新作發表會」中，正式發表兩部《人中之龍》系列新作《人中之龍 8》及《人中之龍 7 外傳 英雄無名》，同時公布今早發表的《人中之龍 維新！極》的上市日期。',
        }, {
            url: 'http://google.com',
            favIconUrl: 'https://developer.mozilla.org/favicon-48x48.cbbd161b.png',
            msg: 'punk',
        }],


    },
    reducers: {
        openStorage: (state, action) => {
            state.openStorage = action.payload === 'open'
        }

    }
})

export default CollectionSlice.reducer
export const selectCollection = (state) => state.collection

export const addOpenStorage = (payload) => CollectionSlice.actions.openStorage(payload)