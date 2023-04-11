import { Module } from '@nestjs/common'
import { BoardsModule } from './boards/boards.module'

@Module({
  imports: [BoardsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
