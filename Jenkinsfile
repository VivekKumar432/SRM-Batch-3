pipeline {
    agent any

    environment {
        DOCKER_CREDENTIALS_ID = 'docker-password'  // ID for Docker credentials
        BACKEND_IMAGE_NAME = 'nimisham2305/backend'
        FRONTEND_IMAGE_NAME = 'nimisham2305/frontend'
        DOCKER_TAG = "latest"
        
        // Credentials stored in Jenkins for secure use
        JWT_SECRET = credentials('JWT_Secret')      // ID for JWT secret
        MONGODB_URL = credentials('mongodb_url')    // ID for MongoDB URL
        PORT = credentials('PORT')                  // ID for Port
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/NIMISHAM2305/SRM-Batch-3.git'
            }
        }

        stage('Create .env File') {
            steps {
                script {
                    // Create the .env file with sensitive data
                    writeFile file: 'backend/.env', text: """
                    PORT=${PORT}
                    JWT_SECRET=${JWT_SECRET}
                    MONGODB_URL=${MONGODB_URL}
                    """
                }
            }
        }

        stage('Build Backend Docker Image') {
            steps {
                script {
                    dockerImageBackend = docker.build("${env.BACKEND_IMAGE_NAME}:${env.DOCKER_TAG}", "./backend")
                }
            }
        }

        stage('Build Frontend Docker Image') {
            steps {
                script {
                    dockerImageFrontend = docker.build("${env.FRONTEND_IMAGE_NAME}:${env.DOCKER_TAG}", "./client")
                }
            }
        }

        stage('Login to Docker Hub') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', "${env.DOCKER_CREDENTIALS_ID}") {
                        echo "Successfully logged in to Docker Hub"
                    }
                }
            }
        }

        stage('Push Backend Docker Image') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', "${env.DOCKER_CREDENTIALS_ID}") {
                        dockerImageBackend.push("${env.DOCKER_TAG}")
                    }
                }
            }
        }

        stage('Push Frontend Docker Image') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', "${env.DOCKER_CREDENTIALS_ID}") {
                        dockerImageFrontend.push("${env.DOCKER_TAG}")
                    }
                }
            }
        }

        stage('Post-build Cleanup') {
            steps {
                script {
                    // Remove local Docker images after pushing to Docker Hub
                    if (isUnix()) {
                        sh "docker rmi ${env.BACKEND_IMAGE_NAME}:${env.DOCKER_TAG} || true"
                        sh "docker rmi ${env.FRONTEND_IMAGE_NAME}:${env.DOCKER_TAG} || true"
                    } else {
                        bat "docker rmi ${env.BACKEND_IMAGE_NAME}:${env.DOCKER_TAG} || ver > nul"
                        bat "docker rmi ${env.FRONTEND_IMAGE_NAME}:${env.DOCKER_TAG} || ver > nul"
                    }
                }
            }
        }
    }

    post {
        always {
            cleanWs() // Clean workspace after every build
        }
        success {
            echo 'Build and deployment successful! Docker images for both backend and frontend pushed to Docker Hub.'
        }
        failure {
            echo 'Build failed. Please check the logs and correct any issues.'
        }
    }
}
