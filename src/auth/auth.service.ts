import { Injectable, UnauthorizedException } from '@nestjs/common'
import { MembersRepository } from './members.repository'
import { InjectRepository } from '@nestjs/typeorm'
import { AuthCredentialsDto } from './dto/auth-credentials.dto'
import * as bcrypt from 'bcryptjs'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(MembersRepository)
    private membersRepository: MembersRepository,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.membersRepository.createMember(authCredentialsDto)
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<string> {
    const { username, password } = authCredentialsDto
    const user = await this.membersRepository.findOne({ where: { username } })
    if (user && (await bcrypt.compare(password, user.password))) {
      return 'login success'
    } else {
      throw new UnauthorizedException('Invalid credentials')
    }
  }
}
