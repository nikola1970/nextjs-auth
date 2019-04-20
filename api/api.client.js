import axios from "axios";
import { Router } from "../routes";

// utlis
import { WINDOW_USER_SCRIPT_VARIABLE } from "./utils";

axios.defaults.withCredentials = true;

export const login = ({ email, password }) => {
    return axios
        .post("/api/login", { email, password })
        .then(({ data }) => {
            if (typeof window !== undefined) {
                window[WINDOW_USER_SCRIPT_VARIABLE] = data || {};
            }
            return data;
        })
        .catch(error => {
            throw error;
        });
};

export const logout = () => {
    if (typeof window !== undefined) {
        window[WINDOW_USER_SCRIPT_VARIABLE] = {};
    }

    return axios.post("/api/logout").then(() => Router.push("/login"));
};

export const getUserProfile = ({ baseUrl, cookieHeaders }) => {
    return axios
        .get(`${baseUrl ? baseUrl : "/"}api/profile`, cookieHeaders)
        .then(({ data }) => data)
        .catch(error => {
            throw error;
        });
};
