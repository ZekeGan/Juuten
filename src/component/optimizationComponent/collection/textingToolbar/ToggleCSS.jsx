import React from 'react';
import TextEditorIcon from "../../pureComponent/TextEditorIcon.jsx";

import { toggleProps } from "../../../../assets/global";


const Toggle = (
    {
        draftRef,
        inlineStyle,
    }) => {

    function handleToggleStyle(keyword, e) {
        draftRef.current?.toggleStyle(keyword, e)
    }

    return toggleProps.map((toggle) => (
        <TextEditorIcon
            key={`textEditorIcon_${toggle.icon}`}
            icon={toggle.icon}
            style={inlineStyle.includes(toggle.keyword) ? toggle.style : ''}
            keyword={toggle.keyword}
            fn={(e) => handleToggleStyle(toggle.keyword, e)}
            curr={open}
        />
    ))


}

export default Toggle;
