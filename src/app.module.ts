import { Module } from '@nestjs/common'
import { BoardsModule } from './boards/boards.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { typeormConfig } from './configs/typeorm.config'
import { AuthModule } from './auth/auth.module'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    BoardsModule,
    TypeOrmModule.forRoot(typeormConfig),
    AuthModule,
    ConfigModule.forRoot({ envFilePath: ['.env'] }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
