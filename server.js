const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");

/** Beauties */
const chalk = require("chalk");
const ora = require('ora');

const connectDB = require("./config/db");

const errorHandler = require("./middleware/error");

/** Load .ENV variables*/
dotenv.config({ path: "./config/config.env" });

/** Connection to data base*/
connectDB();

/** INIT server side*/
const app = express();
const PORT = process.env.PORT || 3000;

/** Body parser */
app.use(express.json());

/** Listen PORT*/

app.listen(
    PORT,
    console.log(),
    console.log(chalk.white(`##### ✅ Server running in`, chalk.yellow.bold.italic.bgGrey(` ${process.env.NODE_ENV} `), `on PORT:`, chalk.red(`${PORT}`))),
);

/** Morgan DEV logger*/
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

/** Route files*/
const bootcamps = require("./routes/bootcamps");

/** Mount routers*/
app.use("/api/v1/bootcamps", bootcamps);




app.use(errorHandler);
