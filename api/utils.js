import { Router } from "../routes";

export const WINDOW_USER_SCRIPT_VARIABLE = "__USER__";
const publicRoutes = ["/login"];
const guestOnlyRoutes = ["/login"];

export const getUrlAndCookieHeader = req => {
    const baseUrl = req ? `${req.protocol}://${req.get("Host")}/` : "/";
    const cookieHeaders = req ? { headers: { Cookie: req.headers.cookie } } : {};
    return { baseUrl, cookieHeaders };
};

export const getServerToken = req => {
    const { signedCookies = {} } = req;

    if (!signedCookies || !signedCookies.token) {
        return {};
    }

    return { user: signedCookies.token };
};

export const getClientToken = () => {
    if (typeof window !== undefined) {
        return {
            user: window[WINDOW_USER_SCRIPT_VARIABLE] || {}
        };
    }

    return { user: {} };
};

export const getInitialAuth = ({ req }) => {
    const authInfo = req ? getServerToken(req) : getClientToken();
    return { authInfo };
};

export const restrictRoute = ({ isProtectedRoute = false, userInfo, req, res }) => {
    const currentPath = req ? req.url : window.location.pathname;
    const isAuthenticated = userInfo && userInfo.type === "authenticated";

    if (isProtectedRoute && !isAuthenticated) {
        return redirectUser(res, "/login");
    }

    if (isAuthenticated && guestOnlyRoutes.includes(currentPath)) {
        return redirectUser(res, "/");
    }
};

const redirectUser = (res, path) => {
    if (res) {
        // SSR
        res.redirect(302, path);
        res.finished = true;
        return {};
    }

    Router.replace(path); // CSR
    return {};
};

export const getUserScript = user => {
    return `${WINDOW_USER_SCRIPT_VARIABLE} = ${JSON.stringify(user)}`;
};
