import React, {useEffect, useRef} from 'react';
import {selectCollection} from "../../redux/slice/collectionSlice";
import {useSelector} from "react-redux";
import DraftComponent from "../DraftComponent.jsx";
import TextingToolbar from "./TextingToolbar.jsx";


function Textarea(props) {
    const {item} = props
    const draftRef = useRef(null)
    const {openEditId, addNewCommentAnimation} = useSelector(selectCollection)

    useEffect(() => {
        if (openEditId === item.key && item.type !== 'storage') draftRef.current?.autoFocus(addNewCommentAnimation, addNewCommentAnimation === openEditId)
    }, [openEditId])

    return (
        <>
            <div id={`scrollIntoView_${item.key}`}/>
            <TextingToolbar
                item={item}
                draftRef={draftRef}
                draftCurrent={draftRef.current}
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