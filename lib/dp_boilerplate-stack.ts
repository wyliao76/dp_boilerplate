import * as cdk from 'aws-cdk-lib'
import { Construct } from 'constructs'
import * as lambda from 'aws-cdk-lib/aws-lambda'
import * as iam from 'aws-cdk-lib/aws-iam'
import path from 'path'
import * as ec2 from 'aws-cdk-lib/aws-ec2'
import * as sfn from 'aws-cdk-lib/aws-stepfunctions'
import * as tasks from 'aws-cdk-lib/aws-stepfunctions-tasks'
import { getPolicy } from '../policy'

export class DpBoilerplateLambda extends cdk.Stack {
    constructor(scope: Construct, id: string, props: cdk.StackProps) {
        super(scope, id, props)

        const securityGroups = [ec2.SecurityGroup.fromLookupById(this, `dp_boilerplate_${process.env.CDK_ENV}_sg`, process.env.SG || '')]
        const vpc = ec2.Vpc.fromLookup(this, `dp_boilerplate_${process.env.CDK_ENV}_vpc`, { vpcId: process.env.VPC || '' })

        const fnExtract = new lambda.DockerImageFunction(this, `dp_boilerplate_extract_${process.env.CDK_ENV}_lambda`, {
            code: lambda.DockerImageCode.fromImageAsset(path.join(__dirname, '../src/extract'), {}),
            architecture: lambda.Architecture.X86_64,
            memorySize: 512 * 2,
            environment: {},
            functionName: `dp_boilerplate_extract_${process.env.CDK_ENV}`,
            description: 'System barcode data pipeline',
            securityGroups: securityGroups,
            vpc: vpc,
            timeout: cdk.Duration.seconds(300),
        })
        fnExtract.role?.attachInlinePolicy(new iam.Policy(this, `dp_boilerplate_extract_${process.env.CDK_ENV}_additional_policies`, {
            document: iam.PolicyDocument.fromJson(getPolicy()),
            policyName: `dp_boilerplate_extract_${process.env.CDK_ENV}_additional_policies`,
        }))

        //// please uncomment
        const extract = new tasks.LambdaInvoke(this, 'extract', { lambdaFunction: fnExtract, outputPath: '$.Payload' })
        const definition = new sfn.Parallel(this, 'boilerplate')
        //     .branch(checkFile.next(extract.next(profiling.next(validation.next(transform)))))
        //     .addCatch(errorHandler.next(cleanup), {
        //         errors: ['States.ALL'],
        //         resultPath: '$.Payload',
        //     })
        //     .next(succeeded)
        //     .next(cleanup)

        const stateMachine = new sfn.StateMachine(this, 'StateMachine', {
            stateMachineName: `dp_boilerplate_${process.env.CDK_ENV}_state_machine`,
            definition,
            timeout: cdk.Duration.minutes(20),
            tracingEnabled: true,
        })
    }
}
