import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Logger } from '@nestjs/common'
import * as config from 'config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const port = config.get('server.port')
  await app.listen(port)
  Logger.log(`Application running on port ${port}`)
}
bootstrap()
