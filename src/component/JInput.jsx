import React, {useRef} from 'react';
import styled from "styled-components";
import {global} from "../assets/global";

const {main, primary} = global

const NewFolderInput = styled.input`
    height: 50%;
    width: 70%;
    background-color: transparent;
    outline: none;
    border: none;
    overflow: hidden;
    border-bottom: 2px solid ${main};
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
    return (
        <>
            {
                type
                    ? <NormalInput ref={mRef} onChange={callback}/>
                    :  <NewFolderInput ref={mRef} onChange={callback}/>
            }
        </>
    );
}

export default JInput;