import React, {useEffect, useMemo, useRef, useState} from 'react';
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {
    addAddAnimation,
    addRearrangeNote,
    selectCollection,
} from "../../redux/slice/collectionSlice";

import Note from '../../component/optimizationComponent/collection/Note.jsx'
import ThisIsBottom from "../../component/optimizationComponent/ThisIsBottom.jsx";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import {selectGlobal} from "../../redux/slice/globalSlice";
import useHideBar from "../../hooks/useHideBar";


/* main */
const TextMain = styled.div`
    position: relative;
    z-index: 1;
    width: ${({config}) => config.max_width}px;
    height: ${({area, config}) => area ? '100%' : `${config.max_height}px`};
    padding: ${({area}) => area ? '30px 10px 0 10px' : '50px 10px 0 10px'} ;
    overflow: scroll; 
    &::-webkit-scrollbar {
        width: 5px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: ${({config}) => config.secondary};
        border-radius: 2.5px;
    }`

const DropWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

export default (
    {
        area,
        where,
        data = [],
        setHide = () => {
        }
    }) => {
    const dispatch = useDispatch()
    const {addNewNoteAnimation} = useSelector(selectCollection)
    const {configuration: config} = useSelector(selectGlobal)

    const textMainRef = useRef(null)
    const hideNav = useHideBar(textMainRef.current)

    useEffect(() => {
        setHide(hideNav)
    }, [hideNav])

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
            <TextMain config={config} area={area === 'storage'} ref={textMainRef}>
                <Droppable droppableId={`${area}_note_dropId_solo`}>
                    {(provided, snapshot) => (
                        <DropWrapper
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {data.map((item, idx) => (
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
                                                where={where}
                                                noteProvided={provided}
                                            />
                                        </div>
                                    )}
                                </Draggable>
                            ))}

                            {provided.placeholder}

                            {!config.thisIsBottom
                            && <ThisIsBottom/>}
                        </DropWrapper>
                    )}
                </Droppable>
            </TextMain>
        </DragDropContext>

    );
}
