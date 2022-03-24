import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { dbConfig } from '../config';
import { Candidate } from './Candidate';
import { User } from './User';

@Entity({
  name: dbConfig.tablePrefix+'districts'
})
export class District {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => User, (user) => user.district)
  users: User[];

  @OneToMany(() => Candidate, (candidate) => candidate.district)
  candidates: Candidate[];
}