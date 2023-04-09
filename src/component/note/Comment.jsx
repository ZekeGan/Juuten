import React, {useEffect, useMemo, useRef, useState} from 'react';
import styled from "styled-components";
import {global} from "../../assets/global";
import Toolbar from './TextingToolbar.jsx'
import {
    addAddAnimation,
    addAddNoteAnimation,
    addOpenEditToolbar,
    selectCollection
} from "../../redux/slice/collectionSlice";
import {useDispatch, useSelector} from "react-redux";
import Textarea from "./Textarea.jsx";
import Icon from '../../assets/svg.jsx'
import {Draggable} from "react-beautiful-dnd";

const {main, secondary, tertiary, fontColor, quaternary, transition_speed1, transition_speed2, font_size_m} = global

const Comment = styled.div`
    position: relative;
    width: 100%;
    transform: translateY(${({animation}) => animation ? '-100px' : '0'});
    ${transition_speed1}
    overflow: auto;
    border-left: 3px solid ${main};
    padding: 0 0 0 20px;
    margin: 20px 0 0 0;
    background-color: rgba(255, 255, 255, 0.5);
  
`
const DragHandle = styled.div`
    height: 100%;
    width: 15px;
    background-color: red;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translatey(-50%) ${({open}) => open ? '' : 'translatex(-15px)'};
    ${transition_speed1}`

const ShowOrHideComments = styled.div`
    display: flex;
    justify-content: center;
    border-top: 1px solid ${quaternary};
    margin-top: 10px;
    font-size: ${font_size_m}px;
    cursor: pointer;`


const App = (p) => {
    const dispatch = useDispatch()
    const {parentItem, comment, dragHandle} = p
    const {addNewCommentAnimation, openEditId} = useSelector(selectCollection)
    const [isOpenComment, setIsOpenComment] = useState(false)

    function openOrCloseComment() {
        dispatch(addOpenEditToolbar(''))
        setIsOpenComment(!isOpenComment)

    }
    useMemo(() => {
        setTimeout(() => {
            dispatch(dispatch(addAddAnimation('comment')))
        }, 0)
    }, [addNewCommentAnimation])



    return (
        <>
            {
                isOpenComment
                && comment.map((commentItem, idx) => (
                    <Draggable
                        key={`drag_key_${commentItem.key}`}
                        draggableId={`draggableId_${commentItem.key}`}
                        index={idx}
                        isDragDisabled={!(openEditId === parentItem.key)}
                    >
                        {
                            (provided) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                >
                                    <Comment animation={addNewCommentAnimation === comment.key}>
                                        <DragHandle open={openEditId === parentItem.key} {...provided.dragHandleProps}/>
                                        <Textarea item={commentItem}/>
                                    </Comment>
                                </div>
                            )
                        }
                    </Draggable>

                ))
            }
            {
                comment.length > 0
                && <ShowOrHideComments onClick={(e) => openOrCloseComment(e)}>
                    {isOpenComment ? '關閉' : `展開 ${comment.length} 則註解`}
                </ShowOrHideComments>
            }
        </>

    )


};

export default App
