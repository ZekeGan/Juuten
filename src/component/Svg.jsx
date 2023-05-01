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
const Down = (props) => {
    const {
        styled,
        onClick,
        title,
        size
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
                className="bi bi-arrow-bar-down"
                viewBox="0 0 16 16"
            >
                <title>{title}</title>
                <path
                    fillRule="evenodd"
                    d="M1 3.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5zM8 6a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 .708-.708L7.5 12.293V6.5A.5.5 0 0 1 8 6z" />
            </svg>
        </Icon>
    )
}
const Up = (props) => {
    const {
        styled,
        onClick,
        title,
        size,
    } = props
    return (
        <Icon
            styled={styled}
            onClick={onClick}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={size}
                height={size}
                fill="currentColor"
                className="bi bi-arrow-bar-up"
                viewBox="0 0 16 16"
            >
                <title>{title}</title>
                <path
                    fill-rule="evenodd"
                    d="M8 10a.5.5 0 0 0 .5-.5V3.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 3.707V9.5a.5.5 0 0 0 .5.5zm-7 2.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5z" />
            </svg>
        </Icon>
    )
}
const Italic = (props) => {
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
                className="bi bi-type-italic"
                viewBox="0 0 16 16">
                <title>{title}</title>
                <path
                    d="M7.991 11.674 9.53 4.455c.123-.595.246-.71 1.347-.807l.11-.52H7.211l-.11.52c1.06.096 1.128.212 1.005.807L6.57 11.674c-.123.595-.246.71-1.346.806l-.11.52h3.774l.11-.52c-1.06-.095-1.129-.211-1.006-.806z" />
            </svg>
        </Icon>
    )
}
const Bold = (props) => {
    const {
        styled,
        onClick,
        title,
        size = 16,
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
                className="bi bi-type-bold"
                viewBox="0 0 16 16">
                <title>{title}</title>
                <path
                    d="M8.21 13c2.106 0 3.412-1.087 3.412-2.823 0-1.306-.984-2.283-2.324-2.386v-.055a2.176 2.176 0 0 0 1.852-2.14c0-1.51-1.162-2.46-3.014-2.46H3.843V13H8.21zM5.908 4.674h1.696c.963 0 1.517.451 1.517 1.244 0 .834-.629 1.32-1.73 1.32H5.908V4.673zm0 6.788V8.598h1.73c1.217 0 1.88.492 1.88 1.415 0 .943-.643 1.449-1.832 1.449H5.907z" />
            </svg>
        </Icon>
    )
}
const Strikethrough = (props) => {
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
                className="bi bi-type-strikethrough"
                viewBox="0 0 16 16">
                <title>{title}</title>
                <path
                    d="M6.333 5.686c0 .31.083.581.27.814H5.166a2.776 2.776 0 0 1-.099-.76c0-1.627 1.436-2.768 3.48-2.768 1.969 0 3.39 1.175 3.445 2.85h-1.23c-.11-1.08-.964-1.743-2.25-1.743-1.23 0-2.18.602-2.18 1.607zm2.194 7.478c-2.153 0-3.589-1.107-3.705-2.81h1.23c.144 1.06 1.129 1.703 2.544 1.703 1.34 0 2.31-.705 2.31-1.675 0-.827-.547-1.374-1.914-1.675L8.046 8.5H1v-1h14v1h-3.504c.468.437.675.994.675 1.697 0 1.826-1.436 2.967-3.644 2.967z" />
            </svg>
        </Icon>
    )
}
const Link = (props) => {
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
                className="bi bi-link"
                viewBox="0 0 16 16">
                <title>{title}</title>
                <path
                    d="M6.354 5.5H4a3 3 0 0 0 0 6h3a3 3 0 0 0 2.83-4H9c-.086 0-.17.01-.25.031A2 2 0 0 1 7 10.5H4a2 2 0 1 1 0-4h1.535c.218-.376.495-.714.82-1z" />
                <path
                    d="M9 5.5a3 3 0 0 0-2.83 4h1.098A2 2 0 0 1 9 6.5h3a2 2 0 1 1 0 4h-1.535a4.02 4.02 0 0 1-.82 1H12a3 3 0 1 0 0-6H9z" />
            </svg>
        </Icon>
    )
}
const Check = (props) => {
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
                className="bi bi-check"
                viewBox="0 0 16 16">
                <title>{title}</title>
                <path
                    d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
            </svg>
        </Icon>
    )
}
const BarLeft = (props) => {
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
                className="bi bi-chevron-bar-left"
                viewBox="0 0 16 16">
                <title>{title}</title>
                <path
                    fillRule="evenodd"
                    d="M11.854 3.646a.5.5 0 0 1 0 .708L8.207 8l3.647 3.646a.5.5 0 0 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 0 1 .708 0zM4.5 1a.5.5 0 0 0-.5.5v13a.5.5 0 0 0 1 0v-13a.5.5 0 0 0-.5-.5z" />
            </svg>
        </Icon>
    )
}
const BarRight = (props) => {
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
                className="bi bi-chevron-bar-right"
                viewBox="0 0 16 16">
                <title>{title}</title>
                <path
                    fillRule="evenodd"
                    d="M4.146 3.646a.5.5 0 0 0 0 .708L7.793 8l-3.647 3.646a.5.5 0 0 0 .708.708l4-4a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708 0zM11.5 1a.5.5 0 0 1 .5.5v13a.5.5 0 0 1-1 0v-13a.5.5 0 0 1 .5-.5z" />
            </svg>
        </Icon>
    )
}
const Note = (props) => {
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
                className="bi bi-journal"
                viewBox="0 0 16 16">
                <title>{title}</title>
                <path
                    d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z" />
                <path
                    d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z" />
            </svg>

        </Icon>
    )
}


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
    // Ellipsis_Rotate90,
    Left,
    Right,
    // Down,
    // Up,
    // Italic,
    // Bold,
    // Strikethrough,
    // Link,
    // Check,
    // BarLeft,
    // BarRight,
    // Note,
}