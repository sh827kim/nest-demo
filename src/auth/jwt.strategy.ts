import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { MembersRepository } from './members.repository'
import { InjectRepository } from '@nestjs/typeorm'
import * as config from 'config'
import process from 'process'

const jwtConfig = config.get('jwt')
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(MembersRepository)
    private membersRepository: MembersRepository,
  ) {
    super({
      secretOrKey: jwtConfig.secret,
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
