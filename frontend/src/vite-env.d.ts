/**
 * Vite + TypeScript 환경에서 정적 자산(SVG, CSS 등)과
 * 환경 변수(import.meta.env)를 타입 오류 없이 인식하도록 도와주는 설정 파일입니다.
 *
 * 1. 정적 자산(SVG, CSS, 이미지 등) 타입 정의
 * - TypeScript는 기본적으로 .ts, .tsx 파일만 이해합니다.
 * - App.tsx에서 import './App.css'나 import reactLogo from './assets/react.svg' 처럼 코드를 작성하면, TypeScript는 "이게 뭔지 모르겠다"며 에러를 냅니다.
 * - 이 파일은 "아, 이런 파일들도 있구나"라고 TypeScript에게 알려주는 역할을 합니다.
 *
 * 2. 환경 변수(import.meta.env) 타입 지원
 * - Vite는 import.meta.env를 통해 환경 변수를 주입합니다.
 * - 이 파일은 import.meta.env에 어떤 속성들이 있을지 미리 정의해두어 타입 체크를 가능하게 합니다.
 */
/// <reference types="vite/client" />
