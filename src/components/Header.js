import React, { useEffect } from 'react'
import { auth, provider } from "../firebase"
import styled from 'styled-components'
import { useHistory } from "react-router-dom"
import {
    selectUserName,
    selectUserPhoto,
    setUserLogin,
    setSignOut
} from "../features/user/userSlice"
import { useSelector, useDispatch } from "react-redux"

function Header() {
    const dispatch = useDispatch()
    const history = useHistory()
    const userName = useSelector(selectUserName);
    const userPhoto = useSelector(selectUserPhoto);

    useEffect(()=>{
        // use firebase cookies to check if the user data 
        // is already stored
        auth.onAuthStateChanged(async (user) => {
            if(user){
                dispatch(setUserLogin(
                    {
                        name: user.displayName,
                        email: user.email,
                        photo: user.photoURL
                    }
                ))
                history.push("/")                
            }
        })
    }, [])

    const signIn = () => {
        auth.signInWithPopup(provider)
        .then((result) => {
            let user = result.user;
            dispatch(setUserLogin(
                {
                    name: user.displayName,
                    email: user.email,
                    photo: user.photoURL
                }
            ))
            history.push("/")
        })
    }

    const signOut = () => {
        auth.signOut()
        .then(() => {
            dispatch(setSignOut())
            history.push("/login")
        })
    }

    return (
        <Nav>
            <Logo src="/images/logo.svg" />
            {
                !userName ? (
                    <LoginContainer>
                        <Login onClick={signIn}>Login</Login> 
                    </LoginContainer> ) :
                (
                    <>
                        <NavMenu>
                            <a>
                                <img src="/images/home-icon.svg" />
                                <span> HOME </span>
                            </a>
                            <a>
                                <img src="/images/search-icon.svg" />
                                <span> SEARCH </span>
                            </a>
                            <a>
                                <img src="/images/watchlist-icon.svg" />
                                <span> WATCHLIST </span>
                            </a>
                            <a>
                                <img src="/images/movie-icon.svg" />
                                <span> MOVIES </span>
                            </a>     
                            <a>
                                <img src="/images/series-icon.svg" />
                                <span> SERIES </span>
                            </a>   
                        </NavMenu>

                        <UserName> {userName.toLowerCase()} </UserName>
                        <UserImg src={userPhoto} onClick={signOut}/>
                    </>
                )
            }
        </Nav>
    )
}

export default Header

// creating an html nav with javascript
const Nav = styled.nav`
    height: 70px;
    background: #090b13;
    display: flex;
    align-items: center;
    padding: 0 36px;
    overflow-x: hidden;
`

const Logo = styled.img`
    width: 80px;
`

const NavMenu = styled.div`
    display: flex;
    flex: 1;
    margin-left: 25px;
    align-items: center;

    a {
        display: flex;
        align-items: center;
        padding: 0 12px;
        cursor: pointer;

        img {
            height: 20px;
        }

        span {
            font-size: 13px;
            letter-spacing: 1.42px;
            position: relative ;

            &:after{
                content: "";
                height: 2px;
                background: white;
                position: absolute;
                left: 0;
                right: 0;
                bottom: -6px;
                opacity: 0;
                transform: scaleX(0);
                transition: all 250ms linear 0s;
            }
        }

        &:hover{
            span:after {
                transform: scaleX(1);
                opacity: 1;
            }
        }
    }
`

const UserImg = styled.img`
    width:40px;
    height:40px;
    border-radius: 50%;
    cursor: pointer;
`

const Login = styled.div`
    border: 1px solid #f9f9f9;
    padding: 8px 16px;
    border-radius: 4px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    background-color: rgba(0, 0, 0, 0.6);
    transition: all 0.5s ease 0s;
    cursor: pointer;

    &:hover {
        background-color: #f9f9f9;
        color: #000;
        border-color: transparent;
    }
`

const LoginContainer = styled.div`
    flex: 1;
    display: flex;
    justify-content: flex-end;
`

const UserName = styled.div`
    text-transform: capitalize;
    margin-right: 2%;
`