import React, {useEffect} from 'react';
import {addEditFolderId} from "../redux/slice/folderSlice";

const useClickToCancel = () => {
    function removeToolbar(e) {
        e.stopPropagation()
        dispatch(addEditFolderId(''))
        return document.removeEventListener('click', removeToolbar, false)
    }

    useEffect(() => {
        if (!!editFolderId) {
            document.addEventListener('click', removeToolbar, false)
        }
    }, [editFolderId])

};

export default useClickToCancel;
