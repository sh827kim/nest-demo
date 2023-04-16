import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common'
import { DataSource, Repository } from 'typeorm'
import { Members } from './members.entity'
import { AuthCredentialsDto } from './dto/auth-credentials.dto'
import * as bcrypt from 'bcryptjs'

@Injectable()
export class MembersRepository extends Repository<Members> {
  constructor(private dataSource: DataSource) {
    super(Members, dataSource.createEntityManager())
  }

  async createMember(createMemberDto: AuthCredentialsDto): Promise<void> {
    try {
      const { username, password } = createMemberDto

      const salt = await bcrypt.genSalt()
      const hashedPassword = await bcrypt.hash(password, salt)

      const member = await this.create({
        username,
        password: hashedPassword,
      })
      await this.save(member)
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already exists')
      } else {
        throw new InternalServerErrorException()
      }
    }
  }
}
