import { Module } from '@nestjs/common'
import { BoardsModule } from './boards/boards.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { typeormConfig } from './configs/typeorm.config'
import { AuthModule } from './auth/auth.module'

@Module({
  imports: [
    BoardsModule,
    TypeOrmModule.forRootAsync({
      useFactory: typeormConfig,
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
