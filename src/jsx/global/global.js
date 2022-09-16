import {createGlobalStyle} from "styled-components";
import Nunito from "../../../public/font/Nunito-VariableFont_wght.ttf"
import HWTC from "../../../public/font/SourceHanSansHWTC-Regular.otf"

const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family: 'Nunito';
        src: url(${Nunito}) format('truetype');
    }
    @font-face {
        font-family: '思源黑體';
        src: url(${HWTC}) format('opentype');
    }
    * {
        margin: 0;
        padding: 0;
        font-size: 16px;
        box-sizing: border-box;
        font-family: Nunito, 思源黑體;
    }`
export default GlobalStyle
export const global = {
    main: '#f2e702',
    primary: '#F0F2F5',
    primary_opacity: 'rgba(240, 242, 245, 0.2)',
    secondary: '#D9D9D9',
    tertiary: '#8A8A8A',
    warning: '#9d201a',
    transition_speed1: 'transition: 0.2s ease-out;',

    // font: 'font-family: 微軟正黑體, ;',
}

