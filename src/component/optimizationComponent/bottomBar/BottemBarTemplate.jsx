import React from 'react';
import styled from "styled-components";
import Icon from "../Svg.jsx";
import {useDispatch, useSelector} from "react-redux";
import {selectGlobal} from "../../../redux/slice/globalSlice";


const Main = styled.div`
    width: ${({config}) => config.max_width}px;
    height: ${(p) => p.fullPage ? p.config.max_height : '400'}px;
    position: absolute;
    z-index: 3;
    bottom: ${(p) => p.fullPage ? `-${p.config.max_height}` : '-400'}px;
    background-color: ${({config}) => config.primary}; 
    transform: translateY(${p => p.open ? p.fullPage ? `-${p.config.max_height}px` : '-400px' : '0'});
    transition: 0.2s ease-out;
    ${(p) => !p.fullPage && `border-top: 1px solid ${p.config.tertiary};`}`


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
        color: ${({config}) => config.quaternary};
    }`
const Container = styled.div`
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
    margin-top: 10px;
    &::-webkit-scrollbar {
        width: 5px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: ${({config}) => config.secondary};
        border-radius: 2.5px;
    }`

const isEqual = (prev, next) => {
    if (prev.open || next.open) {
        return prev === next
    } else {
        return true
    }
}
const BottemBarTemplate = React.memo((
    {
        open,
        closeCallback,
        fullPage = false,
        children,
        useContainer = true
    }) => {
    const {configuration} = useSelector(selectGlobal)
    const close = () => closeCallback()
    console.log('tempalte')
    return (
        <Main
            config={configuration}
            open={open}
            fullPage={fullPage}
        >
            <CloseBar config={configuration} onClick={() => close()}>
                <Icon.X size={configuration.icon_size_s}/>
            </CloseBar>

            {useContainer
            && <Container config={configuration}>
                {children}
            </Container>}

            {!useContainer
            && children}

        </Main>
    );
}, isEqual)

export default BottemBarTemplate;