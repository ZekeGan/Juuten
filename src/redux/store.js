import {combineReducers, configureStore} from "@reduxjs/toolkit";

import collection from './slice/collectionSlice'
import folder from './slice/folderSlice'

const reducer = combineReducers({
    collection,
    folder,
})


const store = configureStore({
    reducer: reducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false
    })
})

export default store

