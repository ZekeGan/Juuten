import React, {useState, forwardRef, useImperativeHandle, useEffect, useRef, memo} from 'react';
import {EditorState, RichUtils, Editor, convertFromRaw, convertToRaw} from 'draft-js'
import {useSelector} from "react-redux";
import {selectGlobal} from "../../redux/slice/globalSlice";

const DraftComponent = memo(forwardRef((
    {
        item = '',
        readOnly = false,
        setInlineStyle
    },
    ref
) => {
    const mainRef = useRef(null)
    const {configuration: config} = useSelector(selectGlobal)
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
    }

    function onChange(state) {
        setEditorState(state)
    }

    function nowInlineStyle(state) {
        setInlineStyle(state.getCurrentInlineStyle().toJS())
    }

    useImperativeHandle(
        ref,
        () => ({
            editorState: editorState,
            toggleStyle: (style, e) => {
                e.preventDefault()
                const newState = RichUtils.toggleInlineStyle(editorState, style)
                nowInlineStyle(newState)
                onChange(newState)
            },
            autoFocus: () => {
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
        }),
        [editorState]
    )

    return (
        <Editor
            customStyleMap={styleMap}
            editorState={editorState}
            onChange={onChange}
            readOnly={readOnly}
            ref={mainRef}
        />
    );
}))

export default DraftComponent;