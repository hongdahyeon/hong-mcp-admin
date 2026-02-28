import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Users, Shield, Zap, ArrowRight, RefreshCw } from 'lucide-react';

// 💡 API 호출 예시 (실제 axios 등을 사용하면 편리합니다)
const fetchMockStats = async () => {

    // 실제 서버와 통신하는 척 1초 대기
    await new Promise(resolve => setTimeout(resolve, 1000));
    return [
        { icon: <LayoutDashboard className="text-violet-600" />, title: '서비스 상태', value: 'Healthy', desc: '모든 노드가 정상 작동 중입니다.' },
        { icon: <Users className="text-violet-600" />, title: '활성 사용자', value: '1,284 명', desc: '현재 접속 중인 관리자 수입니다.' },
        { icon: <Shield className="text-violet-600" />, title: '보안 등급', value: 'Excellent', desc: '최신 보안 정책이 적용되었습니다.' },
    ];

};

const Home: React.FC = () => {
    // 💡 State 정의: UI 상태와 데이터 관리
    const [stats, setStats] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // 💡 Effect: 컴포넌트 로드 시 데이터 페칭
    useEffect(() => {
        handleLoadStats();
    }, []);

    // 💡 Event Method: 데이터를 불러오는 이벤트 핸들러
    const handleLoadStats = async () => {
        setIsLoading(true);
        try {
            const data = await fetchMockStats();
            setStats(data);
        } catch (error) {
            console.error('데이터 로드 실패:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-white border border-slate-200 rounded-3xl p-12 mb-8 shadow-sm">
                <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-violet-50 rounded-full blur-3xl opacity-50"></div>
                <div className="relative z-10 max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 border border-violet-100 text-violet-600 text-xs font-bold uppercase tracking-wider mb-6">
                        <Zap size={14} /> New Update: Java 25 & Spring Boot 4.0
                    </div>
                    <h1 className="text-5xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight">
                        Next Generation <br />
                        <span className="text-violet-600 font-black">MCP Admin Platform</span>
                    </h1>
                    <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                        보다 빠르고 스마트한 운영 경험을 선사합니다. <br />
                        실시간 모니터링부터 고도화된 시스템 제어까지 하나의 플랫폼에서 관리하세요.
                    </p>
                    <div className="flex gap-4">
                        <button className="px-6 py-3 bg-violet-600 text-white rounded-xl font-bold hover:bg-violet-700 transition-all shadow-lg shadow-violet-200 flex items-center gap-2 group">
                            Dashboard 시작하기 <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button
                            onClick={handleLoadStats} // 💡 버튼 클릭 이벤트 연결
                            className="px-6 py-3 bg-white text-slate-700 border border-slate-200 rounded-xl font-bold hover:bg-slate-50 transition-all flex items-center gap-2"
                        >
                            <RefreshCw size={18} className={isLoading ? 'animate-spin' : ''} />
                            새로고침
                        </button>
                    </div>
                </div>
            </section>

            {/* Stats Cards */}
            <div className="grid md:grid-cols-3 gap-6">
                {isLoading ? (
                    // 💡 로딩 상태 표시
                    Array(3).fill(0).map((_, i) => (
                        <div key={i} className="bg-slate-50 h-40 rounded-2xl border border-slate-200 animate-pulse"></div>
                    ))
                ) : (
                    // 💡 실제 데이터 렌더링
                    stats.map((item, i) => (
                        <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-violet-300 transition-all hover:shadow-md group">
                            <div className="w-12 h-12 rounded-xl bg-violet-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                {item.icon}
                            </div>
                            <h3 className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-1">{item.title}</h3>
                            <div className="text-2xl font-black text-slate-900 mb-2">{item.value}</div>
                            <p className="text-slate-500 text-sm">{item.desc}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Home;
