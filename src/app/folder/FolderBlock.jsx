import React, {useEffect, useRef} from 'react';
import Toolbar from "./FolderToolbar.jsx";
import FolderName from "./FolderName.jsx";
import Icon from "../../assets/svg.jsx";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import {addEditFolderId, selectFolder} from "../../redux/slice/folderSlice";
import {useDispatch, useSelector} from "react-redux";
import {global} from "../../assets/global";
import {selectCollection} from "../../redux/slice/collectionSlice";
import FolderTemplate from "./FolderTemplate.jsx";
import {Draggable} from "react-beautiful-dnd";

const {transition_speed1, primary, icon_size_l} = global

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

function FolderBlock(props) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {editFolderId, addFolderAnimationId} = useSelector(selectFolder)
    const {item, idx, setDelCheck, setSameName} = props

    function editFolder(e, item) {
        e.stopPropagation()
        dispatch(addEditFolderId(item.key))
        // dispatch(addSetFolderAutoFocusId(item.key))
    }

    function goIntoFolder(e, index) {
        e.stopPropagation()
        navigate('/collection/N1') // *****************************************<==== delete when build

        // if (editFolderId || editFolderId === index) return
        // console.log('enterFolder')
        // const fn = () => navigate(`/collection/${index}`)
        // dispatch(addFetchData({
        //     index,
        //     fn
        // }))
    }




    return (
        <Draggable
            key={`folder_drag_key_${item.key}`}
            draggableId={`draggableId_${item.key}`}
            index={idx}
        >
            {
                (provided) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                    >
                        <FolderTemplate
                            folderColor={item.folderColor}
                            dClick={(e) => goIntoFolder(e, '')}
                        >
                            {
                                item.key === editFolderId
                                && <Toolbar
                                    item={item}
                                    setDelCheck={setDelCheck}
                                    setSameName={setSameName}
                                />
                            }

                            <DragHandle
                                {...provided.dragHandleProps}>
                                <Icon.Grip
                                    styled={`color: ${item.font ? 'black' : 'white'};`}
                                    size={icon_size_l}
                                />
                            </DragHandle>

                            <FolderName font={item.font}>
                                {item.name}
                            </FolderName>

                            <IconContainer>
                                <Icon.Ellipsis
                                    styled={`color: ${item.font ? 'black' : 'white'};`}
                                    size={icon_size_l}
                                    onClick={(e) => editFolder(e, item)}
                                />
                            </IconContainer>

                        </FolderTemplate>
                    </div>
                )
            }
        </Draggable>

    );
}

export default FolderBlock;