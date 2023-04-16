import { Injectable, UnauthorizedException } from '@nestjs/common'
import { MembersRepository } from './members.repository'
import { InjectRepository } from '@nestjs/typeorm'
import { AuthCredentialsDto } from './dto/auth-credentials.dto'
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(MembersRepository)
    private membersRepository: MembersRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.membersRepository.createMember(authCredentialsDto)
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = authCredentialsDto
    const user = await this.membersRepository.findOne({ where: { username } })
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { username }
      const accessToken = this.jwtService.sign(payload)
      return { accessToken }
    } else {
      throw new UnauthorizedException('Invalid credentials')
    }
  }
}
