import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {addAutoSave} from "../redux/slice/collectionSlice";

const useAutoSave = (type, key, msg, destination) => {
    const dispatch = useDispatch()
    const [isStart, setIsStart] = useState(false)

    function save() {
        dispatch(addAutoSave({
            type,
            msg,
            key,
            destination,
        }))
    }

    useEffect(() => {
        if (isStart) {
            const intervalId = setInterval(() => {
                save()
            }, 10000);
            return () => clearInterval(intervalId);
        }
    }, [isStart, msg]);


    return {
        setIsStart,
    };

};

export default useAutoSave;
