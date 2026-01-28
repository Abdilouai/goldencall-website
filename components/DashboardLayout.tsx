import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useClerk } from '@clerk/clerk-react';
import {
    LayoutDashboard,
    Calendar,
    BookOpen,
    MessageSquare,
    LogOut,
    Menu,
    X,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';

export const DashboardLayout: React.FC = () => {
    const { signOut } = useClerk();
    const location = useLocation();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false);

    const handleSignOut = async () => {
        await signOut();
        navigate('/');
    };

    const navItems = [
        { icon: LayoutDashboard, label: 'Overview', path: '/dashboard' },
        // Hidden temporarily as requested
        // { icon: Calendar, label: 'Schedule', path: '/dashboard/schedule' },
        // { icon: BookOpen, label: 'My Plans', path: '/dashboard/plans' },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Sidebar for Desktop - NOT fixed, uses flex layout */}
            <aside
                className={`hidden md:flex flex-col bg-slate-900 text-white fixed top-0 left-0 h-screen z-40 transition-all duration-300 ${isSidebarCollapsed ? 'w-20' : 'w-64'
                    }`}
            >
                {/* Header with toggle button */}
                <div className="p-4 border-b border-slate-800 flex items-center justify-between">
                    {!isSidebarCollapsed && (
                        <button
                            onClick={() => setIsSidebarCollapsed(true)}
                            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                        >
                            <LayoutDashboard size={24} className="text-primary" />
                            <span className="font-heading font-bold text-xl">Dashboard</span>
                        </button>
                    )}
                    <button
                        onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                        className="p-2 rounded-lg hover:bg-slate-800 transition-colors text-gray-400 hover:text-white"
                        title={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                    >
                        {isSidebarCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                    </button>
                </div>

                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${location.pathname === item.path
                                ? 'bg-blue-600 text-white'
                                : 'text-gray-400 hover:bg-slate-800 hover:text-white'
                                }`}
                            title={isSidebarCollapsed ? item.label : undefined}
                        >
                            <item.icon size={20} className="flex-shrink-0" />
                            {!isSidebarCollapsed && <span className="font-medium">{item.label}</span>}
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-slate-800">
                    <button
                        onClick={handleSignOut}
                        className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-gray-400 hover:bg-slate-800 hover:text-white transition-colors"
                        title={isSidebarCollapsed ? 'Sign Out' : undefined}
                    >
                        <LogOut size={20} className="flex-shrink-0" />
                        {!isSidebarCollapsed && <span className="font-medium">Sign Out</span>}
                    </button>
                </div>
            </aside>

            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 w-full bg-slate-900 text-white z-50 px-4 py-3 flex justify-between items-center shadow-md">
                <Link to="/dashboard" className="flex items-center gap-2">
                    <LayoutDashboard size={20} className="text-primary" />
                    <span className="font-heading font-bold text-lg">Dashboard</span>
                </Link>
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="md:hidden fixed inset-0 z-40 bg-slate-900 pt-16">
                    <nav className="p-4 space-y-2">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${location.pathname === item.path
                                    ? 'bg-blue-600 text-white'
                                    : 'text-gray-400 hover:bg-slate-800 hover:text-white'
                                    }`}
                            >
                                <item.icon size={20} />
                                <span className="font-medium">{item.label}</span>
                            </Link>
                        ))}
                        <button
                            onClick={handleSignOut}
                            className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-gray-400 hover:bg-slate-800 hover:text-white transition-colors mt-4"
                        >
                            <LogOut size={20} />
                            <span className="font-medium">Sign Out</span>
                        </button>
                    </nav>
                </div>
            )}

            {/* Main Content Area - adjusts margin based on sidebar state */}
            <main
                className={`min-h-screen p-4 md:p-8 mt-14 md:mt-0 transition-all duration-300 ${isSidebarCollapsed ? 'md:ml-20' : 'md:ml-64'
                    }`}
            >
                <div className="max-w-6xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};
