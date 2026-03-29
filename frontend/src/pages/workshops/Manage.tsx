import React, { useState, useEffect } from 'react';
import { 
    LayoutDashboard, Plus, Settings, Trash2, 
    Eye, Edit3, AlertCircle, ShoppingBag, Users
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { Workshop } from '@/types/workshop';
import { MOCK_WORKSHOPS } from '@/constants/workshop';

const WorkshopManage: React.FC = () => {
    const navigate = useNavigate();
    const [myWorkshops, setMyWorkshops] = useState<Workshop[]>([]);

    useEffect(() => {
        // Load from localStorage or use mock data
        const savedWorkshops = localStorage.getItem('MY_WORKSHOPS');
        if (savedWorkshops) {
            setMyWorkshops(JSON.parse(savedWorkshops));
        } else {
            // Initially show some of the mock workshops as "mine" for demo purposes
            const initialMyWorkshops = MOCK_WORKSHOPS.slice(0, 2);
            setMyWorkshops(initialMyWorkshops);
            localStorage.setItem('MY_WORKSHOPS', JSON.stringify(initialMyWorkshops));
        }
    }, []);

    const handleDelete = (id: string) => {
        if (window.confirm('정말 이 공방을 삭제하시겠습니까?')) {
            const updated = myWorkshops.filter(w => w.id !== id);
            setMyWorkshops(updated);
            localStorage.setItem('MY_WORKSHOPS', JSON.stringify(updated));
        }
    };

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 dark:bg-violet-900/30 border border-violet-100 dark:border-violet-800 text-violet-600 dark:text-violet-400 text-xs font-black uppercase tracking-wider mb-4">
                        <LayoutDashboard size={14} /> Creator Studio
                    </div>
                    <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">내 공방 관리</h1>
                    <p className="text-slate-500 dark:text-slate-400 font-medium mt-1">등록하신 클래스의 운영 현황을 확인하고 관리하세요.</p>
                </div>
                <Link 
                    to="/workshops/manage/new"
                    className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-2xl font-black shadow-lg shadow-violet-200 dark:shadow-none transition-all hover:scale-105 active:scale-95"
                >
                    <Plus size={20} /> 새 클래스 등록하기
                </Link>
            </div>

            {myWorkshops.length === 0 ? (
                <div className="bg-white dark:bg-slate-950 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[2.5rem] py-24 text-center">
                    <div className="w-20 h-20 bg-slate-50 dark:bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                        <ShoppingBag size={40} />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">등록된 공방이 없습니다</h2>
                    <p className="text-slate-500 dark:text-slate-400 mb-10 font-medium">당신의 재능을 특별한 클래스로 만들어보세요!</p>
                    <Link to="/workshops/manage/new" className="text-violet-600 font-black underline underline-offset-8">첫 클래스 등록하러 가기</Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6">
                    {myWorkshops.map((workshop) => (
                        <div 
                            key={workshop.id}
                            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 flex flex-col md:flex-row gap-6 hover:shadow-xl transition-all group"
                        >
                            <div className="w-full md:w-48 h-32 rounded-2xl overflow-hidden flex-shrink-0">
                                <img src={workshop.imageUrl} alt={workshop.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            </div>
                            
                            <div className="flex-1 min-w-0 flex flex-col justify-center">
                                <div className="flex items-start justify-between mb-2">
                                    <div>
                                        <span className="text-[10px] font-black text-violet-600 dark:text-violet-400 uppercase tracking-widest">{workshop.category}</span>
                                        <h3 className="text-xl font-black text-slate-900 dark:text-white truncate">{workshop.title}</h3>
                                    </div>
                                    <div className="flex gap-2">
                                        <button 
                                            onClick={() => navigate(`/workshops/manage/${workshop.id}/reservations`)}
                                            className="p-2 text-slate-400 hover:text-blue-500 transition-colors"
                                            title="예약 관리"
                                        >
                                            <Users size={20} />
                                        </button>
                                        <button 
                                            onClick={() => navigate(`/workshops/${workshop.id}`)}
                                            className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                                            title="미리보기"
                                        >
                                            <Eye size={20} />
                                        </button>
                                        <button 
                                            className="p-2 text-slate-400 hover:text-violet-600 transition-colors"
                                            title="수정"
                                        >
                                            <Edit3 size={20} />
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(workshop.id)}
                                            className="p-2 text-slate-400 hover:text-rose-500 transition-colors"
                                            title="삭제"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                </div>
                                
                                <div className="flex flex-wrap items-center gap-4 mt-auto pt-4 border-t border-slate-50 dark:border-slate-800">
                                    <div className="flex items-center gap-1.5 text-slate-500">
                                        <Settings size={14} className="text-slate-400" />
                                        <span className="text-xs font-bold">{workshop.region}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-slate-500">
                                        <AlertCircle size={14} className="text-slate-400" />
                                        <span className="text-xs font-bold">운영 중</span>
                                    </div>
                                    <div className="ml-auto text-xl font-black text-slate-900 dark:text-white">
                                        <span className="text-xs font-medium text-slate-500 mr-1">₩</span>
                                        {workshop.price}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="mt-12 bg-slate-50 dark:bg-slate-900/50 rounded-3xl p-8 border border-slate-100 dark:border-slate-800">
                <h4 className="text-lg font-black text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                    <AlertCircle size={20} className="text-violet-500" /> 관리자 안내 사항
                </h4>
                <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400 font-medium">
                    <li className="flex gap-2">• 제출된 클래스는 심사 후 1-3일 이내에 승인 여부가 결정됩니다.</li>
                    <li className="flex gap-2">• 이미지 파일은 2MB 이하의 고해상도 JPG/PNG 파일을 권장합니다.</li>
                    <li className="flex gap-2">• 부적절한 콘텐츠가 포함된 경우 서비스 이용이 제한될 수 있습니다.</li>
                </ul>
            </div>
        </div>
    );
};

export default WorkshopManage;
