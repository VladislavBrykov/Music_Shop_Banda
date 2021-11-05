import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'user' })
class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  phoneEmail: string;

  @Column()
  token: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @UpdateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default User;
