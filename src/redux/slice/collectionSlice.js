import {createAsyncThunk, createSlice, current} from "@reduxjs/toolkit";
import {fetchData, getCurrentDate, setDataToLocal} from "../utils";
import {Juuten_Storage, N1} from "../../assets/fakeData";
// import store from "../store";

const thunkData = createAsyncThunk(
    'folder/fetchFolderData',
    async (payload) => {
        console.log(payload)
        const value = await fetchData(payload.index)
        return {
            index: payload.index,
            value: value,
            fn: payload.fn
        }
    })
export const CollectionSlice = createSlice({
    name: 'collection',
    initialState: {

        /* 測試時替換 */
        Juuten_Storage: Juuten_Storage,
        // Juuten_Storage: await fetchData('Juuten_Storage'),
        /////////////

        openAddNewNote: false,
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
        useTool: false,
        N1: N1


    },
    reducers: {
        useTool: ({useTool}, {payload}) => {
            useTool = payload
        },
        addFolderId: (state, action) => {
            state.folderId = action.payload
        },
        openAddNewNote: (state, action) => {
            state.openAddNewNote = action.payload === 'open'
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
                    console.warn('addAnimation reducer error')
            }
        },

        /* storage collection 位置切換 */
        moveToStorageOrCollection: (state, action) => {
            const folderId = state.folderId
            const key = action.payload.key
            const collection = [...state[folderId]]
            const storage = [...state.Juuten_Storage]

            switch (action.payload.toWhere) {
                case 'toStorage':
                    collection.map((item, index) => {
                        if (item.key === key) {
                            item.type = 'storage'
                            storage.unshift(item)
                            collection.splice(index, 1)
                        }
                    })
                    break
                case 'toCollection':
                    storage.map((item, idx) => {
                        if (item.key === key) {
                            item.type = 'collection'
                            collection.unshift(item)
                            storage.splice(idx, 1)
                        }
                    })
                    break
                default:
                    console.warn('moveToStorageOrCollection reducer error')
            }

            state['Juuten_Storage'] = storage
            setDataToLocal('Juuten_Storage', state['Juuten_Storage'])

            state[folderId] = collection
            setDataToLocal(folderId, state[folderId])
        },
        // moveToCollection: (state, action) => {
        //     const folderId = state.folderId
        //     const key = action.payload.key
        //     const storage = [...state.Juuten_Storage]
        //     const collection = [...state[folderId]]
        //
        //     storage.map((item, idx) => {
        //         if (item.key === key) {
        //             collection.unshift(item)
        //             storage.splice(idx, 1)
        //         }
        //     })
        //
        //     state['Juuten_Storage'] = storage
        //     setDataToLocal('Juuten_Storage', state['Juuten_Storage'])
        //
        //     state[folderId] = collection
        //
        // },

        /* 新增筆記 */
        addNewNote: (state, action) => {
            const folderId = state.folderId
            const data = [...state[folderId]]

            const _key = Date.now()
            let newNote = {
                key: _key,
                type: 'note',
                msg: '',
                currentDate: getCurrentDate(),
                comment: []
            }
            data.unshift(newNote)
            state.addNewNoteAnimation = newNote
            state.openEditId = _key
            state.openEditType = 'note'

            state[folderId] = data
            setDataToLocal(folderId, state[folderId])
        },

        /* 新增註記(comment) */
        addComment: (state, action) => {
            const id = state.folderId
            const key = action.payload.key
            const data = [...state[id]]

            data.map((item, index) => {
                if (item.key === key) {
                    const _key = Date.now()
                    let _newComment = {
                        key: _key,
                        type: 'comment',
                        currentDate: getCurrentDate(),
                        msg: '',
                    }
                    item.comment.push(_newComment)
                    state.openEditId = _key
                    state.addNewCommentAnimation = _key
                }
            })
            setDataToLocal(id, state[id])
        },

        /* 修改錦集(collection)、註記(comment)和暫存區(storage)的文字 */
        editCollectionOrStorage: (state, action) => {
            let id, data

            switch (action.payload.area) {
                case 'collection':
                    id = state.folderId
                    data = [...state[id]]
                    break
                case 'storage':
                    data = state.Juuten_Storage
                    break
                default:
                    console.warn('area錯誤')
            }
            const key = state.openEditId

            function findData(_data, _key) {
                if (!_data) return
                _data.map((item, index) => {
                    if (item.key === _key) {
                        item.msg = action.payload.msg
                    }
                    const note = {...item}
                    return findData(note.comment, key)
                })
            }

            findData(data, key)
            setDataToLocal(id, state[id])
        },

        /* 刪除錦集(collection)和暫存區(storage)筆記或註記(comment) */
        deleteNoteOrComment: (state, action) => {
            let id, data
            switch (action.payload.area) {
                case 'storage':
                    id = 'Juuten_Storage'
                    data = [...state[id]]
                    break
                case 'collection':
                    id = state.folderId
                    data = [...state[id]]
                    break
                default:
                    console.warn('Area錯誤')
            }
            const key = state.openEditId
            getData(data, key)
            state[id] = data
            state.openEditId = ''
            setDataToLocal(id, state[id])

            function getData(_data, _key) {
                if (_data === undefined) return
                _data.map((item, idx) => {
                    if (item.key === _key) {
                        _data.splice(idx, 1)
                        return
                    }
                    let note = {...item}
                    return getData(note.comment, _key)
                })
            }
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(thunkData.pending, () => {
                console.log('pending')
            })
            .addCase(thunkData.fulfilled, (state, action) => {
                console.log('fulfilled')
                const currentData = {
                    ...state,
                    [action.payload.index]: action.payload.value
                }
                console.log(currentData)
                action.payload.fn()
                return currentData
            })
            .addCase(thunkData.rejected, () => {
                console.log('reject')
            })
    },
    // extraReducers: {
    //     [thunkData.pending]: () => {
    //         console.log('pending')
    //     },
    //     [thunkData.fulfilled]: (state, action) => {
    //         console.log('fulfilled')
    //         const currentData = {
    //             ...state,
    //             [action.payload.index]: action.payload.value
    //         }
    //         console.log(currentData)
    //         action.payload.fn()
    //         return currentData
    //     },
    //     [thunkData.rejected]: () => {
    //         console.log('reject')
    //     },
    // }
})


export default CollectionSlice.reducer
export const selectCollection = (state) => state.collection
export const addFetchData = (payload) => thunkData(payload)


export const {
    editCollectionOrStorage: addEditCollectionOrStorage,
    setFocusFlag: addSetFocusFlag,
    addAnimation: addAddAnimation,
    openEditToolbar: addOpenEditToolbar,
    openBar: addOpenBar,
    openStorage: addOpenStorage,
    addFolderId: addAddFolderId,
    useTool: addUseTool,
    moveToStorageOrCollection: addMoveToStorageOrCollection,
    // moveToCollection: addMoveToCollection,
    addComment: addAddComment,
    deleteNoteOrComment: addDeleteNoteOrComment,
    addNewNote: addAddNewNote,
    openAddNewNote: addOpenAddNewNote
} = CollectionSlice.actions