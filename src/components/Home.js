import React, { useEffect } from 'react'
import styled from 'styled-components'
import ImageSlider from './ImageSlider';
import Movies from './Movies';
import Viewers from './Viewers';
import db from './../firebase'
import { useDispatch } from 'react-redux'
import { setMovies } from '../features/movie/movieSlice'
import Footer from "./Footer"

function Home() {
    const dispatch = useDispatch()

    useEffect(() => {
        db.collection("movies").onSnapshot((snapshot) => {
            let tempMovies = snapshot.docs.map((doc) => {
                return {id: doc.id, ...doc.data()}
            })
            // We got these movies fom the database now, lets move them 
            // to the store
            dispatch(setMovies(tempMovies))
        })
    }, [])

    return (
        <Container>
            <ImageSlider />
            <Viewers />
            <Movies />
            <Footer />
        </Container>
    )
}

export default Home;

const Container = styled.main`
    min-height: calc(100vh - 70px);
    padding: 0 calc(3.5vw + 5px);
    position: relative;
    overflow-x: hidden;
    
    &:before {
        background: url("/images/home-background.png") no-repeat center center;
        background-attachment: fixed;
        background-size: cover cover;       
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom:0;
        z-index: -1 ;    
    }
`