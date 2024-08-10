pipeline {
    agent any

    environment {
        dockerRegistry = "https://index.docker.io/v1/"
        dockerCreds = credentials('dockerhub-credentials')
        backendImage = 'mern-backend'
        frontendImage = 'mern-frontend'
    }

    stages {
        stage('Build Backend') {
            steps {
                script {
                    def backendPath = "basic-erp/backend"
                    if (fileExists(backendPath)) {
                        bat "docker build -t ${backendImage}:latest ${backendPath}"
                        bat "docker tag ${backendImage} thepurpleaxe/mern-backend:mern-backend"
                        // bat "docker tag ${backendImage} ${backendImage}:latest"

                    } else {
                        error "Backend directory ${backendPath} not found"
                    }
                }
            }
        }

        stage('Build Frontend') {
            steps {
                script {
                    def frontendPath = "basic-erp/frontend"
                    if (fileExists(frontendPath)) {
                        bat "docker build -t ${frontendImage}:latest ${frontendPath}"
                        bat "docker tag ${frontendImage} thepurpleaxe/mern-frontend:mern-frontend"
                    } else {
                        error "Frontend directory ${frontendPath} not found"
                    }
                }
            }
        }

        stage('Push Backend') {
            steps {
                script {
                    docker.withRegistry("https://index.docker.io/v1/", 'dockerhub-credentials') {
                        // bat 'docker login -u thepurpleaxe -p FalconHeavy@01'
                        // bat 'docker push json101/javapp'
                        echo "Pushing backend image to Docker Hub"
                        bat "docker push thepurpleaxe/mern-backend:${backendImage}"
                    }
                }
            }
        }

        stage('Push Frontend') {
            steps {
                script {
                    docker.withRegistry(dockerRegistry, 'dockerhub-credentials') {
                        echo "Pushing frontend image to Docker Hub"
                        bat "docker push thepurpleaxe/mern-frontend:${frontendImage}"
                        // bat "docker push ${frontendImage}:latest"
                    }
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline completed'
        }
        failure {
            echo 'Pipeline failed'
        }
    }
}
