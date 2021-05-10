import React from 'react'
import styled from 'styled-components'

function Footer() {
    return (
        <Container>
            Website developed by Shubham Pandey - No commercial purporses intended, made only for showing web development techniques and to be included as a piece of portfolio. All copyrights are owned by Disney.
        </Container>
    )
}

export default Footer

const Container = styled.div`
    height: 100px;
    width: 800px;
    text-align:center;
    margin: auto;
    margin-top:80px;
    color: rgba(249, 249, 249, 0.7);
`