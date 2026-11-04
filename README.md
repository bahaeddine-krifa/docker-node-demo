# Docker Node Demo — AWS Cloud & DevOps

A Node.js application demonstrating an automated containerization and deployment workflow using Docker, GitHub Actions, and AWS. The project follows an enterprise-style deployment approach with separate **Staging** and **Production** environments.

## Architecture

The project uses two independent AWS EC2 environments:

- **Staging:** Used to deploy and validate application updates before production.
- **Production:** Hosts the production application, exposed through Nginx with HTTPS.

### Deployment workflow

1. A developer pushes changes to the GitHub repository.
2. GitHub Actions executes the CI/CD workflow.
3. The application is tested and a Docker image is built.
4. The image is tagged and pushed to Docker Hub.
5. The deployment workflow updates the target environment.
6. The application is checked before the new version is promoted.

## Technologies

| Category | Technologies |
|---|---|
| Application | Node.js |
| Containerization | Docker, Docker Compose |
| CI/CD | GitHub Actions |
| Container Registry | Docker Hub |
| Cloud Infrastructure | AWS EC2 |
| Reverse Proxy | Nginx |
| HTTPS | Let's Encrypt |
| Monitoring | Prometheus, Grafana |
| Operating System | Ubuntu Linux |

## Project Structure

```text
docker-node-demo/
├── .github/
│   └── workflows/
│       └── ci-cd.yml
├── Dockerfile
├── docker-compose.yml
├── package.json
├── package-lock.json
├── server.js
└── README.md
```

## Run Locally

### Prerequisites

- Node.js 22+
- npm

### Install dependencies

```bash
npm ci
```

### Start the application

```bash
node server.js
```

The application listens on port `3000`.

## Run with Docker

### Build the image

```bash
docker build -t docker-node-demo .
```

### Run the container

```bash
docker run -d \
  --name node-server \
  -p 3000:3000 \
  docker-node-demo
```

Access the application at:

```text
http://localhost:3000
```

## Run with Docker Compose

Start the application:

```bash
docker compose up -d --build
```

Check the container status:

```bash
docker compose ps
```

View application logs:

```bash
docker compose logs -f
```

Stop the application:

```bash
docker compose down
```

## CI/CD Pipeline

GitHub Actions automates the application delivery workflow.

The pipeline includes:

- Application testing.
- Docker image building.
- Image tagging using the Git commit SHA and `latest`.
- Publishing images to Docker Hub.
- Deployment to the AWS environment through a self-hosted runner.
- Application health checks and deployment promotion.

**Docker Hub repository:** `bahaeddinekrifa/docker-node-demo`

## AWS Deployment

The infrastructure separates application deployment into two environments:

| Environment | Purpose | Platform |
|---|---|---|
| Staging | Validate new application versions | AWS EC2 + Docker |
| Production | Run the production application | AWS EC2 + Docker |

The production environment uses:

- **Docker** to run the Node.js application.
- **Nginx** as a reverse proxy.
- **Let's Encrypt** to provide HTTPS.
- A domain name pointing to the production server.

## Monitoring

The project uses:

- **Prometheus** for metrics collection.
- **Grafana** for monitoring dashboards and visualization.

## Key DevOps Concepts

- Multi-environment deployment (Staging / Production).
- Containerization and Docker image management.
- Automated CI/CD pipelines.
- Infrastructure and application deployment on AWS.
- Reverse proxy configuration and HTTPS.
- Application monitoring and observability.

## Author

**Bahaeddine Krifa**

Software Engineering Student | Cloud & DevOps Enthusiast

- GitHub: [bahaeddine-krifa](https://github.com/bahaeddine-krifa)
- Docker Hub: [bahaeddinekrifa](https://hub.docker.com/u/bahaeddinekrifa)
