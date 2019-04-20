import Layout from "../components/Layout";

// api
import { getUserProfile } from "../api/api.client";

// utils
import { getUrlAndCookieHeader, restrictRoute } from "../api/utils";

function Profile({ userData, error, userInfo }) {
    return (
        <Layout title="Profile" userInfo={userInfo}>
            <h1>Profile page</h1>
            {error && <div>{error}</div>}
            <pre>{JSON.stringify(userData, 2)}</pre>
        </Layout>
    );
}

Profile.getInitialProps = ({ req, res, userInfo }) => {
    restrictRoute({ isProtectedRoute: true, userInfo, req, res });

    const { baseUrl, cookieHeaders } = getUrlAndCookieHeader(req);
    return getUserProfile({ baseUrl, cookieHeaders })
        .then(data => {
            return { userData: data.user, error: "", userInfo };
        })
        .catch(error => {
            if (error.response && error.response.data) {
                return { userData: {}, error: error.response.data.error, userInfo };
            }
        });
};

export default Profile;
