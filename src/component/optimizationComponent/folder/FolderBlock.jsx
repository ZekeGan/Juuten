import React, {useRef} from 'react';
import Toolbar from "./FolderToolbar.jsx";
import FolderName from "./FolderName.jsx";
import Icon from "../Svg.jsx";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import {addEditFolderId} from "../../../redux/slice/folderSlice";
import {useDispatch, useSelector} from "react-redux";
import {selectGlobal} from "../../../redux/slice/globalSlice";
import {addFetchData} from "../../../redux/slice/collectionSlice";


const IconContainer = styled.div`
    position: absolute;
    right: 0;
    height: 100%;
    width: 5%;
    display: flex;
    justify-content: center;
    align-items: center;`

const DragHandle = styled.div`
    position: absolute;
    left: 0;
    width: 5%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;`

const Main = styled.div`
    position: relative;
    width: ${({config}) => config.max_width * 0.9}px;
    height: 70px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    margin: 10px 0 10px 0;
    border-radius: 10px;   
    background-color: ${p => p.folderColor};
    transition: 0.2s ease-out;
    box-shadow: 2px 2px 2px rgba(0,0,0,0.2);`

const isEqual = (prev, next) => {
    let flag = true
    if (prev.openToolbar !== next.openToolbar) return false

    for (let key in prev.item) {
        if (prev.item[key] !== next.item[key]) return false
    }
    return flag
}

export default React.memo((
    {
        item,
        provided,
        setDelCheck,
        openToolbar
    }) => {
    const {configuration: config} = useSelector(selectGlobal)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    console.log('folderBlock')

    function editFolder(e, item) {
        e.stopPropagation()
        dispatch(addEditFolderId(item.key))
    }

    function goIntoFolder(e, item) {
        e.stopPropagation()
        // navigate('/collection/N1') // *****************************************<==== delete when build
        console.log('enterFolder')
        const fn = () => navigate(`/collection/${item.key}`)
        dispatch(addFetchData({
            item,
            fn,
        }))
    }


    return (
        <Main
            config={config}
            folderColor={item.folderColor}
            onDoubleClick={(e) => goIntoFolder(e, item)}
        >
            {openToolbar
            && <Toolbar
                item={item}
                setDelCheck={setDelCheck}
            />}

            <DragHandle {...provided.dragHandleProps}>
                <Icon.Grip
                    styled={`color: ${item.font ? 'black' : 'white'};`}
                    size={config.icon_size_l}
                />
            </DragHandle>


            <FolderName font={item.font}>{item.name}</FolderName>


            <IconContainer>
                <div onClick={(e) => editFolder(e, item)}>
                    <Icon.Ellipsis
                        styled={`color: ${item.font ? 'black' : 'white'};`}
                        size={config.icon_size_l}
                    />
                </div>
            </IconContainer>


        </Main>


    );
}, isEqual)
