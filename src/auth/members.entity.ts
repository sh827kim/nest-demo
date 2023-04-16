import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm'
import { Board } from '../boards/board.entity'

@Entity()
@Unique(['username'])
export class Members {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  username: string

  @Column()
  password: string

  @OneToMany(() => Board, (board) => board.member)
  boards: Board[]
}
