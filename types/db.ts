export interface User {
    id: string; // Clerk ID
    email: string;
    full_name: string | null;
    role: 'student' | 'admin';
    created_at: string;
}

export interface Plan {
    id: string;
    name: string;
    description: string;
    price_cents: number;
    features: string[];
    stripe_price_id?: string;
}

export interface Purchase {
    id: string;
    user_id: string;
    plan_id: string;
    status: 'active' | 'completed' | 'cancelled';
    purchase_date: string;
}

export interface Session {
    id: string;
    user_id: string;
    scheduled_at: string;
    status: 'scheduled' | 'completed' | 'cancelled';
    meeting_link?: string;
    notes?: string;
}

export interface Assessment {
    id: string;
    user_id: string;
    type: 'interview' | 'english_test';
    transcript: any; // JSON
    ai_feedback: string;
    score?: number;
    created_at: string;
}
