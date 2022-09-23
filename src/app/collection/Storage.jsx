import React, {useState, useMemo, useLayoutEffect, useEffect} from 'react';
import styled from "styled-components";
import {global} from "../../assets/global";
import {useDispatch, useSelector} from "react-redux";
import {
    addAddAnimation,
    addAddCollectionToThisFolder,
    addOpenStorage,
    selectCollection
} from "../../redux/slice/collectionSlice";
import {TextArea, Note, StyledTextarea, Url} from "./textArea/TextArea.jsx";
import {BuildDate, DateBox} from "./textArea/Toolbar.jsx";
import Icon from '../../assets/svg.jsx'

const {main, transition_speed1, primary_opacity, primary, tertiary} = global

const Main = styled.div`
    position: absolute;
    z-index: 3;
    right: -250px;
    top: 0;
    width: 250px;
    height: 600px;
    background-color: ${primary_opacity}; 
    transform: translateX(${props => props.open ? '-250px' : 0});
    ${transition_speed1}`

const Navbar = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 48px;
    background-color: white;
    display: flex;
    align-items: center;
    > i {
        transform: scale(1.2);
        color: ${main};
    }`


const styleIcon = `
    transform: scale(0.9);
    margin-left: 10px;
`


function Storage(props) {
    const {openStorage, Juuten_Storage, openEditId, storageAddAnimation} = useSelector(selectCollection)
    const dispatch = useDispatch()
    const {ellipsis, navbar} = props


    const close = () => dispatch(addOpenStorage())

    const addToThisFolder = (item) => {
        dispatch(addAddCollectionToThisFolder(item))
    }


    return (
        <Main open={openStorage}>
            <Navbar>
                <Icon.Right styled={navbar} onClick={() => close()}/>
            </Navbar>
            <TextArea>
                {Juuten_Storage.map(item => (
                    <Note key={item.key}>

                        <DateBox open={openEditId === item.key} style={{transform: 'translateY(1px)'}}>
                            <div className='Juuten_toolbox'>
                                <BuildDate comment={item.type === 'comment'}>
                                    <div style={{transform: 'scale(0.8) translateX(-20px)'}}>{item.currentDate}</div>
                                </BuildDate>
                                <Icon.Delete styled={styleIcon} title={'刪除這收藏'}/>
                                <Icon.Plus styled={styleIcon} title={'加入到當前資料夾裡'}
                                           onClick={() => addToThisFolder(item)}/>
                            </div>
                        </DateBox>


                        <StyledTextarea defaultValue={item.msg}
                                        disabled
                                        id={`Juuten_noteTextarea_${item.key}`}/>


                        <Url>
                            {item.favIconUrl ? <img src={item.favIconUrl} alt=""/> : ''}
                            <div className="url"><a href={item.url}>{item.url}</a></div>

                        </Url>
                    </Note>
                ))}
            </TextArea>
        </Main>
    );
}

export default Storage;
export {Main, Navbar}