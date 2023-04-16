import React, {useEffect, useRef} from 'react';
import {selectCollection} from "../../../redux/slice/collectionSlice";
import {useSelector} from "react-redux";
import DraftComponent from "../../DraftComponent.jsx";
import TextingToolbar from "./TextingToolbar.jsx";


function Textarea({item, showToolbar = true}) {
    const draftRef = useRef(null)
    const {openEditId, addNewCommentAnimation} = useSelector(selectCollection)

    useEffect(() => {
        if (openEditId === item.key && item.type !== 'storage') {
            draftRef.current?.autoFocus(addNewCommentAnimation, addNewCommentAnimation === openEditId)
        }
    }, [openEditId])

    useEffect(() => {
        if (!item && !draftRef.current) return
        draftRef.current?.upDate(item.msg)
    }, [item.msg])

    return (
        <>
            <div id={`scrollIntoView_${item.key}`}/>

            <TextingToolbar
                item={item}
                draftRef={draftRef}
                draftCurrent={draftRef.current}
                showToolbar={showToolbar}
            />


            <DraftComponent
                item={item.msg}
                readOnly={openEditId !== item.key}
                ref={draftRef}
            />
        </>

    );
}

export default Textarea;