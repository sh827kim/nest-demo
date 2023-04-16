import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { ConfigService } from '@nestjs/config'

export const typeormConfig = (config: ConfigService): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: config.get('DATABASE_HOST'),
  port: config.get('DATABASE_PORT'),
  username: config.get('DATABASE_USERNAME'),
  password: config.get('DATABASE_PASSWORD'),
  database: config.get('DATABASE_NAME'),
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
})
