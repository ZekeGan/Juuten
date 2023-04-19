import React from 'react';
import styled from "styled-components";
import {useSelector} from "react-redux";
import {selectGlobal} from "../../redux/slice/globalSlice";


const NewFolderInput = styled.input`
    height: 50%;
    width: 100%;
    background-color: transparent;
    outline: none;
    border: none;
    overflow: hidden;
    border-bottom: 2px solid ${({config}) => config.main};
    resize: none;
    padding-bottom: 3px;
    margin: 0 5%;
`
const isEqual = (prevProps, nextProps) => {
    return prevProps.mRef === nextProps.mRef
}

const Input = React.memo((
    {
        mRef,
        onInput = () => {
        }
    }) => {
    const {configuration: config} = useSelector(selectGlobal)
    console.log('Addinput')
    return (
        <NewFolderInput
            config={config}
            ref={mRef}
            onInput={onInput}
        />
    );
}, isEqual)

export default Input