import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom';
import { LogOut, LayoutDashboard, Users, Calendar, BookOpen } from 'lucide-react';

export const TeacherLayout: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [teacherInfo, setTeacherInfo] = useState<any>(null);

    useEffect(() => {
        const token = localStorage.getItem('teacher_token');
        const info = localStorage.getItem('teacher_info');
        if (!token || !info) {
            navigate('/teacher/login');
            return;
        }
        try {
            setTeacherInfo(JSON.parse(info));
        } catch {
            navigate('/teacher/login');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('teacher_token');
        localStorage.removeItem('teacher_info');
        navigate('/teacher/login');
    };

    if (!teacherInfo) return null;

    const navItems = [
        { name: 'Dashboard', path: '/teacher/dashboard', icon: LayoutDashboard },
        { name: 'My Students', path: '/teacher/students', icon: Users },
        { name: 'Meetings', path: '/teacher/meetings', icon: Calendar },
        { name: 'Materials', path: '/teacher/materials', icon: BookOpen },
    ];

    return (
        <div className="min-h-screen bg-[#111118] text-[#f8f9fa] flex pt-20 pb-10">
            {/* Sidebar matches exact color #1a1a2e */}
            <aside className="w-64 bg-[#1a1a2e] border-r border-[#3B415A]/50 fixed h-full top-0 left-0 flex flex-col z-20">
                <div className="p-6 mt-4 border-b border-[#3B415A]/50 pb-6 mb-4">
                    <h2 className="text-xl font-bold font-heading text-center tracking-wider text-[#c9a84c]">Golden Call</h2>
                    <p className="text-center text-xs text-gray-400 mt-1 uppercase tracking-widest">Teacher Portal</p>
                </div>
                
                <nav className="flex-1 space-y-2 px-4">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname.includes(item.path);
                        return (
                            <Link 
                                key={item.name} 
                                to={item.path} 
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-semibold shadow-sm
                                ${isActive ? 'bg-[#c9a84c]/20 text-[#c9a84c] border border-[#c9a84c]/30' : 'text-gray-300 hover:text-white hover:bg-[#3B415A]/50'}`}
                            >
                                <Icon size={20} /> {item.name}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-[#3B415A]/50 mt-auto flex items-center justify-between bg-[#111118]/40">
                    <div className="flex items-center gap-3">
                        <div className="bg-[#c9a84c] text-[#111118] w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm shadow-lg shadow-[#c9a84c]/20">
                            {teacherInfo.name?.charAt(0) || 'T'}
                        </div>
                        <span className="text-sm font-semibold truncate max-w-[100px] text-white">{teacherInfo.name}</span>
                    </div>
                    <button onClick={handleLogout} className="text-gray-400 hover:text-white p-2 transition-colors hover:bg-red-500/10 hover:text-red-400 rounded-lg" title="Logout">
                        <LogOut size={18} />
                    </button>
                </div>
            </aside>

            {/* Main content area */}
            <main className="ml-64 flex-1 p-8">
                <div className="max-w-6xl mx-auto">
                    <Outlet context={{ teacherInfo }} />
                </div>
            </main>
        </div>
    );
};
