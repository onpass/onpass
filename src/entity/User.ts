import {Entity, PrimaryGeneratedColumn, Column, OneToMany, Unique} from "typeorm";
import {Entry} from "./Entry"
import bcrypt from 'bcrypt'

@Entity()
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

     hashPassword(salt: string = "") {
        if (salt == "")
            this.password = bcrypt.hashSync(this.password, 8);
        else
            this.password = bcrypt.hashSync(this.password, salt);
    }
    
    checkPassword(unencryptedPassword: string): boolean {
        return bcrypt.compareSync(unencryptedPassword, this.password);
    }
}
