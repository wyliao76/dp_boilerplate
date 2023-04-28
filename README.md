# Welcome to your CDK TypeScript project

This is a blank project for CDK development with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template

## Init project
npm install -g typescript aws-cdk
mkdir projectName
cd projectName
cdk init --language typescript

## bootstrap error during deployment
cdk bootstrap

## Synth
cdk synth

## Deploy
CDK_ENV=${CDK_ENV} npm run deploy

## Destroy
CDK_ENV=${CDK_ENV} cdk destroy

## Create venv
python -m venv venv

## Activate venv
source venv/bin/activate

## Deactivate venv
deactivate

## Install lib
pip install -r src/requirements-dev.txt

## set PYTHONPATH
export PYTHONPATH="${PYTHONPATH}:/path/to/your/lambda/"

## unittest
python -m unittest tests/src/* -v

## formatter
autopep8 --in-place -r src/

# disable __pycache__
export PYTHONDONTWRITEBYTECODE=1