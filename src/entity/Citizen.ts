import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
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
    length: 8,
    unique: true
  })
  identityNumber: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({
    name: 'birth_date',
    type: 'date'
  })
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