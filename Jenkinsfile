
pipeline {
    agent any

    environment {
        IMAGE_NAME = 'ashutoshnawde/vehicle-rental-app'
        APP_NAME = 'vehicle-rental-app'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install and Test') {
            steps {
                sh 'npm install'
                sh 'npm test'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $IMAGE_NAME:$BUILD_NUMBER .'
                sh 'docker tag $IMAGE_NAME:$BUILD_NUMBER $IMAGE_NAME:latest'
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh 'echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin'
                    sh 'docker push $IMAGE_NAME:$BUILD_NUMBER'
                    sh 'docker push $IMAGE_NAME:latest'
                    sh 'docker logout'
                }
            }
        }

        stage('Deploy Container') {
            steps {
                sh 'docker rm -f vehicle-rental-app || true'
                sh 'docker run -d --restart unless-stopped --name vehicle-rental-app -p 8080:8080 $IMAGE_NAME:$BUILD_NUMBER'
            }
        }
    }

    post {
        success {
            echo 'Vehicle Rental CI/CD pipeline succeeded!'
        }
        failure {
            echo 'Pipeline failed. Check Console Output.'
        }
    }
}
