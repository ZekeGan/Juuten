import React, {useLayoutEffect} from 'react';
import styled from "styled-components";
import {global} from "../../../assets/global";

const {tertiary} = global

const Toolbar = styled.div`
    position: relative;
    width: 100%;
    height: 25px;
    overflow: hidden;
    padding-top: 10px;
`
const UrlBox = styled.div`
    display: flex;
    align-items: center;
    transition: 0.2s ease-out ${p => p.open ? '' : '200ms'};
    transform: translateY(${p => p.open ? '-27px' : 0});
    > img {
        height: 15px;
    }
    > .url, div {
        font-size: 10px;
        color: ${tertiary};
        margin-left: 7px;
    }
    > .date {
        margin-left: auto;
        transform: scale(0.9);
    }
    `
const EditToolbar = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    overflow: hidden;
    display: flex; 
    transition: 0.2s ease-out ${p => p.open ? '200ms' : ''};
    transform: translateY(${p => p.open ? '10px' : '-20px'}); 
    > div {
        font-size: 0.5rem;
        color: ${tertiary};
    } 
`



export default function App(p) {
    let {item, editCount, setEditCount, openEditId} = p

    /* editing動畫 */
    const ShowEditCount = () => {
        switch (editCount) {
            case 0:
                return <div>Editing</div>
            case 1:
                return <div>Editing .</div>
            case 2:
                return <div>Editing . .</div>
            case 3:
                return <div>Editing . . .</div>
        }
    }


    /* editing 動畫數數 */
    useLayoutEffect(() => {
        if (!openEditId) return
        if (editCount > 3) setEditCount(0)
        let timer = setInterval(() => setEditCount(editCount++), 1000)
        return () => clearInterval(timer)
    }, [openEditId, editCount])


    return (
        <Toolbar>

            {/* date and url place */}
            <UrlBox open={openEditId === item.key}>
                <img src={item.favIconUrl} alt=""/>
                <div className="url">{item.url}</div>
                <div className='date'>{item.currentDate}</div>
            </UrlBox>


            {/* editing 動畫 */}
            <EditToolbar open={openEditId === item.key}>
                <ShowEditCount/>
            </EditToolbar>

        </Toolbar>
    );
};

