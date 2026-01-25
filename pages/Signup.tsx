import React from 'react';
import { SignUp } from '@clerk/clerk-react';

export const Signup: React.FC = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <SignUp path="/signup" routing="path" signInUrl="/login" />
        </div>
    );
};
