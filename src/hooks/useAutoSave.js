import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {addAutoSave} from "../redux/slice/collectionSlice";

const useAutoSave = (type, key, msg, destination) => {
    const dispatch = useDispatch()
    const [isStart, setIsStart] = useState(false)
    const [countToSave, setCountToSave] = useState(false)

    function save() {
        dispatch(addAutoSave({type, msg, key, destination,}))
    }

    useEffect(() => {
        if (isStart) {
            const timer = setInterval(() => {
                setCountToSave(prev => !prev)
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [isStart])

    useEffect(() => {
        if (isStart) save()
    }, [isStart, countToSave]);


    return {setIsStart,};
};

export default useAutoSave;
