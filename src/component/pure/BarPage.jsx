import React from 'react';
import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectGlobal } from "slice/globalSlice";
import Icon from 'com/Svg.jsx'
import imageOpenWindow1 from 'assets/img/reportBug_forApp_1.jpg'
import imageOpenWindow2 from 'assets/img/reportBug_forApp_2.jpg'
import imageOpenWindow3 from 'assets/img/reportBug_forApp_3.jpg'


const Main = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    z-index: 100;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: ${({ config }) => config.primary};
    transform: translateX(${({ open }) => open ? '0' : '100%'});
    transition: 0.2s ease-out;
    padding: 0 30px;
    overflow-y: scroll;
    overflow-x: hidden;
    &::-webkit-scrollbar {
        width: 5px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: ${({ config }) => config.tertiary};
        border-radius: 2.5px;
    }
    .icon {
        cursor: pointer;
        width: 100%;
        height: 50px;
        display: flex;
        align-items: center;
        padding: 10px 0;
    }
    .container {
        .step {
            margin-bottom: 30px;
            > h2 {
                font-size: ${({ config }) => config.font_size_l}px;
                color: ${({ config }) => config.main};
                margin-bottom: 5px;
            }
            > p {
                font-size: ${({ config }) => config.font_size_m}px;
                margin-bottom: 5px;
                > strong {
                    color: ${({ config }) => config.warning};
                    cursor: pointer;
                    &:hover {
                        background-color: ${({ config }) => config.warning};
                        color: white;
                    }
                }
                > i {
                    font-style: normal;
                    color: ${({ config }) => config.pass};
                    font-weight: bold;
                }
                > .pass {
                    font-weight: bold;
                    color: ${({ config }) => config.pass};
                }
                > .warn {
                    font-weight: bold;
                    color: ${({ config }) => config.warning};
                }
            }
        }
    }
    hr {
        margin-bottom: 10px;
    }
    img {
        width: 80%;
        margin-bottom: 20px;
    }`

export default React.memo((
    {
        open,
        close = () => { }
    }) => {
    const { configuration: config } = useSelector(selectGlobal)

    function goTo() {
        chrome.tabs.create({ url: 'https://github.com/JikeLuo/Juuten/issues' })
    }

    return (
        <Main config={config} open={open}>
            <div className={'icon'} onClick={close}>
                <Icon.Left size={config.font_size_xl} title={'返回'} />
            </div>
            <div className={'container'}>
                <div className={'step'}>
                    <p>如有任何 Bug 或 APP出了什麼問題 請用以下方式聯絡我</p>
                    <p>1. 使用 Email  <i>traveller870720@gmail.com</i></p>
                    <p>2. 使用 Juuten <strong onMouseUp={goTo}>Github Issue</strong> 提出Bug</p>
                    <p>請詳細的描述問題的前因後果，可以的話請附加上 <i>APP的畫面</i > 或 <i>APP的後台</i> ( 如何開啟後台詳情如下 )</p>
                </div>

                <hr />

                <div className={'step'}>
                    <h2>回信範例說明</h2>
                    <p><span className={'pass'}>V</span> 我使用快捷鍵加入這個網站 "https://google.com" 的內文後，突然打不開APP</p>
                    <p><span className={'pass'}>V</span> 我在更改資料夾的名稱後，突然點不進資料夾</p>
                    <p><span className={'pass'}>V</span> 我的程式突然無法打開了，我把後台的錯誤資訊一併傳了過來 <i>#附件.jpg</i></p>

                </div>


                <div className={'step'}>
                    <h2>請不要說明的模糊不精確</h2>
                    <p><span className={'warn'}>X</span> 我的程式打不開，這是怎麼回事 ??</p>
                    <p><span className={'warn'}>X</span> 為什麼無法變換顏色 ??</p>

                </div>

                <hr />

                <div className={'step'}>
                    <h2>如何開啟後台的錯誤報告</h2>
                    <p>1. 點選 <i>擴充功能的圖示</i> / <i>管理擴充視窗</i></p>
                    <img src={imageOpenWindow1} alt="imageOpenWindow1" />
                    <p>2. 如果有Bug 這裡會出現紅色錯誤的提示。點選錯誤的圖示</p>
                    <img src={imageOpenWindow2} alt="imageOpenWindow2" />
                    <p>3. 截圖錯誤的畫面<i> (Windows 系統使用 Win + PrintScr 可擷取畫面) </i>，或是把詳細的文字給紀錄起來</p>
                    <img src={imageOpenWindow3} alt="imageOpenWindow3" />
                </div>

            </div>
        </Main>
    );
},
    (prev, next) => prev.open === next.open
)

