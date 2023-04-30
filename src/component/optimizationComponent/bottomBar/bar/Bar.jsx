import React, { useMemo, useState } from 'react';
import { useSelector } from "react-redux";
import { exportToTXT } from "../../../../utils";
import { selectGlobal } from "../../../../redux/slice/globalSlice";
import BottemBarTemplate from "../BottemBarTemplate.jsx";
import Size from "./Size.jsx";
import styled from "styled-components";
import Slider from "../../Slider.jsx";
import DotColor from "./DotColor.jsx";
import BarButton from "./BarButton.jsx";
import Icon from '../../Svg.jsx'
import BarPage from "../../pureComponent/BarPage.jsx";


const Container = styled.div`
    width: 100%;
    padding: 30px 2.5% 0; 
    margin-bottom: 5%;
    .container-text {
        margin-bottom: 3%;
    }`

const CategoryContainer = styled.div`
    width: 100%;
    overflow: hidden;
    border-radius: 10px;`

const SelectContainer = styled.div`
    height: 80px;
    width: 100%;
    background-color: white;
    border-bottom: 1px solid ${({ config }) => config.primary};
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 5%;
    ${({ styled }) => styled}
    .select-text-box {
        .select-text {
            font-size: ${({ config }) => config.font_size_l}px;
        }
        .select-introduce {
            font-size: ${({ config }) => config.font_size_s}px;
            color: ${({ config }) => config.quaternary};
        }
    }`

