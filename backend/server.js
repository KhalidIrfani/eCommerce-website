const dotenv = require("dotenv")
dotenv.config()
const app = require("./app");
const connectDatabase = require("./db/database");
// process.on("uncaughtException", (err) => {
//     console.log(`Error:${err.message}`);
//     console.log(`shutting down the server from handling uncaught exception`);
// })


if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({
        path: "config/.env"
    })
}

connectDatabase();

const server = app.listen(process.env.PORT, () => {
    console.log(`server is running on http://localhost:${process.env.PORT}`);
})


process.on("unhandledRejection", (err) => {
    console.log(`Shutting down the server for ${err.message}`);
    console.log(`Shutting down the server for unhandle promise rejection`);

    server.close(() => {
        process.exit(1)
    })
})