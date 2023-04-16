import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {useSelector} from "react-redux";
import {selectGlobal} from "../../redux/slice/globalSlice";


const Page = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    background-color: ${({noteType}) => noteType ? '#fffab9' : 'white'};
    border-radius: 10px;
    box-shadow: 2px 2px 2px 2px rgba(0,0,0,0.1);
    overflow: hidden;
    width: ${({config}) => config.max_width * 0.95}px;
    margin: 5px 0;
    ${({add}) => add ? 'transform: translateY(-150px);' : ''}
    transition: 0.2s ease-out;
    padding: 5px 15px 5px 25px;`

const NoteDragHandle = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 15px;
    > .handle {
        height: 100%;
        width: 100%;
        background-color: ${({config}) => config.main};
        transform: translatex(${(p) => p.show ? '0' : '-100%'});
        transition: 0.2s ease-out; 
    }`

function NoteTemplate(
    {
        children,
        add = false,
        provided
    }) {
    const [handleShow, setHandleShow] = useState(false)
    const [isClick, setIsClick] = useState(false)
    const {configuration: config} = useSelector(selectGlobal)

    console.log()
    function mouseUpFn() {
        setHandleShow(false)
        setIsClick(false)
        return document.removeEventListener('mouseup', mouseUpFn, false)
    }

    useEffect(() => {
        if (isClick) {
            document.addEventListener('mouseup', mouseUpFn, false)
        }
    }, [isClick])

    return (
        <Page config={config} add={add}>
            {
                !!Object.keys(provided).length
                && <NoteDragHandle
                    config={config}
                    show={handleShow}
                    onMouseEnter={() => setHandleShow(true)}
                    onMouseDown={() => setIsClick(true)}
                    onMouseLeave={() => !isClick && setHandleShow(false)}
                    {...provided?.dragHandleProps}
                >
                    <div className={'handle'}/>
                </NoteDragHandle>
            }
            {children}
        </Page>
    );
}

export default NoteTemplate;