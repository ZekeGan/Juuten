import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {

    addOpenEditToolbar, addOpenOrCloseComment,
    addRearrangeComment,
    selectCollection
} from "../../../redux/slice/collectionSlice";
import Textarea from "./Textarea.jsx";
import Url from "../../pureComponent/Url.jsx";
import Comment from "./Comment.jsx";
import NoteTemplate from "../NoteTemplate.jsx";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import {selectGlobal} from "../../../redux/slice/globalSlice";


const ShowOrHideComments = styled.div`
    display: flex;
    justify-content: center;
    border-top: 1px solid ${({config}) => config.secondary};
    margin-top: 10px;
    font-size: ${({config}) => config.font_size_m}px;
    cursor: pointer;`


const Note = ({item, noteProvided, area}) => {
    const {openEditId, addNewNoteAnimation, openEditParentId} = useSelector(selectCollection)
    const dispatch = useDispatch()
    const {configuration: config} = useSelector(selectGlobal)

    function openOrCloseComment(payload) {
        if (!!openEditId) dispatch(addOpenEditToolbar(''))
        dispatch(addOpenOrCloseComment(item.key))
    }

    function dragEnd(e) {
        const {destination, source} = e
        if (!destination || !source) return
        dispatch(addRearrangeComment({
            area,
            destination,
            source,
        }))
    }

    useEffect(() => {
        if (openEditParentId === item.key && !item.isOpenComment) {
            openOrCloseComment()
        }
    }, [item])


    return (
        <DragDropContext onDragEnd={(e) => dragEnd(e)}>
            <Droppable
                droppableId={`${area}_comment_drogId_${item.key}`}
                isDropDisabled={!(openEditId === item.key)}
            >
                {(provided) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        <NoteTemplate
                            add={item === addNewNoteAnimation}
                            provided={noteProvided}
                        >
                            <Textarea item={item}/>
                            <Url item={item}/>
                            {
                                (item.comment.length > 0 && item.isOpenComment)
                                && item.comment.map((commentItem, idx) => (
                                    <Draggable
                                        key={`${area}_comment_key_${commentItem.key}`}
                                        draggableId={`${area}_comment_dragId_${commentItem.key}`}
                                        index={idx}
                                        isDragDisabled={!(openEditId === item.key)}
                                    >
                                        {
                                            (commentProvided) => (
                                                <div
                                                    ref={commentProvided.innerRef}
                                                    {...commentProvided.draggableProps}
                                                >
                                                    <Comment
                                                        item={commentItem}
                                                        open={openEditId === item.key}
                                                        provided={commentProvided}
                                                    />
                                                </div>
                                            )
                                        }
                                    </Draggable>
                                ))
                            }
                            {provided?.placeholder}
                            {
                                item.comment.length > 0
                                && <ShowOrHideComments config={config} onClick={(e) => openOrCloseComment(e)}>
                                    {item.isOpenComment ? '關閉' : `展開 ${item.comment.length} 則註解`}
                                </ShowOrHideComments>
                            }
                        </NoteTemplate>
                    </div>
                )}
            </Droppable>
        </DragDropContext>


    );
}

export default Note;