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
  
  @Column()
  birthYear: number;
  
  @Column({
    type: 'timestamp'
  })
  lastLogin: Date;
  
  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => District, (district) => district.users)
  district: District;

  @OneToOne(() => Vote, (vote) => vote.user)
  @JoinColumn()
  vote: Vote;
}