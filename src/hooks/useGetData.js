import React, { useMemo } from 'react';
import store from "Store/store";
import { fetchData } from "../utils";

export default (active) => {
    const allFolder = useMemo(() => {
        const state = store.getState()
        let data = []
        state.folder.Juuten_folderLists
            .map(item => fetchData(item.key, [])
                .then(res => res.map(item2 => data.push({ ...item2, folderName: item.name }))))
        data
            .concat(state.collection.Juuten_Storage.map(item => ({ ...item, folderName: 'Storage' })))
            .filter(item => item !== undefined)
            .flat(1)
        return data
    }, [active])

    return allFolder
}