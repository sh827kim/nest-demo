import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { BoardStatus } from './board-status.enum'
import { Members } from '../auth/members.entity'

@Entity()
export class Board {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  description: string

  @Column()
  status: BoardStatus

  @ManyToOne(() => Members, (member) => member.boards, { eager: false })
  member: Members
}
