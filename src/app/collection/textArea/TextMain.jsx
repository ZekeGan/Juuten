import React, {useEffect, useLayoutEffect, useMemo, useRef, useState} from 'react';
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {
    addAddAnimation,
    addDragEnd,
    addOpenEditToolbar,
    addRearrangeNote,
    selectCollection,
} from "../../../redux/slice/collectionSlice";
import {global, autoFocus} from "../../../assets/global";
import Comment from "../note/Comment.jsx";
import Textarea from "../note/Textarea.jsx";
import Url from "../note/Url.jsx";
import Note from '../note/Note.jsx'
import ThisIsBottom from "../../../component/ThisIsBottom.jsx";
import Warning from "../../../component/Warning.jsx";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";


const {main, tertiary, secondary, quaternary, max_height, max_width, font_size_m} = global


/* main */
const TextMain = styled.div`
    position: relative;
    z-index: 1;
    width: ${max_width}px;
    height: ${max_height}px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 35px 10px 0 10px;
    overflow: scroll; 
    &::-webkit-scrollbar {
        width: 5px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: ${secondary};
        border-radius: 2.5px;
    }`


/* 底部 */

export default function App(p) {
    const dispatch = useDispatch()
    const {saveWarning, id, obj, area} = p
    const {addNewNoteAnimation, addNewCommentAnimation, openEditId} = useSelector(selectCollection)
    const data = obj[id]

    function dragEnd(e) {
        const {destination, source} = e
        if (!destination || !source) return
        dispatch(addRearrangeNote({
            area,
            destination,
            source
        }))
    }


    /* 新增筆記後的動畫 */
    useMemo(() => {
        setTimeout(() => {
            dispatch(addAddAnimation('note'))
        }, 0)
    }, [addNewNoteAnimation])


    return (
        <DragDropContext onDragEnd={(e) => dragEnd(e)}>
            <Droppable droppableId={`${area}_note_dropId_solo`}>
                {(provided, snapshot) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        <TextMain>
                            {
                                data.map((item, idx) => (
                                    <Draggable
                                        key={`${area}_note_key_${item.key}`}
                                        draggableId={`${area}_note_dragId_${item.key}`}
                                        index={idx}
                                    >
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                            >
                                                <Note
                                                    item={item}
                                                    area={area}
                                                    noteProvided={provided}
                                                />
                                            </div>
                                        )}
                                    </Draggable>
                                ))
                            }
                            {provided.placeholder}
                            <ThisIsBottom/>
                        </TextMain>
                    </div>
                )}
            </Droppable>
        </DragDropContext>

    );
}
