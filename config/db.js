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

    // console.log(chalk.green(
    //     'I am a green line ' +
    //     chalk.yellow.underline.bold.bgGray(' with a blue substring ') +
    //     ' that becomes green again!'
    // ));
};

module.exports = connectDB;
