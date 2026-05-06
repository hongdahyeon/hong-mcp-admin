import React, { useState, useEffect } from 'react';
import { User, Mail, Shield, Calendar, Activity, CheckCircle2, Lock, AlertCircle, ShieldCheck } from 'lucide-react';
import { userService } from '@/api/userService';
import { UserViewResponse } from '@/types/user';

const Profile: React.FC = () => {
    const [user, setUser] = useState<UserViewResponse | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const data = await userService.findMe();
                setUser(data);
            } catch (error) {
                console.error('Failed to fetch user profile:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="w-10 h-10 border-4 border-violet-500/30 border-t-violet-600 rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-slate-500">
                <AlertCircle size={48} className="mb-4 text-rose-500 opacity-50" />
                <p className="font-bold">사용자 정보를 불러올 수 없습니다.</p>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-4xl mx-auto">
            {/* Header Section */}
            <div className="mb-8">
                <h1 className="text-3xl font-black text-slate-900 dark:text-white flex items-center gap-3">
                    내 정보 관리
                    <span className="text-sm font-medium text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
                        Account Settings
                    </span>
                </h1>
                <p className="text-slate-400 text-sm mt-1 font-medium">내 프로필 정보를 확인하고 계정 상태를 관리합니다.</p>
            </div>

            {/* Profile Card */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left: Simple Avatar & Key Info */}
                <div className="md:col-span-1 bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none flex flex-col items-center text-center">
                    <div className="w-24 h-24 bg-violet-100 dark:bg-violet-900/30 rounded-3xl flex items-center justify-center mb-6 border-2 border-violet-200 dark:border-violet-800 shadow-inner">
                        <User size={48} className="text-violet-600 dark:text-violet-400" />
                    </div>
                    <h2 className="text-xl font-black text-slate-900 dark:text-white mb-1">{user.username}</h2>
                    <p className="text-slate-400 text-sm font-medium mb-4">{user.email}</p>
                    
                    <div className={`px-4 py-1.5 rounded-full text-xs font-black tracking-tight flex items-center gap-1.5 ${
                        user.role === 'ROLE_ADMIN' ? 'bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400' :
                        user.role === 'ROLE_HOST' ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400' :
                        'bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400'
                    }`}>
                        <Shield size={14} />
                        {user.role.replace('ROLE_', '')}
                    </div>
                </div>

                {/* Right: Detailed Info */}
                <div className="md:col-span-2 space-y-6">
                    {/* Basic Info Group */}
                    <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none">
                        <h3 className="text-lg font-black text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                            <ShieldCheck size={20} className="text-violet-600" />
                            상세 정보
                        </h3>
                        
                        <div className="space-y-6">
                            <div className="flex items-center justify-between py-2 border-b border-slate-50 dark:border-slate-800/50">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg text-slate-400">
                                        <Mail size={18} />
                                    </div>
                                    <span className="text-sm font-bold text-slate-500">이메일</span>
                                </div>
                                <span className="text-sm font-black text-slate-900 dark:text-white">{user.email}</span>
                            </div>

                            <div className="flex items-center justify-between py-2 border-b border-slate-50 dark:border-slate-800/50">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg text-slate-400">
                                        <User size={18} />
                                    </div>
                                    <span className="text-sm font-bold text-slate-500">이름/닉네임</span>
                                </div>
                                <span className="text-sm font-black text-slate-900 dark:text-white">{user.username}</span>
                            </div>

                            <div className="flex items-center justify-between py-2 border-b border-slate-50 dark:border-slate-800/50">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg text-slate-400">
                                        <Calendar size={18} />
                                    </div>
                                    <span className="text-sm font-bold text-slate-500">최근 비밀번호 변경</span>
                                </div>
                                <span className="text-sm font-black text-slate-900 dark:text-white">
                                    {user.lastPasswordChangedDate ? new Date(user.lastPasswordChangedDate).toLocaleDateString() : '기록 없음'}
                                </span>
                            </div>

                            <div className="flex items-center justify-between py-2 border-b border-slate-50 dark:border-slate-800/50">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg text-slate-400">
                                        <Activity size={18} />
                                    </div>
                                    <span className="text-sm font-bold text-slate-500">계정 상태</span>
                                </div>
                                <div className="flex gap-2">
                                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black flex items-center gap-1 ${user.isEnabled ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30' : 'bg-slate-100 text-slate-400'}`}>
                                        {user.isEnabled ? <CheckCircle2 size={12} /> : <Lock size={12} />}
                                        {user.isEnabled ? '활성' : '비활성'}
                                    </span>
                                    {!user.isApproved && (
                                        <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-amber-100 text-amber-600 dark:bg-amber-900/30 flex items-center gap-1">
                                            <Activity size={12} /> 미승인
                                        </span>
                                    )}
                                    {user.isLocked && (
                                        <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-rose-100 text-rose-600 dark:bg-rose-900/30 flex items-center gap-1">
                                            <Lock size={12} /> 잠김
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Security Info or Actions */}
                    <div className="bg-slate-50 dark:bg-slate-900/50 rounded-3xl p-6 border border-dashed border-slate-200 dark:border-slate-800 text-center">
                        <p className="text-xs font-medium text-slate-400 mb-0">
                            계정 정보 수정 및 비밀번호 변경 기능은 추후 업데이트 예정입니다.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
