pipeline {
    agent any

    environment {
        DOCKER_CREDENTIALS_ID = 'docker-hub-credentials'  // ID of Docker Hub credentials stored in Jenkins
        DOCKER_IMAGE_NAME = 'saloni1224/login-page' // Docker Hub repository name
        DOCKER_TAG = "latest"  // Tag for the Docker image
    }

    stages {
        stage('Checkout Code') {
            steps {
                // Clone the repository from GitHub
                git branch: 'main', url: 'https://github.com/Saloni-singh22/SRM-Batch-3-Week-1.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    dockerImage = docker.build("${env.DOCKER_IMAGE_NAME}:${env.DOCKER_TAG}")
                }
            }
        }

        stage('Login to Docker Hub') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', "${env.DOCKER_CREDENTIALS_ID}") {
                        echo "Logged in to Docker Hub"
                    }
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', "${env.DOCKER_CREDENTIALS_ID}") {
                        dockerImage.push()
                    }
                }
            }
        }

        stage('Post-build Cleanup') {
            steps {
                script {
                    // Clean up local Docker images to save space
                    sh "docker rmi ${env.DOCKER_IMAGE_NAME}:${env.DOCKER_TAG}"
                }
            }
        }
    }

    post {
        always {
            cleanWs() // Clean up the workspace after the build
        }
        success {
            echo 'Docker image successfully built and pushed to Docker Hub!'
        }
        failure {
            echo 'Build failed. Please check the logs for more details.'
        }
    }
}