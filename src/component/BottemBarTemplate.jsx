import React from 'react';
import styled from "styled-components";
import {global} from "../assets/global";
import Icon from "../assets/svg.jsx";
import {useDispatch, useSelector} from "react-redux";

const {primary, transition_speed1, tertiary, max_width} = global

const Main = styled.div`
    position: absolute;
    z-index: 3;
    bottom: -400px;
    width: ${max_width}px;
    height: 400px;
    background-color: ${primary}; 
    transform: translateY(${props => props.open ? '-400px' : 0});
    ${transition_speed1}`

const CloseBar = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 7%;
    z-index: 2;
    cursor: pointer;
    > div {
        transform: scale(1.5);
        color: ${tertiary};
    }`

function BottemBarTemplate(props) {
    const {open, closeCallback} = props

    const close = () => closeCallback()

    return (
        <Main open={open}>
            <CloseBar onClick={() => close()}>
                <Icon.X/>
            </CloseBar>
            {props.children}
        </Main>
    );
}

export default BottemBarTemplate;