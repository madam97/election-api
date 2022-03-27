import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { dbConfig } from '../config';
import { District } from './District';
import { Party } from './Party';
import { Vote } from './Vote';

@Entity({
  name: dbConfig.tablePrefix+'candidates'
})
export class Candidate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({
    type: 'varchar',
    length: 16,
    nullable: true,
    default: null
  })
  title: string | null;

  @Column()
  education: string;

  @CreateDateColumn({
    insert: false,
    update: false
  })
  createdAt: Date;

  @UpdateDateColumn({
    insert: false,
    update: false
  })
  updatedAt: Date;

  @ManyToOne(() => Party, (party) => party.candidates)
  party: Party;

  @ManyToOne(() => District, (district) => district.candidates)
  district: District;

  @OneToMany(() => Vote, (vote) => vote.candidate)
  votes: Vote[];
}