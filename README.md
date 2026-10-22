# CCA 2 - Vehicle Rental System CI/CD Starter

This is a beginner-friendly starter template for the CCA 2 assignment. It includes a small web-based Vehicle Rental System demo plus Docker, Jenkins, and Kubernetes files.

## Important
- This is a starter/demo application, not a copy of your existing C++ project. Once we inspect your existing files, we can adapt the pipeline to use them.
- Do not upload passwords, AWS access keys, Docker Hub passwords, or other secrets to GitHub.
- This template assumes Jenkins, Docker, kubectl, and Minikube are available on the AWS machine, and Jenkins has permission to use Docker and the configured Kubernetes context.
- Replace `YOUR_DOCKERHUB_USERNAME` in `Jenkinsfile` and `k8s/deployment.yaml` with your Docker Hub username/repository details.
- Configure a Jenkins credential with ID `dockerhub-creds` (type: Username with password; username = Docker Hub username, password = Docker Hub access token).

## Project files
- `server.js` - serves the demo website
- `public/index.html` - simple Vehicle Rental System interface
- `tests/app.test.js` - basic automated test
- `Dockerfile` - builds the Docker image
- `Jenkinsfile` - CI/CD pipeline
- `k8s/deployment.yaml` - Kubernetes Deployment
- `k8s/service.yaml` - Kubernetes NodePort Service

## Run locally with Node.js
Install Node.js 20 or later, then in this folder run:

```bash
npm test
npm start
```

Open http://localhost:8080

## Build and run with Docker
```bash
docker build -t vehicle-rental:local .
docker run --rm -p 8080:8080 vehicle-rental:local
```
Open http://localhost:8080

## Kubernetes notes
The Jenkinsfile runs `kubectl apply` and then updates the Deployment to use the newly pushed image. The Kubernetes context must point to your Minikube cluster and be usable by the Jenkins process.

Check the cluster:
```bash
kubectl get nodes
kubectl get pods
kubectl get deployments
kubectl get services
```

## After first successful deployment
1. Edit a visible sentence in `public/index.html`.
2. Commit and push the change to GitHub.
3. Run the Jenkins pipeline again.
4. Capture screenshots of both successful runs and the changed application.

## Screenshots to collect for submission
1. GitHub repository and files
2. Jenkins pipeline stages successful
3. Docker Hub image/tag
4. `kubectl get pods`, `kubectl get deployment`, and `kubectl get services`
5. Application opened in a browser
6. Second pipeline run after the source change
