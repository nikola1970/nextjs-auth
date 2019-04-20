import React, { Fragment } from "react";
import Head from "next/head";
import { Router, Link } from "../routes";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import NProgress from "nprogress";

// api
import { logout } from "../api/api.client";

Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangError = () => NProgress.done();

const GlobalStyles = createGlobalStyle`
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    } 
`;

const theme = {
    colors: {
        green: "#027042",
        darkGreen: "#003f2d",
        lightGreen: "#73a340",
        orange: "#e85125",
        grey: "#656565",
        lightGrey: "#dee1e4",
        labelGrey: "#9b9b9b",
        red: "#f44336",
        blue: "#5883e3",
        brown: "#785130"
    }
};

const GlobalWrapper = styled.div`
    max-width: 1000px;
    width: 100%;
    margin: 0 auto;
`;

const Navigation = styled.nav`
    display: block;
    margin-bottom: 40px;

    ul {
        list-style: none;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    li {
        margin: 0 10px;
    }
`;

function Layout({ children, title, userInfo = {} }) {
    return (
        <Fragment>
            <Head>
                <title>{title || "My NextJS App"}</title>
            </Head>
            <ThemeProvider theme={theme}>
                <GlobalWrapper>
                    <GlobalStyles />
                    <h1>Hello {userInfo.name || "Guest"}</h1>
                    <Navigation>
                        <ul>
                            {userInfo.email && (
                                <li>
                                    <Link route="/">
                                        <a>Home</a>
                                    </Link>
                                </li>
                            )}

                            {userInfo.email && (
                                <li>
                                    <Link route="profile">
                                        <a>Profile</a>
                                    </Link>
                                </li>
                            )}

                            {!userInfo.email && (
                                <li>
                                    <Link route="login">
                                        <a>Login</a>
                                    </Link>
                                </li>
                            )}
                            {userInfo.email && <button onClick={() => logout()}>Logout</button>}
                        </ul>
                    </Navigation>
                    {children}
                </GlobalWrapper>
            </ThemeProvider>
        </Fragment>
    );
}

export default Layout;
