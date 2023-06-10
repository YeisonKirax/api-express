import * as dotenv from 'dotenv'

dotenv.config()

export default {
  PORT: process.env.PORT || 4000,
  DB_CONNECTION_STRING: process.env.DB_CONNECTION_STRING,
  TOKEN_SECRET: process.env.TOKEN_SECRET
}