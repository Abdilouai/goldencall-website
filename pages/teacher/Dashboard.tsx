import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

export const Dashboard: React.FC = () => {
    const { teacherInfo } = useOutletContext<any>();
    const [students, setStudents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('teacher_token');
        fetch('/api/teacher-students', {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                setStudents(data.students);
            }
        })
        .finally(() => setLoading(false));
    }, []);

    const recentStudents = students.slice(0, 5);

    return (
        <div>
            <header className="mb-8">
                <h1 className="text-3xl font-heading font-bold text-white mb-2">Welcome back, <span className="text-[#c9a84c]">{teacherInfo.name}</span></h1>
                <p className="text-gray-400">Here's a breakdown of your upcoming sessions and students.</p>
            </header>

            {/* Stats overview cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-[#1a1a2e] border border-[#3B415A]/50 p-6 rounded-2xl shadow-lg">
                    <h3 className="text-gray-400 font-semibold mb-2">Total Students</h3>
                    <div className="text-3xl font-bold text-white">{students.length}</div>
                </div>
                <div className="bg-[#1a1a2e] border border-[#3B415A]/50 p-6 rounded-2xl shadow-lg">
                    <h3 className="text-gray-400 font-semibold mb-2">Pending Sessions</h3>
                    <div className="text-3xl font-bold text-[#c9a84c]">{students.filter(s => s.status === 'pending').length}</div>
                </div>
                <div className="bg-[#1a1a2e] border border-[#3B415A]/50 p-6 rounded-2xl shadow-lg">
                    <h3 className="text-gray-400 font-semibold mb-2">Completed Sessions</h3>
                    <div className="text-3xl font-bold text-green-500">{students.filter(s => s.status === 'completed').length}</div>
                </div>
            </div>

            <div className="bg-[#1a1a2e] border border-[#3B415A]/50 rounded-2xl shadow-lg overflow-hidden">
                <div className="px-6 py-5 border-b border-[#3B415A]/50">
                    <h2 className="text-xl font-bold text-white">Recently Assigned Students</h2>
                </div>
                
                {loading ? (
                    <div className="p-12 text-center text-gray-400">Loading your students...</div>
                ) : students.length === 0 ? (
                    <div className="p-12 text-center text-gray-400">You don't have any students assigned yet.</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-[#111118]/50 border-b border-[#3B415A]/50">
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Student</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Country</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Goal</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Contact</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Date & Time</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#3B415A]/30">
                                {recentStudents.map((student) => (
                                    <tr key={student.id} className="hover:bg-[#111118]/80 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="font-bold text-white">{student.first_name} {student.last_name}</div>
                                            <div className="text-xs text-gray-400">{student.email}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                            {student.country === 'Tunisia' ? '🇹🇳' : '🌍'} {student.country}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#c9a84c]/20 text-[#c9a84c] border border-[#c9a84c]/30">
                                                {student.interest_reason}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#3B415A] text-gray-300">
                                                {student.contact_method}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-semibold text-white">{student.session_date}</div>
                                            <div className="text-xs text-gray-400">{student.session_time}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                                                student.status === 'pending' ? 'bg-yellow-900/30 text-yellow-500 border border-yellow-500/20' :
                                                student.status === 'completed' ? 'bg-green-900/30 text-green-500 border border-green-500/20' :
                                                'bg-gray-800 text-gray-400'
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
    );
};
