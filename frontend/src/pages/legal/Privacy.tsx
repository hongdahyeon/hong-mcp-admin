import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ShieldCheck } from 'lucide-react';

const Privacy: React.FC = () => {
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
                        <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                            <ShieldCheck size={24} />
                        </div>
                        <div>
                            <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">개인정보처리방침</h1>
                            <p className="text-slate-400 dark:text-slate-500 text-sm font-medium">최종 수정일: 2026년 4월 11일</p>
                        </div>
                    </div>

                    <div className="prose prose-slate dark:prose-invert max-w-none">
                        <section className="mb-10">
                            <h2 className="text-xl font-black text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                                <span className="w-1.5 h-6 bg-emerald-600 rounded-full inline-block" />
                                1. 수집하는 개인정보 항목
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                                회사는 회원가입, 상담, 서비스 신청 등을 위해 아래와 같은 개인정보를 수집하고 있습니다.
                            </p>
                            <ul className="list-disc pl-5 mt-4 space-y-2 text-slate-600 dark:text-slate-400 text-sm">
                                <li>필수항목: 이름, 이메일 주소, 비밀번호, 접속 로그, 쿠키, 접속 IP 정보</li>
                                <li>선택항목: 휴대전화 번호, 프로필 사진 (사용자 설정 시)</li>
                                <li>결제 시: 카드번호(마스킹), 카드 별칭, 결제 승인 기록</li>
                            </ul>
                        </section>

                        <section className="mb-10">
                            <h2 className="text-xl font-black text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                                <span className="w-1.5 h-6 bg-emerald-600 rounded-full inline-block" />
                                2. 개인정보의 수집 및 이용 목적
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                                회사는 수집한 개인정보를 다음의 목적을 위해 활용합니다.
                            </p>
                            <ol className="list-decimal pl-5 mt-4 space-y-2 text-slate-600 dark:text-slate-400 text-sm">
                                <li>서비스 제공에 관한 계약 이행 및 서비스 제공에 따른 요금정산</li>
                                <li>회원 관리 (본인확인, 부정 사용 방지, 불만 처리 등)</li>
                                <li>신규 서비스 개발 및 마케팅·광고에의 활용</li>
                            </ol>
                        </section>

                        <section className="mb-10">
                            <h2 className="text-xl font-black text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                                <span className="w-1.5 h-6 bg-emerald-600 rounded-full inline-block" />
                                3. 개인정보의 보유 및 이용기간
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                                원칙적으로 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 단, 관계법령의 규정에 의하여 보존할 필요가 있는 경우 회사는 아래와 같이 관계법령에서 정한 일정한 기간 동안 회원정보를 보관합니다.
                            </p>
                            <ul className="list-disc pl-5 mt-4 space-y-2 text-slate-600 dark:text-slate-400 text-sm">
                                <li>계약 또는 청약철회 등에 관한 기록: 5년</li>
                                <li>대금결제 및 재화 등의 공급에 관한 기록: 5년</li>
                                <li>소비자의 불만 또는 분쟁처리에 관한 기록: 3년</li>
                            </ul>
                        </section>

                        <div className="mt-16 pt-8 border-t border-slate-100 dark:border-slate-800 text-center">
                            <p className="text-slate-400 dark:text-slate-500 text-xs italic">
                                본 개인정보처리방침은 데모용이며 실제 법적 효력을 보장하지 않습니다.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Privacy;
