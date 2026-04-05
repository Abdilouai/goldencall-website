import React from 'react';
import { FileQuestion } from 'lucide-react';

export const Materials: React.FC = () => {
    return (
        <div>
            <header className="mb-8">
                <h1 className="text-3xl font-heading font-bold text-white mb-2">Materials & Resources</h1>
                <p className="text-gray-400">Useful documents for your classes.</p>
            </header>

            <div className="bg-[#1a1a2e] border border-[#3B415A]/50 rounded-2xl shadow-lg p-16 flex flex-col items-center justify-center text-center">
                <div className="bg-[#111118] p-4 rounded-full mb-4 border border-[#3B415A]/50">
                    <FileQuestion size={48} className="text-[#3B415A]" />
                </div>
                <h2 className="text-xl font-bold text-white mb-2">No materials uploaded yet.</h2>
                <p className="text-gray-400 max-w-sm">
                    In the future, you will be able to upload files and share documents directly with your students from here.
                </p>
            </div>
        </div>
    );
};
