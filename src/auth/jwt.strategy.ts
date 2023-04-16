import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { MembersRepository } from './members.repository'
import { InjectRepository } from '@nestjs/typeorm'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(MembersRepository)
    private membersRepository: MembersRepository,
    private config: ConfigService,
  ) {
    super({
      secretOrKey: config.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    })
  }

  async validate(payload) {
    const { username } = payload
    const user = await this.membersRepository.findOne({ where: { username } })
    if (!user) {
      throw new UnauthorizedException()
    }
    return user
  }
}
