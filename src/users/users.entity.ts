import { Entity,Column,PrimaryGeneratedColumn,BaseEntity } from "typeorm";

@Entity('users')
export default class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    username:string

    @Column()
    password:string

    @Column()
    role:string
}