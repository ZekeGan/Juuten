import React, {forwardRef, useEffect, useImperativeHandle, useLayoutEffect, useRef, useState} from 'react';
import styled from "styled-components";
import {global} from "../../../assets/global";
import {useDispatch, useSelector} from "react-redux";
import {
    addDragEnd,
    addOpenEditToolbar,
    addRearrangeComment,
    selectCollection
} from "../../../redux/slice/collectionSlice";
import Textarea from "./Textarea.jsx";
import Url from "./Url.jsx";
import Comment from "./Comment.jsx";
import NoteTemplate from "../../../component/NoteTemplate.jsx";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";

const {transition_speed1, max_width, font_size_m, quaternary, main} = global

const ShowOrHideComments = styled.div`
    display: flex;
    justify-content: center;
    border-top: 1px solid ${quaternary};
    margin-top: 10px;
    font-size: ${font_size_m}px;
    cursor: pointer;`


const Note = (props) => {
    const {openEditId, addNewNoteAnimation, openEditParentId} = useSelector(selectCollection)
    const dispatch = useDispatch()
    const {item, noteProvided, area} = props
    const [isOpenComment, setIsOpenComment] = useState(false)

    function openOrCloseComment(payload) {
        if (isOpenComment && !!openEditId) {
            dispatch(addOpenEditToolbar(''))
            setIsOpenComment(false)
        } else {
            setIsOpenComment(!isOpenComment)
        }
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
        if (openEditParentId === item.key && !isOpenComment) {
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
                                (item.comment.length > 0 && isOpenComment) && item.comment.map((commentItem, idx) => (
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
                                && <ShowOrHideComments onClick={(e) => openOrCloseComment(e)}>
                                    {isOpenComment ? '關閉' : `展開 ${item.comment.length} 則註解`}
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