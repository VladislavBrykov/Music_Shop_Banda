import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import Music from './Music';

@Entity({ name: 'basket' })
class Basket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  id_user: number;

  @Column()
  id_sound: number;

  @Column()
  root: boolean;
}

export default Basket;
