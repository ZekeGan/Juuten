import {createSlice, current} from "@reduxjs/toolkit";
import {fetchData, setDataToLocal} from "../utils";


export const FolderSlice = createSlice({
    name: 'folder',
    initialState: {
        Juuten_folderLists: [
            {index: 'N1', name: 'test9', folderColor: '#1f1e33', font: true},
            {index: 'N2', name: 'test9', folderColor: '#1f1e33', font: true},
            {index: 'N3', name: 'test9', folderColor: '#1f1e33', font: true},
            {index: 'N4', name: 'test9', folderColor: '#1f1e33', font: true},
        ],//await fetchData('Juuten_getFolderLists'),
        editFolderId: '',
        addFolderAnimationId: ''
    },
    reducers: {
        folderEdit: (state, action) => {
            const currentState = [...state.Juuten_folderLists]
            switch (action.payload.type) {
                case 'color':
                    console.log(action.payload.value)
                    const color = action.payload.value
                    currentState.map(item => {
                        if (item.index === state.editFolderId) {
                            item.folderColor = color[0] === 't' ? color.slice(1) : color
                            item.font = color[0] === 't'
                        }
                    })
                    state.Juuten_folderLists = currentState
                    break
                case 'name':
                    const name = action.payload.value
                    currentState.map(item => {
                        if (item.index === state.editFolderId) item.name = name
                    })
                    state.Juuten_folderLists = currentState
                    break
                case 'delete':
                    currentState.map((item, index) => {
                        if (item.index === state.editFolderId) {
                            currentState.splice(index, 1)
                        }
                    })
                    state.Juuten_folderLists = currentState
                    break
                default:
                    console.log('error')
            }

            setDataToLocal('Juuten_getFolderLists', state.Juuten_folderLists)
        },
        folderAdd: (state, action) => {
            const color = action.payload.folderColor
            const newData = {
                index: action.payload.index,
                name: action.payload.name,
                folderColor: color,
                font: false
            }
            state.Juuten_folderLists.unshift(newData)
            state.addFolderAnimationId = newData
            console.log(state.addFolderAnimationId)
            setDataToLocal('Juuten_getFolderLists', state.Juuten_folderLists)
        },
        editFolderId: (state, action) => {
            state.editFolderId = action.payload
        },
        editFolderAnimationId: (state) => {
            state.addFolderAnimationId = ''
        }
    }
})


export default FolderSlice.reducer
export const selectFolder = (state) => state.folder
export const addFolderEdit = (payload) => FolderSlice.actions.folderEdit(payload)
export const addFolderAdd = (payload) => FolderSlice.actions.folderAdd(payload)
export const addEditFolderId = (payload) => FolderSlice.actions.editFolderId(payload)
export const addEditFolderAnimationId = (payload) => FolderSlice.actions.editFolderAnimationId(payload)
