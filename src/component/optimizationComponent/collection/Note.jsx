import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
    addOpenEditToolbar, addOpenOrCloseComment,
    addRearrangeComment,
    selectCollection
} from "../../../redux/slice/collectionSlice";
import Textarea from "./Textarea.jsx";
import Url from "../Url.jsx";
import Comment from "./Comment.jsx";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { selectGlobal } from "../../../redux/slice/globalSlice";
import useRemoveBar from "../../../hooks/useRemoveBar";


const Page = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    background-color: ${({ noteType }) => noteType ? '#fffab9' : 'white'};
    border-radius: 10px;
    box-shadow: 2px 2px 2px 2px rgba(0,0,0,0.1);
    overflow: hidden;
    width: ${({ config }) => config.max_width * 0.95}px;
    margin: 5px 0;
    ${({ add }) => add ? 'transform: translateY(-150px);' : ''}
    transition: 0.2s ease-out;
    padding: 5px 15px 5px 25px;`

const NoteDragHandle = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 15px;
    > .handle {
        height: 100%;
        width: 100%;
        background-color: ${({ config }) => config.main};
        transform: translatex(${(p) => p.show ? '0' : '-100%'});
        transition: 0.2s ease-out; 
    }`

const ShowOrHideComments = styled.div`
    display: flex;
    justify-content: center;
    border-top: 1px solid ${({ config }) => config.secondary};
    margin-top: 10px;
    font-size: ${({ config }) => config.font_size_s}px;
    cursor: pointer;`




const Note = React.memo((
    {
        item,
        noteProvided,
        area,
        barArea,
    }) => {
    const dispatch = useDispatch()
    const { configuration: config } = useSelector(selectGlobal)
    const { openEditId, addNewNoteAnimation } = useSelector(selectCollection)
    const [handleShow, setHandleShow] = useState(false)
    const [isClick, setIsClick] = useState(false)

    useRemoveBar(isClick, () => {
        setHandleShow(false)
        setIsClick(false)
    })

    function openOrCloseComment() {
        if (!!openEditId) dispatch(addOpenEditToolbar(''))
        dispatch(addOpenOrCloseComment({ area, key: item.key }))
    }

    function dragEnd(e) {
        const { destination, source } = e
        if (!destination || !source) return
        dispatch(addRearrangeComment({ area, destination, source }))
    }

    return (
        <DragDropContext onDragEnd={(e) => dragEnd(e)}>
            <Page
                config={config}
                add={item === addNewNoteAnimation}
            >
                <Droppable
                    droppableId={`${area}_comment_drogId_${item.key}`}
                    isDropDisabled={!(openEditId === item.key)}
                >
                    {(provided) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {!!Object.keys(provided).length
                                && <NoteDragHandle
                                    config={config}
                                    show={handleShow}
                                    onMouseEnter={() => setHandleShow(true)}
                                    onMouseDown={() => setIsClick(true)}
                                    onMouseLeave={() => !isClick && setHandleShow(false)}
                                    {...noteProvided?.dragHandleProps}
                                >
                                    <div className={'handle'} />
                                </NoteDragHandle>}

                            <Textarea
                                area={area}
                                item={item}
                                open={openEditId === item.key}
                                barArea={barArea}
                            />

                            <Url item={item} />


                            {(item.comment.length > 0 && item.isOpenComment)
                                && item.comment.map((commentItem, idx) => (
                                    <Draggable
                                        key={`${area}_comment_key_${commentItem.key}`}
                                        draggableId={`${area}_comment_dragId_${commentItem.key}`}
                                        index={idx}
                                        isDragDisabled={!(openEditId === item.key)}
                                    >
                                        {(commentProvided) => (
                                            <div
                                                ref={commentProvided.innerRef}
                                                {...commentProvided.draggableProps}
                                            >
                                                <Comment
                                                    area={area}
                                                    item={commentItem}
                                                    open={openEditId === item.key}
                                                    provided={commentProvided}
                                                />
                                            </div>
                                        )}
                                    </Draggable>
                                ))}

                            {provided?.placeholder}

                            {item.comment.length > 0
                                && <ShowOrHideComments
                                    config={config}
                                    onClick={(e) => openOrCloseComment(e)}
                                >
                                    {item.isOpenComment ? '關閉' : `展開 ${item.comment.length} 則註記`}
                                </ShowOrHideComments>}
                        </div>
                    )}
                </Droppable>
            </Page>
        </DragDropContext>
    );
},
    (prevProps, nextProps) => {
        if (!nextProps.item || !prevProps.item) return true
        if (prevProps.item !== nextProps.item) return false
        return prevProps.item.isOpenComment === nextProps.item.isOpenComment
    }
)

export default Note;