// components
import Layout from "../components/Layout";

import { restrictRoute } from "../api/utils";

function Home(props) {
    return (
        <Layout title="Home page" {...props}>
            <h1>Home page!</h1>
        </Layout>
    );
}

Home.getInitialProps = ({ req, res, userInfo }) => {
    restrictRoute({ isProtectedRoute: true, userInfo, req, res });

    return { userInfo };
};

export default Home;
