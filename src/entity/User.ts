import {Entity, PrimaryGeneratedColumn, Column, OneToMany, Unique} from "typeorm";
import {Entry} from "./Entry"
import bcrypt from 'bcrypt'

@Entity()
/**
 * The class for a user
 * @class
 */
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true
    })
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToMany(type => Entry, entry => entry.user)
    entries: Entry[]

    /**
     * Hash the password of the user. Always call before saving to the database
     * 
     * @param {string} salt - the salt to use for hashing 
     * @summary Hash user's password
     */
    hashPassword(salt: string = "") {
        if (salt == "")
            this.password = bcrypt.hashSync(this.password, 8);
        else
            this.password = bcrypt.hashSync(this.password, salt);
    }
    
    /**
     * Check the hashed password against an unencrypted password
     * 
     * @param {string} unencryptedPassword - the password to check against
     */
    checkPassword(unencryptedPassword: string): boolean {
        return bcrypt.compareSync(unencryptedPassword, this.password);
    }
}
