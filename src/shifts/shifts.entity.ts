import { Entity,Column,PrimaryGeneratedColumn,BaseEntity } from "typeorm";

@Entity('shifts')
export default class Shift extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    soldierName:string

    @Column()
    startTime:string

    @Column()
    endTime:string

    @Column()
    location:string
}