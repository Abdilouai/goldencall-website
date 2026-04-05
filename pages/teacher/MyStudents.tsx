import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

export const MyStudents: React.FC = () => {
    const [students, setStudents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

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

    const filteredStudents = students.filter(s => {
        const fullName = `${s.first_name} ${s.last_name}`.toLowerCase();
        const email = s.email.toLowerCase();
        const query = searchQuery.toLowerCase();
        return fullName.includes(query) || email.includes(query);
    });

    return (
        <div>
            <header className="mb-8 flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-heading font-bold text-white mb-2">My Students</h1>
                    <p className="text-gray-400">Manage your entire roster of assigned students.</p>
                </div>
            </header>

            <div className="bg-[#1a1a2e] border border-[#3B415A]/50 rounded-2xl shadow-lg overflow-hidden">
                <div className="px-6 py-5 border-b border-[#3B415A]/50 flex justify-between items-center bg-[#111118]/50">
                    <h2 className="text-xl font-bold text-white">Full Roster ({filteredStudents.length})</h2>
                    <div className="relative w-64">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="w-4 h-4 text-gray-400" />
                        </div>
                        <input 
                            type="text" 
                            placeholder="Search name or email..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-[#111118] border border-[#3B415A]/50 text-white rounded-lg pl-9 pr-4 py-2 w-full text-sm focus:outline-none focus:border-[#c9a84c] transition-colors"
                        />
                    </div>
                </div>
                
                {loading ? (
                    <div className="p-12 text-center text-gray-400">Loading your students...</div>
                ) : filteredStudents.length === 0 ? (
                    <div className="p-12 text-center text-gray-400">No students match your search.</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-[#111118]/50 border-b border-[#3B415A]/50">
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Student Info</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Goal</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Study Method</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Contact</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Phone / Location</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Reg. Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#3B415A]/30">
                                {filteredStudents.map((student) => (
                                    <tr key={student.id} className="hover:bg-[#111118]/80 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="font-bold text-white">{student.first_name} {student.last_name}</div>
                                            <div className="text-xs text-gray-400">{student.email}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#cdb479]/10 text-[#c9a84c] border border-[#c9a84c]/20">
                                                {student.interest_reason}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="text-sm text-gray-300">
                                                {student.study_method}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#3B415A] text-gray-300">
                                                {student.contact_method}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-semibold text-white">{student.phone}</div>
                                            <div className="text-xs text-gray-400">{student.country === 'Tunisia' ? '🇹🇳' : '🌍'} {student.country}{student.city ? `, ${student.city}` : ''}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-xs text-gray-400">{new Date(student.created_at).toLocaleDateString()}</div>
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
