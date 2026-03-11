pipeline {
    agent any

    tools {
        nodejs 'node'
        jdk 'jdk-25'
    }

    environment {
        // GitHub Repository URL
        REPO_URL = "https://github.com/hongdahyeon/hong-mcp-admin.git"
    }

    parameters {
        string(name: 'SOURCE_BRANCH', defaultValue: 'home2', description: 'Source branch to merge from (e.g., home, home2)')
        string(name: 'TARGET_BRANCH', defaultValue: 'main', description: 'Target branch to merge into (e.g., main)')
    }

    stages {

        stage('Backend Build & Test') {
            steps {
                dir('backend') {
                    bat "gradlew.bat clean build"
                }
            }
        }

        stage('Frontend Build') {
            steps {
                dir('frontend') {
                    bat "npm install"
                    bat "npm run build"
                }
            }
        }

        stage('Automated Merge (Gatekeeper)') {
            steps {
                script {
                    def fullLog = bat(script: 'git log -1 --pretty=%%B', returnStdout: true).trim()
                    def messageLines = fullLog.split('\r?\n').findAll { !it.contains('git log -1') && !it.startsWith('C:\\') }
                    def commitMessage = messageLines.join('\n').trim()
                    
                    def rawBranch = env.GIT_BRANCH ?: "home"
                    def currentBranch = rawBranch.replace('origin/', '').trim()
                    
                    echo ">>> Current Branch: ${currentBranch}"
                    echo ">>> Extracted Commit Message: ${commitMessage}"

                    // 시나리오 판별
                    if (commitMessage.contains('from hongdahyeon/work') || commitMessage.contains('Merge branch \'work\'')) {
                        // 시나리오 2: work -> Feature (Sync)
                        echo ">>> Scenario 2: Sync from 'work' to '${currentBranch}' detected."
                        env.CASE_TYPE = "SYNC_FROM_WORK"
                        env.ACTUAL_SOURCE = "work"
                        env.ACTUAL_TARGET = currentBranch
                        env.SKIP_PUSH = "true"
                    } else if (currentBranch == "work") {
                        echo ">>> Direct push to 'work' detected. Skipping automated merge."
                        env.CASE_TYPE = "DIRECT_WORK_PUSH"
                        env.SKIP_PUSH = "true"
                    } else {
                        // 시나리오 1: Feature -> work (Automated Merge)
                        echo ">>> Scenario 1: Automated Merge from '${currentBranch}' to 'work' detected."
                        env.CASE_TYPE = "MERGE_TO_WORK"
                        def cleanSource = currentBranch
                        def cleanTarget = "work"
                        
                        env.ACTUAL_SOURCE = cleanSource
                        env.ACTUAL_TARGET = cleanTarget
                        env.SKIP_PUSH = "false"

                        withCredentials([usernamePassword(credentialsId: 'github-login', usernameVariable: 'GIT_USER', passwordVariable: 'GIT_PASS')]) {
                            bat """
                            @echo off
                            git config user.email "hyeon8287@gmail.com"
                            git config user.name "hong Home"
                            
                            echo Fetching latest changes...
                            git fetch origin
                            
                            echo Checking out target branch: ${cleanTarget}
                            git checkout ${cleanTarget}
                            git pull origin ${cleanTarget}
                            
                            echo Merging ${cleanSource} into ${cleanTarget}...
                            git merge origin/${cleanSource} --no-edit
                            
                            echo Pushing changes to remote...
                            git push https://%GIT_USER%:%GIT_PASS%@${env.REPO_URL.replace('https://', '')} ${cleanTarget}
                            """
                        }
                    }
                }
            }
        }
    }

    post {
        success {
            script {
                def now = new Date().format("yyyy-MM-dd HH:mm", TimeZone.getTimeZone('Asia/Seoul'))
                if (env.CASE_TYPE == "SYNC_FROM_WORK") {
                    sendTelegramNotification("[${now}] [v] CI/CD Success: Sync from work completed (${env.ACTUAL_SOURCE} -> ${env.ACTUAL_TARGET})")
                } else if (env.CASE_TYPE == "MERGE_TO_WORK") {
                    sendTelegramNotification("[${now}] [v] CI/CD Success: Build and Automated Merge completed (${env.ACTUAL_SOURCE} -> ${env.ACTUAL_TARGET})")
                } else {
                    sendTelegramNotification("[${now}] [v] CI/CD Success: Build completed (${env.GIT_BRANCH ?: 'unknown'})")
                }
            }
        }
        failure {
            script {
                def now = new Date().format("yyyy-MM-dd HH:mm", TimeZone.getTimeZone('Asia/Seoul'))
                sendTelegramNotification("[${now}] [x] CI/CD Failed: Error during pipeline execution. Check Jenkins logs.")
            }
        }
    }
}

def sendTelegramNotification(String message) {
    try {
        withCredentials([string(credentialsId: 'telegram-token-craft', variable: 'TOKEN'),
                         string(credentialsId: 'telegram-chat-id-craft', variable: 'CHAT_ID')]) {
            bat "curl -s -X POST https://api.telegram.org/bot${TOKEN}/sendMessage -d chat_id=${CHAT_ID} -d text=\"${message}\""
        }
    } catch (Exception e) {
        echo "Telegram 알림 전송 실패: ${e.getMessage()}"
    }
}
