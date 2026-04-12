import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Scale } from 'lucide-react';

const Terms: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-6">
            <div className="max-w-3xl mx-auto">
                <button 
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-slate-500 hover:text-violet-600 transition-colors mb-8 group"
                >
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="font-bold">목록으로 돌아가기</span>
                </button>

                <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 bg-violet-100 dark:bg-violet-900/30 rounded-2xl flex items-center justify-center text-violet-600 dark:text-violet-400">
                            <Scale size={24} />
                        </div>
                        <div>
                            <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">이용약관</h1>
                            <p className="text-slate-400 dark:text-slate-500 text-sm font-medium">최종 수정일: 2026년 4월 11일</p>
                        </div>
                    </div>

                    <div className="prose prose-slate dark:prose-invert max-w-none">
                        <section className="mb-10">
                            <h2 className="text-xl font-black text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                                <span className="w-1.5 h-6 bg-violet-600 rounded-full inline-block" />
                                제 1 조 (목적)
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                                본 약관은 CraftDay(이하 "회사")가 운영하는 웹사이트 및 애플리케이션(이하 "서비스")을 이용함에 있어, 회사와 이용자 간의 권리, 의무 및 책임 사항, 서비스 이용 조건 및 절차 등 기본적인 사항을 규정함을 목적으로 합니다.
                            </p>
                        </section>

                        <section className="mb-10">
                            <h2 className="text-xl font-black text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                                <span className="w-1.5 h-6 bg-violet-600 rounded-full inline-block" />
                                제 2 조 (용어의 정의)
                            </h2>
                            <ul className="list-disc pl-5 space-y-3 text-slate-600 dark:text-slate-400 text-sm">
                                <li><strong>서비스:</strong> 회사가 제공하는 공방 예약 및 커뮤니티 플랫폼 전체를 의미합니다.</li>
                                <li><strong>이용자:</strong> 본 서비스를 이용하는 모든 회원 및 비회원을 포함합니다.</li>
                                <li><strong>회원:</strong> 서비스에 개인정보를 제공하여 가입하고 정보를 지속적으로 제공받으며 서비스를 이용할 수 있는 자를 말합니다.</li>
                                <li><strong>작가(호스트):</strong> 공방을 운영하며 서비스를 통해 예약 상품을 등록하고 관리하는 회원을 의미합니다.</li>
                            </ul>
                        </section>

                        <section className="mb-10">
                            <h2 className="text-xl font-black text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                                <span className="w-1.5 h-6 bg-violet-600 rounded-full inline-block" />
                                제 3 조 (약관의 효력 및 변경)
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                                회사가 본 약관의 내용을 변경하는 경우, 변경된 약관의 적용일자 및 개정 사유를 명시하여 현행 약관과 함께 서비스 내 초기화면에 그 적용일자 7일 전부터 적용일자 전날까지 공지합니다. 이용자가 개정 약관에 동의하지 않을 경우 이용계약을 해지할 수 있습니다.
                            </p>
                        </section>

                        <section className="mb-10">
                            <h2 className="text-xl font-black text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                                <span className="w-1.5 h-6 bg-violet-600 rounded-full inline-block" />
                                제 4 조 (서비스의 종류)
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                                회사는 이용자에게 다음과 같은 서비스를 제공합니다:
                            </p>
                            <ol className="list-decimal pl-5 mt-4 space-y-2 text-slate-600 dark:text-slate-400 text-sm">
                                <li>공방 클래스 정보 제공 및 예약 대행 서비스</li>
                                <li>결제 지원 및 취소/환불 중개 서비스</li>
                                <li>이용자 간의 정보 공유(커뮤니티) 및 후기 작성</li>
                                <li>기타 회사가 추가로 개발하거나 제휴를 통해 제공하는 서비스</li>
                            </ol>
                        </section>

                        <div className="mt-16 pt-8 border-t border-slate-100 dark:border-slate-800 text-center">
                            <p className="text-slate-400 dark:text-slate-500 text-xs italic">
                                본 약관은 예시이며 실제 법적 효력을 보장하지 않습니다. CraftDay 플랫폼의 데모 UI입니다.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Terms;
