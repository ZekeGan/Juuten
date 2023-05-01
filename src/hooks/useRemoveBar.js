import React, { useEffect } from 'react';

export default (trigger, fn) => {
    function removeToolbar(e) {
        e.preventDefault()
        e.stopPropagation()
        e.stopImmediatePropagation()
        if (!!fn) fn()
        return document.removeEventListener('mouseup', removeToolbar, false)
    }

    useEffect(() => {
        if (!!trigger) {
            document.addEventListener('mouseup', removeToolbar, false)
        }
    }, [trigger])

}
