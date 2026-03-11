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
                    // Set code page to UTF-8 for git log to handle Korean/special characters
                    def fullLog = bat(script: '@echo off && chcp 65001 > nul && git log -1 --pretty=%%B', returnStdout: true).trim()
                    def messageLines = fullLog.split('\r?\n').findAll { !it.contains('git log -1') && !it.startsWith('C:\\') && !it.contains('Active code page: 65001') }
                    def commitMessage = messageLines.join('\n').trim()
                    
                    def rawBranch = env.GIT_BRANCH ?: "home"
                    def currentBranch = rawBranch.replace('origin/', '').trim()
                    
                    echo ">>> Current Branch: ${currentBranch}"
                    echo ">>> Extracted Commit Message: ${commitMessage}"

                    // Determine scenarios
                    if (commitMessage.contains('from hongdahyeon/main') || commitMessage.contains('Merge branch \'main\'')) {
                        // Scenario 2: main -> Feature (Sync)
                        echo ">>> Scenario 2: Sync from 'main' to '${currentBranch}' detected."
                        env.CASE_TYPE = "SYNC_FROM_MAIN"
                        env.ACTUAL_SOURCE = "main"
                        env.ACTUAL_TARGET = currentBranch
                        env.SKIP_PUSH = "true"
                    } else if (currentBranch == "main") {
                        echo ">>> Direct push to 'main' detected. Skipping automated merge."
                        env.CASE_TYPE = "DIRECT_MAIN_PUSH"
                        env.SKIP_PUSH = "true"
                    } else {
                        // Scenario 1: Feature -> main (Automated Merge)
                        echo ">>> Scenario 1: Automated Merge from '${currentBranch}' to 'main' detected."
                        env.CASE_TYPE = "MERGE_TO_MAIN"
                        def cleanSource = currentBranch
                        def cleanTarget = "main"
                        
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
                if (env.CASE_TYPE == "SYNC_FROM_MAIN") {
                    sendTelegramNotification("[${now}][V] CI/CD Success: Sync from main completed (${env.ACTUAL_SOURCE} -> ${env.ACTUAL_TARGET})")
                } else if (env.CASE_TYPE == "MERGE_TO_MAIN") {
                    sendTelegramNotification("[${now}][V] CI/CD Success: Build and Automated Merge completed (${env.ACTUAL_SOURCE} -> ${env.ACTUAL_TARGET})")
                } else {
                    sendTelegramNotification("[${now}][V] CI/CD Success: Build completed (${env.GIT_BRANCH ?: 'unknown'})")
                }
            }
        }
        failure {
            script {
                def now = new Date().format("yyyy-MM-dd HH:mm", TimeZone.getTimeZone('Asia/Seoul'))
                sendTelegramNotification("[${now}][X] CI/CD Failed: Error during pipeline execution. Check Jenkins logs.")
            }
        }
    }
}

def sendTelegramNotification(String message) {
    try {
        withCredentials([string(credentialsId: 'telegram-token-craft', variable: 'TOKEN'),
                         string(credentialsId: 'telegram-chat-id-craft', variable: 'CHAT_ID')]) {
            // Using --data-urlencode for message to handle special characters safely
            // Using double quotes for chat_id in case it contains negative sign or other characters
            bat """
            @echo off
            curl -s -X POST "https://api.telegram.org/bot${TOKEN}/sendMessage" ^
            -d "chat_id=${CHAT_ID}" ^
            --data-urlencode "text=${message}"
            """
        }
    } catch (Exception e) {
        echo "Telegram notification failed: ${e.getMessage()}"
    }
}
