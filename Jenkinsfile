pipeline {
    agent any

    environment {
        dockerRegistry = 'https://index.docker.io/v1/'
        dockerCreds = credentials('docker_credentials')
        backendImage = 'anujpal1213145178/mern-backend'  // Full image name with Docker Hub username
        frontendImage = 'anujpal1213145178/mern-frontend' // Full image name with Docker Hub username
    }

    stages {
        stage('Build Backend') {
            steps {
                script {
                    def backendPath = 'C:\\Anuj\\Anuj-SRM-Batch-3\\backend' // Adjusted the path for backend
                    if (fileExists(backendPath)) {
                        echo "Building backend image"
                        bat "docker build -t ${backendImage}:latest ${backendPath}" // Build the backend image
                    } else {
                        error "Backend directory not found"
                    }
                }
            }
        }

        stage('Build Frontend') {
            steps {
                script {
                    def frontendPath = 'C:\\Anuj\\Anuj-SRM-Batch-3\\client' // Adjusted the path for frontend
                    if (fileExists(frontendPath)) {
                        echo "Building frontend image"
                        bat "docker build -t ${frontendImage}:latest ${frontendPath}" // Build the frontend image
                    } else {
                        error "Frontend directory not found"
                    }
                }
            }
        }

        stage('Push Backend Docker Image') {
            steps {
                script {
                    echo "Logging into Docker Hub"
                    bat "docker login -u ${env.dockerCreds_USR} -p ${env.dockerCreds_PSW} ${dockerRegistry}"
                    
                    echo "Pushing backend image to Docker Hub"
                    bat "docker push ${backendImage}:latest" // Push the backend image
                    
                    echo "Logging out of Docker Hub"
                    bat "docker logout"
                }
            }
        }

        stage('Push Frontend Docker Image') {
            steps {
                script {
                    echo "Logging into Docker Hub"
                    bat "docker login -u ${env.dockerCreds_USR} -p ${env.dockerCreds_PSW} ${dockerRegistry}"
                    
                    echo "Pushing frontend image to Docker Hub"
                    bat "docker push ${frontendImage}:latest" // Push the frontend image
                    
                    echo "Logging out of Docker Hub"
                    bat "docker logout"
                }
            }
        }
    }

    post {
        always {
            echo "PIPELINE SUCCESS"
        }
        failure {
            echo "PIPELINE FAILED"
        }
    }
}
