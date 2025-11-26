## Cloud-Native DevOps Pipeline: FastAPI + PostgreSQL + Docker + AWS (ECR/ECS) + GitHub Actions

A fully containerized, cloud-ready microservices application built with FastAPI, backed by PostgreSQL, and deployed to AWS ECS Fargate using a complete CI/CD pipeline powered by GitHub Actions.
The project demonstrates end-to-end DevOps practices, including:

Infrastructure setup

Containerization

Automated testing

Image publishing

Cloud deployment

API testing (Postman/Newman)

Production-ready configurations
---
Features
🔹 FastAPI Backend

REST API with clean modular architecture (CRUD, models, schemas).

🔹 PostgreSQL Database (Local & AWS RDS)

Fully relational DB with SQLAlchemy ORM.

🔹 Dockerized Application

Both backend and database run as Docker containers for easy portability.

🔹 docker-compose for Local Dev

Single command spin-up for development environment.

🔹 CI Pipeline

GitHub Actions pipeline that:

Installs dependencies

Runs automated tests

Builds Docker image

🔹 CD Pipeline

Automatically:

Pushes built images to AWS ECR

Triggers AWS ECS service deployment

🔹 Postman API Testing

Includes a ready-to-use Postman collection for validation.
---
Architecture
Developer → GitHub → GitHub Actions CI/CD → Docker Image → AWS ECR
                                                           ↓
                                                      AWS ECS Fargate
                                                           ↓
                                                  FastAPI App Container
                                                           ↓
                                                   PostgreSQL (RDS)
                                                           ↓
                                                Monitoring via CloudWatch
                                                
