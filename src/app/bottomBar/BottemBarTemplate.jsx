import React from 'react';
import styled from "styled-components";
import {global} from "../../assets/global";
import Icon from "../../assets/svg.jsx";
import {useDispatch, useSelector} from "react-redux";

const {primary, transition_speed1, tertiary, max_width, max_height, icon_size_s, secondary} = global


const Main = styled.div`
    width: ${max_width}px;
    height: ${(p) => p.fullPage ? (max_height) : '400'}px;
    position: absolute;
    z-index: 3;
    bottom: ${(p) => p.fullPage ? `-${(max_height)}` : '-400'}px;
    background-color: ${primary}; 
    transform: translateY(${props => props.open ? props.fullPage ? `-${(max_height)}px` : '-400px' : '0'});
    ${transition_speed1}
    ${(p) => !p.fullPage && `border-top: 1px solid ${secondary};` }`


const CloseBar = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    height: 30px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
    cursor: pointer;
    > div {
        transform: scale(1.5);
        color: ${tertiary};
    }`
const Container = styled.div`
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
    // margin-top: 30px;
    &::-webkit-scrollbar {
        width: 5px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: ${secondary};
        border-radius: 2.5px;
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
            <Container>
                {props.children}
            </Container>
        </Main>
    );
}

export default BottemBarTemplate;