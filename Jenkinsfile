pipeline {
  agent {
    docker {
      // image 'abhishekf5/maven-abhishek-docker-agent:v1'
      image 'docker:latest'
      args '--user root -v /var/run/docker.sock:/var/run/docker.sock' // mount Docker socket to access the host's Docker daemon
    }

    // label 'EC2-Node-1'
  }
  stages {
    // stage('Checkout') {
    //   steps {
    //     sh 'echo passed'
        //git branch: 'main', url: 'https://github.com/iam-veeramalla/Jenkins-Zero-To-Hero.git'
    //   }
    // }
    // stage('Build and Test') {
    //   steps {
    //     sh 'ls -ltr'
    //     // build the project and create a JAR file
    //     sh 'cd java-maven-sonar-argocd-helm-k8s/spring-boot-app && mvn clean package'
    //   }
    // }
    // stage('Static Code Analysis') {
    //   environment {
    //     SONAR_URL = "http://34.201.116.83:9000"
    //   }
    //   steps {
    //     withCredentials([string(credentialsId: 'sonarqube', variable: 'SONAR_AUTH_TOKEN')]) {
    //       sh 'cd java-maven-sonar-argocd-helm-k8s/spring-boot-app && mvn sonar:sonar -Dsonar.login=$SONAR_AUTH_TOKEN -Dsonar.host.url=${SONAR_URL}'
    //     }
    //   }
    // }

    // stage('create a file in EC2') {
    //   steps {
    //     sh 'touch antifragility.txt'
    //   }
    // }

    stage('Build and Push Docker Image') {
      environment {
        DOCKER_IMAGE = "tesseract99/simple_app:${BUILD_NUMBER}"
        // DOCKERFILE_LOCATION = "java-maven-sonar-argocd-helm-k8s/spring-boot-app/Dockerfile"
        REGISTRY_CREDENTIALS = credentials('docker-cred')
      }
      steps {
        script {
            sh 'docker build -t ${DOCKER_IMAGE} .'
            def dockerImage = docker.image("${DOCKER_IMAGE}")
            docker.withRegistry('https://index.docker.io/v1/', "docker-cred") {
                dockerImage.push()
            }
        }
      }
    }
    stage('Update Deployment File') {
        environment {
            GIT_REPO_NAME = "refactored-guacamole"
            GIT_USER_NAME = "tesseract99"
        }
        steps {
            withCredentials([string(credentialsId: 'github', variable: 'GITHUB_TOKEN')]) {
                sh '''
                    // git config user.email "abhishek.xyz@gmail.com"
                    // git config user.name "Abhishek Veeramalla"
                    BUILD_NUMBER=${BUILD_NUMBER}
                    sed -i "s/replaceImageTag/${BUILD_NUMBER}/g" K8/deployment.yml
                    git add K8/deployment.yml
                    git commit -m "Update deployment image to version ${BUILD_NUMBER}"
                    git push https://${GITHUB_TOKEN}@github.com/${GIT_USER_NAME}/${GIT_REPO_NAME} HEAD:master
                '''
            }
        }
    }
  }
}