#!/usr/bin/env node
import 'source-map-support/register'
import * as cdk from 'aws-cdk-lib'
import { DpBoilerplateLambda } from '../lib/dp_boilerplate-stack'
import * as dotenv from 'dotenv'
dotenv.config({ path: `${__dirname}/../.env.${process.env.CDK_ENV}` })

const app = new cdk.App()
new DpBoilerplateLambda(app, `dp-boilerplate-${process.env.CDK_ENV}-stack`, {
    env: {
        account: process.env.CDK_DEFAULT_ACCOUNT,
        region: process.env.CDK_DEFAULT_REGION,
    },
    description: `dp_boilerplate_${process.env.CDK_ENV}`,
})
app.synth()
