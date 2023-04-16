import { Module } from '@nestjs/common'
import { BoardsController } from './boards.controller'
import { BoardsService } from './boards.service'
import { BoardRepository } from './board.repository'
import { AuthModule } from '../auth/auth.module'

@Module({
  imports: [AuthModule],
  controllers: [BoardsController],
  providers: [BoardsService, BoardRepository],
})
export class BoardsModule {}
