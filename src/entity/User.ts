import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Token } from '../interfaces';

@Entity({ name: 'user' })
class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  phoneEmail: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @UpdateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
  token?: Token;
}

export default User;
