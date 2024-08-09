pipeline {
    agent any

    environment {
        DOCKER_CREDENTIALS_ID = 'docker-password'
        BACKEND_IMAGE_NAME = 'nimisham2305/backend'
        FRONTEND_IMAGE_NAME = 'nimisham2305/frontend'
        DOCKER_TAG = "latest"
        
        // Reference the stored credentials
        JWT_SECRET = credentials('JWT_Secret')      // Replace 'jwt-secret' with the ID you used
        MONGODB_URL = credentials('mongodb_url')    // Replace 'mongodb-url' with the ID you used
        PORT = credentials('PORT')                  // Replace 'port' with the ID you used
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
                    // Create the .env file using the credentials from Jenkins
                    sh '''
                    echo "PORT=${PORT}" > backend/.env
                    echo "JWT_SECRET=${JWT_SECRET}" >> backend/.env
                    echo "MONGODB_URL=${MONGODB_URL}" >> backend/.env
                    '''
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
