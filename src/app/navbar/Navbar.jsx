import React from 'react';
import styled from "styled-components";
import {global} from "../../assets/global";
import Icon from "../../assets/svg.jsx";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectCollection} from "../../redux/slice/collectionSlice";

const {main, primary, transition_speed1, max_height, max_width, primary_opacity, secondary, icon_size_l} = global


const Navbar = styled.div`
    position: absolute;
    z-index: 2;
    width: ${max_width}px;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${primary_opacity};
    color: ${main};
    border-bottom: 1px solid ${secondary};
    ${(p) => p.hide ? 'transform: translateY(-48px);' : ''}
    ${transition_speed1}`

const Where = styled.div`
    width: 80%;
    text-align: center;`

function app
({
     hide = false,
     children,
     text,
     setSaveWarning,
    area
 }) {
    const navigate = useNavigate()
    const {openEditId} = useSelector(selectCollection)

    function back() {
        if (openEditId) {
            setSaveWarning(true)
            setTimeout(() => setSaveWarning(false), 3000)
        } else {
            navigate('/home')
        }
    }
    return (
        <Navbar hide={hide}>
            {
                area !== 'home'
                && <Icon.House
                    size={icon_size_l}
                    styled={{color: main}}
                    onClick={() => back()}
                />
            }

            <Where>{text}</Where>
        </Navbar>
    );
}

export default app;