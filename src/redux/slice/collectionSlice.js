import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {fetchData, getCurrentDate} from "../utils";
// import store from "../store";

const thunkData = createAsyncThunk(
    '',
    async (payload) => {
        console.log('在函數裡')
        return {
            index: payload.index,
            value: await fetchData(payload.index),
            fn: payload.fn
        }
    })


export const CollectionSlice = createSlice({
    name: 'collection',
    initialState: {
        openStorage: false,
        openBar: false,
        openEditToolbar: false,
        openEditId: '',
        Juuten_storage: [],//await fetchData('Juuten_storage'),
        addNewNoteAnimation: '',

        N1: [{
            key: 1,
            favIconUrl: '',
            url: 'https://',
            currentDate: '2022',
            msg: `fds
            
            
            f
            d
            
            s
            fsd
            s
            f
            sd
            fsd
            f
            sd
            f
            f
            d
            fs
            fsd
            
            fds
            fds
            fs
            df
            df
            ds
            fsd
            f
            sd
            fsd
            `
        }, {
            key: 30,
            favIconUrl: '',
            url: 'https://',
            currentDate: '2022',
            msg: 'hi'
        }, {
            key: 2,
            favIconUrl: '',
            url: 'https://',
            currentDate: '2022',
            msg: 'hi'
        }],


    },
    reducers: {
        openStorage: (state, action) => {
            state.openStorage = action.payload === 'open'
        },
        openBar: (state, action) => {
            state.openBar = action.payload === 'open'
        },
        openEditToolbar: (state, action) => {
            state.openEditId = action.payload
        },
        addNewNote: (state, action) => {
            let max
            let currentState = [...state[action.payload]]
            currentState.length < 1 ? max = 0 : max = Math.max(...currentState.map(i => i.key))
            let newNote = {
                key: ++max,
                favIconUrl: '',
                url: '',
                currentDate: getCurrentDate(),
                msg: ''
            }
            state[action.payload].unshift(newNote)
            state.addNewNoteAnimation = newNote
        },
        addNoteAnimation: (state, action) => {
            state.addNewNoteAnimation = ''
        }
    },
    extraReducers: (builder) => {
        builder.addCase(thunkData.fulfilled, (state, action) => {
            console.log(action)
            const currentData = {...state, [action.payload.index]: action.payload.value}
            action.payload.fn()
            return currentData
        })
    }
})

export default CollectionSlice.reducer
export const selectCollection = (state) => state.collection

export const addFetchData = (payload) => thunkData(payload)
export const addOpenStorage = (payload) => CollectionSlice.actions.openStorage(payload)
export const addOpenBar = (payload) => CollectionSlice.actions.openBar(payload)
export const addOpenEditToolbar = (payload) => CollectionSlice.actions.openEditToolbar(payload)
export const addAddNewNote = (payload) => CollectionSlice.actions.addNewNote(payload)
export const addAddNoteAnimation = (payload) => CollectionSlice.actions.addNoteAnimation(payload)
