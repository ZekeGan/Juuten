import React, {useEffect, useLayoutEffect, useRef} from 'react';
import styled from "styled-components";
import {global} from "../../assets/global";
import {useSelector} from "react-redux";
import {selectCollection} from "../../redux/slice/collectionSlice";

const {transition_speed1, max_width} = global
const Page = styled.div`
    background-color: ${({noteType}) => noteType ? '#fffab9' : 'white'};
    border-radius: 10px;
    box-shadow: 2px 2px 2px 2px rgba(0,0,0,0.2); 
    width: ${max_width * 0.95}px;
    margin: 5px 0;
    ${({add}) => add ? 'transform: translateY(-150px);' : ''}
    ${transition_speed1}
    padding: 5px 15px 5px;`

function Note(props) {
    const {openEditId, addNewNoteAnimation} = useSelector(selectCollection)
    const {item, isOpenComment} = props
    const mainRef = useRef(null)

    useEffect(() => {
        if (isOpenComment) {
            mainRef.current.style.height = mainRef.current.offsetHeight + 'px'
        }
        else {
            mainRef.current.style.height = ''
        }
    }, [isOpenComment])

    return (
        <Page
            noteType={item?.noteType === 'note'}
            open={item?.key === openEditId}
            add={item === addNewNoteAnimation}
            ref={mainRef}
        >
            {props?.children}
        </Page>
    );
}

export default Note;