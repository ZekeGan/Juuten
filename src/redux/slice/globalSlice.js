import { createSlice } from "@reduxjs/toolkit";
import { initialConfiguration } from "assets/global";
import { fetchData, setDataToLocal } from "src/utils";


export const GlobalSlice = createSlice({
    name: 'global',
    initialState: {
        configuration: await fetchData('Juuten_Configuration', initialConfiguration)
    },
    reducers: {
        setConfiguration: (state, action) => {
            const newConfig = {
                ...state.configuration,
                [action.payload.key]: action.payload.value
            }
            setDataToLocal('Juuten_Configuration', newConfig)
            return {
                ...state,
                configuration: newConfig
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