import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="w-full bg-white border-t border-slate-200 py-12">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-violet-600 rounded-lg flex items-center justify-center text-white font-black text-[10px]">C</div>
                        <span className="text-slate-900 font-extrabold tracking-tighter text-sm">CraftDay</span>
                    </div>
                    <p className="text-slate-400 text-sm font-medium">
                        &copy; {new Date().getFullYear()} CraftDay. All rights reserved. 대한민국 No.1 공방 예약 플랫폼.
                    </p>
                    <div className="flex gap-6">
                        <span className="text-slate-500 text-xs font-bold hover:text-violet-600 cursor-pointer transition-colors">이용약관</span>
                        <span className="text-slate-500 text-xs font-bold hover:text-violet-600 cursor-pointer transition-colors">개인정보처리방침</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;