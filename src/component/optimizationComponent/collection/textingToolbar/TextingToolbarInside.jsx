import React, { useEffect, useId, useMemo } from 'react';
import styled from "styled-components";
import {
    addEditCollectionOrStorage,
    addOpenEditToolbar, selectCollection
} from "../../../../redux/slice/collectionSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectGlobal } from "../../../../redux/slice/globalSlice";
import ShowEditCounting from "../../pureComponent/EditingCounting.jsx";
import Icon from "../../Svg.jsx";
import ToggleCSS from "./ToggleCSS.jsx";

const EditToolbar = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    left: 0;
    top: 0;
    transition: 0.2s ease-out ${p => p.open ? '200ms' : ''};
    transform: translateY(${p => p.open ? '0px' : '-25px'}); 
    color: ${({ config }) => config.quaternary};`

const IconBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    > div {
        margin-left: 30px;
    }
    .textingToolbar {
        display: flex;
    }`


const TextingToolbarInside = (
    {
        item,
        open,
        draftRef,
        inlineStyle,
        setDelCheck = () => { }
    }) => {
    const dispatch = useDispatch()
    const { configuration: config } = useSelector(selectGlobal)

    /* 儲存編輯 */
    const leaveEdit = () => {
        dispatch(addEditCollectionOrStorage({
            msg: draftRef.current.getJSONData(),
            area: item.type
        }))
        dispatch(addOpenEditToolbar(''))
    }


    return (
        <EditToolbar config={config} open={open}>
            <ShowEditCounting open={open} />
            <IconBox>

                <div onClick={leaveEdit}>
                    <Icon.Save
                        size={config.icon_size_m}
                        title={'儲存'}
                    />
                </div>

                <div className={'textingToolbar'}>
                    <ToggleCSS draftRef={draftRef} inlineStyle={inlineStyle} />
                </div>

                <div
                    onClick={() => setDelCheck(true)}
                    className={'icon'}
                >
                    <Icon.Delete
                        size={config.icon_size_m}
                        title={'刪除'}
                    />
                </div>
            </IconBox>
        </EditToolbar>
    );
}

export default TextingToolbarInside;
