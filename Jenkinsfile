pipeline {
    agent any

    stages {
        stage('Build Backend Docker Image') {
            steps {
                script {
                    backendImage = docker.build("srm-batch-3-backend", "-f backend/Dockerfile backend")
                }
            }
        }

        stage('Build Frontend Docker Image') {
            steps {
                script {
                    frontendImage = docker.build("srm-batch-3-backend", "-f client/Dockerfile backend")
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
        stage('Debug Workspace') {
            steps {
                script {
                    bat 'dir /s'
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
