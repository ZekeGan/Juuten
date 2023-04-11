import React from 'react';
import styled from "styled-components";
import {global} from "../../assets/global";
import Icon from "../../assets/svg.jsx";
import {useDispatch, useSelector} from "react-redux";

const {primary, transition_speed1, tertiary, max_width, max_height, icon_size_s} = global

const Main = styled.div`
    position: absolute;
    z-index: 3;
    bottom: ${(p) => p.fullPage ? `-${max_height}` : '-400'}px;
    width: ${max_width}px;
    height: ${(p) => p.fullPage ? max_height : '400'}px;
    background-color: ${primary}; 
    transform: translateY(${props => props.open ? props.fullPage ? `-${max_height}px` : '-400px' : 0});
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
    const {open, closeCallback, fullPage = false} = props

    const close = () => closeCallback()
    return (
        <Main
            open={open}
            fullPage={fullPage}
        >
            <CloseBar onClick={() => close()}>
                <Icon.X size={icon_size_s}/>
            </CloseBar>
            {props.children}
        </Main>
    );
}

export default BottemBarTemplate;