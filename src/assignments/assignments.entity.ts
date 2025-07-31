import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne, JoinColumn } from 'typeorm';
import Shift from 'src/shifts/shifts.entity';
import User from 'src/users/users.entity';

@Entity('assignments')
export default class Assignment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  shiftId: number;

  @Column()
  soldierId: number;

  @ManyToOne(() => Shift)
  @JoinColumn({ name: 'shiftId' })
  shift: Shift;

  @ManyToOne(() => User, user => user.username, { nullable: true })
  @JoinColumn({ name: 'soldierId' })
  user: User;
}
