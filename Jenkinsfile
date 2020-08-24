#!/usr/bin/env groovy

def GIT_TAG
def DOCKER_IMAGE

node('small') {

    deleteDir() // Clean up workspace
    dir('app') { // Create 'app' directory on workspace

        checkout([
            $class: 'GitSCM',
            branches: scm.branches,
            doGenerateSubmoduleConfigurations: scm.doGenerateSubmoduleConfigurations,
            extensions: [[$class: 'CloneOption', noTags: false, shallow: true, depth: 0, reference: '']],
            userRemoteConfigs: scm.userRemoteConfigs,
            ])

        stage('Init') {
            GIT_TAG = sh(returnStdout: true, script: 'git tag -l --points-at HEAD').trim()
        }

        if (GIT_TAG) {

            stage('Build') {
                DOCKER_IMAGE = docker.build("connectors/open-protocol-connector:${GIT_TAG}")
            }

            stage('Deployment') {
                docker.withRegistry('https://registry.cybus.io', 'jenkins-harbor-user') {
                    DOCKER_IMAGE.push()
                }
            }
        }
    }
}