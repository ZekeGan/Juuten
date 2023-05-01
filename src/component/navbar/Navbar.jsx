import React from 'react';
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectGlobal } from "slice/globalSlice";
import Icon from "com/Svg.jsx";
import { setDataToLocal } from "src/utils";


const Navbar = styled.div`
    position: absolute;
    z-index: 2;
    width: ${({ config }) => config.max_width}px;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${({ config }) => config.primary_opacity};
    color: ${({ config }) => config.main};
    border-bottom: 1px solid ${({ config }) => config.secondary};
    ${(p) => p.hide ? 'transform: translateY(-48px);' : ''}
    transition: 0.2s ease-out;
    .where {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        width: 78%;
        height: 100%;
        overflow: hidden;
        margin: 0 2%;
        font-size: ${({ config }) => config.font_size_l}px;
    }`


export default React.memo((
    {
        hide = false,
        name = 'null',
        setSaveWarning = () => { },
        area,
        openEditId,
    }) => {
    const navigate = useNavigate()
    const { configuration: config } = useSelector(selectGlobal)

    function back() {
        if (!!openEditId) {
            setSaveWarning(true)
            setTimeout(() => setSaveWarning(false), 3000)
            return
        } else {
            navigate('/home')
            setDataToLocal('Juuten_Navigate_History', {})
        }
    }

    return (
        <Navbar
            config={config}
            hide={hide}
        >
            {area !== 'home'
                && <div onClick={() => back()}>
                    <Icon.House
                        size={config.icon_size_xl}
                        styled={`color: ${config.main};`}
                    />
                </div>}

            <div className={'where'}>
                {!!name
                    ? name
                    : <Icon.MonochromeJuutenIcon
                        color={config.main}
                        size={26}
                    />}
            </div>

        </Navbar>
    );
},
    (prev, next) => {
        if (!!next.openEditId) return false
        return prev.hide === next.hide
            && prev.name === next.name
            && prev.openEditId === next.openEditId
    }
)