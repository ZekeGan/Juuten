import React, {useEffect, useMemo, useRef, useState} from 'react';

import DraftComponent from "../DraftComponent.jsx";
import TextingToolbar from "./textingToolbar/TextingToolbar.jsx";


const isEqual = (prevProps, nextProps) => {
    // if (!nextProps.item || !prevProps.item) return true
    // console.log('prev ', prevProps)
    // console.log('next ', nextProps)
    return prevProps.item.msg === nextProps.item.msg && prevProps.open === nextProps.open
}

const Textarea = React.memo((
    {
        area,
        item,
        showToolbar = true,
        open,
        barArea,
        folderId
    }) => {
    const draftRef = useRef(null)
    const [inlineStyle, setInlineStyle] = useState([])

    useEffect(() => {
        if (!item && !draftRef.current) return
        draftRef.current?.upDate(item.msg)
    }, [item.msg])

    console.log('text ' + area)

    return (
        <>
            <TextingToolbar
                keys={item.key}
                open={open}
                item={item}
                draftRef={draftRef}
                showToolbar={showToolbar}
                inlineStyle={inlineStyle}
                barArea={barArea}
            />
            <DraftComponent

                item={item.msg}
                readOnly={!open}
                ref={draftRef}
                setInlineStyle={setInlineStyle}
                open={open}
                autoSave={{
                    type: area,
                    key: item.key,
                    destination: folderId
                }}
            />
        </>

    );
}, isEqual)

export default Textarea;