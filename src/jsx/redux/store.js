import {combineReducers, configureStore} from "@reduxjs/toolkit";

import collection from './slice/collectionSlice'

const reducer = combineReducers({
    collection
})


const store = configureStore({
    reducer: reducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false
    })
})

export default store

