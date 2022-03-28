import { CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { dbConfig } from '../config';
import { Candidate } from './Candidate';
import { Party } from './Party';
import { VotingCitizen } from './VotingCitizen';

@Entity({
  name: dbConfig.tablePrefix+'votes'
})
@Unique('one_votingCitizen_vote_once', ['votingCitizen', 'party', 'candidate'])
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

  @OneToOne(() => VotingCitizen, (votingCitizen) => votingCitizen.vote, {
    nullable: false
  })
  @JoinColumn({
    name: 'voting_citizen_id'
  })
  votingCitizen: VotingCitizen;

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