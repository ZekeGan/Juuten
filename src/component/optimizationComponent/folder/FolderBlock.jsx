import React, { useRef } from 'react';
import Toolbar from "./FolderToolbar.jsx";
import FolderName from "./FolderName.jsx";
import Icon from "../Svg.jsx";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { addEditFolderId } from "../../../redux/slice/folderSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectGlobal } from "../../../redux/slice/globalSlice";
import { addFetchData } from "../../../redux/slice/collectionSlice";


const Main = styled.div`
    grid-row: 2/3;
    width: ${({ config }) => config.max_width * 0.9}px;
    height: 70px;
    position: relative;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-radius: 10px;   
    background-color: ${p => p.folderColor};
    transition: 0.2s ease-out;
    box-shadow: 2px 2px 2px rgba(0,0,0,0.2);
    cursor: pointer;`

const IconContainer = styled.div`
    cursor: pointer;
    height: 100%;
    width: 8%;
    display: flex;
    justify-content: center;
    align-items: center;`

const DragHandle = styled.div`
    height: 100%;
    width: 8%;
    display: flex;
    justify-content: center;
    align-items: center;`

export default React.memo((
    {
        item,
        provided,
        setDelCheck,
        openToolbar,
        checkName,
    }) => {
    const { configuration: config } = useSelector(selectGlobal)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    function editFolder(e, item) {
        e.stopPropagation()
        dispatch(addEditFolderId(item.key))
    }

    function goIntoFolder(e, item) {
        e.stopPropagation()
        dispatch(addFetchData({
            item,
            fn: navigate(`/collection/${item.key}`),
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
                    checkName={checkName}
                    open={openToolbar}
                    item={item}
                    setDelCheck={setDelCheck}
                />}

            <DragHandle {...provided.dragHandleProps}>
                <Icon.Grip
                    styled={`color: ${item.font ? 'black' : 'white'}; cursor: grab;`}
                    size={config.icon_size_l}
                />
            </DragHandle>

            <FolderName font={item.font}>{item.name}</FolderName>

            <IconContainer onClick={(e) => editFolder(e, item)}>
                <Icon.Ellipsis
                    styled={`color: ${item.font ? 'black' : 'white'};`}
                    size={config.icon_size_l}
                />
            </IconContainer>

        </Main>
    );
},
    (prev, next) => {
        let flag = true
        if (prev.openToolbar !== next.openToolbar) return false

        for (let key in prev.item) {
            if (prev.item[key] !== next.item[key]) return false
        }
        return flag
    }
)
