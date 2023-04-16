import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Board } from './board.entity'
import { BoardStatus } from './board-status.enum'
import { CreateBoardDto } from './dto/create-board.dto'
import { BoardRepository } from './board.repository'

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,
  ) {}

  async getAllBoards(): Promise<Board[]> {
    return this.boardRepository.find()
  }

  async getBoard(id: number): Promise<Board> {
    const found = await this.boardRepository.findOne({ where: { id } })
    if (!found) {
      throw new NotFoundException(`Can't find Board with id ${id}`)
    }
    return found
  }

  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto)
  }

  async deleteBoard(id: number) {
    const result = await this.boardRepository.delete(id)
    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Board with id ${id}`)
    }

    console.log('result', result)
  }

  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoard(id)
    board.status = status
    return this.boardRepository.save(board)
  }
}
