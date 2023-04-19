import React, {useId, useMemo} from 'react';
import styled from "styled-components";
import {
    addDeleteNoteOrComment,
    addEditCollectionOrStorage,
    addOpenEditToolbar, selectCollection
} from "../../../../redux/slice/collectionSlice";
import {useDispatch, useSelector} from "react-redux";
import {selectGlobal} from "../../../../redux/slice/globalSlice";
import ShowEditCounting from "../../pureComponent/EditingCounting.jsx";
import Icon from "../../Svg.jsx";
import ToggleCSS from "./ToggleCSS.jsx";

const EditToolbar = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    left: 0;
    top: 0;
    transition: 0.2s ease-out ${p => p.open ? '200ms' : ''};
    transform: translateY(${p => p.open ? '0px' : '-25px'}); 
    color: ${({config}) => config.quaternary};
    > .icon-box {
        display: flex;
        justify-content: space-between;
        align-items: center;
        > div {
            margin-left: 20px;
        }
        .textingToolbar {
            display: flex;
            > .toggle-btn {
                width: 30px;    
                text-align: center;
                font-family: SourceHanSansHWTC-Regular;
                cursor: pointer;
                margin-right: 20px;
            }
        }
    }`

const TextingToolbarInside = ({item, open, draftRef, inlineStyle}) => {
    const {configuration: config} = useSelector(selectGlobal)
    const dispatch = useDispatch()
    /* 儲存編輯 */
    const leaveEdit = () => {
        const newMsg = draftRef.current.getJSONData()
        dispatch(addEditCollectionOrStorage({msg: newMsg, area: item.type}))
        dispatch(addOpenEditToolbar(''))
    }



    /* 刪除 Note */
    const deleteNoteOrComment = () => {
        dispatch(addDeleteNoteOrComment({area: item.type}))
    }


    return (
        <EditToolbar config={config} open={open}>
            <ShowEditCounting open={open}/>
            <div className={'icon-box'}>
                <div className={'textingToolbar'}>
                   <ToggleCSS draftRef={draftRef} inlineStyle={inlineStyle}/>
                </div>
                <div onClick={leaveEdit}>
                    <Icon.Save
                        size={config.icon_size_m}
                        title={'儲存'}
                    />
                </div>

                <div onClick={deleteNoteOrComment}>
                    <Icon.Delete
                        size={config.icon_size_m}
                        title={'刪除'}
                    />
                </div>
            </div>
        </EditToolbar>
    );
}

export default TextingToolbarInside;
