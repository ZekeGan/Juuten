import React, {useEffect} from 'react';

const useRemoveBar = (trigger, fn) => {

    function removeToolbar(e) {
        e.preventDefault()
        e.stopPropagation()
        e.stopImmediatePropagation()
        console.log('stop')
        if (!!fn) fn()
        return document.removeEventListener('mouseup', removeToolbar, false)
    }

    useEffect(() => {
        if (!!trigger) {
            document.addEventListener('mouseup', removeToolbar, false)
        }
    }, [trigger])

};

export default useRemoveBar;
