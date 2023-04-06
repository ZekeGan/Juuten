import React from 'react';
import styled from "styled-components";

const Page = styled.div`
    padding: 5px 0;
    display: flex;
    flex-wrap: wrap;
    align-items: start;
    margin-top: 5px;
    overflow: hidden;
`
const Tag = styled.div`
    font-size: 10px;
    height: 16px;
    line-height: 16px;
    background-color: red;
    border-radius: 8px;
    padding: 1px 6px;
    margin: 2px;
    background-color: ${({color}) => color};
`
function App(props) {
    const {item} = props
    return (
        <Page>
            {
                item.tags.map((tag, idx) =>
                    <Tag
                        key={idx}
                        color={tag.color}>
                        {tag.name}

                    </Tag>
                )
            }
        </Page>
    );
}

export default App;