import { CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { dbConfig } from '../config';
import { Candidate } from './Candidate';
import { Party } from './Party';
import { User } from './User';

@Entity({
  name: dbConfig.tablePrefix+'votes'
})
@Unique('one_user_vote_once', ['user', 'party', 'candidate'])
export class Vote {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    name: 'created_at',
    insert: false,
    update: false
  })
  createdAt: Date;

  // ---------------------------------------

  @OneToOne(() => User, (user) => user.vote, {
    nullable: false
  })
  @JoinColumn({
    name: 'user_id'
  })
  user: User;

  @ManyToOne(() => Party, (party) => party.votes, {
    nullable: false
  })
  @JoinColumn({
    name: 'party_id'
  })
  party: Party;

  @JoinColumn({
    name: 'candidate_id'
  })
  @ManyToOne(() => Candidate, (candidate) => candidate.votes, {
    nullable: false
  })
  candidate: Candidate;
}