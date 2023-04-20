import {createAsyncThunk, createSlice, current} from "@reduxjs/toolkit";
import {fetchData, fetchDataString, findData, getCurrentDate, setDataToLocal} from "../../utils";
import {Juuten_Storage, N1} from "../../assets/fakeData";
import {convertToRaw, EditorState} from 'draft-js'

const thunkData = createAsyncThunk(
    'folder/fetchFolderData',
    async ({item, fn}) => {
        console.log(item)
        console.log(fn)
        const value = await fetchData(item.key)
        return {
            item,
            value,
            fn,
        }
    })
export const CollectionSlice = createSlice({
    name: 'collection',
    initialState: {

        /* 測試時替換 */
        Juuten_Storage: Juuten_Storage,
        Juuten_EditingText: [{msg: '', key: 'Juuten_editingText'}],
        // Juuten_EditingText: await fetchDataString('Juuten_EditingText', [{msg: ''}]),
        // Juuten_Storage: await fetchData('Juuten_Storage', []),
        ///////////

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
        useTool: false,
        N1: N1,
        sus: N1,


    },
    reducers: {
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
            const {folderId, Juuten_Storage: storage} = state
            const collection = [...state[folderId]]


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
        /* 新增筆記 */
        addNewNote: (state, action) => {
            const {area, text} = action.payload
            const {folderId} = state
            const where = area === 'collection' ? folderId : 'Juuten_Storage'
            const data = [...state[where]]

            const _key = `Juuten_${Date.now()}`
            let newNote = {
                key: _key,
                type: area === 'collection' ? 'collection' : 'storage',
                msg: text,
                currentDate: getCurrentDate(),
                comment: [],
                isOpenComment: false,
            }
            const newData = [newNote, ...data]
            setDataToLocal(where, newData)
            return {
                ...state,
                [where]: newData,
                addNewNoteAnimation: newNote,
            }
        },
        autoSave: (state, action) => {
            const {type, destination, msg, key} = action.payload
            const typeMap = {
                textingBox: state.Juuten_EditingText, // [{msg: ''}]
                collection: state[state.folderId],
                storage: state['Juuten_Storage']
            }

            console.log(action.payload)
            const data = typeMap[type]
            const newData = data.map(item => {
                if (item.key === key) {
                    if ('comment' in item) {
                        return {
                            ...item,
                            msg,
                        }
                    } else {
                        console.log('no comment')
                        return {
                            ...item,
                            msg,
                        }
                    }
                } else {
                    if ('comment' in item) {
                        return {
                            ...item,
                            comment: item.comment.map(comm => {
                                if (comm.key !== key) return comm
                                return {
                                    ...comm,
                                    msg,
                                }
                            })
                        }
                    } else {
                        return item
                    }

                }
            })
            // console.log(JSON.stringify(newData))
            setDataToLocal(destination, newData)
        },

        cleanTexting: (state, action) => {
            setDataToLocal('Juuten_editingText', '')
            return {
                ...state,
                Juuten_editingText: [{msg: '', key: 'Juuten_editingText'}]
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
                        isOpenComment: true,
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
            /* 420 修改VVVVVVVVVV */
            const areaMap = {
                storage: 'Juuten_Storage',
                collection: state.folderId,
                comment: state.folderId
            }
            const {area} = action.payload
            const folderId = areaMap[area]
            const {openEditId} = state
            const data = [...state[folderId]]

            const newData = data.map(item => {
                if (item.key !== openEditId) {
                    return {
                        ...item,
                        comment: item.comment.map(comm => {
                            if (comm.key !== openEditId) return comm
                            return {
                                ...comm,
                                msg: action.payload.msg
                            }
                        })
                    }
                }
                return {
                    ...item,
                    msg: action.payload.msg
                }
            })

            setDataToLocal(folderId, newData)

            return {
                ...state,
                [folderId]: newData
            }
        },
        /* 刪除錦集(collection)和暫存區(storage)筆記或註記(comment) */
        deleteNoteOrComment: (state, action) => {
            /* 420 修改 VVVVVVVVVV */
            const areaMap = {
                storage: 'Juuten_Storage',
                collection: state.folderId,
                comment: state.folderId
            }
            const {area} = action.payload
            const folderId = areaMap[area]
            const {openEditId} = state
            const data = [...state[folderId]]

            const newData = data
                .map((item) => {
                    if (item.key !== openEditId) {
                        return {
                            ...item,
                            comment: item.comment.filter(comm => comm.key !== openEditId)
                        }
                    }
                })
                .filter(item => item !== undefined)

            setDataToLocal(folderId, newData)
            return {
                ...state,
                [folderId]: newData
            }

        },


        /* dnd 更換位置 */
        rearrangeComment: (state, action) => {
            const {destination, source, area} = action.payload
            const {openEditId, folderId} = state
            const whatArea = area === 'textMain'
                ? folderId
                : 'Juuten_Storage'
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
            const whatArea = area === 'textMain'
                ? folderId
                : 'Juuten_Storage'
            const data = state[whatArea]

            const [remove] = data.splice(source.index, 1)
            data.splice(destination.index, 0, remove)

            setDataToLocal(whatArea, data)
        },

        openOrCloseComment: (state, action) => {
            const {folderId} = state
            const data = state[folderId]

            console.log(action.payload + '---------------------------------')
            const newData = data.map(item => {
                if (item.key === action.payload) {
                    return {
                        ...item,
                        isOpenComment: !item.isOpenComment
                    }
                } else {
                    return item
                }

            })

            return {
                ...state,
                [folderId]: newData
            }
        },
    },
    extraReducers: {
        [thunkData.pending]: () => {
            console.log('pending')
        },
        [thunkData.fulfilled]: (state, action) => {
            const {item, value, fn} = action.payload
            console.log('fulfilled')
            const currentData = {
                ...state,
                folderData: item,
                [item.key]: value
            }
            console.log(currentData)
            fn()
            return currentData
        },
        [thunkData.rejected]: () => {
            console.warn('reject')
        },


    },
})


export default CollectionSlice.reducer
export const selectCollection = (state) => state.collection
export const addFetchData = (payload) => thunkData(payload)


export const {
    editCollectionOrStorage: addEditCollectionOrStorage,
    addAnimation: addAddAnimation,
    openEditToolbar: addOpenEditToolbar,
    openBar: addOpenBar,
    openStorage: addOpenStorage,
    openSearchPage: addOpenSearchPage,
    addFolderId: addAddFolderId,
    moveToStorageOrCollection: addMoveToStorageOrCollection,
    addComment: addAddComment,
    deleteNoteOrComment: addDeleteNoteOrComment,
    addNewNote: addAddNewNote,
    openAddNewNote: addOpenAddNewNote,
    rearrangeComment: addRearrangeComment,
    rearrangeNote: addRearrangeNote,
    openOrCloseComment: addOpenOrCloseComment,
    autoSave: addAutoSave,
    cleanTexting: addCleanTexting,
} = CollectionSlice.actions