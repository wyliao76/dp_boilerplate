import * as cdk from 'aws-cdk-lib'
import { Template } from 'aws-cdk-lib/assertions'
import { DpBoilerplateLambda } from '../../lib/dp_boilerplate-stack'

describe('dp_boilerplateLambda test', () => {
    it('should create dp_boilerplateLambda', () => {
        const app = new cdk.App()
        const stack = new DpBoilerplateLambda(app, 'MyTestStack', {
            env: {
                account: process.env.CDK_DEFAULT_ACCOUNT,
                region: process.env.CDK_DEFAULT_REGION,
            },
            description: `dp_boilerplate_${process.env.CDK_ENV}`,
        })
        const template = Template.fromStack(stack)
        // console.log(require('util').inspect(template, null, null, true))

        const functionNameCapture = new cdk.assertions.Capture()
        const architecturesCapture = new cdk.assertions.Capture()
        template.hasResourceProperties('AWS::Lambda::Function', {
            FunctionName: functionNameCapture,
            Architectures: architecturesCapture,
        })
        // expect(functionNameCapture.asString()).toBe(`dp_boilerplate_check_file_${process.env.CDK_ENV}`)
        expect(architecturesCapture.asArray()).toEqual(['x86_64'])
    })
})
