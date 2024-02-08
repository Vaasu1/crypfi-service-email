
pipeline {
    agent any
    tools {
        nodejs 'NODE_JS_14'
    }

    environment {
        imagename = 'antiers/exch_mail_service'
        registryCredential = 'DOCKER_CRED'
        dockerImage = ''
    }
    stages {
        stage('Cloning Git') {
            steps {
                checkout scm
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm install typescript -g'
                sh 'npm install'
            }
        }
        stage('App Build') {
            steps {
                sh 'npm run build'
            }
        }
        // stage('Test Cases') {
        //     steps {
        //         sh 'npm run test'
        //     }
        // }
        stage('Building image') {
            steps {
                sh "docker build -t ${imagename}:latest ."
            }
        }
        stage('Push Image to hub') {
            steps {
                script {
                    docker.withRegistry( '', registryCredential ) {
                        sh "docker image push ${imagename}:latest"
                        sh "docker pull ${imagename}:latest"
                    }
                }
            }
        }
        stage('clear image Server') {
            steps {
                sh "docker rmi $imagename:latest"
            }
        }
        stage('Deployed to server') {
            steps {
                build job: 'deployment-Qa', parameters: [
                string(name: 'SERVICE', value: 'email_service')
                ]
            }
        }
    }
}
