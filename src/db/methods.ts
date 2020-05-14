export { findUserById, findUserByName, findEntriesByUser, findEntriesByUrl, addUser, addEntry, findEntryById }

import { encrypt, decrypt, hashPassword, comparePasswords } from '../core/common'
import { User, Entry } from './models'

async function findUserById(id: number): Promise<User> {
    return User.findByPk(id)
}

async function findUserByName(username: string): Promise<User> {
    return User.findOne({ where: { username } })
}

async function findEntriesByUser(userId: number): Promise<Entry[]> {
    return Entry.findAll({ where: { userId } })
}

async function findEntryById(id: number): Promise<Entry[]> {
    return Entry.findByPk(id)
}

async function findEntriesByUrl(url: string): Promise<Entry[]> {
    return Entry.findOrCreate({ where: { url } })
}

async function addUser(username: string, pass: string): Promise<[boolean, User]> {
    const password = await hashPassword(pass)
    return User.findOrCreate({where: {username, password}})
}

async function addEntry(user: User, url: string, website: string, username: string, pass: string): Promise<[boolean, User]> {
    const userId = await user.get("id")
    const key: any = await user.get("password")
    const login = encrypt(username, key)
    const password = encrypt(pass, key)
    return Entry.findOrCreate({where: {userId, url, website}})
}