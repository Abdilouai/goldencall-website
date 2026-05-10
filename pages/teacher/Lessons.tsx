import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { BookOpen, DollarSign, PlusCircle, CheckCircle, Clock } from 'lucide-react';

export const Lessons: React.FC = () => {
    const { teacherInfo } = useOutletContext<any>();
    const [students, setStudents] = useState<any[]>([]);
    const [lessons, setLessons] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    // Form state
    const [selectedStudentId, setSelectedStudentId] = useState('');
    const [courseName, setCourseName] = useState('');
    const [lessonDate, setLessonDate] = useState('');
    const [attendance, setAttendance] = useState('present');

    useEffect(() => {
        const token = localStorage.getItem('teacher_token');
        
        // Fetch students for dropdown
        fetch('/api/teacher-students', {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) setStudents(data.students);
        });

        // Fetch logged lessons
        fetch('/api/teacher-lessons', {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) setLessons(data.lessons);
        })
        .finally(() => setLoading(false));
    }, []);

    const handleLogLesson = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        const token = localStorage.getItem('teacher_token');
        
        try {
            const res = await fetch('/api/teacher-lessons', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    studentId: selectedStudentId,
                    courseName,
                    lessonDate: new Date(lessonDate).toISOString(),
                    attendance
                })
            });
            const data = await res.json();
            if (data.success) {
                // Refresh lessons list
                const lessonsRes = await fetch('/api/teacher-lessons', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const lessonsData = await lessonsRes.json();
                if (lessonsData.success) {
                    setLessons(lessonsData.lessons);
                }
                
                // Reset form
                setSelectedStudentId('');
                setCourseName('');
                setLessonDate('');
                setAttendance('present');
                alert('Lesson logged successfully!');
            } else {
                alert('Failed to log lesson: ' + data.error);
            }
        } catch (err) {
            alert('An error occurred.');
        } finally {
            setSubmitting(false);
        }
    };

    const totalEarnings = lessons.length * 10;

    return (
        <div>
            <header className="mb-8">
                <h1 className="text-3xl font-heading font-bold text-white mb-2">Lessons & Payroll</h1>
                <p className="text-gray-400">Log your completed lessons and track your earnings.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#1a1a2e] border border-[#3B415A]/50 p-6 rounded-2xl shadow-lg flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#c9a84c]/20 flex items-center justify-center text-[#c9a84c]">
                        <BookOpen size={24} />
                    </div>
                    <div>
                        <h3 className="text-gray-400 font-semibold mb-1">Total Lessons Taught</h3>
                        <div className="text-3xl font-bold text-white">{lessons.length}</div>
                    </div>
                </div>
                <div className="bg-[#1a1a2e] border border-[#3B415A]/50 p-6 rounded-2xl shadow-lg flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                        <DollarSign size={24} />
                    </div>
                    <div>
                        <h3 className="text-gray-400 font-semibold mb-1">Total Earnings (TND)</h3>
                        <div className="text-3xl font-bold text-green-500">{totalEarnings} <span className="text-sm font-normal text-gray-400">TND</span></div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                    <div className="bg-[#1a1a2e] border border-[#3B415A]/50 rounded-2xl shadow-lg p-6">
                        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <PlusCircle className="text-[#c9a84c]" size={20} /> Log a Lesson
                        </h2>
                        
                        <form onSubmit={handleLogLesson} className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-400 mb-1">Student</label>
                                <select 
                                    required
                                    value={selectedStudentId}
                                    onChange={(e) => setSelectedStudentId(e.target.value)}
                                    className="w-full bg-[#111118] border border-[#3B415A]/50 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#c9a84c]"
                                >
                                    <option value="" disabled>Select a student</option>
                                    {students.map(s => (
                                        <option key={s.id} value={s.id}>{s.first_name} {s.last_name}</option>
                                    ))}
                                </select>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-semibold text-gray-400 mb-1">Course Name</label>
                                <input 
                                    type="text" 
                                    required
                                    value={courseName}
                                    onChange={(e) => setCourseName(e.target.value)}
                                    placeholder="e.g. General English Level 1"
                                    className="w-full bg-[#111118] border border-[#3B415A]/50 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#c9a84c]"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-400 mb-1">Date & Time</label>
                                <input 
                                    type="datetime-local" 
                                    required
                                    value={lessonDate}
                                    onChange={(e) => setLessonDate(e.target.value)}
                                    className="w-full bg-[#111118] border border-[#3B415A]/50 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#c9a84c]"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-400 mb-1">Attendance</label>
                                <div className="flex gap-4 mt-2">
                                    <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
                                        <input 
                                            type="radio" 
                                            name="attendance" 
                                            value="present"
                                            checked={attendance === 'present'}
                                            onChange={() => setAttendance('present')}
                                            className="accent-[#c9a84c]"
                                        /> Present
                                    </label>
                                    <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
                                        <input 
                                            type="radio" 
                                            name="attendance" 
                                            value="absent"
                                            checked={attendance === 'absent'}
                                            onChange={() => setAttendance('absent')}
                                            className="accent-[#c9a84c]"
                                        /> Absent
                                    </label>
                                </div>
                            </div>

                            <button 
                                type="submit" 
                                disabled={submitting}
                                className="w-full bg-[#c9a84c] text-[#111118] font-bold py-3 rounded-lg hover:bg-[#cdb479] transition-colors mt-6"
                            >
                                {submitting ? 'Submitting...' : 'Submit Lesson'}
                            </button>
                        </form>
                    </div>
                </div>

                <div className="lg:col-span-2">
                    <div className="bg-[#1a1a2e] border border-[#3B415A]/50 rounded-2xl shadow-lg overflow-hidden h-full">
                        <div className="px-6 py-5 border-b border-[#3B415A]/50 flex justify-between items-center bg-[#111118]/50">
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                <Clock className="text-[#c9a84c]" size={20} /> Lesson History
                            </h2>
                        </div>
                        
                        {loading ? (
                            <div className="p-12 text-center text-gray-400">Loading lessons...</div>
                        ) : lessons.length === 0 ? (
                            <div className="p-12 text-center text-gray-400">No lessons logged yet. Log your first lesson on the left.</div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-[#111118]/50 border-b border-[#3B415A]/50">
                                            <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Date</th>
                                            <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Student</th>
                                            <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Course</th>
                                            <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Attendance</th>
                                            <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Earnings</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#3B415A]/30">
                                        {lessons.map((lesson) => (
                                            <tr key={lesson.id} className="hover:bg-[#111118]/80 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-semibold text-white">
                                                        {new Date(lesson.lesson_date).toLocaleDateString()}
                                                    </div>
                                                    <div className="text-xs text-gray-400">
                                                        {new Date(lesson.lesson_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="font-bold text-white">{lesson.first_name} {lesson.last_name}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
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
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-bold text-green-500">{lesson.price} TND</div>
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
