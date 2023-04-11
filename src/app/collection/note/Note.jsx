import React, {forwardRef, useEffect, useImperativeHandle, useLayoutEffect, useRef, useState} from 'react';
import styled from "styled-components";
import {global} from "../../../assets/global";
import {useDispatch, useSelector} from "react-redux";
import {addOpenEditToolbar, selectCollection} from "../../../redux/slice/collectionSlice";
import Textarea from "./Textarea.jsx";
import Url from "./Url.jsx";
import Comment from "./Comment.jsx";

const {transition_speed1, max_width, font_size_m, quaternary, main} = global
const Page = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    background-color: ${({noteType}) => noteType ? '#fffab9' : 'white'};
    border-radius: 10px;
    box-shadow: 2px 2px 2px 2px rgba(0,0,0,0.2);
    overflow: hidden;
    width: ${max_width * 0.95}px;
    margin: 5px 0;
    ${({add}) => add ? 'transform: translateY(-150px);' : ''}
    ${transition_speed1}
    padding: 5px 15px 5px 25px;`

const ShowOrHideComments = styled.div`
    display: flex;
    justify-content: center;
    border-top: 1px solid ${quaternary};
    margin-top: 10px;
    font-size: ${font_size_m}px;
    cursor: pointer;`

const NoteDragHandle = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 15px;
    > .handle {
        height: 100%;
        width: 100%;
        background-color: ${main};
        transform: translatex(${(p) => p.show ? '0' : '-100%'});
        ${transition_speed1} 
    }
    
`

const Note = (props) => {
    const {openEditId, addNewNoteAnimation, openEditParentId} = useSelector(selectCollection)
    const dispatch = useDispatch()
    const {item, provided, noteProvided} = props
    const mainRef = useRef(null)
    const [isOpenComment, setIsOpenComment] = useState(false)
    const [handleShow, setHandleShow] = useState(false)
    const [isClick, setIsClick] = useState(false)

    function openOrCloseComment(payload) {
        if (isOpenComment && !!openEditId) {
            dispatch(addOpenEditToolbar(''))
            setIsOpenComment(false)
        }
        else {
            setIsOpenComment(!isOpenComment)
        }
    }

    useEffect(() => {
        if (openEditParentId === item.key && !isOpenComment) {
            openOrCloseComment()
        }
    }, [item])

    function mouseUpFn() {
        setHandleShow(false)
        setIsClick(false)
        return document.removeEventListener('mouseup', mouseUpFn, false)
    }

    useEffect(() => {
        if (isClick) {
            document.addEventListener('mouseup', mouseUpFn, false)
        }
    }, [isClick])




    return (
        <Page
            noteType={item?.noteType === 'note'}
            open={item?.key === openEditId}
            add={item === addNewNoteAnimation}
            ref={mainRef}
        >
            <NoteDragHandle
                show={handleShow}
                onMouseEnter={() => setHandleShow(true)}
                onMouseDown={() => setIsClick(true)}
                onMouseLeave={() => !isClick && setHandleShow(false)}
                {...noteProvided?.dragHandleProps}
            >
                <div className={'handle'}/>
            </NoteDragHandle>

            <Textarea item={item}/>
            <Url item={item}/>
            {
                (item.comment.length > 0 && isOpenComment)
                && <Comment
                    parentItem={item}
                    comment={item.comment}
                    dragHandle={{...provided?.dragHandleProps}}
                />
            }
            {provided?.placeholder}
            {
                item.comment.length > 0
                && <ShowOrHideComments onClick={(e) => openOrCloseComment(e)}>
                    {isOpenComment ? '關閉' : `展開 ${item.comment.length} 則註解`}
                </ShowOrHideComments>
            }
        </Page>
    );
}

export default Note;