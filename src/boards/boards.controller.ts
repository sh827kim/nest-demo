import { Controller, Get, Param } from '@nestjs/common'
import { BoardsService } from './boards.service'

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}
  @Get()
  getAllBoards() {
    return this.boardsService.getAllBoards()
  }

  @Get('/:id')
  getBoard(@Param('id') boardId: string) {
    return this.boardsService.getBoard(boardId)
  }
}
