import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm'

@Entity()
@Unique(['username'])
export class Members {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  username: string

  @Column()
  password: string
}
