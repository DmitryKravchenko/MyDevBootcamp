const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const fileupload = require('express-fileupload');
const cookieParser = require('cookie-parser');

/** Security */
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');

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

/** Cookie parser*/
app.use(cookieParser());

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

/** File upload*/
app.use(fileupload())

/** Sanitize data*/
app.use(mongoSanitize());

/** Set security headers*/
app.use(helmet());

/** Prevent XSS attacks*/
app.use(xss());

/** Rate limiting*/
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100
});
app.use(limiter);

 /** Prevent http param pollution*/
app.use(hpp());

 /** Enable CORS*/
app.use(cors());

/** Set static folder*/
app.use(express.static(path.join(__dirname, 'public')));

/** Route files*/
const bootcamps = require("./routes/bootcamps");
const courses = require("./routes/courses");
const auth = require("./routes/auth");
const users = require("./routes/users");
const reviews = require("./routes/reviews");

/** Mount routers*/
app.use("/api/v1/bootcamps", bootcamps);
app.use("/api/v1/courses", courses);
app.use("/api/v1/auth", auth);
app.use("/api/v1/users", users);
app.use("/api/v1/reviews", reviews);




app.use(errorHandler);
