import {Entity, PrimaryGeneratedColumn, Column, RelationCount, ManyToOne} from "typeorm";
import {User} from './User'
import aes256 from "aes256"

@Entity()
export class Entry {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    website: string;

    @Column()
    login: string;

    @Column()
    password: string;

    @ManyToOne(type => User, user => user.entries)
    user: User
    
    encryptData() {
        let key = this.user.password
        console.log(key)
        this.login = aes256.encrypt(key, this.login);
        this.password = aes256.encrypt(key, this.password);
    }

    decryptData() {
        let key = this.user.password
        console.log(key)
        this.login = aes256.decrypt(key, this.login);
        this.password = aes256.decrypt(key, this.password);
    }
}
