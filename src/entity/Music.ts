import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'music' })
class Music {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  image: string;

  @Column()
  price: string;

  @Column()
  category: string;

  @Column()
  author: string;

  @Column()
  description: string;
}

export default Music;
