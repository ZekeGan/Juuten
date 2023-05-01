import React, { useState, forwardRef, useImperativeHandle, useEffect, useRef, memo } from 'react';
import {
    EditorState, RichUtils, Editor, convertFromRaw,
    convertToRaw, Modifier, getDefaultKeyBinding, KeyBindingUtil,
} from 'draft-js'
import { useSelector } from "react-redux";
import { selectGlobal } from "slice/globalSlice";
import useAutoSave from "hook/useAutoSave";
import { changeFontColor } from "src/utils";

export default memo(forwardRef((
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
    const { configuration: config } = useSelector(selectGlobal)
    const [editorState, setEditorState] = useState(() => item
        ? EditorState.createWithContent(convertFromRaw(JSON.parse(item)))
        : EditorState.createEmpty()
    )
    const { setIsStart } = useAutoSave(
        autoSave?.type,
        autoSave?.key,
        getJSONData(),
    )

    useEffect(() => {
        if (open) setIsStart(true)
        else setIsStart(false)
    }, [open])

    const styleMap = {
        'HIGHLIGHT': {
            'backgroundColor': config.main,
            'color': changeFontColor(config.main) ? '#545454' : '#ffffff',
        },
        'FONT_SIZE': {
            fontSize: config.font_size_l
        }
    }

    function onChange(state) {
        nowInlineStyle(state)
        setEditorState(state)
    }

    function handleKeyCommand(command) {
        switch (command) {
            case 'bold':
                return onChange(RichUtils.toggleInlineStyle(editorState, 'BOLD'))
            case 'italic':
                return onChange(RichUtils.toggleInlineStyle(editorState, 'ITALIC'))
            case 'underline':
                return onChange(RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'))
            case 'strikethrough':
                return onChange(RichUtils.toggleInlineStyle(editorState, 'STRIKETHROUGH'))
            case 'undo':
                return onChange(EditorState.undo(editorState))
            case 'redo':
                return onChange(EditorState.redo(editorState))
            case 'tab':
                return onChange(EditorState.push(
                    editorState,
                    Modifier.insertText(
                        editorState.getCurrentContent(),
                        editorState.getSelection(),
                        '    ' // 插入四个空格
                    ),
                    'insert-characters'
                ))
            default:
                return 'not-handled'
        }
    }

    function keyBindingFn(e) {
        switch (e.keyCode) {
            case 9:
                e.preventDefault()
                return 'tab'
            default:
        }
        if (KeyBindingUtil.hasCommandModifier(e)) {
            switch (e.keyCode) {
                case 66:
                    return 'bold'
                case 73:
                    return 'italic'
                case 83:
                    return 'strikethrough'
                case 85:
                    return 'underline'
                case 90:
                    if (e.shiftKey) return 'redo' // redo
                    return 'undo'
                default:
            }
        }
        return getDefaultKeyBinding(e)
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

    return <Editor
        customStyleMap={styleMap}
        editorState={editorState}
        onChange={onChange}
        readOnly={readOnly}
        ref={mainRef}
        keyBindingFn={keyBindingFn}
        handleKeyCommand={handleKeyCommand}
    />

}))