pipeline {

    agent any

    stages {

        // stage('Packaging/Pushing imagae') {
        //     steps {
        //         withDockerRegistry(credentialsId: 'DOCKER_HUB', url: 'https://index.docker.io/v1/') {
        //             sh 'docker build -t ptdapm-be:lastest'
        //             sh 'docker push'
        //         }
        //     }
        // }

        // stage('Deploy App to DEV') {
        //     steps {
        //         echo 'Deploying and cleaning'
        //         sh 'docker image pull manh2001827/ptdapm-fe'
        //         sh 'docker container stop ptdapm-fe || echo "this container does not exist" '
        //         sh 'docker network create dev || echo "this network exists"'
        //         sh 'echo y | docker container prune '

        //         sh 'docker container run -d --rm --name khalid-springboot -p 8081:8080 --network dev manh2001827/springboot'
        //     }
        // }
        stage('Test App'){
            steps{
                echo ' Testing successs221321'
            }
        }
        stage('Build package'){
            steps{
                sh 'docker build -t ptdapm-be:lastest .'
            }
        }

        stage('Deploy app'){
            steps{
                sh 'docker container stop ptdapm-be || echo "this container does not exist" '
                sh 'docker network create beex_manage_service_backend || echo "this network exists"'
                sh 'docker container run -d --rm --name ptdapm-be -p 8003:8001 --network beex_manage_service_backend ptdapm-be'
            }
        }
    }
    post {
        // Clean after build
        always {
            cleanWs()
        }
    }
}
