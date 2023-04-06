import {createGlobalStyle} from "styled-components";
import {addSetFocusFlag} from "../redux/slice/collectionSlice";

const GlobalStyle = createGlobalStyle`

`
export default GlobalStyle
export const global = {
    main: '#f7c92e',
    fontColor: '#545454',
    primary: '#F0F2F5',
    primary_opacity: 'rgba(240, 242, 245, 0.7)',
    secondary: '#cfd9de',
    tertiary: '#8A8A8A',
    quaternary: '#eff3f4',
    warning: '#9d201a',
    transition_speed1: 'transition: 0.2s ease-out;',
    transition_speed2: 'transition: 0.5s ease-out;',
    icon_size_s: 12,
    icon_size_m: 15,
    icon_size_l: 18,


    color: [
        '#ffffff',
        '#D9D9D9',
        '#5f6672',
        '#62dbc8',
        '#7cd651',
        '#d58558',
        '#ffd14d',
        '#ff8d48',
        '#ff5757',
        '#ff6ed4',
        '#ad6fff',
        '#4ebafd',
        '#5882f8'
    ],
    tagColor: [
        '#f24726',
        '#cee741',
        '#12cdd4',
        '#fac710',
        '#da0063',
        '#8fd14f',
        '#2d9bf0',
        '#808080',
        '#9510ac',
        '#0ca789',
        '#414bb2',
        '#1a1a1a'
    ],
}

export const autoFocus = (textarea, dispatchFunction) => {
    if (!textarea) return
    const end = textarea.value.length
    textarea.setSelectionRange(end, end)
    dispatchFunction(addSetFocusFlag(false))
    textarea.focus()
}


