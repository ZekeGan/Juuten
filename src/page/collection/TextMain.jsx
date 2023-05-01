import React, { useMemo, useRef } from 'react';
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import {addAddAnimation,addRearrangeNote,selectCollection,} from "slice/collectionSlice";
import { selectGlobal } from "slice/globalSlice";

import Note from 'com/collection/Note.jsx'
import ThisIsBottom from "com/ThisIsBottom.jsx";
import useHideBar from 'hook/useHideBar';


/* main */
const TextMain = styled.div`
    position: relative;
    width: ${({ config }) => config.max_width}px;
    height: ${({ area, config }) => area ? '100%' : `${config.max_height}px`};
    padding: ${({ area }) => area ? '30px 10px 30px 10px' : '50px 10px 30px 10px'} ;
    overflow-y: scroll; 
    overflow-x: hidden;
    &::-webkit-scrollbar {
        width: 5px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: ${({ config }) => config.tertiary};
        border-radius: 2.5px;
    }
    `

const DropWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

export default (
    {
        area,
        barArea,
        data = [],
        setHide = () => { },
    }) => {
    const dispatch = useDispatch()
    const { addNewNoteAnimation } = useSelector(selectCollection)
    const { configuration: config } = useSelector(selectGlobal)
    const mainRef = useRef(null)
    area === 'textMain' && useHideBar(mainRef.current, setHide)

    function dragEnd(e) {
        const { destination, source } = e
        if (!destination || !source) return
        dispatch(addRearrangeNote({ area, destination, source }))
    }

    /* 新增筆記後的動畫 */
    useMemo(() => {
        if (!addNewNoteAnimation) return
        setTimeout(() => dispatch(addAddAnimation()), 0)
    }, [addNewNoteAnimation])

    return (
        <DragDropContext onDragEnd={(e) => dragEnd(e)}>
            <TextMain
                config={config}
                area={area === 'storage'}
                ref={mainRef}
            >
                <Droppable droppableId={`${area}_note_dropId_solo`}>
                    {(provided) => (
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
                                                barArea={barArea}
                                                noteProvided={provided}
                                            />
                                        </div>
                                    )}
                                </Draggable>
                            ))}

                            {provided.placeholder}

                            {!config.thisIsBottom
                                && <ThisIsBottom />}
                        </DropWrapper>
                    )}
                </Droppable>
            </TextMain>
        </DragDropContext>
    );
}
