pipeline {
    agent any

    environment {
        DOCKER_CREDENTIALS_ID = 'dockerhub credentials'
        BACKEND_IMAGE_NAME = 'nimisham2305/srm-batch-3-backend'
        FRONTEND_IMAGE_NAME = 'nimisham2305/srm-batch-3-frontend'
        DOCKER_TAG = "latest"
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/NIMISHAM2305/SRM-Batch-3.git'
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
                        echo "Logged in to Docker Hub"
                    }
                }
            }
        }

        stage('Push Backend Docker Image') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', "${env.DOCKER_CREDENTIALS_ID}") {
                        dockerImageBackend.push()
                    }
                }
            }
        }

        stage('Push Frontend Docker Image') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', "${env.DOCKER_CREDENTIALS_ID}") {
                        dockerImageFrontend.push()
                    }
                }
            }
        }

        stage('Post-build Cleanup') {
            steps {
                script {
                    // Clean up local Docker images to save space
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
            cleanWs()
        }
        success {
            echo 'Docker images for both backend and frontend successfully built and pushed to Docker Hub!'
        }
        failure {
            echo 'Build failed. Please check the logs for more details.'
        }
    }
}
