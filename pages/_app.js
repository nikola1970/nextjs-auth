import React from "react";
import App, { Container } from "next/app";

// utlis
import { getInitialAuth } from "../api/utils";

class MyApp extends App {
    static async getInitialProps({ Component, ctx }) {
        let pageProps = {};

        const { authInfo } = getInitialAuth({ req: ctx.req, res: ctx.res });

        ctx.userInfo = authInfo.user;

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }

        return { pageProps };
    }

    render() {
        const { Component, pageProps } = this.props;

        return (
            <Container>
                <Component {...pageProps} />
            </Container>
        );
    }
}

export default MyApp;
