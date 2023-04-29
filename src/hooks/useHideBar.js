import React, { useEffect, useState } from 'react';

const useHideBar = (ref, fn) => {
    const [hideNav, setHideNav] = useState(false)
    const [prevScroll, setPrevScroll] = useState(0)

    console.log(ref);

    useEffect(() => {
        if (!ref) return
        ref.addEventListener('scroll', handleScroll, false);
    }, [prevScroll, ref])

    useEffect(() => {
        if (!!fn) fn(hideNav)
    }, [hideNav])

    function handleScroll() {
        const currentScrollPos = ref.scrollTop
        console.log('scroll');
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

export default useHideBar;
