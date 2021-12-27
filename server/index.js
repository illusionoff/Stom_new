import dotenv from 'dotenv';
import express from 'express';
import chalk from 'chalk';
import cors from 'cors';
import {sequelize} from './utils/db.js'
import router from './routes/index.js';
import {models} from './models/models.js'
import errorHandler from './middleware/ErrorHandlingMiddleware.js'
import fileUpload from 'express-fileupload'

dotenv.config()

const PORT = process.env.PORT || 5000

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('static'))
app.use(fileUpload({}))

app.use('/api', router);


app.use(errorHandler)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(chalk.cyan(`::::::::...The server is running on the port: ${PORT}...::::::::`)))

    }catch (err){
        console.log('error start: ', err);
    }
};

start();

