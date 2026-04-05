import React, { useState, useEffect } from 'react';
import { UserCog, Save, AlertCircle, CheckCircle } from 'lucide-react';

export const AdminReassign: React.FC = () => {
    const [token, setToken] = useState(localStorage.getItem('admin_token') || '');
    const [students, setStudents] = useState<any[]>([]);
    const [teachers, setTeachers] = useState<any[]>([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [loading, setLoading] = useState(false);
    
    // Track selected teacher IDs indexed by student ID
    const [selectedMapping, setSelectedMapping] = useState<Record<number, string>>({});

    const fetchDashboard = async (overrideToken?: string) => {
        setLoading(true);
        setError('');
        try {
            const res = await fetch('/api/admin-students', {
                headers: { 'Authorization': `Bearer ${overrideToken || token}` }
            });
            const data = await res.json();
            if (res.ok && data.success) {
                setStudents(data.students);
                setTeachers(data.teachers);
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

    // Auto login if we had token
    useEffect(() => {
        if (token) {
            fetchDashboard(token);
        }
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        fetchDashboard(token);
    };

    const handleReassign = async (studentId: number) => {
        const newTeacherId = selectedMapping[studentId];
        if (!newTeacherId) return;

        setError('');
        setSuccessMsg('');

        try {
            const res = await fetch('/api/admin-reassign', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ studentId, teacherId: parseInt(newTeacherId) })
            });

            const data = await res.json();
            if (res.ok && data.success) {
                setSuccessMsg('Successfully reassigned student!');
                
                // Update local state to reflect change instantly
                setStudents(prev => prev.map(s => 
                    s.id === studentId ? { ...s, teacher_id: parseInt(newTeacherId) } : s
                ));

                // clear mapping for this student
                setSelectedMapping(prev => {
                    const next = {...prev};
                    delete next[studentId];
                    return next;
                });
                
                setTimeout(() => setSuccessMsg(''), 3000);
            } else {
                setError(data.error || 'Failed to reassign.');
            }
        } catch (err) {
            setError('Network error updating assignment.');
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center -mt-10 px-4">
                <div className="bg-card w-full max-w-md p-8 rounded-3xl border border-red-500/20 shadow-xl shadow-red-500/5 text-center">
                    <UserCog className="w-12 h-12 text-red-500 mx-auto mb-4" />
                    <h1 className="text-3xl font-heading font-bold text-text mb-2">Admin Override</h1>
                    <p className="text-text-muted mb-6">Enter the master token to access reassignments.</p>
                    
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

    return (
        <div className="p-8 max-w-5xl mx-auto">
            <header className="mb-8 border-b border-border pb-4 flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-heading font-bold flex items-center gap-3 text-red-500">
                        <UserCog /> Admin Reassignment
                    </h1>
                    <p className="text-text-muted mt-1">Force-move students between teachers.</p>
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

            {successMsg && (
                <div className="mb-6 bg-green-500/10 border border-green-500/20 text-green-500 p-4 rounded-xl flex items-center gap-3">
                    <CheckCircle className="w-5 h-5" /> <span className="font-bold">{successMsg}</span>
                </div>
            )}

            <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-xl">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-dark/50 border-b border-border">
                            <th className="px-6 py-4 text-xs font-semibold text-text-muted uppercase">Student</th>
                            <th className="px-6 py-4 text-xs font-semibold text-text-muted uppercase">Session Time</th>
                            <th className="px-6 py-4 text-xs font-semibold text-text-muted uppercase">Current Teacher</th>
                            <th className="px-6 py-4 text-xs font-semibold text-text-muted uppercase text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {students.map(student => {
                            const isChanged = selectedMapping[student.id] && selectedMapping[student.id] !== String(student.teacher_id);
                            
                            return (
                                <tr key={student.id} className="hover:bg-dark/20 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-bold">{student.first_name} {student.last_name}</div>
                                        <div className="text-xs text-text-muted">{student.email}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-bold">{student.session_date}</div>
                                        <div className="text-xs text-text-muted">{student.session_time}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <select 
                                            className={`bg-dark border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-red-500 font-bold ${isChanged ? 'border-red-500 text-red-500' : 'border-border text-text'}`}
                                            value={selectedMapping[student.id] || student.teacher_id || ''}
                                            onChange={(e) => setSelectedMapping({
                                                ...selectedMapping,
                                                [student.id]: e.target.value
                                            })}
                                        >
                                            <option value="" disabled>Unassigned</option>
                                            {teachers.map(t => (
                                                <option key={t.id} value={t.id}>{t.name}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        {isChanged ? (
                                            <button 
                                                onClick={() => handleReassign(student.id)}
                                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow flex items-center gap-2 ml-auto transition-colors"
                                            >
                                                <Save size={16} /> Save Transfer
                                            </button>
                                        ) : (
                                            <span className="text-xs font-bold text-text-muted italic px-4">No changes</span>
                                        )}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                {students.length === 0 && (
                    <div className="p-12 text-center text-text-muted">No students registered yet.</div>
                )}
            </div>
        </div>
    );
};
