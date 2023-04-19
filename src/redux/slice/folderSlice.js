import {createSlice, current} from "@reduxjs/toolkit";
import {deepCopy, fetchData, getCurrentDate, setDataToLocal} from "../../utils";
import {Juuten_folderLists} from "../../assets/fakeData";
import {initialConfiguration} from "../../assets/global";

const changeFontColor = (colorValue) => {
    let cut = colorValue.replace('#', '')
    return 0.213 * parseInt(cut[0] + cut[1], 16)
        + 0.715 * parseInt(cut[2] + cut[3], 16)
        + 0.072 * parseInt(cut[4] + cut[5], 16)
        > 255 / 2;
}

export const FolderSlice = createSlice({
    name: 'folder',
    initialState: {
        /* 測試時替換 */
        // Juuten_folderLists: Juuten_folderLists,
        Juuten_folderLists: await fetchData('Juuten_getFolderLists'),
        /////////////

        Juuten_tagLists: [],
        editFolderId: '',
        addFolderAnimationId: '',

        folderAutoFocusId: '',
        tagCurrentColor: '#f24726',
    },
    reducers: {
        folderEdit: (state, action) => {
            const currentState = [...state.Juuten_folderLists]
            switch (action.payload.type) {
                case 'color':
                    const color = action.payload.value
                    currentState.map(item => {
                        if (item.key === state.editFolderId) {
                            item.folderColor = color
                            item.font = changeFontColor(item.folderColor)
                        }
                    })
                    state.Juuten_folderLists = currentState
                    break
                case 'name':
                    const name = action.payload.value
                    currentState.map(item => {
                        if (item.key === state.editFolderId) item.name = name
                    })
                    state.Juuten_folderLists = currentState
                    break
                case 'delete':
                    currentState.map((item, index) => {
                        if (item.key === state.editFolderId) {
                            currentState.splice(index, 1)
                        }
                    })
                    state.Juuten_folderLists = currentState
                    break
                default:
                    console.warn('error')
            }

            /* 儲存到extension的storage */
            setDataToLocal('Juuten_getFolderLists', state.Juuten_folderLists)
        },

        folderAdd: (state, action) => {
            const color = action.payload.folderColor
            const newData = {
                key: `Juuten_${Date.now()}`,
                name: action.payload.name,
                folderColor: color,
                font: changeFontColor(color),
                createDate: getCurrentDate(),
                tags: [],
            }
            state.Juuten_folderLists.unshift(newData)
            state.addFolderAnimationId = newData

            /* 儲存到extension的storage */
            setDataToLocal('Juuten_getFolderLists', state.Juuten_folderLists)
        },
        editFolderId: (state, action) => {
            state.editFolderId = action.payload
        },
        editFolderAnimationId: (state) => {
            state.addFolderAnimationId = ''
        },

        setFolderAutoFocusId: (state, action) => {
            state.folderAutoFocusId = action.payload
        },

        rearrangeFolder: (state, action) => {
            const {Juuten_folderLists: list} = state
            const {destination, source} = action.payload
            const [remove] = list.splice(source.index, 1)
            list.splice(destination.index, 0, remove)
            setDataToLocal('Juuten_folderLists', list)

        },


        tagEdit: (state, action) => {
            switch (action.payload.type) {
                case 'changeColor':
                    state.tagCurrentColor = action.payload.color
                    break
                case 'deleteTag':
                    break
                case 'addTag':
                    const font = [state.tagCurrentColor]
                    const list = [...state.Juuten_tagLists]
                    console.log(changeFontColor(font[0]))
                    list.push({
                        name: action.payload.name,
                        font: changeFontColor(font[0]),
                        color: state.tagCurrentColor
                    })
                    state.Juuten_tagLists = list
                    break
                default:
            }
        }
    }
})


export default FolderSlice.reducer
export const selectFolder = (state) => state.folder

export const {
    tagEdit: addTagEdit,
    setFolderAutoFocusId: addSetFolderAutoFocusId,
    editFolderAnimationId: addEditFolderAnimationId,
    editFolderId: addEditFolderId,
    folderAdd: addFolderAdd,
    folderEdit: addFolderEdit,
    rearrangeFolder: addRearrangeFolder
    // setFolderNewName: addSetFolderNewName,
} = FolderSlice.actions
