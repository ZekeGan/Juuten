import {createAsyncThunk, createSlice, current} from "@reduxjs/toolkit";
import {fetchData, getCurrentDate, setDataToLocal} from "../../utils";
import {Juuten_Storage, N1} from "../../assets/fakeData";
import {convertToRaw, EditorState} from 'draft-js'

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
        openSearchPage: false,
        openBar: false,
        folderData: {},
        folderId: '',
        openEditToolbar: false,
        openEditId: '',
        openEditParentId: '',
        openEditType: '',
        focusFlag: true,
        addNewNoteAnimation: '',
        addNewCommentAnimation: '',
        storageAddAnimation: '',
        toggleCSS: [],
        useTool: false,
        N1: N1,
        sus: N1,


    },
    reducers: {
        useTool: (state, action) => {
            return {
                ...state,
                useTool: action.payload
            }
        },
        addFolderId: (state, action) => {
            return {
                ...state,
                folderData: action.payload,
                folderId: action.payload.key
            }
        },
        openAddNewNote: (state, action) => {
            return {
                ...state,
                openAddNewNote: action.payload === 'open'
            }
        },
        openStorage: (state, action) => {
            return {
                ...state,
                openStorage: action.payload === 'open'
            }
        },
        openSearchPage: (state, action) => {
            return {
                ...state,
                openSearchPage: action.payload === 'open'
            }
        },
        openBar: (state, action) => {
            return {
                ...state,
                openBar: action.payload === 'open'
            }
        },
        openEditToolbar: (state, action) => {
            return {
                ...state,
                openEditId: action.payload.key,
                openEditType: action.payload.type
            }
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
            const {
                folderId,
                Juuten_Storage: storage
            } = state
            const destination = action.payload.toWhere
            // const key = action.payload.key
            const collection = [...state[folderId]]
            // const data = {
            //     toStorage: {
            //         type: 'storage',
            //         source: collection,
            //         destinattion: storage,
            //     },
            //     toCollection: ''
            // }

            // const newCollection = collection.map((item, index) => {
            //     if (item.key === action.payload.key) {
            //         let newItem = data[destination].source.splice(index, 1)
            //         newItem.type = data[destination].type
            //         data[destination].destination.unshift(newItem)
            //     }
            // })

            // const newStorage = storage.map((item, index) => {
            //     if (item.key === action.payload.key) {
            //         item.type = data[destination].type
            //         data[destination].destination.unshift(item)
            //         data[destination].destination.splice(index, 1)
            //     }
            // })

            switch (action.payload.toWhere) {
                case 'toStorage':
                    collection.map((item, index) => {
                        if (item.key === action.payload.key) {
                            item.type = 'storage'
                            storage.unshift(item)
                            collection.splice(index, 1)
                        }
                    })
                    break
                case 'toCollection':
                    storage.map((item, idx) => {
                        if (item.key === action.payload.key) {
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
            state[folderId] = collection
            setDataToLocal('Juuten_Storage', storage)
            setDataToLocal(folderId, collection)

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
            const {folderId} = state
            const data = [...state[folderId]]

            const _key = `Juuten_${Date.now()}`
            let newNote = {
                key: _key,
                type: 'collection',
                msg: action.payload,
                currentDate: getCurrentDate(),
                comment: []
            }
            const newData = [newNote, ...data]
            setDataToLocal(folderId, newData)
            return {
                ...state,
                [folderId]: newData,
                addNewNoteAnimation: newNote,
                openEditType: 'note',
            }
        },

        /* 新增註記(comment) */
        addComment: (state, action) => {
            const {folderId, openEditId, ...rest} = state
            const data = rest[folderId]

            const _key = `Juuten_${Date.now()}`
            const newComment = {
                key: _key,
                type: 'comment',
                currentDate: getCurrentDate(),
                msg: JSON.stringify(convertToRaw(EditorState.createEmpty().getCurrentContent()))
            }

            const newCollectionData = data.map((item, index) => {
                if (item.key === action.payload.key) {
                    return {
                        ...item,
                        comment: [newComment, ...item.comment]
                    }
                }
                return item
            })

            setDataToLocal(folderId, newCollectionData)

            return {
                ...state,
                [folderId]: newCollectionData,
                openEditId: _key,
                addNewCommentAnimation: _key,
                openEditParentId: action.payload.key
            }
        },

        /* 修改錦集(collection)、註記(comment)和暫存區(storage)的文字 */
        editCollectionOrStorage: (state, action) => {
            let id, data

            // switch (action.payload.area) {
            //     case 'collection':
            //         id = state.folderId
            //         data = [...state[id]]
            //         break
            //     case 'storage':
            //         data = state.Juuten_Storage
            //         break
            //     default:
            //         console.warn('area錯誤')
            // }
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
            const {area} = action.payload
            const {openEditId} = state

            const areaMap = {
                storage: 'Juuten_Storage',
                collection: state.folderId,
                comment: state.folderId
            }
            const folderId = areaMap[area]
            let data = [...state[folderId]]
            getData(data, openEditId)
            state[folderId] = data
            state.openEditId = ''
            setDataToLocal(folderId, data)

            function getData(_data, _key) {
                if (_data === undefined) return
                _data.map((item, idx) => {
                    if (item.key === _key) {
                        _data.splice(idx, 1)
                        return
                    }
                    return getData(item.comment, _key)
                })
            }
        },

        /* 紀錄當前Draftjs inline Style 樣式 */
        changeToggleCSS: (state, action) => {
            return {
                ...state,
                toggleCSS: action.payload
            }
        },

        /* dnd 更換位置 */
        rearrangeComment: (state, action) => {
            const {destination, source, area} = action.payload
            const {openEditId, folderId} = state
            const whatArea = area === 'textMain' ? folderId : 'Juuten_Storage'
            const data = state[whatArea]
            data.map((item, idx) => {
                if (item.key === openEditId) {
                    const [remove] = item.comment.splice(source.index, 1)
                    item.comment.splice(destination.index, 0, remove)
                }
            })
            setDataToLocal(whatArea, data)
        },
        rearrangeNote: (state, action) => {
            const {destination, source, area} = action.payload
            const {folderId} = state
            const whatArea = area === 'textMain' ? folderId : 'Juuten_Storage'
            const data = state[whatArea]
            const [remove] = data.splice(source.index, 1)
            data.splice(destination.index, 0, remove)
            setDataToLocal(whatArea, data)
        },

        openOrCloseComment: (state, action) => {
            const {folderId} = state
            const data = state[folderId]

            const newData = data.map(item => {
                if (item.key === action.payload) {
                    return {
                        ...item,
                        isOpenComment: !item.isOpenComment
                    }
                }
                else {
                    return item
                }

            })
            return {
                ...state,
                [folderId]: newData
            }

        }
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
    openSearchPage: addOpenSearchPage,
    addFolderId: addAddFolderId,
    useTool: addUseTool,
    moveToStorageOrCollection: addMoveToStorageOrCollection,
    // moveToCollection: addMoveToCollection,
    addComment: addAddComment,
    deleteNoteOrComment: addDeleteNoteOrComment,
    addNewNote: addAddNewNote,
    openAddNewNote: addOpenAddNewNote,
    changeToggleCSS: addChangeToggleCSS,
    rearrangeComment: addRearrangeComment,
    rearrangeNote: addRearrangeNote,
    openOrCloseComment: addOpenOrCloseComment
} = CollectionSlice.actions