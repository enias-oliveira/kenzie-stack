import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  username: string;

  @Column()
  pasword: string;

  @Column()
  updateAt: Date;

  @Column()
  createAt: Date;
}
