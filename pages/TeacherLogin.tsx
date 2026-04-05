import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, AlertCircle } from 'lucide-react';

export const TeacherLogin: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const res = await fetch('/api/teacher-login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (res.ok && data.success) {
                localStorage.setItem('teacher_token', data.token);
                localStorage.setItem('teacher_info', JSON.stringify(data.user));
                navigate('/teacher/dashboard');
            } else {
                setError(data.error || 'Invalid credentials');
            }
        } catch (err) {
            setError('Failed to connect to the server. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center -mt-10 px-4">
            <div className="bg-card w-full max-w-md p-8 rounded-3xl border border-border shadow-xl">
                <div className="text-center mb-8">
                    <div className="bg-primary/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Lock className="text-primary w-8 h-8" />
                    </div>
                    <h1 className="text-3xl font-heading font-bold text-text">Teacher Portal</h1>
                    <p className="text-text-muted mt-2">Sign in to manage your students and sessions</p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl flex items-start gap-3 mb-6">
                        <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                        <span className="text-sm font-semibold">{error}</span>
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-text mb-2">Email Address</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Mail className="w-5 h-5 text-text-muted" />
                            </div>
                            <input 
                                type="email" 
                                required
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className="w-full bg-dark border border-border rounded-xl pl-12 pr-4 py-3 text-text focus:outline-none focus:border-primary transition-colors" 
                                placeholder="teacher@goldencall.com"
                            />
                        </div>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-semibold text-text mb-2">Password</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Lock className="w-5 h-5 text-text-muted" />
                            </div>
                            <input 
                                type="password" 
                                required
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className="w-full bg-dark border border-border rounded-xl pl-12 pr-4 py-3 text-text focus:outline-none focus:border-primary transition-colors" 
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        disabled={isLoading}
                        className="w-full bg-primary text-dark font-bold py-4 rounded-xl hover:bg-primary-dark transition-colors flex justify-center items-center gap-2 shadow-lg shadow-primary/20 disabled:opacity-70"
                    >
                        {isLoading ? (
                            <>
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-dark"></div>
                                Signing in...
                            </>
                        ) : 'Sign In'}
                    </button>
                    
                    <p className="text-center text-sm font-semibold text-text-muted">
                        Return to <a href="/" className="text-primary hover:underline">main website</a>.
                    </p>
                </form>
            </div>
        </div>
    );
};
