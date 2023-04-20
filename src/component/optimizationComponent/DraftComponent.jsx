import React, {useState, forwardRef, useImperativeHandle, useEffect, useRef, memo} from 'react';
import {EditorState, RichUtils, Editor, convertFromRaw, convertToRaw} from 'draft-js'
import {useSelector} from "react-redux";
import {selectGlobal} from "../../redux/slice/globalSlice";
import useAutoSave from "../../hooks/useAutoSave";

const DraftComponent = memo(forwardRef((
    {
        item = '',
        readOnly = false,
        setInlineStyle,
        open = false,
        autoSave = {}
    },
    ref
) => {
    const mainRef = useRef(null)
    const {configuration: config} = useSelector(selectGlobal)
    const [editorState, setEditorState] = useState(() => {
        if (item) return EditorState.createWithContent(convertFromRaw(JSON.parse(item)))
        else return EditorState.createEmpty()
    })
    const {setIsStart} = useAutoSave(
        autoSave?.type,
        autoSave?.key,
        getJSONData(),
        autoSave?.destination
    )

    useEffect(() => {
        if (open) setIsStart(true)

        else setIsStart(false)

    }, [open])


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

    function getJSONData() {
        return JSON.stringify(convertToRaw(editorState.getCurrentContent()))
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
                return getJSONData()
            },
            hasText: () => {
                return editorState.getCurrentContent().hasText()
            },
            upDate: (state) => {
                const newState = EditorState.createWithContent(convertFromRaw(JSON.parse(state)))
                onChange(newState)
            },
            cleanEditorState: () => {
                const newState = EditorState.createEmpty()
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