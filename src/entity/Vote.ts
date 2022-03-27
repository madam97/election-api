import { CreateDateColumn, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { dbConfig } from '../config';
import { Candidate } from './Candidate';
import { Party } from './Party';
import { User } from './User';

@Entity({
  name: dbConfig.tablePrefix+'votes'
})
export class Vote {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    insert: false,
    update: false
  })
  createdAt: Date;

  @OneToOne(() => User, (user) => user.vote)
  user: User;

  @ManyToOne(() => Party, (party) => party.votes)
  party: Party;

  @ManyToOne(() => Candidate, (candidate) => candidate.votes)
  candidate: Candidate;
}