import { sequelize } from '../utils/db.js'
import { DataTypes } from 'sequelize'


const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true
    },
    email: {
        type: DataTypes.STRING, unique: true,
    },
    password: {
        type: DataTypes.STRING
    },
    role: {
        type: DataTypes.STRING, defaultValue: "USER"
    },
    firstName: {
        type: DataTypes.STRING, defaultValue: "-"
    },
    lastName: {
        type: DataTypes.STRING, defaultValue: "-"
    },
    isActivated: {
        type: DataTypes.BOOLEAN, defaultValue: false
    },
    activationLink: {
        type: DataTypes.STRING
    }
})

// реализую modek course 

const Course = sequelize.define('course', {
    id: {
        type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true
    },
    image: {
        type: DataTypes.STRING, allowNull: false
    },
    name: {
        type: DataTypes.STRING, unique: true, allowNull: false
    },
    time: {
        type: DataTypes.INTEGER, allowNull: false
    },
    lectionsCounter: {
        type: DataTypes.INTEGER, allowNull: false, defaultValue: 1
    },
    price: {
        type: DataTypes.INTEGER, allowNull: false
    },
})

const Basket = sequelize.define('basket', {
    id: {
        type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true
    },
})


User.hasOne(Basket);
Basket.belongsTo(User);


// https://app.diagrams.net/#Hillusionoff%2FStom_new%2Fmain%2Fserver%2Fmodels%2FUntitled%20Diagram.drawio
// Course
// interface ICoursesData {
//  image: string;
//  name: string;
//  time: number; // это продолжительность курса в минутах тогда почему стринг? или это для отображени, а мне на бэке number?
//  lectionsCounter: number;
//  price: string;

// course_info
// section: string;
// ////////////////////////////////////////program: String;
// program: [
// {
// id:
//  name: string;
//  lectorName: string;
//  lectorAvatar: string;
//  time: number;
//  price: number;
//  content: [string];
//  lectionsCounter: number;
// }];
// lectors: [string];
// questions: [{name: [string], answer:[string]}]

// startTime: Data;
// category: string
// }



export const models = {
    User, Course, Basket,
}

