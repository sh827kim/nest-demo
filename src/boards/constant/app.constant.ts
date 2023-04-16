import * as process from 'process'

export const DATABASE_HOST = process.env.DATABASE_HOST || 'localhost'
export const DATABASE_PORT = +process.env.DATABASE_PORT || 5432
export const DATABASE_NAME = process.env.DATABASE_NAME
export const DATABASE_USERNAME = process.env.DATABASE_USERNAME
export const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD
