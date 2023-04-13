import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { BoardsService } from './boards.service'
import { CreateBoardDto } from './dto/create.board.dto'
import { BoardStatus } from './boards.model'
import { BoardStatusValidationPipe } from './pipes/board.status.validation.pipe'

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}
  @Get()
  getAllBoards() {
    return this.boardsService.getAllBoards()
  }

  @Get('/:id')
  getBoard(@Param('id') id: string) {
    return this.boardsService.getBoard(id)
  }
  @Post()
  @UsePipes(ValidationPipe)
  createBoard(@Body() createBoardDto: CreateBoardDto) {
    return this.boardsService.createBoard(createBoardDto)
  }
  @Delete('/:id')
  deleteBoard(@Param('id') id: string) {
    this.boardsService.deleteBoard(id)
  }

  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id') id: string,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ) {
    return this.boardsService.updateBoardStatus(id, status)
  }
}
