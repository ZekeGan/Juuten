import React, {useEffect, useState} from 'react';

const useHideBar = (ref) => {
    const [hideNav, setHideNav] = useState(false)
    const [prevScroll, setPrevScroll] = useState(0)

    useEffect(() => {
        if (!ref) return
        ref.addEventListener('scroll', handleScroll, false);
    }, [prevScroll, ref])

    function handleScroll() {
        const currentScrollPos = ref.scrollTop;
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
