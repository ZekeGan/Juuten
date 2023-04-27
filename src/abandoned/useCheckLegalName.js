import React, {useEffect, useState} from 'react';
import store from "../redux/store";
import {useSelector} from "react-redux";
import {selectFolder} from "../redux/slice/folderSlice";

const useCheckLegalName = (value) => {
    const {Juuten_folderLists: list} = useSelector(selectFolder)
    const [sameName, setSameName] = useState(false)
    const [regTest, setRegTest] = useState(false)
    const regex = /['"]/

    useEffect(() => {
        console.log(value)
        if (regex.test(value)) {
            setRegTest(regex.test(value))
            setTimeout(() => void setRegTest(false), 3000)
            return
        }
        if (list.find(folder => folder.name === value)) {
            console.log('same')
            setSameName(true)
            setTimeout(() => void setSameName(false), 3000)
            return
        }
    }, [value])

    return {
        sameName,
        regTest,
    }
};

export default useCheckLegalName;
