const routes = require("next-routes");

module.exports = routes()
    .add("login", "/login")
    .add("profile", "/profile");
