import {Entity, PrimaryGeneratedColumn, Column, RelationCount, ManyToOne} from "typeorm";
import {User} from './User'
import aes256 from "aes256"

@Entity()
/**
 * The class for an entry
 * @class
 */
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
    user: User;
    
    /**
     * Encrypt the entry's data before storing it in a database
     * Uses the user's hashed password as the key
     * @summary Encrypt entry's data
     * @this Entry
     */
    encryptData() {
        let key = this.user.password;
        this.login = aes256.encrypt(key, this.login);
        this.password = aes256.encrypt(key, this.password);
    }


    /**
     * Decrypt the entry's data before sending it in a request
     * Uses the user's hashed password as the key
     * @summary Decrypt entry's data
     * @this Entry
     */
    decryptData() {
        let key = this.user.password;
        this.login = aes256.decrypt(key, this.login);
        this.password = aes256.decrypt(key, this.password);
    }
}
