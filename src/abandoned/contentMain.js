import {convertToRaw, EditorState} from "draft-js";

function getDraft(msg) {
    return JSON.stringify(convertToRaw(EditorState.createWithText(msg).getCurrentContent()))
}