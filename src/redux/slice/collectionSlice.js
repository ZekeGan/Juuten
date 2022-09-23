import {createAsyncThunk, createSlice, current} from "@reduxjs/toolkit";
import {fetchData, getCurrentDate, setDataToLocal} from "../utils";
// import store from "../store";

const thunkData = createAsyncThunk(
    '',
    async (payload) => {
        console.log('在函數裡')
        return {
            index: payload.index,
            value: await fetchData(payload.index),
            fn: payload.fn
        }
    })


export const CollectionSlice = createSlice({
    name: 'collection',
    initialState: {
        Juuten_Storage: [{
            key: 23,
            msg: 'hi i am collection',
            type: 'collection',
            url: 'https://google.com',
            favIconUrl: '',
            pageTitle: 'david love lucy',
            currentDate: '2022/10/10 12:10',
            position: 203,
            comment: []
        },{
            key: 24,
            msg: 'hi i am ',
            type: 'collection',
            url: 'https://google.com',
            favIconUrl: '',
            pageTitle: 'david love lucy',
            currentDate: '2022/10/10 12:10',
            position: 203,
            comment: []
        },{
            key: 25,
            msg: 'ectiondsadasdasdasdasdasdsadasdasdasdasdasdasds',
            type: 'collection',
            url: 'https://google.com',
            favIconUrl: '',
            pageTitle: 'david love lucy',
            currentDate: '2022/10/10 12:10',
            position: 203,
            comment: []
        },{
            key: 27,
            msg: 'hi i am collection',
            type: 'collection',
            url: 'https://google.com',
            favIconUrl: '',
            pageTitle: 'david love lucy',
            currentDate: '2022/10/10 12:10',
            position: 203,
            comment: []
        },{
            key: 26,
            msg: 'hi i am collection',
            type: 'collection',
            url: 'https://google.com',
            favIconUrl: '',
            pageTitle: 'david love lucy',
            currentDate: '2022/10/10 12:10',
            position: 203,
            comment: []
        },{
            key: 28,
            msg: 'hi i am collection',
            type: 'collection',
            url: 'https://google.com',
            favIconUrl: '',
            pageTitle: 'david love lucy',
            currentDate: '2022/10/10 12:10',
            position: 203,
            comment: []
        },], //await fetchData('Juuten_Storage'),


        openStorage: false,
        openBar: false,

        folderId: '',
        openEditToolbar: false,
        openEditId: '',
        openEditType: '',
        focusFlag: true,
        addNewNoteAnimation: '',
        addNewCommentAnimation: '',
        storageAddAnimation: '',

        N1: [{
            key: 1,
            type: 'collection',
            favIconUrl: 'https://img.icons8.com/material/344/globe--v2.png',
            url: 'https://google.com',
            currentDate: '2022/10/10 12:11',
            msg: `fds`,
            comment: [{
                key: 2,
                type: 'comment',
                currentDate: '2022/10/10 12:11',
                msg: 'hi2',
                comment: [{
                    key: 4,
                    type: 'comment',
                    currentDate: '2022/10/10 12:11',
                    msg: 'hi4',
                    comment: []
                }]
            }, {
                key: 3,
                type: 'comment',
                currentDate: '2022/10/10 12:11',
                msg: 'hi3',
                comment: [{
                    key: 5,
                    type: 'comment',
                    currentDate: '2022/10/10 12:11',
                    msg: 'hi5',
                    comment: []
                }]
            }]
        },],


    },
    reducers: {
        addFolderId: (state, action) => {
            state.folderId = action.payload
        },
        openStorage: (state, action) => {
            state.openStorage = action.payload === 'open'
        },
        openBar: (state, action) => {
            state.openBar = action.payload === 'open'
        },
        openEditToolbar: (state, action) => {
            state.openEditId = action.payload.key
            state.openEditType = action.payload.type
        },
        setFocusFlag: (state, action) => {
            state.focusFlag = action.payload
        },

        addAnimation: (state, action) => {
            switch (action.payload) {
                case 'note':
                    state.addNewNoteAnimation = ''
                    break
                case 'comment':
                    state.addNewCommentAnimation = ''
                    break
                default:
            }
        },

        editNote: (state, action) => {
            const id = state.folderId
            const key = state.openEditId
            const data = [...state[id]]

            switch (action.payload.type){
                case 'add':
                    const _key = Date.now()
                    let newNote = {
                        key: _key,
                        type: 'note',
                        msg: '',
                        currentDate: getCurrentDate(),
                        comment: [],
                    }
                    data.unshift(newNote)
                    state.addNewNoteAnimation = newNote
                    state.openEditId = _key
                    state.openEditType = 'note'
                    break
                case 'delete':
                    data.map((item, index) => {
                        if (item.key === key) {
                            data.splice(index, 1)
                        }
                    })
                    break
                case 'toCollection':
                    console.log('jfgjf')
                    const storage = [...state.Juuten_Storage]
                    data.map((item, index) => {
                        if (item.key === key) {
                            storage.unshift(item)
                            data.splice(index, 1)
                        }
                    })
                    state['Juuten_Storage'] = storage
                    setDataToLocal('Juuten_Storage', state['Juuten_Storage'])
                    break
                default:
                    console.warn('editNote Error')
            }
            state[id] = data
            setDataToLocal(id, state[id])
        },

        editComment: (state, action) => {
            const _id = state.folderId
            let _key = state.openEditId
            const _data = [...state[state.folderId]]
            const findData = (type, data, key) => {
                if (!data) return
                data.map((item, index) => {
                    if (item.key === key) {
                        switch (type) {
                            case 'add':
                                const _key = Date.now()
                                let _newComment = {
                                    key: _key,
                                    type: 'comment',
                                    currentDate: getCurrentDate(),
                                    msg: '',
                                    comment: [],
                                }
                                item.comment.push(_newComment)
                                state.openEditId = _key
                                state.addNewCommentAnimation = _key
                                return
                            case 'delete':
                                data.splice(index, 1)
                                return
                            case 'modify':
                                item.msg = action.payload.msg
                                return
                            default:
                                console.warn('editComment Error')
                        }
                    }
                    const mapData = {...item}
                    return findData(type, mapData.comment, key)
                })
            }
            findData(action.payload.type, _data, _key)
            setDataToLocal(_id, state[_id])
        },

        addCollectionToThisFolder: (state, action) => {
            const id = state.folderId
            const storageData = [...state.Juuten_Storage]
            const data = [...state[id]]
            data.unshift(action.payload)
            storageData.map((item, index) => {
                if (item.key === action.payload.key) storageData.splice(index, 1)
            })
            state[id] = data
            state.Juuten_Storage = storageData
            state.addNewNoteAnimation = action.payload
            setDataToLocal('Juuten_storage', state['Juuten_storage'])
            setDataToLocal(id, state[id])
        }
    },


    extraReducers: (builder) => {
        builder.addCase(thunkData.fulfilled, (state, action) => {
            const currentData = {...state, [action.payload.index]: action.payload.value}
            action.payload.fn()
            return currentData
        })
    }
})

export default CollectionSlice.reducer
export const selectCollection = (state) => state.collection
export const addFetchData = (payload) => thunkData(payload)

export const addAddFolderId = (payload) => CollectionSlice.actions.addFolderId(payload)
export const addOpenStorage = (payload) => CollectionSlice.actions.openStorage(payload)
export const addOpenBar = (payload) => CollectionSlice.actions.openBar(payload)
export const addOpenEditToolbar = (payload) => CollectionSlice.actions.openEditToolbar(payload)
export const addEditNote = (payload) => CollectionSlice.actions.editNote(payload)
export const addAddAnimation = (payload) => CollectionSlice.actions.addAnimation(payload)
export const addSetFocusFlag = (payload) => CollectionSlice.actions.setFocusFlag(payload)
export const addEditComment = (payload) => CollectionSlice.actions.editComment(payload)
export const addAddCollectionToThisFolder = (payload) => CollectionSlice.actions.addCollectionToThisFolder(payload)
