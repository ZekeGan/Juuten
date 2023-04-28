import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addChangeIsHistory, selectFolder} from "../redux/slice/folderSlice";
import {useParams} from "react-router-dom";
import {addFetchData, selectCollection} from "../redux/slice/collectionSlice";

const useGetCollectionData = () => {
    const {id} = useParams()
    const {Juuten_Navigate_History, isHistoryLoad} = useSelector(selectFolder)
    const {[id]: currData} = useSelector(selectCollection)

    useEffect(() => {
        if (!Object.keys(Juuten_Navigate_History).length || isHistoryLoad) return
    }, [])

    return {currData}
};

export default useGetCollectionData;
