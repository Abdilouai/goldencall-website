import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, Video } from 'lucide-react';

export const Meetings: React.FC = () => {
    const [students, setStudents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [tab, setTab] = useState<'upcoming' | 'past'>('upcoming');

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

    const now = new Date();
    // Compare string dates easily assumes yyyy-mm-dd
    const upcoming = students.filter(s => new Date(s.session_date) >= new Date(now.toISOString().split('T')[0]));
    const past = students.filter(s => new Date(s.session_date) < new Date(now.toISOString().split('T')[0]));

    const displayList = tab === 'upcoming' ? upcoming : past;

    return (
        <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
                <header className="mb-8">
                    <h1 className="text-3xl font-heading font-bold text-white mb-2">Meetings</h1>
                    <p className="text-gray-400">View and manage all your scheduled sessions.</p>
                </header>

                <div className="flex space-x-1 mb-6 bg-[#1a1a2e] p-1 rounded-xl w-64 border border-[#3B415A]/50">
                    <button 
                        onClick={() => setTab('upcoming')}
                        className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${tab === 'upcoming' ? 'bg-[#c9a84c] text-[#111118]' : 'text-gray-400 hover:text-white'}`}
                    >
                        Upcoming
                    </button>
                    <button 
                        onClick={() => setTab('past')}
                        className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${tab === 'past' ? 'bg-[#c9a84c] text-[#111118]' : 'text-gray-400 hover:text-white'}`}
                    >
                        Past
                    </button>
                </div>

                {loading ? (
                    <div className="p-12 text-center text-gray-400 bg-[#1a1a2e] rounded-2xl border border-[#3B415A]/50">Loading sessions...</div>
                ) : displayList.length === 0 ? (
                    <div className="p-12 text-center text-gray-400 bg-[#1a1a2e] rounded-2xl border border-[#3B415A]/50">
                        No {tab} sessions found.
                    </div>
                ) : (
                    <div className="space-y-4">
                        {displayList.map(student => {
                            const dateObj = new Date(student.session_date);
                            const day = dateObj.getDate();
                            const month = dateObj.toLocaleString('default', { month: 'short' }).toUpperCase();
                            
                            return (
                                <div key={student.id} className="flex bg-[#1a1a2e] border border-[#3B415A]/50 rounded-2xl overflow-hidden hover:border-[#c9a84c]/50 transition-colors shadow-lg">
                                    <div className="bg-[#111118] w-24 flex flex-col items-center justify-center border-r border-[#3B415A]/50 py-4">
                                        <span className="text-sm font-bold text-[#c9a84c]">{month}</span>
                                        <span className="text-3xl font-heading font-bold text-white">{day}</span>
                                    </div>
                                    <div className="p-5 flex-1 flex flex-col justify-center">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-lg font-bold text-white">{student.first_name} {student.last_name}</h3>
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                                                student.status === 'pending' ? 'bg-yellow-900/30 text-yellow-500 border border-yellow-500/20' :
                                                student.status === 'completed' ? 'bg-green-900/30 text-green-500 border border-green-500/20' :
                                                'bg-gray-800 text-gray-400'
                                            }`}>
                                                {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                                            </span>
                                        </div>
                                        <div className="flex flex-wrap gap-x-6 gap-y-2 mt-1">
                                            <div className="flex items-center gap-1.5 text-sm text-gray-300">
                                                <Clock size={16} className="text-[#c9a84c]" />
                                                {student.session_time}
                                            </div>
                                            <div className="flex items-center gap-1.5 text-sm text-gray-300">
                                                <Video size={16} className="text-[#c9a84c]" />
                                                via {student.contact_method}
                                            </div>
                                            <div className="flex items-center gap-1.5 text-sm text-gray-300">
                                                <span className="text-[#c9a84c] text-xl leading-none -mt-1">•</span>
                                                {student.interest_reason}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>

            {/* Sidebar Calendar Placeholder */}
            <div className="lg:w-80 space-y-6">
                <div className="bg-[#1a1a2e] gap-4 p-6 rounded-2xl border border-[#3B415A]/50 shadow-lg flex flex-col items-center justify-center text-center">
                    <CalendarIcon size={48} className="text-[#3B415A] mb-2" />
                    <h3 className="font-bold text-white">Monthly Schedule</h3>
                    <p className="text-sm text-gray-400">Mini calendar integration would show highlighted dates here.</p>
                </div>
            </div>
        </div>
    );
};
