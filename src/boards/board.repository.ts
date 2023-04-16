import { DataSource, Repository } from 'typeorm'
import { Board } from './board.entity'
import { Injectable } from '@nestjs/common'
import { CreateBoardDto } from './dto/create-board.dto'
import { BoardStatus } from './board-status.enum'
import { Members } from '../auth/members.entity'

@Injectable()
export class BoardRepository extends Repository<Board> {
  constructor(private dataSource: DataSource) {
    super(Board, dataSource.createEntityManager())
  }

  async createBoard(
    createBoardDto: CreateBoardDto,
    user: Members,
  ): Promise<Board> {
    const { title, description } = createBoardDto

    const board = await this.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
      member: user,
    })
    await this.save(board)
    return board
  }
}
