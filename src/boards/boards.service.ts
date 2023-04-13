import { Injectable, NotFoundException } from '@nestjs/common'
import { Board, BoardStatus } from './boards.model'
import { v4 as uuid } from 'uuid'
import { CreateBoardDto } from './dto/create.board.dto'

@Injectable()
export class BoardsService {
  private boards: Board[] = []

  getAllBoards(): Board[] {
    return this.boards
  }

  getBoard(id: string): Board {
    const found = this.boards.find((board) => board.id === id)
    if (!found) {
      throw new NotFoundException('Board not found')
    }
    return found
  }

  createBoard(createBoardDto: CreateBoardDto) {
    const { title, description } = createBoardDto
    const board: Board = {
      id: uuid(),
      title,
      description,
      status: BoardStatus.PUBLIC,
    }
    this.boards.push(board)
    return board
  }

  deleteBoard(id: string): void {
    const found = this.getBoard(id)
    this.boards = this.boards.filter((board) => board.id !== found.id)
  }

  updateBoardStatus(id: string, status: BoardStatus): Board {
    const board = this.getBoard(id)
    board.status = status
    return board
  }
}
