import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { selectFolder } from "slice/folderSlice";
import { addChangeIsHistory, addFetchData, selectCollection } from "slice/collectionSlice";

const useCheckHistory = () => {
    const dispatch = useDispatch()
    const { Juuten_Navigate_History } = useSelector(selectFolder)
    const { isHistoryLoad } = useSelector(selectCollection)
    const navigate = useNavigate()
    useEffect(() => {
        if (isHistoryLoad) return
        if (!Object.keys(Juuten_Navigate_History).length) {
            dispatch(addChangeIsHistory())
            return
        }
        dispatch(addFetchData({
            item: Juuten_Navigate_History,
            fn: navigate(`/collection/${Juuten_Navigate_History.key}`)
        }))
    }, [])
};

export default useCheckHistory;
