import {createSlice} from "@reduxjs/toolkit";
import {initialConfiguration} from "../../assets/global";


export const GlobalSlice = createSlice({
    name: 'global',
    initialState: {
        configuration: initialConfiguration,
        // configuration: !!await fetchData('Juuten_getFolderLists') ? await fetchData('Juuten_getFolderLists') : global,

    },
    reducers: {
        setConfiguration: (state, action) => {
            console.log(action.payload)
            return {
                ...state,
                configuration: {
                    ...state.configuration,
                    [action.payload.key]: action.payload.value
                }
            }
        },


    }
})
//
export default GlobalSlice.reducer
export const selectGlobal = (state) => state.global
export const {
    setConfiguration: addSetConfiguration
} = GlobalSlice.actions