import React, { useState, useEffect } from 'react';
import { ShieldCheck, AlertCircle, DollarSign, BookOpen, Clock, CheckCircle } from 'lucide-react';

export const AdminLessons: React.FC = () => {
    const [token, setToken] = useState(localStorage.getItem('admin_token') || '');
    const [lessons, setLessons] = useState<any[]>([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchLessons = async (overrideToken?: string) => {
        setLoading(true);
        setError('');
        try {
            const res = await fetch('/api/admin-lessons', {
                headers: { 'Authorization': `Bearer ${overrideToken || token}` }
            });
            const data = await res.json();
            if (res.ok && data.success) {
                setLessons(data.lessons);
                setIsAuthenticated(true);
                if (overrideToken) {
                    localStorage.setItem('admin_token', overrideToken);
                }
            } else {
                setError('Invalid Admin Token');
                setIsAuthenticated(false);
                localStorage.removeItem('admin_token');
            }
        } catch (err) {
            setError('Failed to connect securely.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) {
            fetchLessons(token);
        }
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        fetchLessons(token);
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center -mt-10 px-4">
                <div className="bg-card w-full max-w-md p-8 rounded-3xl border border-red-500/20 shadow-xl shadow-red-500/5 text-center">
                    <ShieldCheck className="w-12 h-12 text-red-500 mx-auto mb-4" />
                    <h1 className="text-3xl font-heading font-bold text-text mb-2">Admin Security Check</h1>
                    <p className="text-text-muted mb-6">Enter the master token to access payroll.</p>
                    
                    {error && <div className="text-red-500 text-sm mb-4 font-bold bg-red-500/10 p-2 rounded-lg">{error}</div>}

                    <form onSubmit={handleLogin} className="space-y-4 text-left">
                        <input 
                            type="password" 
                            value={token}
                            onChange={(e) => setToken(e.target.value)}
                            placeholder="ADMIN_TOKEN"
                            className="w-full bg-dark border border-border rounded-xl px-4 py-3 text-text focus:outline-none focus:border-red-500 text-center"
                            autoFocus
                        />
                        <button type="submit" disabled={loading} className="w-full bg-red-500 text-white font-bold py-3 rounded-xl hover:bg-red-600 transition-colors">
                            {loading ? 'Verifying...' : 'Access Gateway'}
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    // Calculate aggregated payroll
    const teacherPayroll: Record<string, { lessons: number; total: number }> = {};
    let grandTotal = 0;

    lessons.forEach(lesson => {
        const tName = lesson.teacher_name;
        const amount = parseFloat(lesson.price);
        if (!teacherPayroll[tName]) {
            teacherPayroll[tName] = { lessons: 0, total: 0 };
        }
        teacherPayroll[tName].lessons += 1;
        teacherPayroll[tName].total += amount;
        grandTotal += amount;
    });

    return (
        <div className="p-8 max-w-6xl mx-auto">
            <header className="mb-8 border-b border-border pb-4 flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-heading font-bold flex items-center gap-3 text-red-500">
                        <ShieldCheck /> Payroll & Lessons
                    </h1>
                    <p className="text-text-muted mt-1">Track teacher performance and calculate payouts.</p>
                </div>
                <button 
                    onClick={() => { localStorage.removeItem('admin_token'); setIsAuthenticated(false); }}
                    className="text-sm font-bold text-text-muted hover:text-red-500 transition-colors"
                >
                    Lock System
                </button>
            </header>

            {error && (
                <div className="mb-6 bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl flex items-center gap-3">
                    <AlertCircle className="w-5 h-5" /> <span className="font-bold">{error}</span>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-card border border-border p-6 rounded-2xl shadow-xl flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                        <DollarSign size={24} />
                    </div>
                    <div>
                        <h3 className="text-text-muted font-semibold mb-1">Total Expected Payout</h3>
                        <div className="text-3xl font-bold text-green-500">{grandTotal} <span className="text-sm text-text-muted">TND</span></div>
                    </div>
                </div>
                <div className="bg-card border border-border p-6 rounded-2xl shadow-xl flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500">
                        <BookOpen size={24} />
                    </div>
                    <div>
                        <h3 className="text-text-muted font-semibold mb-1">Total Lessons Taught</h3>
                        <div className="text-3xl font-bold text-text">{lessons.length}</div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                    <div className="bg-card border border-border rounded-2xl shadow-xl overflow-hidden">
                        <div className="px-6 py-4 border-b border-border bg-dark/50">
                            <h2 className="text-xl font-bold text-text">Teacher Payroll Breakdown</h2>
                        </div>
                        <div className="p-6 space-y-4">
                            {Object.entries(teacherPayroll).map(([name, data]) => (
                                <div key={name} className="flex justify-between items-center border-b border-border pb-4 last:border-0 last:pb-0">
                                    <div>
                                        <h3 className="font-bold text-text">{name}</h3>
                                        <p className="text-sm text-text-muted">{data.lessons} lessons logged</p>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-bold text-green-500">{data.total} TND</div>
                                    </div>
                                </div>
                            ))}
                            {Object.keys(teacherPayroll).length === 0 && (
                                <div className="text-center text-text-muted">No data available.</div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-2">
                    <div className="bg-card border border-border rounded-2xl shadow-xl overflow-hidden h-full">
                        <div className="px-6 py-4 border-b border-border bg-dark/50 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-text flex items-center gap-2">
                                <Clock size={20} className="text-red-500" /> Recent Lessons
                            </h2>
                        </div>
                        
                        {lessons.length === 0 ? (
                            <div className="p-12 text-center text-text-muted">No lessons have been logged yet.</div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-dark/30 border-b border-border">
                                            <th className="px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Date</th>
                                            <th className="px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Teacher</th>
                                            <th className="px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Student</th>
                                            <th className="px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Course</th>
                                            <th className="px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border">
                                        {lessons.map((lesson) => (
                                            <tr key={lesson.id} className="hover:bg-dark/20 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-semibold text-text">
                                                        {new Date(lesson.lesson_date).toLocaleDateString()}
                                                    </div>
                                                    <div className="text-xs text-text-muted">
                                                        {new Date(lesson.lesson_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="font-bold text-red-400">{lesson.teacher_name}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="font-bold text-text">{lesson.first_name} {lesson.last_name}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-text-muted">
                                                    {lesson.course_name}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {lesson.attendance === 'present' ? (
                                                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-500/10 text-green-500 border border-green-500/20">
                                                            <CheckCircle size={12} /> Present
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-500/10 text-red-500 border border-red-500/20">
                                                            Absent
                                                        </span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
