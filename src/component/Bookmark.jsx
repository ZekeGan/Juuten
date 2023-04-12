import React from 'react';
import styled from "styled-components";
import {global} from "../assets/global";

const {main, primary, transition_speed1, max_height, max_width, primary_opacity} = global


const BookMark = styled.div`
    position: absolute;
    z-index: 2;
    width: ${max_width}px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${primary_opacity};
    color: ${main};`

function Bookmark(props) {
    return (
        <Bookmark>
            {props.children}
        </Bookmark>
    );
}

export default Bookmark;