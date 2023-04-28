FROM public.ecr.aws/lambda/python:3.9

LABEL maintainer="Will Liao"
RUN yum update -y && \
    yum install -y python3 python3-dev python3-pip gcc && \
    rm -Rf /var/cache/yum
COPY . .
RUN pip install -r requirements.txt
CMD ["index.main"]
