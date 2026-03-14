pipeline {
    agent any

    tools {
        // 사용할 도구 정의 (Jenkins Global Tool Configuration에 등록된 이름)
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

        // 1단계: 백엔드 빌드 및 테스트 (Java/Gradle)
        stage('Backend Build & Test') {
            steps {
                dir('backend') {
                    bat "gradlew.bat clean build"
                }
            }
        }

        // 2단계: 프론트엔드 빌드 (Node.js/npm)
        stage('Frontend Build') {
            steps {
                dir('frontend') {
                    bat "npm install"
                    bat "npm run build"
                }
            }
        }

        // 3단계: 자동 병합 (Gatekeeper) (코드 품질 검증 통과 후 실행)
        stage('Automated Merge (Gatekeeper)') {
            steps {
                script {
                    // [핵심] Windows Jenkins에서 한글 커밋 메시지가 깨지지 않도록 UTF-8(65001)로 설정 후 로그 추출
                    def fullLog = bat(script: '@echo off && chcp 65001 > nul && git log -1 --pretty=%%B', returnStdout: true).trim()
                    
                    // 불필요한 시스템 출력(Active code page... 등)을 필터링하여 순수 커밋 메시지만 획득
                    def messageLines = fullLog.split('\r?\n').findAll {
                        !it.contains('git log -1') && !it.startsWith('C:\\') && !it.contains('Active code page: 65001') 
                    }
                    def commitMessage = messageLines.join('\n').trim()
                    
                    // 현재 빌드가 발생한 브랜치명 확인 (origin/ 제거)
                    def rawBranch = env.GIT_BRANCH ?: "home"
                    def currentBranch = rawBranch.replace('origin/', '').trim()
                    
                    echo ">>> Current Branch: ${currentBranch}"
                    echo ">>> Extracted Commit Message: ${commitMessage}"

                    // --- 머지 시나리오 판별 --- //

                    // [시나리오 2] 상위 브랜치(main)의 내용을 현재 브랜치로 가져온 경우 (Sync)
                    // 커밋 메시지에 'from hongdahyeon/main' 등이 포함되어 있다면 역머지로 판단
                    if (commitMessage.contains('from hongdahyeon/main') || commitMessage.contains('Merge branch \'main\'')) {
                        
                        echo ">>> [Scenario 2] Sync from 'main' to '${currentBranch}' detected. Skipping Auto-Merge to prevent infinite loop."
                        env.CASE_TYPE = "SYNC_FROM_MAIN"
                        env.ACTUAL_SOURCE = "main"
                        env.ACTUAL_TARGET = currentBranch
                        env.SKIP_PUSH = "true" // 다시 main으로 push하지 않음

                    }
                    // [예외] main 브랜치에 직접 코드를 푸시한 경우
                    else if (currentBranch == "main") {
                        
                        echo ">>> Direct push to 'main' detected. Skipping automated merge process."
                        env.CASE_TYPE = "DIRECT_MAIN_PUSH"
                        env.SKIP_PUSH = "true"

                    }
                    // [시나리오 1] 일반 브랜치(home2 등)에서 작업 후 품질 검증 성공 -> main으로 자동 머지
                    else {
                        
                        echo ">>> [Scenario 1] Starting Automated Merge from '${currentBranch}' to 'main'."
                        env.CASE_TYPE = "MERGE_TO_MAIN"
                        def cleanSource = currentBranch
                        def cleanTarget = "main"
                        
                        env.ACTUAL_SOURCE = cleanSource
                        env.ACTUAL_TARGET = cleanTarget
                        env.SKIP_PUSH = "false" // main으로 최종 push 진행

                        // GitHub 자격 증명을 사용하여 머지 및 푸시 실행
                        withCredentials([usernamePassword(credentialsId: 'github-login', usernameVariable: 'GIT_USER', passwordVariable: 'GIT_PASS')]) {
                            bat """
                            @echo off
                            git config user.email "hyeon8287@gmail.com"
                            git config user.name "hong Home"
                            
                            echo >>> Fetching latest changes from remote...
                            git fetch origin
                            
                            echo >>> Checking out target branch: ${cleanTarget}
                            git checkout ${cleanTarget}
                            git pull origin ${cleanTarget}
                            
                            echo >>> Merging ${cleanSource} into ${cleanTarget}...
                            git merge origin/${cleanSource} --no-edit
                            
                            echo >>> Pushing merged results to GitHub...
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
