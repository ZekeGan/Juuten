import React, {useMemo, useState} from 'react';
import {convertFromRaw, convertToRaw, EditorState, RichUtils} from "draft-js";
import {useSelector} from "react-redux";
import {selectFolder} from "../redux/slice/folderSlice";
import {selectCollection} from "../redux/slice/collectionSlice";

const useFindData = (target) => {
    const folderObj = useSelector(selectFolder)
    const selectObj = useSelector(selectCollection)
    const allFolder = useMemo(() => {
        const newStorage = selectObj.Juuten_Storage.map(item => ({...item, folderName: 'Storage'}))
        return folderObj.Juuten_folderLists
            .map(item => {
                let _obj = folderObj[item.key]
                if (!!_obj) return _obj.map(item2 => ({...item2, folderName: item.name}))
                else return _obj
            })
            .concat(newStorage)
            .filter(item => item !== undefined)
            .flat(1)
    }, [selectObj.openSearchPage])

    return useMemo(() => {
        if (!target) return {}
        const newData = allFolder
            .map(item => {
                const comment = item.comment
                    .filter(item2 => isMsgHas(item2.msg, target))
                    .map(item => {
                        return {
                            ...item,
                            msg: highlightMsg(item.msg, target)
                        }
                    })
                const _data = {
                    ...item,
                    msg: isMsgHas(item.msg, target) ? highlightMsg(item.msg, target) : (comment.length ? highlightMsg(item.msg, target) : ''),
                    comment: comment
                }
                return (!!_data.msg || !!_data.comment.length) ? _data : null
            })
            .filter(item => item !== null)
            .reduce((outputObject, {folderName, ...rest}) => {
                if (!outputObject[folderName]) outputObject[folderName] = []
                outputObject[folderName].push({...rest})
                return outputObject
            }, {})
        return newData
    }, [target])



    function isMsgHas(msg, target) {
        return EditorState
            .createWithContent(convertFromRaw(JSON.parse(msg)))
            .getCurrentContent()
            .getPlainText()
            .toUpperCase()
            .includes(target.toUpperCase())
    }

    function highlightMsg(msg, target) {
        target = target.toUpperCase()
        if (target === '') return msg
        let editorState = EditorState.createWithContent(convertFromRaw(JSON.parse(msg)))
        const plainText = editorState.getCurrentContent().getPlainText().toUpperCase()
        const positions = []
        let detect = 0
        let index = plainText.indexOf(target)
        while (index !== -1) {
            if (index - detect !== 1) positions.push(index)
            index = plainText.indexOf(target, index + 1)
            detect = index
        }
        if (positions.length <= 0) return msg

        positions.forEach((i, idx) => {
            let start = {
                value: positions[idx],
                flag: true
            }
            let end = {
                value: positions[idx] + target.length,
                flag: true
            }
            const blocks = editorState.getCurrentContent().getBlockMap()
            let anchorKey, focusKey, anchorOffset, focusOffset
            if (blocks.count() > 1) {
                blocks.forEach(block => {
                    const len = block.getLength()
                    if (!anchorKey && (!start.flag || start.value <= len)) {
                        anchorKey = block.getKey()
                        anchorOffset = start.value
                    }
                    if (start.value >= len && start.flag) {
                        start.value -= len
                    } else {
                        start.flag = false
                    }
                    if (!focusKey && (!end.flag || end.value <= len)) {
                        focusKey = block.getKey()
                        focusOffset = end.value
                    }
                    if (end.value >= len && end.flag) {
                        end.value -= len
                    } else {
                        end.flag = false
                    }
                })
            } else {
                blocks.forEach(block => {
                    anchorOffset = start.value
                    focusOffset = end.value
                    anchorKey = block.getKey()
                    focusKey = block.getKey()
                })
            }
            const selection = editorState.getSelection().merge({
                anchorKey,
                focusKey,
                anchorOffset,
                focusOffset,
            })
            const selectedState = EditorState.forceSelection(editorState, selection)
            editorState = RichUtils.toggleInlineStyle(selectedState, 'HIGHLIGHT')
        })


        return JSON.stringify(convertToRaw(editorState.getCurrentContent()))
    }
}

export default useFindData;
