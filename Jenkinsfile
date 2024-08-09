pipeline {
    agent any
    stages {
        stage('Checkout SCM') {
            steps {
                checkout scm
            }
        }
        stage('Build Backend Docker Image') {
            steps {
                script {
                    bat 'docker build -t srm-batch-3-backend -f backend/Dockerfile backend'
                }
            }
        }
        stage('Build Frontend Docker Image') {
            steps {
                script {
                    bat 'docker build -t srm-batch-3-frontend -f frontend/Dockerfile frontend'
                }
            }
        }
        stage('Login to Docker Hub') {
            steps {
                script {
                    bat 'docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD'
                }
            }
        }
        stage('Push Backend Docker Image') {
            steps {
                script {
                    bat 'docker push srm-batch-3-backend'
                }
            }
        }
        stage('Push Frontend Docker Image') {
            steps {
                script {
                    bat 'docker push srm-batch-3-frontend'
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
