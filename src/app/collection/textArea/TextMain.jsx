import React, {useEffect, useLayoutEffect, useMemo, useState} from 'react';
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {addAddAnimation, addOpenEditToolbar, selectCollection,} from "../../../redux/slice/collectionSlice";
import {global, autoFocus} from "../../../assets/global";
import Comment from "../../../component/note/Comment.jsx";
import Textarea from "../../../component/note/Textarea.jsx";
import Url from "../../../component/note/Url.jsx";
import Note from '../../../component/note/Note.jsx'
import ThisIsBottom from "../../../component/ThisIsBottom.jsx";
import Warning from "../../../component/Warning.jsx";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";


const {main, tertiary, secondary, quaternary, max_height, max_width, font_size_m} = global


/* main */
const TextMain = styled.div`
    position: fixed;
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

const aa = ['aa', 'bb', 'cc']
export default function App(p) {
    const dispatch = useDispatch()
    const {saveWarning, id, obj} = p
    const {addNewNoteAnimation, addNewCommentAnimation, openEditId} = useSelector(selectCollection)
    const data = obj[id]
    const [isOpenComment, setIsOpenComment] = useState(false)


    /* 新增筆記後的動畫 */
    useMemo(() => {
        setTimeout(() => {
            dispatch(addAddAnimation('note'))
        }, 0)
    }, [addNewNoteAnimation])


    // return (
    //     <TextMain>
    //         <DragDropContext>
    //             <Droppable
    //                 key={'item.key'}
    //                 droppableId={`drog_key_s`}
    //                 // isDropDisabled={!(openEditId === item.key)}
    //             >
    //                 {(provided) => (
    //                     <div
    //                         ref={provided.innerRef}
    //                         {...provided.droppableProps}
    //                     >
    //                         {aa.map((item, idx) => (
    //                             <Draggable
    //                                 key={`drag_key_${idx}`}
    //                                 draggableId={`draggableId_${idx}`}
    //                                 index={idx}
    //                             >
    //                                 {
    //                                     (provided) => (
    //                                         <div
    //                                             ref={provided.innerRef}
    //                                             {...provided.draggableProps}
    //                                             {...provided.dragHandleProps}
    //                                         >
    //                                             <div>{item}</div>
    //
    //                                         </div>
    //                                     )
    //                                 }
    //                             </Draggable>
    //                         ))}
    //                         {provided.placeholder}
    //                     </div>
    //                 )}
    //             </Droppable>
    //         </DragDropContext>
    //     </TextMain>
    // );


    return (
        <TextMain>
            <Warning warning={saveWarning}>請退出編輯後再離開</Warning>
            <DragDropContext>
                {
                    data.map(item => (
                        <Droppable
                            key={item.key}
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
                                        isOpenComment={isOpenComment}
                                    >
                                        <Textarea item={item}/>
                                        <Url item={item}/>
                                        {
                                            (item.comment.length > 0)
                                            && <Comment
                                                parentItem={item}
                                                comment={item.comment}
                                                obj={obj}
                                                dragHandle={{...provided.dragHandleProps}}
                                            />
                                        }
                                    </Note>
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    ))
                }
            </DragDropContext>
            <ThisIsBottom/>
        </TextMain>
    );
}

export {TextMain}