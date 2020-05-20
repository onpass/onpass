import {Entity, PrimaryGeneratedColumn, Column, RelationCount, ManyToOne} from "typeorm";
import {User} from './User'

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
}
