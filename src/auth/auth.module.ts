import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { MembersRepository } from './members.repository'

@Module({
  controllers: [AuthController],
  providers: [AuthService, MembersRepository],
})
export class AuthModule {}
