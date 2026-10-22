pipeline {
    agent any

    options {
        timestamps()
        disableConcurrentBuilds()
    }

    environment {
        // Replace this with your Docker Hub username and repository.
        IMAGE_NAME = 'YOUR_DOCKERHUB_USERNAME/vehicle-rental-cca2'
        APP_NAME = 'vehicle-rental'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build and Test') {
            steps {
                sh 'node --version'
                sh 'npm test'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t "$IMAGE_NAME:$BUILD_NUMBER" -t "$IMAGE_NAME:latest" .'
            }
        }

        stage('Push Image to Docker Hub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKERHUB_USER',
                    passwordVariable: 'DOCKERHUB_TOKEN'
                )]) {
                    sh '''
                        set +x
                        echo "$DOCKERHUB_TOKEN" | docker login -u "$DOCKERHUB_USER" --password-stdin
                        docker push "$IMAGE_NAME:$BUILD_NUMBER"
                        docker push "$IMAGE_NAME:latest"
                        docker logout
                    '''
                }
            }
        }

        stage('Deploy to Minikube') {
            steps {
                sh '''
                    kubectl apply -f k8s/deployment.yaml
                    kubectl apply -f k8s/service.yaml
                    kubectl set image deployment/$APP_NAME $APP_NAME="$IMAGE_NAME:$BUILD_NUMBER"
                    kubectl rollout status deployment/$APP_NAME --timeout=180s
                '''
            }
        }

        stage('Verify Deployment') {
            steps {
                sh 'kubectl get deployment "$APP_NAME"'
                sh 'kubectl get pods -o wide'
                sh 'kubectl get service "$APP_NAME"'
            }
        }
    }

    post {
        success {
            echo 'Pipeline succeeded: image published and deployment updated.'
        }
        failure {
            echo 'Pipeline failed. Open the failed stage console output and check the README troubleshooting notes.'
        }
    }
}
