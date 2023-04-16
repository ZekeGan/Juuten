import React, {useEffect, useMemo, useRef, useState, useReducer} from 'react';
import {convertFromRaw, convertToRaw, EditorState, RichUtils} from "draft-js";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {addOpenSearchPage, selectCollection} from "../../../redux/slice/collectionSlice";
import {selectGlobal} from "../../../redux/slice/globalSlice";
import JInput from "../../../component/JInput.jsx";
import {selectFolder} from "../../../redux/slice/folderSlice";
import BottemBarTemplate from "../../../component/bar/BottemBarTemplate.jsx";
import Url from "../../../component/pureComponent/Url.jsx";
import Textarea from "../../../component/collection/note/Textarea.jsx";
import Comment from "../../../component/collection/note/Comment.jsx";

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 30px 0 0 0;
`

const TextContainer = styled.div`
    width: 90%;
    margin: 2% 0;
    .folder-name {
        margin-bottom: 2%;
    }
    .search-note-folder-container {
        background-color: white;
        border-radius: 10px;
    }`

const NoteContainer = styled.div`
    padding: 2%;
    ${({isBottom, config}) => isBottom ? '' : `border-bottom: 3px solid ${config.primary}`}`


function SearchNote(props) {
    const {configuration: config} = useSelector(selectGlobal)
    const {openSearchPage, Juuten_Storage} = useSelector(selectCollection)
    const {Juuten_folderLists} = useSelector(selectFolder)
    const [foundData, setFoundData] = useState([])
    const obj = useSelector(selectCollection)
    const dispatch = useDispatch()
    const inputRef = useRef(null)
    const [state, setState] = useState(0)

    const allFolder = useMemo(() => {
        const newStorage = Juuten_Storage.map(item => ({...item, folderName: 'Storage'}))
        return Juuten_folderLists
            .map(item => {
                let _obj = obj[item.key]
                if (!!_obj) return _obj.map(item2 => ({...item2, folderName: item.name}))
                else return _obj
            })
            .concat(newStorage)
            .filter(item => item !== undefined)
            .flat(1)
    }, [openSearchPage])

    function findData() {
        const target = inputRef.current?.value
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
        setState((old) =>　old + 1)
        if (!target) setFoundData([])
        else setFoundData(newData)
    }

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
        // const regex = new RegExp(target, 'gi')
        const positions = []
        let detect = 0
        let index = plainText.indexOf(target)
        while (index !== -1) {
             if (index - detect !== 1) positions.push(index)
            index = plainText.indexOf(target, index + 1)
            detect = index
        }
        if (positions.length <=0 ) return msg

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
        // return msg
    }


    return (
        <BottemBarTemplate
            open={openSearchPage}
            fullPage={true}
            closeCallback={() => dispatch(addOpenSearchPage(''))}
        >
            <Container>
                <JInput type={true} mRef={inputRef} callback={() => findData()}/>
                {
                    Object.keys(foundData).map(item => (
                        <TextContainer key={item}>
                            <div className={'folder-name'}>{item}</div>
                            <div className='search-note-folder-container'>
                                {
                                    foundData[item].map((item2, idx2) => (
                                        <NoteContainer
                                            config={config}
                                            key={item2.key}
                                            isBottom={!foundData[item][idx2 + 1]}
                                        >
                                            <Textarea item={item2} showToolbar={false} state={state}/>
                                            <Url item={item2}/>
                                            {
                                                item2.comment.length > 0
                                                && item2.comment.map(item3 => (
                                                    <Comment key={item3.key} item={item3} showToolbar={false}/>
                                                ))
                                            }
                                        </NoteContainer>
                                    ))
                                }
                            </div>
                        </TextContainer>
                    ))
                }
            </Container>
        </BottemBarTemplate>
    );
}

export default SearchNote;