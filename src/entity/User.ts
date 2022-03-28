import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { dbConfig } from '../config';
import { District } from './District';
import { Vote } from './Vote';

@Entity({
  name: dbConfig.tablePrefix+'users'
})
export class User {
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
    name: 'birth_year'
  })
  birthYear: number;
  
  @Column({
    name: 'last_login',
    type: 'timestamp',
    default: 'NOW()'
  })
  lastLogin: Date;
  
  @CreateDateColumn({
    name: 'created_at',
    insert: false,
    update: false
  })
  createdAt: Date;

  // ---------------------------------------

  @ManyToOne(() => District, (district) => district.users, {
    nullable: false
  })
  @JoinColumn({
    name: 'district_id'
  })
  district: District;

  @OneToOne(() => Vote, (vote) => vote.user)
  vote: Vote;
}