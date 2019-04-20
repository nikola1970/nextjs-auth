import { useState } from "react";

// api
import { login } from "../api/api.client";

// components
import Layout from "../components/Layout";

// router
import { Router } from "../routes";

// utils
import { restrictRoute } from "../api/utils";

function Login(props) {
    const [form, setForm] = useState({
        email: "Lucio_Hettinger@annie.ca",
        password: "demarco.info"
    });
    const [serverError, setServerError] = useState(null);

    const handleChange = ({ target }) => setForm(old => ({ ...old, [target.name]: target.value }));

    const handleSubmit = event => {
        event.preventDefault();
        const { email, password } = form;
        login({ email, password })
            .then(() => Router.push("/"))
            .catch(error => setServerError(error.response.data.error));
    };

    return (
        <Layout title="Login" {...props}>
            <form onSubmit={handleSubmit}>
                <input type="text" name="email" value={form.email} onChange={handleChange} />
                <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                />
                <button>Login</button>
                {serverError && <div>{serverError}</div>}
            </form>
        </Layout>
    );
}

Login.getInitialProps = ({ req, res, userInfo }) => {
    restrictRoute({ isProtectedRoute: false, req, res, userInfo });

    return { userInfo };
};

export default Login;
