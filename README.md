## Cloud-Native CI/CD Deployment Pipeline: FastAPI · PostgreSQL · Docker · GitHub Actions · IBM Cloud

A fully automated DevOps pipeline that builds, tests, containerizes, and deploys a FastAPI microservice using Docker and IBM Cloud. The application runs inside containers, with code automatically deployed from GitHub to production. PostgreSQL is used as the persistent data store. The pipeline leverages IBM Cloud Container Registry, IBM Cloud Code Engine, and GitHub Actions — all deployable under free-tier conditions.

---
#### 📌Features:

1. FastAPI backend with modular design (CRUD endpoints, user management)

2. PostgreSQL database — local (via Docker) or cloud-hosted via container

3. Docker + Docker Compose for containerization and local development

4. Automated CI/CD pipeline using GitHub Actions (test → build → push → deploy)

5. Container image storage via IBM Cloud Container Registry

6. Deployment to IBM Cloud Code Engine (serverless container hosting) — scales automatically and supports container images built from source or registry images

7. API testing using Postman/Newman

8. Clean environment-based configuration, easy local development and cloud deployment

---
#### Architecture:
```
GitHub → GitHub Actions → Run Tests → Build Docker Image → Push to IBM Container Registry
                                                                       ↓
                                                      Deploy to IBM Cloud Code Engine
                                                                       ↓
                                        FastAPI Service Container + PostgreSQL Container
                                                                       ↓
                                                       Persistent Data & API Exposure

```
Code changes trigger GitHub Actions.

Successful builds produce container images pushed to IBM Cloud Container Registry.

Code Engine pulls the image, deploys the container, and exposes a public endpoint.

Postgres runs alongside (in another container) or can be replaced with a managed solution.     

---
#### Tech Stack:

```
| Layer              | Technology                                                               |
| ------------------ | ------------------------------------------------------------------------ |
| Backend            | FastAPI, Python, SQLAlchemy                                              |
| Database           | PostgreSQL (Docker / IBM Cloud container)                                |
| Containerization   | Docker, Docker Compose                                                   |
| CI/CD              | GitHub Actions                                                           |
| Container Registry | IBM Cloud Container Registry                                             |
| Cloud Hosting      | IBM Cloud Code Engine (auto-scaling, serverless)                         |
| Testing            | Pytest, Postman / Newman                                                 |
| CI/CD Flow         | On Git commit → build & test → push Docker image → deploy to Code Engine |

```
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
IBM_CLOUD_API_KEY
IBM_CR_REGION
IBM_CR_NAMESPACE
IBM_CR_REPOSITORY
IBM_CE_PROJECT
IBM_CE_APP_NAME
DATABASE_URL   (optional)
```
#### Production Notes:

Use AWS Secrets Manager for credentials

Enable HTTPS through an Application Load Balancer

Configure ECS autoscaling

Use Alembic for DB migrations

---
#### Summary:

This project demonstrates how to build, containerize, test, and deploy a backend API using modern DevOps workflows and cloud-native infrastructure. It reflects real-world engineering practices used in production environments.                                                
