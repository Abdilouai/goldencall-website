import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, LayoutDashboard, Users, Calendar, Video, BookOpen, User } from 'lucide-react';

interface StudentSession {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    country: string;
    contact_method: string;
    interest_reason: string;
    study_method: string;
    session_date: string;
    session_time: string;
    status: string;
}

export const TeacherDashboard: React.FC = () => {
    const [students, setStudents] = useState<StudentSession[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const teacherInfo = JSON.parse(localStorage.getItem('teacher_info') || '{}');

    useEffect(() => {
        const token = localStorage.getItem('teacher_token');
        if (!token) {
            navigate('/teacher/login');
            return;
        }

        fetch('/api/teacher-students', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                setStudents(data.students);
            } else {
                setError(data.error || 'Failed to fetch students');
                if (data.error === 'Invalid or expired token') {
                    localStorage.removeItem('teacher_token');
                    navigate('/teacher/login');
                }
            }
        })
        .catch(err => {
            setError('Network error');
        })
        .finally(() => {
            setLoading(false);
        });
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('teacher_token');
        localStorage.removeItem('teacher_info');
        navigate('/teacher/login');
    };

    return (
        <div className="min-h-screen bg-[#F8F9FA] dark:bg-dark text-text flex pb-10">
            {/* Sidebar matches layout in screenshot (dark slate color) */}
            <aside className="w-64 bg-[#3B415A] text-white fixed h-full flex flex-col">
                <div className="p-6">
                    <h2 className="text-xl font-bold font-heading text-center tracking-wider">Golden Call</h2>
                    <p className="text-center text-xs text-gray-400">Teacher Portal</p>
                </div>
                
                <nav className="flex-1 mt-6 space-y-2 px-4">
                    <a href="#" className="flex items-center gap-3 px-4 py-3 bg-[#4E567A] text-white rounded-lg transition-colors font-semibold shadow-sm">
                        <LayoutDashboard size={20} /> Dashboard
                    </a>
                    <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-[#4E567A]/50 rounded-lg transition-colors font-semibold">
                        <Users size={20} /> My Students
                    </a>
                    <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-[#4E567A]/50 rounded-lg transition-colors font-semibold">
                        <Calendar size={20} /> Meetings
                    </a>
                    <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-[#4E567A]/50 rounded-lg transition-colors font-semibold">
                        <BookOpen size={20} /> Materials
                    </a>
                </nav>

                <div className="p-4 border-t border-white/10 mt-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-primary text-dark w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                            {teacherInfo.name?.charAt(0) || 'T'}
                        </div>
                        <span className="text-sm font-semibold truncate max-w-[100px]">{teacherInfo.name}</span>
                    </div>
                    <button onClick={handleLogout} className="text-gray-400 hover:text-white p-2 transition-colors" title="Logout">
                        <LogOut size={18} />
                    </button>
                </div>
            </aside>

            {/* Main content area */}
            <main className="ml-64 flex-1 p-8 -mt-20 pt-28">
                <div className="max-w-6xl mx-auto">
                    <header className="mb-8 flex justify-between items-end">
                        <div>
                            <h1 className="text-3xl font-heading font-bold text-text dark:text-white mb-2">Welcome back, {teacherInfo.name}</h1>
                            <p className="text-text-muted">Here's a breakdown of your upcoming sessions and students.</p>
                        </div>
                    </header>

                    {/* Stats overview cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white dark:bg-card border border-border dark:border-border p-6 rounded-2xl shadow-sm">
                            <h3 className="text-text-muted font-semibold mb-2">Total Students</h3>
                            <div className="text-3xl font-bold">{students.length}</div>
                        </div>
                        <div className="bg-white dark:bg-card border border-border dark:border-border p-6 rounded-2xl shadow-sm">
                            <h3 className="text-text-muted font-semibold mb-2">Pending Sessions</h3>
                            <div className="text-3xl font-bold text-yellow-500">{students.filter(s => s.status === 'pending').length}</div>
                        </div>
                        <div className="bg-white dark:bg-card border border-border dark:border-border p-6 rounded-2xl shadow-sm">
                            <h3 className="text-text-muted font-semibold mb-2">Completed Sessions</h3>
                            <div className="text-3xl font-bold text-green-500">{students.filter(s => s.status === 'completed').length}</div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-card border border-border dark:border-border rounded-2xl shadow-sm overflow-hidden">
                        <div className="px-6 py-5 border-b border-border dark:border-border">
                            <h2 className="text-xl font-bold">Assigned Students</h2>
                        </div>
                        
                        {loading ? (
                            <div className="p-12 text-center text-text-muted">Loading your students...</div>
                        ) : error ? (
                            <div className="p-12 text-center text-red-500">{error}</div>
                        ) : students.length === 0 ? (
                            <div className="p-12 text-center text-text-muted">You don't have any students assigned yet.</div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-gray-50 dark:bg-dark/50 border-b border-border dark:border-border">
                                            <th className="px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Student Name</th>
                                            <th className="px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Contact Info</th>
                                            <th className="px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Session Time</th>
                                            <th className="px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Type</th>
                                            <th className="px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border/50 dark:divide-border">
                                        {students.map((student) => (
                                            <tr key={student.id} className="hover:bg-gray-50 dark:hover:bg-dark/20 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center gap-3">
                                                        <div className="bg-primary/20 text-primary w-10 h-10 rounded-full flex items-center justify-center font-bold">
                                                            {student.first_name.charAt(0)}{student.last_name.charAt(0)}
                                                        </div>
                                                        <div>
                                                            <div className="font-bold">{student.first_name} {student.last_name}</div>
                                                            <div className="text-xs text-text-muted flex items-center gap-1 mt-0.5">
                                                                <User size={12} /> {student.country}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-semibold">{student.phone}</div>
                                                    <div className="text-xs text-text-muted mt-0.5">via {student.contact_method}</div>
                                                    <div className="text-xs text-text-muted">{student.email}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-semibold flex items-center gap-1">
                                                        <Calendar size={14} className="text-primary"/> {student.session_date}
                                                    </div>
                                                    <div className="text-xs text-text-muted mt-0.5 ml-5">at {student.session_time}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary/10 text-primary dark:text-[#EAC170]">
                                                        {student.study_method}
                                                    </span>
                                                    <div className="text-xs text-text-muted mt-1 max-w-[150px] truncate" title={student.interest_reason}>
                                                        {student.interest_reason}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                                                        student.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500' :
                                                        student.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500' :
                                                        'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400'
                                                    }`}>
                                                        {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};
