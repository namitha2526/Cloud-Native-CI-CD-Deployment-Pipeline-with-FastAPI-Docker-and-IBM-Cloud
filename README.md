## Cloud-Native DevOps Pipeline: FastAPI + PostgreSQL + Docker + AWS (ECR/ECS) + GitHub Actions

A production-focused DevOps project that implements a fully automated CI/CD pipeline for a FastAPI microservice. The application is containerized with Docker, tested with GitHub Actions, and deployed to AWS ECS (Fargate) using images stored in Amazon ECR. PostgreSQL is used locally via Docker and in production via AWS RDS, ensuring consistency across environments.

---
#### 📌Features:

1. FastAPI backend with modular architecture

2. PostgreSQL database integration (local & cloud)

3. Full containerization with Docker & docker-compose

4. Automated CI/CD pipeline using GitHub Actions

5. Docker image publishing to AWS ECR

6. Zero-downtime deployment on AWS ECS Fargate

7. API testing using Postman/Newman

8. Cloud monitoring via CloudWatch

---
#### Architecture:
```
Developer → GitHub → GitHub Actions CI/CD → Docker Image → AWS ECR
                                                           ↓
                                                      AWS ECS Fargate
                                                           ↓
                                                  FastAPI App Container
                                                           ↓
                                                   PostgreSQL (RDS)
                                                           ↓
                                                Monitoring via CloudWatc
```
                                                
---
#### Tech Stack:

Backend: FastAPI, Python, SQLAlchemy
Database: PostgreSQL, AWS RDS
DevOps / Cloud: Docker, Docker Compose, GitHub Actions, AWS ECR, AWS ECS (Fargate), IAM, CloudWatch
Testing: Pytest, Postman/Newman
CI/CD: Automated test → build → ECR push → ECS deploy

---
#### Project Structure:
```
devops-project/
│
├── app/
│   ├── main.py
│   ├── models.py
│   ├── schemas.py
│   ├── crud.py
│   ├── database.py
│   ├── config.py
│   └── requirements.txt
│
├── tests/
│   └── test_api.py
│
├── Dockerfile
├── docker-compose.yml
├── postman_collection.json
├── .env.example
├── .github/
│    └── workflows/
│        └── ci-cd.yml
└── README.md
```
---

### Local Setup:
```bash
cp .env.example .env
docker-compose up --build
```
API available at: http://localhost:8000
#### Testing:
```bash
pytest -q
```

Run API tests via Postman or Newman:
```bash
newman run postman_collection.json
```
---
#### AWS Deployment:

The GitHub Actions pipeline automatically:

1. Runs tests
2. Builds Docker image
3. Pushes to ECR
4. Forces ECS service deployment

---
#### Required GitHub Secrets:
```
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
AWS_REGION
AWS_ACCOUNT_ID
ECR_REPOSITORY
ECS_CLUSTER
ECS_SERVICE
```
#### Production Notes:

Use AWS Secrets Manager for credentials

Enable HTTPS through an Application Load Balancer

Configure ECS autoscaling

Use Alembic for DB migrations

---
#### Summary:

This project demonstrates how to build, containerize, test, and deploy a backend API using modern DevOps workflows and cloud-native infrastructure. It reflects real-world engineering practices used in production environments.                                                
