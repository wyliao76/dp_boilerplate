import pandas as pd
import io
import boto3
s3 = boto3.client('s3')


def boiler_plate(bucket: str, key: str, jobId: str) -> None:
    pass