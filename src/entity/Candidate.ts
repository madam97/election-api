import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';
import { dbConfig } from '../config';
import { District } from './District';
import { Party } from './Party';
import { Vote } from './Vote';

@Entity({
  name: dbConfig.tablePrefix+'candidates'
})
@Unique('one_party_per_district', ['party', 'district'])
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
    name: 'created_at',
    insert: false,
    update: false
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    insert: false,
    update: false
  })
  updatedAt: Date;

  // ---------------------------------------

  @ManyToOne(() => Party, (party) => party.candidates, {
    nullable: false
  })
  @JoinColumn({
    name: 'party_id',
  })
  party: Party;

  @ManyToOne(() => District, (district) => district.candidates, {
    nullable: false
  })
  @JoinColumn({
    name: 'district_id',
  })
  district: District;

  @OneToMany(() => Vote, (vote) => vote.candidate)
  votes: Vote[];
}