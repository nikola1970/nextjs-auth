const CONFIG = {
    COOKIE_SECRET = "CookiePass_1234@@4321",
    COOKIE_CONFIG = {
        httpOnly: true,
        secure: process.env === "production",
        signed: true
    },
    USER_AUTHENTICATED = "authenticated"

}

module.exports = CONFIG;
