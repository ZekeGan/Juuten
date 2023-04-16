import React, {useMemo} from 'react';
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {addAddAnimation, selectCollection} from "../../../redux/slice/collectionSlice";
import {selectGlobal} from "../../../redux/slice/globalSlice";
import Textarea from "./Textarea.jsx";


const Comment = styled.div`
    position: relative;
    width: 100%;
    transform: translateY(${({animation}) => animation ? '-100px' : '0'});
    transition: 0.2s ease-out;
    overflow: auto;
    padding: 10px 10px 10px 25px;
    background-color: rgba(255, 255, 255, 0.5);
  
`
const DragHandle = styled.div`
    height: calc(100% - 20px);
    width: 15px;
    background-color: ${({config}) => config.main};
    position: absolute;
    left: 0;
    top: 50%;
    transform: translatey(-50%) ${({open}) => open ? '' : 'translatex(-12px)'};
    transition: 0.2s ease-out;`


const App = (
    {
        item,
        open,
        provided,
        showToolbar = true
    }) => {
    const dispatch = useDispatch()
    const {addNewCommentAnimation, openEditId} = useSelector(selectCollection)
    const {configuration: config} = useSelector(selectGlobal)

    useMemo(() => {
        setTimeout(() => {
            dispatch(dispatch(addAddAnimation('comment')))
        }, 0)
    }, [addNewCommentAnimation])

    return (
        <Comment config={config} animation={addNewCommentAnimation === item.key}>
            <DragHandle
                config={config}
                open={open}
                {...provided?.dragHandleProps}
            />
            <Textarea item={item} showToolbar={showToolbar}/>
        </Comment>

    )


}

export default App
