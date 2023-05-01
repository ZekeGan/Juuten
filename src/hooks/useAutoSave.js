import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { addAutoSave } from "slice/collectionSlice";

const useAutoSave = (type, key, msg) => {
    const dispatch = useDispatch()
    const [isStart, setIsStart] = useState(false)
    const [countToSave, setCountToSave] = useState(false)

    function save() {
        dispatch(addAutoSave({ type, msg, key }))
    }

    useEffect(() => {
        if (isStart) {
            const timer = setInterval(() => {
                setCountToSave(prev => !prev)
            }, 10000);
            return () => clearInterval(timer);
        }
    }, [isStart])

    useEffect(() => {
        if (isStart) save()
    }, [isStart, countToSave]);


    return { setIsStart };
};

export default useAutoSave;
