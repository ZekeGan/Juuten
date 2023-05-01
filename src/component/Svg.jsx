import React, { memo } from "react";
import styled from "styled-components";

const Icon = styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;
    ${props => props.styled}
`


const JuutenIcon = memo((props) => {
    const {
        styled,
        title,
        size = 16
    } = props
    return (
        <Icon styled={styled}>
            <svg width={size} height={size} viewBox="0 0 72.96 96.25">
                <defs>
                    <linearGradient
                        id="a"
                        data-name="未命名漸層 28"
                        x1="238.43"
                        y1="426.13"
                        x2="311.4"
                        y2="426.13"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop offset="0" stop-color="#f0d23f" />
                        <stop offset="0.21" stop-color="#efce3e" />
                        <stop offset="0.42" stop-color="#edc13a" />
                        <stop offset="0.64" stop-color="#eaad34" />
                        <stop offset="0.86" stop-color="#e5902c" />
                        <stop offset="0.88" stop-color="#e58d2b" />
                    </linearGradient>
                </defs>
                <path
                    d="M294.22,378H271v55.87H238.43v20.39a20,20,0,0,0,20,20h35.76a17.23,17.23,0,0,0,17.21-17.2V395.18A17.2,17.2,0,0,0,294.22,378ZM271,466.45H258.43a12.21,12.21,0,0,1-12.2-12.19V441.67H271Zm32.58-9.4a9.42,9.42,0,0,1-9.41,9.4H278.82V385.8h15.4a9.39,9.39,0,0,1,9.38,9.38Z"
                    transform="translate(-238.43 -378)"
                    style={{ fill: 'url(#a)' }}
                />
            </svg>

        </Icon>
    )
})
const MonochromeJuutenIcon = memo((props) => {
    const {
        styled,
        title,
        size = 16,
        color = '#000000',
    } = props
    return (
        <svg
            color={'red'}
            width={size}
            height={size}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 72.96 96.25">
            <path
                style={{ fill: color }}
                d="M294.22,378H271v55.87H238.43v20.39a20,20,0,0,0,20,20h35.76a17.23,17.23,0,0,0,17.21-17.2V395.18A17.2,17.2,0,0,0,294.22,378ZM271,466.45H258.43a12.21,12.21,0,0,1-12.2-12.19V441.67H271Zm32.58-9.4a9.42,9.42,0,0,1-9.41,9.4H278.82V385.8h15.4a9.39,9.39,0,0,1,9.38,9.38Z"
                transform="translate(-245 -378)"
            />
        </svg>
    )
})
const Ellipsis = memo((props) => {
    const {
        styled,
        title,
        size = 16
    } = props
    return (
        <Icon styled={styled}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                width={size}
                height={size}
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
            >
                <title>{title}</title>
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
            </svg>
        </Icon>
    )
})
const Plus = memo((props) => {
    const {
        styled,
        title,
        size = 16
    } = props
    return (
        <Icon styled={styled}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={size}
                height={size}
                fill="currentColor"
                className="bi bi-plus-lg"
                viewBox="0 0 16 16"
            >
                <title>{title}</title>
                <path fillRule="evenodd"
                    d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
                />
            </svg>
        </Icon>
    )
})
const Dash = memo((props) => {
    const {
        styled,
        title,
        size = 16
    } = props
    return (
        <Icon styled={styled}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={size}
                height={size}
                fill="currentColor"
                className="bi bi-dash-lg"
                viewBox="0 0 16 16"
            >
                <title>{title}</title>
                <path fillRule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8Z" />
            </svg>
        </Icon>
    )
})
const Box = memo((props) => {
    const {
        styled,
        title,
        size
    } = props
    return (
        <Icon
            styled={styled}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                width={size}
                height={size}
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6">
                <title>{title}</title>
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
            </svg>
        </Icon>
    )
})
const Bar = memo((props) => {
    const {
        styled,
        title,
        size,
    } = props
    return (
        <Icon
            styled={styled}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                width={size}
                height={size}
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6">
                <title>{title}</title>
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25" />
            </svg>
        </Icon>
    )
})
const Save = memo((props) => {
    const {
        styled,
        title,
        size = 16,
    } = props
    return (
        <Icon styled={styled}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={size}
                height={size}
                fill="currentColor"
                className="bi bi-save"
                viewBox="0 0 16 16">
                <title>{title}</title>
                <path
                    d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1H2z" />
            </svg>
        </Icon>
    )
})
const Delete = memo((props) => {
    const {
        styled,
        title,
        size = 16
    } = props
    return (
        <Icon styled={styled}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={size}
                height={size}
                fill="currentColor"
                className="bi bi-trash"
                viewBox="0 0 16 16">
                <title>{title}</title>
                <path
                    d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                <path fillRule="evenodd"
                    d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
            </svg>
        </Icon>
    )
})
const X = memo((props) => {
    const {
        styled,
        title,
        size = 16
    } = props
    return (
        <Icon styled={styled}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={size}
                height={size}
                fill="currentColor"
                className="bi bi-x-lg"
                viewBox="0 0 16 16"
            >
                <title>{title}</title>
                <path
                    d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
            </svg>
        </Icon>
    )
})
const Pen = memo((props) => {
    const {
        styled,
        title,
        size = 16
    } = props
    return (
        <Icon styled={styled}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={size}
                height={size}
                fill="currentColor"
                className="bi bi-pencil"
                viewBox="0 0 16 16">
                <title>{title}</title>
                <path
                    d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
            </svg>
        </Icon>
    )
})
const Chat = memo((props) => {
    const {
        styled,
        title,
        size = 16
    } = props
    return (
        <Icon styled={styled}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={size}
                height={size}
                fill="currentColor"
                className="bi bi-chat-left-text"
                viewBox="0 0 16 16">
                <title>{title}</title>
                <path
                    d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                <path
                    d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
            </svg>
        </Icon>
    )
})
const BarTop = memo((props) => {
    const {
        styled,
        title,
        size = 16
    } = props
    return (
        <Icon styled={styled}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={size}
                height={size}
                fill="currentColor"
                className="bi bi-chevron-bar-up"
                viewBox="0 0 16 16">
                <title>{title}</title>
                <path fillRule="evenodd"
                    d="M3.646 11.854a.5.5 0 0 0 .708 0L8 8.207l3.646 3.647a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708zM2.4 5.2c0 .22.18.4.4.4h10.4a.4.4 0 0 0 0-.8H2.8a.4.4 0 0 0-.4.4z" />
            </svg>
        </Icon>
    )
})
const BarDown = memo((props) => {
    const {
        styled,
        title,
        size = 16
    } = props
    return (
        <Icon styled={styled}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={size}
                height={size}
                fill="currentColor"
                className="bi bi-chevron-bar-down"
                viewBox="0 0 16 16">
                <title>{title}</title>
                <path fillRule="evenodd"
                    d="M3.646 4.146a.5.5 0 0 1 .708 0L8 7.793l3.646-3.647a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 0-.708zM1 11.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5z" />
            </svg>
        </Icon>
    )
})
const Grip = memo((props) => {
    const {
        styled,
        title,
        size = 16
    } = props
    return (
        <Icon styled={styled}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={size}
                height={size}
                fill="currentColor"
                className="bi bi-grip-vertical"
                viewBox="0 0 16 16">
                <title>{title}</title>
                <path
                    d="M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
            </svg>

        </Icon>
    )
})
const House = memo((props) => {
    const {
        styled,
        title,
        size = 16
    } = props
    return (
        <Icon styled={styled}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={size}
                height={size}
                fill="currentColor"
                className="bi bi-house"
                viewBox="0 0 16 16"
            >
                <title>{title}</title>
                <path
                    d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5ZM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5 5 5Z" />
            </svg>

        </Icon>
    )
})
const Search = memo((props) => {
    const {
        styled,
        title,
        size = 16
    } = props
    return (
        <Icon styled={styled}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={size}
                height={size}
                fill="currentColor"
                className="bi bi-search"
                viewBox="0 0 16 16"
            >
                <title>{title}</title>
                <path
                    d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
        </Icon>
    )
})

const Ellipsis_Rotate90 = (props) => {
    const {
        styled,
        onClick,
        title,
        size = 16
    } = props
    return (
        <Icon
            styled={styled}
            onClick={onClick}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={size}
                height={size}
                fill="currentColor"
                className="bi bi-three-dots"
                viewBox="0 0 16 16">
                <title>{title}</title>
                <path
                    d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
            </svg>
        </Icon>
    )
}
const Left = memo((props) => {
    const {
        styled,
        title,
        size
    } = props
    return (
        <Icon styled={styled}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                width={size}
                height={size}
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6">
                <title>{title}</title>
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
        </Icon>
    )
})
const Right = memo((props) => {
    const {
        styled,
        title,
        size,
    } = props
    return (
        <Icon styled={styled}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                width={size}
                height={size}
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6">
                <title>{title}</title>
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
        </Icon>
    )
})

export default {
    JuutenIcon,
    MonochromeJuutenIcon,
    Ellipsis,
    Plus,
    Box,
    Bar,
    Save,
    Delete,
    X,
    Pen,
    Chat,
    BarTop,
    Grip,
    House,
    Search,
    Dash,
    BarDown,
    Left,
    Right,
}