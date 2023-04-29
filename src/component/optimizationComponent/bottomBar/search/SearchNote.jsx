import React from 'react';
import styled from "styled-components";
import BottemBarTemplate from "../BottemBarTemplate.jsx";
import FoundData from "./FoundData.jsx";

import useGetData from "../../../../hooks/useGetData";

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 30px 0 0 0;
`


const SearchNote = React.memo((
    {
        open = false,
        setOpen = () => { }
    }) => {
    const allFolder = useGetData(open, true)

    console.log('searchPage')

    return (
        <BottemBarTemplate
            open={open}
            fullPage
            closeCallback={() => setOpen(false)}
        >
            <Container>
                {open && <FoundData data={allFolder} open={open} />}
            </Container>
        </BottemBarTemplate>
    );
})

export default SearchNote;