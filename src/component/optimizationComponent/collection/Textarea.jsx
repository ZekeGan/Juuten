import React, {useEffect, useRef, useState} from 'react';
import DraftComponent from "../DraftComponent.jsx";
import TextingToolbar from "./textingToolbar/TextingToolbar.jsx";


const isEqual = (prevProps, nextProps) => {
    return prevProps.item.msg === nextProps.item.msg && prevProps.open === nextProps.open
}

const Textarea = React.memo((
    {
        area,
        item,
        showToolbar = true,
        open,
        barArea,
    }) => {
    const draftRef = useRef(null)
    const [inlineStyle, setInlineStyle] = useState([])

    useEffect(() => {
        if (!item && !draftRef.current) return
        if (open) {
            console.log('editing open')
            draftRef.current?.autoFocus()
        }
    },[open])

    console.log(inlineStyle)

    console.log('text ' + item.key )

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
                }}
            />
        </>

    );
}, isEqual)

export default Textarea;