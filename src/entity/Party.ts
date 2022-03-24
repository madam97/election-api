import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { dbConfig } from '../config';
import { Candidate } from './Candidate';
import { Vote } from './Vote';

@Entity({
  name: dbConfig.tablePrefix+'parties'
})
export class Party {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  website: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Candidate, (candidate) => candidate.party)
  candidates: Candidate[];

  @OneToMany(() => Vote, (vote) => vote.party)
  votes: Vote[];
}