import {sequelize} from '../utils/db.js'
import { DataTypes } from'sequelize'


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
    firstName:{
        type: DataTypes.STRING, defaultValue: "-"
    },
    lastName:{
        type: DataTypes.STRING, defaultValue: "-"
    },
    isActivated:{
        type: DataTypes.BOOLEAN, defaultValue: false
    },
    activationLink:{
        type: DataTypes.STRING
    }
})

const Basket = sequelize.define('basket', {
    id: {
        type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true
    },
})


User.hasOne(Basket)
Basket.belongsTo(User)

export const models = {
    User, Basket,
}

