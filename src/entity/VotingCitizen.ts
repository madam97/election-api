import { IsDate, IsEmail, IsJWT, IsOptional, IsString } from 'class-validator';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { dbConfig } from '../config';
import { Citizen } from './Citizen';
import { Vote } from './Vote';

@Entity({
  name: dbConfig.tablePrefix+'voting_citizens'
})
export class VotingCitizen {
  @PrimaryGeneratedColumn()
  id: number; 

  @Column({
    unique: true,
    update: false
  })
  @IsJWT()
  refreshToken: string;

  @Column()
  @IsString()
  password: string;
  
  @Column({
    unique: true
  })
  @IsEmail()
  email: string;
  
  @Column({
    name: 'last_login',
    type: 'timestamp',
    nullable: true
  })
  @IsOptional()
  @IsDate()
  lastLogin: Date;

  // ---------------------------------------

  @OneToOne(() => Citizen, (citizen) => citizen.votingCitizen, {
    nullable: false
  })
  @JoinColumn({
    name: 'citizen_id'
  })
  citizen: Citizen;

  @OneToOne(() => Vote, (vote) => vote.votingCitizen)
  vote: Vote;
}