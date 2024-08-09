pipeline {
    agent any

    stages {
        stage('Build Backend Docker Image') {
            steps {
                script {
                    backendImage = docker.build("srm-batch-3-backend", "backend/Dockerfile")
                }
            }
        }

        stage('Build Frontend Docker Image') {
            steps {
                script {
                    frontendImage = docker.build("srm-batch-3-frontend", "client/Dockerfile")
                }
            }
        }

        stage('Login to Docker Hub') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', 'DOCKERHUB-CREDENTIALS') {
                        echo 'Logged in to Docker Hub'
                    }
                }
            }
        }

        stage('Push Backend Docker Image') {
            steps {
                script {
                    backendImage.push('latest')
                }
            }
        }

        stage('Push Frontend Docker Image') {
            steps {
                script {
                    frontendImage.push('latest')
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
