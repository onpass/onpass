import { DataTypes, Model } from 'sequelize'
import { db } from './setup'
import { hashPassword, encrypt } from '../core/common'

import {findUserById} from "./methods"

export class User extends Model { }
export class Entry extends Model { }

User.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
        get(): string {
            return this.getDataValue('id')
        }
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        get(): string {
            return this.getDataValue('username')
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        get(): string {
            return this.getDataValue('password')
        },
        set(value: string){
            this.setDataValue('password', hashPassword(value))
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    }
}, {
    sequelize: db,
    timestamps: false
})

Entry.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    },
    login: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value: string) {
            const key = findUserById(this.id).then(r=>r.get('password')).catch(r=>{throw r})
            this.setDataValue('login', encrypt(value, key as any))
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value: string) {
            const key = findUserById(this.id).then(r=>r.get('password')).catch(r=>{throw r})
            this.setDataValue('password', encrypt(value, key as any))
        }
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    sequelize: db,
    timestamps: false
})

User.hasMany(Entry)
Entry.belongsTo(User)