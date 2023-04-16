import React from 'react';
import styled from "styled-components";
import {useSelector} from "react-redux";
import {selectGlobal} from "../redux/slice/globalSlice";


const NewFolderInput = styled.input`
    height: 50%;
    width: 70%;
    background-color: transparent;
    outline: none;
    border: none;
    overflow: hidden;
    border-bottom: 2px solid ${({config}) => config.main};
    resize: none;
    padding-bottom: 5px;
    margin: 0 5%;
`

const NormalInput = styled.input`
    height: 40px;
    width: 90%;
    border-radius: 10px;
    background-color: white;
    outline: none;
    border: none;
    overflow: hidden;
    padding: 0 3%`

function JInput({type = false, mRef, callback}) {
    const {configuration: config} = useSelector(selectGlobal)

    return (
        <>
            {
                type
                    ? <NormalInput ref={mRef} onChange={callback}/>
                    :  <NewFolderInput config={config} ref={mRef} onChange={callback}/>
            }
        </>
    );
}

export default JInput;