import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { dbConfig } from '../config';
import { Candidate } from './Candidate';

@Entity({
  name: dbConfig.tablePrefix+'districts'
})
export class District {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true
  })
  name: string;

  // ---------------------------------------

  @OneToMany(() => Candidate, (candidate) => candidate.district)
  candidates: Candidate[];
}