export interface Service {
  id: string;
  title: string;
  description: string;
  icon: 'plane' | 'target' | 'book';
  details: string[];
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
}

export interface BlogPost {
  id: number;
  title: string;
  category: string;
  readTime: string;
  excerpt: string;
  date: string;
  imageUrl: string;
}

export interface BookingFormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  country: string;
  serviceType: string;
  preferredDate: string;
  preferredTime: string;
  message: string;
  consent: boolean;
}