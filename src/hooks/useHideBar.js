import React, { useEffect, useState } from 'react';

export default (ref, fn) => {
    const [hideNav, setHideNav] = useState(false)
    const [prevScroll, setPrevScroll] = useState(0)

    useEffect(() => {
        if (!ref) return
        ref.addEventListener('scroll', handleScroll, false);
    }, [prevScroll, ref])

    useEffect(() => {
        if (!!fn) fn(hideNav)
    }, [hideNav])

    function handleScroll() {
        const currentScrollPos = ref.scrollTop
        if (prevScroll < currentScrollPos && ref.scrollTop !== 0) {
            setHideNav(true)
        } else {
            setHideNav(false)
        }
        setPrevScroll(currentScrollPos)
        return () => ref.removeEventListener('scroll', handleScroll, false)
    }

    return hideNav
}
