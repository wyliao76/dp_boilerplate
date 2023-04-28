import * as dotenv from 'dotenv'
dotenv.config({ path: `.env.${process.env.CDK_ENV}` })
