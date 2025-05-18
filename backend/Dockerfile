FROM python:3.10-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0
ENV FLASK_ENV=production

EXPOSE 5000

# Use gunicorn for production
CMD ["gunicorn", "-w", "4", "-k", "gevent", "--timeout", "60", "-b", "0.0.0.0:5000", "app:app"]
