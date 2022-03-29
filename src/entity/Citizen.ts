import { Column, Entity, Index, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsDateString, IsString, Matches } from 'class-validator';
import { dbConfig } from '../config';
import { District } from './District';
import { VotingCitizen } from './VotingCitizen';

@Entity({
  name: dbConfig.tablePrefix+'citizens'
})
export class Citizen {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 8
  })
  @Index({
    unique: true
  })
  @Matches(/[A-Z]{2}[0-9]{6}/, {
    message: '$property must follow the XX000000 format'
  })
  identityNumber: string;

  @Column()
  @IsString()
  firstname: string;

  @Column()
  @IsString()
  lastname: string;

  @Column({
    name: 'birth_date',
    type: 'date'
  })
  @IsDateString()
  birthDate: string;

  // ---------------------------------------

  @OneToOne(() => VotingCitizen, (votingCitizen) => votingCitizen.citizen)
  votingCitizen: VotingCitizen;

  @ManyToOne(() => District, {
    nullable: false
  })
  @JoinColumn({
    name: 'district_id'
  })
  district: District;
}