import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="w-full bg-white border-t border-slate-200 py-12">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-violet-100 rounded-md"></div>
                        <span className="text-slate-500 font-bold tracking-tight uppercase tracking-widest text-xs">HONG MCP ADMIN</span>
                    </div>
                    <p className="text-slate-400 text-sm font-medium">
                        &copy; {new Date().getFullYear()} HONG MCP. All rights reserved. Built with Java 25 & React.
                    </p>
                    <div className="flex gap-6">
                        <span className="text-slate-400 text-sm hover:text-violet-600 cursor-pointer">Terms</span>
                        <span className="text-slate-400 text-sm hover:text-violet-600 cursor-pointer">Privacy</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;