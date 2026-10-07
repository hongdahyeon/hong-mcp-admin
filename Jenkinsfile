pipeline {
    agent any

    tools {
        // Define tool names (as registered in Jenkins Global Tool Configuration)
        nodejs 'node'
        jdk 'jdk-25'
    }

    environment {
        // GitHub Repository URL
        REPO_URL = "https://github.com/hongdahyeon/hong-mcp-admin.git"
    }

    parameters {
        string(name: 'SOURCE_BRANCH', defaultValue: 'home2', description: 'Source branch to merge from (e.g., home, home2, note, note2)')
        string(name: 'TARGET_BRANCH', defaultValue: 'main', description: 'Target branch to merge into (e.g., main)')
    }

    stages {

        // Stage 1: Backend Build & Test (Java/Gradle)
        stage('Backend Build & Test') {
            steps {
                dir('backend') {
                    bat "gradlew.bat clean build"
                }
            }
        }

        // Stage 2: Frontend Build (Node.js/npm)
        stage('Frontend Build') {
            steps {
                dir('frontend') {
                    bat "npm ci"
                    bat "npm run build"
                }
            }
        }

        // Stage 3: Automated Merge (Gatekeeper) (Runs after build and test success)
        stage('Automated Merge (Gatekeeper)') {
            steps {
                script {
                    // Set to UTF-8 (65001) for Windows Jenkins to extract commit logs without encoding issues
                    def fullLog = bat(script: '@echo off && chcp 65001 > nul && git log -1 --pretty=%%B', returnStdout: true).trim()
                    
                    // Filter unnecessary system output (Active code page...) to get target commit message
                    def messageLines = fullLog.split('\r?\n').findAll {
                        !it.contains('git log -1') && !it.startsWith('C:\\') && !it.contains('Active code page: 65001')
                    }
                    def commitMessage = messageLines.join('\n').trim()
                    
                    // Identify branch name (removing origin/ prefix)
                    def rawBranch = env.GIT_BRANCH ?: "home"
                    def currentBranch = rawBranch.replace('origin/', '').trim()
                    
                    echo ">>> Current Branch: ${currentBranch}"
                    echo ">>> Extracted Commit Message: ${commitMessage}"

                    // --- Determine Merge Scenario --- //

                    // [Scenario 2] Sync: When changes from target branch (main) are pulled to feature branch
                    if (commitMessage.contains('from hongdahyeon/main') || commitMessage.contains('Merge branch \'main\'')) {
                        
                        echo ">>> [Scenario 2] Sync from 'main' to '${currentBranch}' detected. Skipping Auto-Merge to prevent infinite loop."
                        env.CASE_TYPE = "SYNC_FROM_MAIN"
                        env.ACTUAL_SOURCE = "main"
                        env.ACTUAL_TARGET = currentBranch
                        env.SKIP_PUSH = "true"

                    }
                    // [Exception] Direct Push: When code is pushed directly to main branch
                    else if (currentBranch == "main") {
                        
                        echo ">>> Direct push to 'main' detected. Skipping automated merge process."
                        env.CASE_TYPE = "DIRECT_MAIN_PUSH"
                        env.SKIP_PUSH = "true"

                    }
                    // [Scenario 1] Automated Merge: When feature branch build/test succeeds -> merge to main
                    else {
                        
                        echo ">>> [Scenario 1] Starting Automated Merge from '${currentBranch}' to 'main'."
                        env.CASE_TYPE = "MERGE_TO_MAIN"
                        def cleanSource = currentBranch
                        def cleanTarget = "main"
                        
                        env.ACTUAL_SOURCE = cleanSource
                        env.ACTUAL_TARGET = cleanTarget
                        env.SKIP_PUSH = "false"

                        // Merge and Push using GitHub Credentials
                        withCredentials([usernamePassword(credentialsId: 'github-login', usernameVariable: 'GIT_USER', passwordVariable: 'GIT_PASS')]) {
                            bat """
                            @echo off
                            git config user.email "hyeon8287@gmail.com"
                            git config user.name "hong Home"
                            
                            echo ">>> Fetching latest changes from remote..."
                            git fetch origin
                            
                            echo ">>> Resetting and checking out target branch: ${cleanTarget}"
                            git reset --hard
                            git checkout -f ${cleanTarget}
                            git pull origin ${cleanTarget}
                            
                            echo ">>> Merging ${cleanSource} into ${cleanTarget}..."
                            git merge origin/${cleanSource} --no-edit
                            
                            echo ">>> Pushing merged results to GitHub..."
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
