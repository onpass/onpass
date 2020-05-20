import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import {Entry} from "./Entry"
import bcrypt from 'bcrypt'

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToMany(type => Entry, entry => entry.user)
    entries: Entry[]

    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 8);
    }
    
    checkIfUnencryptedPasswordIsValid(unencryptedPassword: string): boolean {
        return bcrypt.compareSync(unencryptedPassword, this.password);
    }
}
