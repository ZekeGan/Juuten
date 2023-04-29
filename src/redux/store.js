import { combineReducers, configureStore } from "@reduxjs/toolkit";

import collection from './slice/collectionSlice'
import folder from './slice/folderSlice'
import global from './slice/globalSlice'

const reducer = combineReducers({
    collection,
    folder,
    global
})


const store = configureStore({
    reducer: reducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false
    })
})

export default store

