import React from 'react';
import styled from "styled-components";
import Icon from "../Svg.jsx";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectCollection} from "../../../redux/slice/collectionSlice";
import {selectGlobal} from "../../../redux/slice/globalSlice";


const Navbar = styled.div`
    position: absolute;
    z-index: 2;
    width: ${({config}) => config.max_width}px;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${({config}) => config.primary_opacity};
    color: ${({config}) => config.main};
    border-bottom: 1px solid ${({config}) => config.secondary};
    ${(p) => p.hide ? 'transform: translateY(-48px);' : ''}
    transition: 0.2s ease-out;
    .where {
        width: 80%;
        text-align: center;
        font-size: ${({config}) => config.font_size_l}px;
    }`

const isEqual = (prev, next) => prev.hide === next.hide || (prev.name === next.name && prev.hide === next.hide)

const app = React.memo(({hide = false, name = 'undefined', setSaveWarning, area, openEditId}) => {
    const navigate = useNavigate()
    const {configuration: config} = useSelector(selectGlobal)

    function back() {
        if (openEditId) {
            setSaveWarning(true)
            setTimeout(() => setSaveWarning(false), 3000)
        } else {
            navigate('/home')
        }
    }

    console.log('navbar name: ' + name)

    return (
        <Navbar config={config} hide={hide}>
            {
                area !== 'home'
                &&
                <div onClick={() => back()}>
                    <Icon.House
                        size={config.icon_size_l}
                        styled={`color: ${config.main};`}
                    />
                </div>
            }
            <div className={'where'}>{name}</div>
        </Navbar>
    );
}, isEqual)

export default app;