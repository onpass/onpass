export { encrypt, decrypt, hashPassword, comparePasswords, app }

const bcrypt = require("bcrypt")
const express = require("express")
import aes256 from 'aes256'

let app = express()

function encrypt(password: string, key: string): string {
    return aes256.encrypt(key, password)
}

function decrypt(password: string, key: string): string {
    return aes256.decrypt(key, password)
}

async function hashPassword(password: string, rounds: number = 10): Promise<string> {
    return bcrypt.hash(password, rounds)
}

async function comparePasswords(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash)
}