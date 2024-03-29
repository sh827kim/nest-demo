import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { BoardsService } from './boards.service'
import { CreateBoardDto } from './dto/create-board.dto'
import { BoardStatus } from './board-status.enum'
import { BoardStatusValidationPipe } from './pipes/board.status.validation.pipe'
import { AuthGuard } from '@nestjs/passport'
import { GetUser } from '../auth/get-user.decorator'
import { Members } from '../auth/members.entity'

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
  private logger = new Logger('BoardsController')
  constructor(private boardsService: BoardsService) {}
  @Get()
  async getAllBoards(@GetUser() members: Members) {
    this.logger.verbose(`User ${members.username} retrieving all boards`)
    return this.boardsService.getAllBoards(members)
  }

  @Get('/:id')
  async getBoard(@Param('id', ParseIntPipe) id: number) {
    return this.boardsService.getBoard(id)
  }
  @Post()
  @UsePipes(ValidationPipe)
  async createBoard(
    @Body() createBoardDto: CreateBoardDto,
    @GetUser() user: Members,
  ) {
    this.logger.verbose(
      `User ${user.username} creating a new board. Data: ${JSON.stringify(
        createBoardDto,
      )}`,
    )
    return this.boardsService.createBoard(createBoardDto, user)
  }
  @Delete('/:id')
  deleteBoard(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() members: Members,
  ) {
    return this.boardsService.deleteBoard(id, members)
  }

  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ) {
    return this.boardsService.updateBoardStatus(id, status)
  }
}
