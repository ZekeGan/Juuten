import React, {useEffect, useMemo, useRef, useState} from 'react';
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {
    addAddAnimation,
    addRearrangeNote,
    selectCollection,
} from "../../../redux/slice/collectionSlice";

import Note from '../../../component/collection/note/Note.jsx'
import ThisIsBottom from "../../../component/pureComponent/ThisIsBottom.jsx";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import {selectGlobal} from "../../../redux/slice/globalSlice";




/* main */
const TextMain = styled.div`
    position: relative;
    z-index: 1;
    width: ${({config}) => config.max_width}px;
    height: ${({area, config}) => area ? '100%' : `${config.max_height}px`};
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: ${({area}) => area ? '30px 10px 0 10px' : '50px 10px 0 10px'} ;
    overflow: scroll; 
    &::-webkit-scrollbar {
        width: 5px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: ${({config}) => config.secondary};
        border-radius: 2.5px;
    }`

export default function App({saveWarning, id, obj, area, setHideNav}) {
    const dispatch = useDispatch()
    const {addNewNoteAnimation} = useSelector(selectCollection)
    const {configuration: config} = useSelector(selectGlobal)
    const data = obj[id]
    const textMainRef = useRef(null)
    const [prevScroll, setPrevScroll] = useState(0)


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

    function handleScroll() {
        const currentScrollPos = textMainRef.current.scrollTop;
        if (prevScroll < currentScrollPos && textMainRef.current.scrollTop !== 0) {
            setHideNav(true)
        } else {
            setHideNav(false)
        }
        setPrevScroll(currentScrollPos)
        return () => textMainRef.current.removeEventListener('scroll', handleScroll, false)
    }

    useEffect(() => {
        if (!textMainRef.current) return
        textMainRef.current.addEventListener('scroll', handleScroll, false);
    }, [prevScroll]);

    return (
        <DragDropContext
            onDragEnd={(e) => dragEnd(e)}>
            <Droppable droppableId={`${area}_note_dropId_solo`}>
                {(provided, snapshot) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        <TextMain config={config} ref={textMainRef} area={area === 'storage'}>
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
                            {
                                !config.thisIsBottom
                                && <ThisIsBottom/>
                            }

                        </TextMain>
                    </div>
                )}
            </Droppable>
        </DragDropContext>

    );
}