const Bar = React.memo((
    {
        barArea = 'default',
        open = false,
        setOpen = () => { },
    }) => {
    const { configuration } = useSelector(selectGlobal)
    const [openContact, setOpenContact] = useState(false)
    const barList = useMemo(() => ({
        configuration: {
            text: '版面設定',
            list: [
                {
                    open: true,
                    text: 'mainColor',
                    textCN: '調整主色調',
                    introduce: { default: '' },
                    element: 'color'
                },
                {
                    open: true,
                    text: 'fontSize',
                    textCN: '調整文字尺寸',
                    element: 'number',
                    introduce: { default: '文字大小下限為9，上限為16' },
                    numberValue: {
                        currentValue: configuration['font_size_s'],
                        max: 16,
                        min: 9,
                        howMany: 0.5
                    },
                    dispatchValue: [
                        { key: 'font_size_s', value: 0 },
                        { key: 'font_size_m', value: 2 },
                        { key: 'font_size_l', value: 5 },
                        { key: 'font_size_xl', value: 10 }
                    ]
                },
                {
                    open: true,
                    text: 'iconSize',
                    textCN: '調整圖標尺寸',
                    element: 'number',
                    numberValue: {
                        currentValue: configuration['icon_size_s'],
                        max: 20,
                        min: 9,
                        howMany: 0.5
                    },
                    introduce: { default: '圖標大小下限為9，上限為20' },
                    dispatchValue: [
                        { key: 'icon_size_s', value: 0 },
                        { key: 'icon_size_m', value: 3 },
                        { key: 'icon_size_l', value: 6 },
                        { key: 'icon_size_xl', value: 10 },
                    ]

                },
                {
                    open: true,
                    text: 'screenWidth',
                    textCN: '調整螢幕寬度',
                    element: 'number',
                    numberValue: {
                        currentValue: configuration['max_width'],
                        max: 800,
                        min: 500,
                        howMany: 50
                    },
                    introduce: { default: '螢幕寬度下限為500，上限為800' },
                    dispatchValue: [{ key: 'max_width', value: 0 }]
                },
                {
                    open: true,
                    text: 'noShowStorageCount',
                    textCN: '取消暫存區數量的顯示',
                    element: 'ratio',
                    ratioValue: [{ key: 'showStorageCount' }],
                    current: configuration.showStorageCount,
                    introduce: { default: '' },
                },
                {
                    open: true,
                    text: 'noShowThisIsBottom',
                    textCN: '取消已經到最底的顯示',
                    element: 'ratio',
                    ratioValue: [{ key: 'thisIsBottom' }],
                    current: configuration.thisIsBottom,
                    introduce: { default: '' },
                },
                {
                    open: false,
                    text: 'darkMode',
                    textCN: '黑暗模式',
                    element: 'ratio',
                    current: '',
                    introduce: { default: '' },
                },
            ]
        },
        mouseTool: {
            text: '快捷鍵',
            list: [
                {
                    open: true,
                    text: 'selectingTool',
                    textCN: '關閉快捷鍵',
                    element: 'ratio',
                    ratioValue: [{ key: 'isShowSelectionTool' }],
                    current: configuration.isShowSelectionTool,
                    introduce: { default: '是否顯示選取時出現的快捷鍵' }
                },
                {
                    open: true,
                    text: 'selectingToolX',
                    textCN: '快捷鍵X軸',
                    element: 'number',
                    numberValue: {
                        currentValue: configuration['toolbarX'],
                        max: 999,
                        min: -999,
                        howMany: 5
                    },
                    dispatchValue: [{ key: 'toolbarX', value: 0 }],
                    introduce: { default: '調整快捷鍵左右的位置' }
                },
                {
                    open: true,
                    text: 'selectingToolY',
                    textCN: '快捷鍵Y軸',
                    element: 'number',
                    numberValue: {
                        currentValue: configuration['toolbarY'],
                        max: 999,
                        min: -999,
                        howMany: 5
                    },
                    dispatchValue: [{ key: 'toolbarY', value: 0 }],
                    introduce: { default: '調整快捷鍵上下的位置' }
                }
            ]
        },
        importAndOutport: {
            text: '匯出',
            list: [
                {
                    open: true,
                    text: 'exportToTXT',
                    textCN: '匯出成 TXT',
                    element: 'click',
                    clickValue: [
                        { text: '匯出成 TXT', type: 'plain' }
                    ],
                    introduce: { default: barArea === 'folder' ? '匯出所有資料夾的資料成 TXT' : '匯出此資料夾內的資料成 TXT' },
                },
                {
                    open: true,
                    text: ' exportToDocx',
                    textCN: '匯出成 docx',
                    element: 'click',
                    clickValue: [
                        { text: '匯出成 Docx', type: 'docx' }
                    ],
                    introduce: { default: barArea === 'folder' ? '匯出所有資料夾的資料成 Docx' : '匯出此資料夾內的資料成 Docx' },
                },
                {
                    open: true,
                    text: ' exportToHTML',
                    textCN: '匯出成 HTML',
                    element: 'click',
                    clickValue: [
                        { text: '匯出成 HTML', type: 'html' }
                    ],
                    introduce: { default: barArea === 'folder' ? '匯出所有資料夾的資料成 HTML' : '匯出此資料夾內的資料成 HTML' },
                }
            ],
        },
        contact: {
            text: '聯繫作者',
            list: [{
                open: true,
                text: 'bugFix',
                textCN: 'Bug錯誤回報',
                introduce: { default: '' },
                element: 'navigate'
            },],
        }
    }), [configuration])

    console.log('bar')


    return (
        <>
            <BottemBarTemplate
                fullPage
                open={open}
                closeCallback={() => setOpen(false)}
            >
                {Object.keys(barList).map(category => (
                    <Container
                        key={`${category}-text`}
                        config={configuration}
                    >
                        <div className={'container-text'}>{barList[category].text}</div>
                        <CategoryContainer>
                            {barList[category].list.map(select => (
                                select.open
                                && <SelectContainer
                                    styled={select.element === 'navigate' ? 'cursor: pointer;' : ''}
                                    onClick={select.element === 'navigate' ? () => setOpenContact(true) : () => { }}
                                    key={select.text}
                                    config={configuration}
                                >
                                    <div className={'select-text-box'}>
                                        <div className={'select-text'}>{select.textCN}</div>
                                        <div className={'select-introduce'}>{select.introduce.default}</div>
                                    </div>
                                    {select.element === 'color'
                                        && <DotColor />}

                                    {select.element === 'number'
                                        && <Size
                                            everySize={select.numberValue.currentValue}
                                            max={select.numberValue.max}
                                            min={select.numberValue.min}
                                            howMany={select.numberValue.howMany}
                                            dispatchValue={select.dispatchValue}
                                        />}

                                    {select.element === 'ratio'
                                        && <Slider
                                            id={select.text}
                                            current={select.current}
                                            ratioValue={select.ratioValue}
                                        />}

                                    {select.element === 'click'
                                        && select.clickValue.map(item =>
                                        (<BarButton
                                            key={item.text}
                                            area={barArea}
                                            text={item.text}
                                            type={item.type}
                                            open={open}
                                        />))
                                    }

                                    {select.element === 'navigate'
                                        && <Icon.Right size={configuration.font_size_l} />}

                                </SelectContainer>
                            ))}
                        </CategoryContainer>
                    </Container>
                ))}
            </BottemBarTemplate>

            <BarPage
                open={openContact}
                close={() => setOpenContact(false)}
            />
        </>

    );
},
    (prevProps, nextProps) => prevProps.open === nextProps.open
)

export default Bar;