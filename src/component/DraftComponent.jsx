import React, {useState, forwardRef, useImperativeHandle, useEffect, useRef} from 'react';
import {EditorState, RichUtils, Editor, convertFromRaw, convertToRaw} from 'draft-js'
import {useDispatch, useSelector} from "react-redux";
import {addChangeToggleCSS} from "../redux/slice/collectionSlice";
import {selectGlobal} from "../redux/slice/globalSlice";


const DraftComponent = forwardRef((props, ref) => {
    const dispatch = useDispatch()
    const mainRef = useRef(null)
    const {configuration: config} = useSelector(selectGlobal)

    const {
        item = '',
        readOnly = false
    } = props
    const [editorState, setEditorState] = useState(() => {
        if (item) return EditorState.createWithContent(convertFromRaw(JSON.parse(item)))
        else return EditorState.createEmpty()
    })
    const styleMap = {
        'HIGHLIGHT': {
            'backgroundColor': config.main,
        },
        'FONT_SIZE': {
            fontSize: config.font_size_l
        }
    };

    function onChange(state) {
        dispatch(addChangeToggleCSS(state.getCurrentInlineStyle().toJS()))
        setEditorState(state)
    }

    useImperativeHandle(ref, () => ({
        editorState: editorState,
        toggleStyle: (style, e) => {
            e.preventDefault()
            const newState = RichUtils.toggleInlineStyle(editorState, style)
            onChange(newState)
        },
        autoFocus: (key, bool) => {
            if (bool) {
                document.querySelector(`#scrollIntoView_${key}`).scrollIntoView()
            }
            onChange(EditorState.moveFocusToEnd(editorState))
        },
        getJSONData: () => {
            return JSON.stringify(convertToRaw(editorState.getCurrentContent()))
        },
        hasText: () => {
            return editorState.getCurrentContent().hasText()
        },
        upDate: (state) => {
            const newState = EditorState.createWithContent(convertFromRaw(JSON.parse(state)))
            onChange(newState)
        }

    }), [editorState])


    return (
        <Editor
            customStyleMap={styleMap}
            editorState={editorState}
            onChange={onChange}
            readOnly={readOnly}
            ref={mainRef}
        />
    );
})

export default DraftComponent;