import { createSlice } from "@reduxjs/toolkit";
import { changeFontColor, getCurrentDate, setDataToLocal, fetchData } from "../../utils";
import { folder as initailFolder } from "../../assets/mock";


export const FolderSlice = createSlice({
    name: 'folder',
    initialState: {
        Juuten_folderLists: await fetchData('Juuten_folderLists', initailFolder),
        Juuten_Navigate_History: await fetchData('Juuten_Navigate_History', {}),
        ////////////////////////////////////////////////////////////
        editFolderId: '',
        addFolderAnimationId: '',
    },
    reducers: {
        // 修改資料夾顏色
        changeFolderColor: (state, action) => {
            const { Juuten_folderLists: data, editFolderId } = state
            const newData = data.map(item => {
                return item.key !== editFolderId ? item : {
                    ...item,
                    folderColor: action.payload,
                    font: changeFontColor(action.payload)
                }
            })
            setDataToLocal('Juuten_folderLists', newData)
            return { ...state, Juuten_folderLists: newData }
        },
        // 修改資料夾名稱
        changeFolderName: (state, action) => {
            const newData = state.Juuten_folderLists.map(item => {
                return item.key === state.editFolderId ? { ...item, name: action.payload } : item
            })
            setDataToLocal('Juuten_folderLists', newData)
            return { ...state, Juuten_folderLists: newData }
        },
        // 刪除資料夾
        deleteFolder: (state, action) => {
            const newData = state.Juuten_folderLists.filter(item => item.key !== action.payload)
            setDataToLocal('Juuten_folderLists', newData)
            return { ...state, Juuten_folderLists: newData }
        },
        // 新增資料夾
        folderAdd: (state, action) => {
            const { folderColor } = action.payload
            const newFolder = {
                key: `Juuten_${Date.now()}`,
                name: action.payload.name,
                folderColor,
                font: changeFontColor(folderColor),
                createDate: getCurrentDate(),
                tags: [],
            }
            const newFolderList = [newFolder, ...state.Juuten_folderLists]
            setDataToLocal('Juuten_folderLists', newFolderList)
            return {
                ...state,
                Juuten_folderLists: newFolderList,
                addFolderAnimationId: newFolder
            }
        },

        editFolderId: (state, action) => {
            return {
                ...state,
                editFolderId: action.payload
            }
        },

        editFolderAnimationId: (state) => {
            return {
                ...state,
                addFolderAnimationId: ''
            }
        },

        rearrangeFolder: (state, action) => {
            const { destination, source } = action.payload
            if (source.index === destination.index) return state

            const newData = state.Juuten_folderLists.slice();
            const [removed] = newData.splice(source.index, 1);
            newData.splice(destination.index, 0, removed);

            setDataToLocal('Juuten_folderLists', newData)
            return { ...state, Juuten_folderLists: newData }
        },
    }
})


export default FolderSlice.reducer
export const selectFolder = (state) => state.folder

export const {
    changeFolderColor: addChangeFolderColor,
    changeFolderName: addChangeFolderName,
    deleteFolder: addDeleteFolder,
    editFolderAnimationId: addEditFolderAnimationId,
    editFolderId: addEditFolderId,
    folderAdd: addFolderAdd,
    rearrangeFolder: addRearrangeFolder
} = FolderSlice.actions
