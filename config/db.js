const mongoose = require("mongoose");
const chalk = require("chalk");

const connectDB = async () => {
    const coon = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    });

    console.log(`##### ✅ ${chalk.green("MongoDB CONNECTED:")} ${chalk.gray.underline(coon.connection.host)}`);
};

module.exports = connectDB;
