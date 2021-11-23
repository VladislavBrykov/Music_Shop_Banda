import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'device' })
class Devices {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userPhoneEmail: string;

  @Column()
  token: string;

  @UpdateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default Devices;
