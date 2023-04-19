import {createSlice} from "@reduxjs/toolkit";
import {initialConfiguration} from "../../assets/global";
import {fetchDataObject, setDataToLocal} from "../../utils";


export const GlobalSlice = createSlice({
    name: 'global',
    initialState: {
        // configuration: initialConfiguration,
        configuration: await fetchDataObject('Juuten_Configuration')

    },
    reducers: {
        setConfiguration: (state, action) => {
            console.log(action.payload)

            const newConfig = {
                ...state.configuration,
                [action.payload.key]: action.payload.value
            }
            console.log(newConfig)

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