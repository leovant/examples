FROM python:latest

COPY requirements.txt /tmp/
RUN pip install --no-cache-dir -r /tmp/requirements.txt

WORKDIR /app
COPY . /app

EXPOSE 5000

CMD [ "python", "/app/blockchain.py" ]