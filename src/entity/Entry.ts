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
        let cipher = aes256.cipher(this.user.password);
        this.login = cipher.encrypt(this.login);
        this.password = cipher.encrypt(this.password);
    }

    decryptData() {
        let cipher = aes256.cipher(this.user.password);
        this.login = cipher.decrypt(this.login);
        this.password = cipher.decrypt(this.password);
    }
}
