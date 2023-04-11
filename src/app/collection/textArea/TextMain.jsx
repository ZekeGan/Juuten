import React, {useEffect, useLayoutEffect, useMemo, useRef, useState} from 'react';
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {addAddAnimation, addDragEnd, addOpenEditToolbar, selectCollection,} from "../../../redux/slice/collectionSlice";
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
    padding: 5px 10px 10px 10px;
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
    const {saveWarning, id, obj, noteProvided} = p
    const {addNewNoteAnimation, addNewCommentAnimation, openEditId} = useSelector(selectCollection)
    const data = obj[id]

    function dragEnd(e) {
        const {destination, source} = e
        if (!destination || !source) return
        dispatch(addDragEnd({
            destination,
            source,
        }))
    }

    /* 新增筆記後的動畫 */
    useMemo(() => {
        setTimeout(() => {
            dispatch(addAddAnimation('note'))
        }, 0)
    }, [addNewNoteAnimation])

    return (
        <TextMain>
            {
                data.map((item, idx) => (
                    <Draggable
                        key={item.key}
                        draggableId={`Note-drag-key-${item.key}`}
                        index={idx}
                    >
                        {
                            (noteProvided) => (
                                <div
                                    ref={noteProvided.innerRef}
                                    {...noteProvided.draggableProps}
                                >
                                    <DragDropContext
                                        onDragEnd={(e) => dragEnd(e)}
                                    >
                                        <Droppable
                                            droppableId={`drog_key_${item.key}`}
                                            isDropDisabled={!(openEditId === item.key)}
                                        >
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.droppableProps}
                                                >
                                                    <Note
                                                        item={item}
                                                        noteProvided={noteProvided}
                                                        provided={provided}
                                                    />
                                                </div>
                                            )}
                                        </Droppable>

                                    </DragDropContext>
                                </div>

                            )
                        }
                    </Draggable>

                ))
            }
            {noteProvided.placeholder}
            <ThisIsBottom/>
        </TextMain>
    );
}


export {TextMain}