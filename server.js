const axios = require("axios");
const express = require("express");
const cookieParser = require("cookie-parser");

const next = require("next");

const routes = require("./routes");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handler = routes.getRequestHandler(app);

// config file
const CONFIG = {
    COOKIE_SECRET: "CookiePass_1234@@4321",
    COOKIE_CONFIG: {
        httpOnly: true,
        secure: process.env === "production",
        signed: true
    },
    USER_AUTHENTICATED: "authenticated"
};

// fake db call
const authenticate = async ({ email, password }) => {
    const { data } = await axios.get("https://jsonplaceholder.typicode.com/users");
    return data.find(user => {
        if (user.email === email && user.website === password) {
            return user;
        }
    });
};

app.prepare()
    .then(() => {
        const server = express();

        server.use(express.json());
        server.use(cookieParser(CONFIG.COOKIE_SECRET));

        // server.get("*", (req, res, next) => {
        //     console.log(req.headers);
        //     next();
        // });

        // routes
        server.post("/api/login", async (req, res) => {
            const { email, password } = req.body;

            const user = await authenticate({ email, password });

            if (!user) {
                return res.status(403).json({ error: "Invalid username or password" });
            }

            const userData = {
                name: user.name,
                email: user.email,
                type: CONFIG.USER_AUTHENTICATED
            };
            res.cookie("token", userData, CONFIG.COOKIE_CONFIG);
            res.json(userData);
        });

        server.post("/api/logout", (req, res) => {
            res.clearCookie("token", CONFIG.COOKIE_CONFIG);
            res.sendStatus(204);
        });

        server.get("/api/profile", async (req, res) => {
            const { signedCookies = {} } = req;
            const { token } = signedCookies;

            if (token && token.email) {
                const { data } = await axios.get("https://jsonplaceholder.typicode.com/users");
                const userProfile = data.find(user => (user.email = token.email));
                return res.status(200).json({ user: userProfile });
            }

            res.status(404).json({ error: "No token provided!" });
        });

        // start the server
        server.use(handler).listen(3000);
    })
    .catch(ex => {
        console.error(ex.stack);
        process.exit(1);
    });
