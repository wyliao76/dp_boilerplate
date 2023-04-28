import os
import json
from services import boiler_plate
from os.path import join, dirname, abspath
from dotenv import load_dotenv
dotenv_path = abspath(join(dirname(__file__), f"../../.env.{os.environ.get('CDK_ENV')}"))
load_dotenv(dotenv_path)


def main(event, context):
    bucket = event['Payload']['detail']['bucket']['name']
    key = event['Payload']['detail']['object']['key']
    jobId = event['Payload']['id']
    try:
        boiler_plate(bucket, key, jobId)
        return event
    except Exception as e:
        print(e)
        raise Exception(json.dumps({
            'error_msg': e.__str__(),
            'jobId': jobId
        }))


if __name__ == '__main__':
    import time
    start_time = time.time()
    event = {}
    print(main(event, 'context'))
    print((time.time() - start_time))
