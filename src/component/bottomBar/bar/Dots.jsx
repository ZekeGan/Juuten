import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { addSetConfiguration } from "slice/globalSlice";

const Elements = styled.div`
    height: 30px;
    width: 30px;
    border-radius: 15px;
    flex-shrink: 0;
    background-color: ${({ color }) => color};
    margin: 0 2px;
    cursor: pointer;
    transition: 0.2s;
    &:hover {
        transform: translateY(-5px);
    }
`

export default React.memo(({ item, setOpen }) => {
    const dispatch = useDispatch()
    function selectColor(color) {
        dispatch(addSetConfiguration({ key: 'main', value: color }))
        setOpen(false)
    }
    return <Elements key={`color_${item}`} color={item} onClick={() => selectColor(item)} />
},
    () => true
)