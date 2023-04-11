import { Injectable } from '@nestjs/common'
import { Board, BoardStatus } from './boards.model'

@Injectable()
export class BoardsService {
  private boards: Board[] = []
  getAllBoards(): Board[] {
    return this.boards
  }

  getBoard(id: string): Board {
    return this.boards.find((board) => board.id === id)
  }
  createBoard(title: string, description: string) {
    const id = Date.now().toString()
    const board: Board = {
      id,
      title,
      description,
      status: BoardStatus.PUBLIC,
    }
    this.boards.push(board)
    return board
  }
}
