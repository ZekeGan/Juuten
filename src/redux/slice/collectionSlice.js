import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { convertToRaw, EditorState } from 'draft-js'
import { fetchData, getCurrentDate, setDataToLocal } from "src/utils";
import { storage as initialStorage, note as intrduceData } from "assets/mock";

const thunkData = createAsyncThunk(
    'folder/fetchFolderData',
    async ({ item, fn }) => {
        const value = await fetchData(item.key, [])
        return { item, value, fn }
    })
export const CollectionSlice = createSlice({
    name: 'collection',
    initialState: {
        Juuten_EditingText: await fetchData('Juuten_EditingText', [{ msg: '', key: 'Juuten_EditingText' }]),
        Juuten_Storage: await fetchData('Juuten_Storage', initialStorage),

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
        isHistoryLoad: false,

        Juuten_introduceData: intrduceData
    },

    reducers: {
        openEditToolbar: (state, action) => {
            return {
                ...state,
                openEditId: action.payload.key,
                openEditType: action.payload.type
            }
        },

        addAnimation: (state, action) => {
            return {
                ...state,
                addNewNoteAnimation: '',
                addNewCommentAnimation: ''
            }
        },
        /* storage collection 位置切換 */
        moveToStorageOrCollection: (state, action) => {
            const { folderId } = state
            const { toWhere, key } = action.payload

            const type = toWhere === 'toStorage' ? 'storage' : 'collection'
            const removeKey = toWhere === 'toStorage' ? folderId : 'Juuten_Storage'
            const removeGroup = toWhere === 'toStorage' ? state[folderId] : state['Juuten_Storage']
            const addKey = toWhere === 'toStorage' ? 'Juuten_Storage' : folderId
            const addGroup = toWhere === 'toStorage' ? state['Juuten_Storage'] : state[folderId]

            const newItem = removeGroup.find(item => item.key === key)
            const newRemove = removeGroup.filter(item => item.key !== key)
            const newAdd = [{ ...newItem, type }, ...addGroup]

            setDataToLocal(removeKey, newRemove)
            setDataToLocal(addKey, newAdd)

            return {
                ...state,
                [addKey]: newAdd,
                [removeKey]: newRemove
            }
        },
        /* 新增筆記 */
        addNewNote: (state, action) => {
            const { area, text } = action.payload
            const where = area === 'collection' ? state.folderId : 'Juuten_Storage'

            const newNote = {
                key: `Juuten_${Date.now()}`,
                type: area === 'collection' ? 'collection' : 'storage',
                msg: text,
                currentDate: getCurrentDate(),
                comment: [],
                isOpenComment: false,
            }

            setDataToLocal(where, [newNote, ...state[where]])
            return {
                ...state,
                [where]: [newNote, ...state[where]],
                addNewNoteAnimation: newNote,
            }
        },

        autoSave: (state, action) => {
            const { type, msg, key } = action.payload
            const typeMap = {
                textingBox: {
                    key: 'Juuten_EditingText',
                    data: state.Juuten_EditingText,
                },
                textMain: {
                    key: state.folderId,
                    data: state[state.folderId],
                },
                storage: {
                    key: 'Juuten_Storage',
                    data: state['Juuten_Storage'],
                }
            }
            const data = typeMap[type].data
            const newData = data.map(item => {
                return item.key === key
                    ? { ...item, msg }
                    : 'comment' in item
                        ? {
                            ...item,
                            comment: item.comment.map(comm => comm.key === key
                                ? { ...comm, msg }
                                : comm)
                        }
                        : item

            })
            setDataToLocal(typeMap[type].key, newData)
        },

        cleanTexting: (state, action) => {
            setDataToLocal('Juuten_editingText', '')
            return {
                ...state,
                Juuten_editingText: [{ msg: '', key: 'Juuten_editingText' }]
            }
        },
        /* 新增註記(comment) */
        addComment: (state, action) => {
            const { folderId, openEditId, ...rest } = state

            const _key = `Juuten_${Date.now()}`
            const newComment = {
                key: _key,
                type: 'comment',
                currentDate: getCurrentDate(),
                msg: JSON.stringify(convertToRaw(EditorState.createEmpty().getCurrentContent()))
            }

            const newCollectionData = rest[folderId].map((item, index) => {
                return item.key !== action.payload.key
                    ? item
                    : {
                        ...item,
                        isOpenComment: true,
                        comment: [newComment, ...item.comment]
                    }
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
            const areaMap = {
                storage: 'Juuten_Storage',
                collection: state.folderId,
                comment: state.folderId
            }
            const folderId = areaMap[action.payload.area]
            const { openEditId } = state
            const newData = state[folderId].map(item => {
                return item.key === openEditId
                    ? { ...item, msg: action.payload.msg }
                    : {
                        ...item,
                        comment: item.comment.map(comm => comm.key !== openEditId ? comm : {
                            ...comm,
                            msg: action.payload.msg
                        })
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
            const areaMap = {
                storage: 'Juuten_Storage',
                collection: state.folderId,
                comment: state.folderId
            }
            const { area } = action.payload
            const folderId = areaMap[area]
            const { openEditId } = state
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
            const { destination, source, area } = action.payload
            if (source.index === destination.index) return state

            const whatArea = area === 'textMain' ? state.folderId : 'Juuten_Storage'
            const newData = state[whatArea].map(item => {
                if (item.key === state.openEditId) {
                    const newComm = item.comment.slice();
                    const [removed] = newComm.splice(source.index, 1);
                    newComm.splice(destination.index, 0, removed);
                    return { ...item, comment: newComm }
                }
                return item
            })

            setDataToLocal(whatArea, newData)

            return {
                ...state,
                [whatArea]: newData
            }
        },

        rearrangeNote: (state, action) => {
            const { destination, source, area } = action.payload
            if (source.index === destination.index) return state

            const whatArea = area === 'textMain' ? state.folderId : 'Juuten_Storage'
            const data = state[whatArea]

            const newData = data.slice();
            const [removed] = newData.splice(source.index, 1);
            newData.splice(destination.index, 0, removed);

            setDataToLocal(whatArea, newData)

            return {
                ...state,
                [whatArea]: newData
            }
        },

        openOrCloseComment: (state, action) => {
            const folderId = state.folderId
            const value = action.payload.area === 'textMain' ? folderId : 'Juuten_Storage'

            const newData = state[value].map(item =>
                item.key !== action.payload.key
                    ? item
                    : { ...item, isOpenComment: !item.isOpenComment }
            )

            setDataToLocal(value, newData)

            return {
                ...state,
                [value]: newData
            }
        },

        changeIsHistory: (state, action) => {
            return {
                ...state,
                isHistoryLoad: true
            }
        },
    },
    extraReducers: {
        [thunkData.fulfilled]: (state, action) => {
            const { item, value, fn = () => { } } = action.payload
            if (item.key === 'Juuten_introduceData') {
                fn()
                return {
                    ...state,
                    folderData: item,
                    folderId: item.key,
                    isHistoryLoad: true,
                }
            }
            setDataToLocal('Juuten_Navigate_History', item)
            fn()
            return {
                ...state,
                folderData: item,
                folderId: item.key,
                isHistoryLoad: true,
                [item.key]: value
            }
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
    moveToStorageOrCollection: addMoveToStorageOrCollection,
    addComment: addAddComment,
    deleteNoteOrComment: addDeleteNoteOrComment,
    addNewNote: addAddNewNote,
    rearrangeComment: addRearrangeComment,
    rearrangeNote: addRearrangeNote,
    openOrCloseComment: addOpenOrCloseComment,
    autoSave: addAutoSave,
    cleanTexting: addCleanTexting,
    changeIsHistory: addChangeIsHistory,
} = CollectionSlice.actions