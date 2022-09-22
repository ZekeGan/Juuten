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
        folderId: '',
        openStorage: false,
        openBar: false,
        openEditToolbar: false,
        openEditId: '',
        openEditType: '',
        addNewNoteAnimation: '',


        Juuten_storage: [],//await fetchData('Juuten_storage'),

        N1: [{
            key: 1,
            type: 'collection',
            favIconUrl: 'https://img.icons8.com/material/344/globe--v2.png',
            url: 'https://',
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


        addNoteAnimation: (state, action) => {
            state.addNewNoteAnimation = ''
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
                        favIconUrl: '',
                        url: '',
                        currentDate: getCurrentDate(),
                        msg: '',
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
                                if (!item.comment)item.comment = []
                                item.comment.push(_newComment)
                                state.openEditId = _key
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
    },
    extraReducers: (builder) => {
        builder.addCase(thunkData.fulfilled, (state, action) => {
            console.log(action)
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
export const addAddNoteAnimation = (payload) => CollectionSlice.actions.addNoteAnimation(payload)

export const addEditComment = (payload) => CollectionSlice.actions.editComment(payload)
