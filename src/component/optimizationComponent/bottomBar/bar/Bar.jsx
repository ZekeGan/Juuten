import React, {useMemo} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addOpenBar, selectCollection} from "../../../../redux/slice/collectionSlice.js";
import {exportToTXT} from "../../../../utils";
import {selectGlobal} from "../../../../redux/slice/globalSlice";
import BottemBarTemplate from "../BottemBarTemplate.jsx";
import Size from "../../pureComponent/Size.jsx";
import styled from "styled-components";
import Slider from "../../Slider.jsx";
import DotColor from "./DotColor.jsx";
import BarButton from "./BarButton.jsx";


const Container = styled.div`
    width: 100%;
    padding: 30px 2.5% 10px; 
    .container-text {
        margin-bottom: 3%;
    }`
const CategoryContainer = styled.div`
    width: 100%;
    overflow: hidden;
    border-radius: 10px;`

const SelectContainer = styled.div`
    user-select: none;
    height: 80px;
    width: 100%;
    background-color: white;
    border-bottom: 1px solid ${({config}) => config.primary};
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 5%;
    .select-text-box {
        width: 30%;
        .select-text {
            font-size: ${({config}) => config.font_size_l}px;
        }
        .select-introduce {
            font-size: ${({config}) => config.font_size_m}px;
            color: ${({config}) => config.quaternary};
        }
    }`

const isEqual = (prevProps, nextProps) => {
    // console.log('prev ', prevProps)
    // console.log('next ', nextProps)
    return prevProps.open === nextProps.open
}

/* 刪除錦集(collection)和暫存區(storage)筆記或註記(comment) */
const Bar = React.memo(({area = 'default', data}) => {
    const {configuration} = useSelector(selectGlobal)
    const dispatch = useDispatch()
    const {openBar} = useSelector(selectCollection)
    const barList = useMemo(() => ({
        configuration: {
            text: '版面設定',
            list: [
                {
                    open: true,
                    text: 'mainColor',
                    textCN: '調整主色調',
                    introduce: {default: ''},
                    element: 'color'
                },
                {
                    open: true,
                    text: 'fontSize',
                    textCN: '調整文字尺寸',
                    element: 'number',
                    introduce: {default: '文字大小下限為9，上限為20'},
                    numberValue: {
                        currentValue: configuration['font_size_s'],
                        max: 20,
                        min: 9,
                        howMany: 0.5
                    },
                    dispatchValue: [
                        {key: 'font_size_s', value: 0},
                        {key: 'font_size_m', value: 2},
                        {key: 'font_size_l', value: 5},
                        {key: 'font_size_xl', value: 10}
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
                    introduce: {default: '圖標大小下限為9，上限為20'},
                    dispatchValue: [
                        {key: 'icon_size_s', value: 0},
                        {key: 'icon_size_m', value: 3},
                        {key: 'icon_size_l', value: 6}
                    ]

                },
                {
                    open: true,
                    text: 'screenWidth',
                    textCN: '螢幕寬度',
                    element: 'number',
                    numberValue: {
                        currentValue: configuration['max_width'],
                        max: 800,
                        min: 400,
                        howMany: 50
                    },
                    introduce: {default: '螢幕寬度下限為400，上限為800'},
                    dispatchValue: [{key: 'max_width', value: 0}]
                },
                {
                    open: true,
                    text: 'noShowStorageCount',
                    textCN: '不在暫存區顯示數量',
                    element: 'ratio',
                    ratioValue: [{key: 'showStorageCount'}],
                    current: configuration.showStorageCount,
                    introduce: {default: ''},
                },
                {
                    open: true,
                    text: 'noShowThisIsBottom',
                    textCN: '停止顯示已經到最底',
                    element: 'ratio',
                    ratioValue: [{key: 'thisIsBottom'}],
                    current: configuration.thisIsBottom,
                    introduce: {default: ''},
                },
                {
                    open: false,
                    text: 'darkMode',
                    textCN: '黑暗模式',
                    element: 'ratio',
                    current: '',
                    introduce: {default: ''},
                },
            ]
        },
        importAndOutport: {
            text: '匯出',
            list: [
                {
                    open: false,
                    text: 'importFromText',
                    textCN: '從文字匯入',
                    element: 'click',
                    clickValue: [
                        {
                            text: '',
                        }
                    ],
                    introduce: {
                        folder: '匯出所有資料夾的資料',
                        collection: '匯出此資料夾內的資料',
                    },
                },
                {
                    open: true,
                    text: 'exportToTXT',
                    textCN: '匯出成 TXT',
                    element: 'click',
                    clickValue: [
                        {text: '匯出成 TXT', type: 'plain'}
                    ],
                    introduce: {default: area === 'folder' ? '匯出所有資料夾的資料成 TXT' : '匯出此資料夾內的資料成 TXT'},
                },
                {
                    open: true,
                    text: ' exportToDocx',
                    textCN: '匯出成 docx',
                    element: 'click',
                    clickValue: [
                        {text: '匯出成 Docx', type: 'docx'}
                    ],
                    introduce: {default: area === 'folder' ? '匯出所有資料夾的資料成 Docx' : '匯出此資料夾內的資料成 Docx'},
                },
                {
                    open: true,
                    text: ' exportToHTML',
                    textCN: '匯出成 HTML',
                    element: 'click',
                    clickValue: [
                        {text: '匯出成 HTML', type: 'html'}
                    ],
                    introduce: {default: area === 'folder' ? '匯出所有資料夾的資料成 HTML' : '匯出此資料夾內的資料成 HTML'},
                }
            ],
        },
        contact: {
            text: '聯繫作者',
            list: [{
                open: true,
                text: 'bugFix',
                textCN: 'Bug錯誤回報',
                introduce: {default: ''},
            },],
        }
    }), [configuration])

    console.log('bar')

    return (
        <BottemBarTemplate
            fullPage={true}
            open={openBar}
            closeCallback={() => dispatch(addOpenBar())}
        >
            {Object.keys(barList).map(category => (
                <Container key={`${category}-text`} config={configuration}>
                    <div className={'container-text'}>{barList[category].text}</div>
                    <CategoryContainer>
                        {barList[category].list.map(select => (
                            select.open
                            && <SelectContainer key={select.text} config={configuration}>
                                <div className={'select-text-box'}>
                                    <div className={'select-text'}>{select.textCN}</div>
                                    <div className={'select-introduce'}>{select.introduce.default}</div>
                                </div>
                                {select.element === 'color'
                                && <DotColor/>}

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
                                && select.clickValue.map(item => (
                                    <BarButton
                                        key={item.text}
                                        text={item.text}
                                        data={data}
                                        type={item.type}
                                    />))
                                }
                            </SelectContainer>
                        ))}
                    </CategoryContainer>
                </Container>
            ))}
        </BottemBarTemplate>
    );
}, isEqual)

export default Bar;