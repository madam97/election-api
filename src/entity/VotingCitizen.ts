import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { dbConfig } from '../config';
import { Citizen } from './Citizen';
import { District } from './District';
import { Vote } from './Vote';

@Entity({
  name: dbConfig.tablePrefix+'voting_citizens'
})
export class VotingCitizen {
  @PrimaryGeneratedColumn()
  id: number; 

  @Column({
    unique: true
  })
  token: string;

  @Column()
  password: string;
  
  @Column({
    unique: true
  })
  email: string;
  
  @Column({
    name: 'last_login',
    type: 'timestamp',
    default: () => 'NOW()'
  })
  lastLogin: Date;

  // ---------------------------------------

  @OneToOne(() => Citizen, (citizen) => citizen.votingCitizen, {
    nullable: false
  })
  @JoinColumn({
    name: 'voting_citizen_id'
  })
  citizen: Citizen;

  @OneToOne(() => Vote, (vote) => vote.votingCitizen)
  vote: Vote;
}