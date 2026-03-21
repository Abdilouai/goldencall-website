import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';

const AVAILABLE_TIMES = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];

export const FreeSessionBooking: React.FC = () => {
    const { t } = useTranslation();
    const [step, setStep] = useState<1 | 2 | 3>(1);

    // Step 1 State
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [bookedSlots, setBookedSlots] = useState<string[]>([]);
    const [loadingSlots, setLoadingSlots] = useState(false);

    // Step 2 State
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneCode: '+971',
        phone: '',
        country: '',
        city: '',
        contactMethod: '',
        interestReason: '',
        studyMethod: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    // Calendar generation
    const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

    const generateCalendarDays = () => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();
        const daysInMonth = getDaysInMonth(year, month);
        const firstDay = getFirstDayOfMonth(year, month);

        const days = [];
        // empty slots for days before the 1st
        for (let i = 0; i < (firstDay === 0 ? 6 : firstDay - 1); i++) {
            days.push(null);
        }
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(new Date(year, month, i));
        }
        return days;
    };

    const nextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    };

    const prevMonth = () => {
        const newMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
        if (newMonth >= new Date(new Date().getFullYear(), new Date().getMonth(), 1)) {
            setCurrentMonth(newMonth);
        }
    };

    const formatDateForApi = (date: Date) => {
        const d = new Date(date);
        let month = '' + (d.getMonth() + 1);
        let day = '' + d.getDate();
        const year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    };

    useEffect(() => {
        if (selectedDate) {
            setLoadingSlots(true);
            const dateStr = formatDateForApi(selectedDate);
            fetch(`/api/available-slots?date=${dateStr}`)
                .then(res => res.json())
                .then(data => {
                    if (data.bookedSlots) {
                        setBookedSlots(data.bookedSlots);
                    } else {
                        setBookedSlots([]);
                    }
                    // clear time if the previously selected time is now booked
                    if (selectedTime && data.bookedSlots?.includes(selectedTime)) {
                        setSelectedTime(null);
                    }
                })
                .catch(err => {
                    console.error('Failed to fetch slots', err);
                    setBookedSlots([]);
                })
                .finally(() => setLoadingSlots(false));
        }
    }, [selectedDate]);

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedDate || !selectedTime) return;

        setIsSubmitting(true);
        setError('');

        try {
            const payload = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                phone: `${formData.phoneCode} ${formData.phone}`,
                country: formData.country,
                city: formData.city,
                contactMethod: formData.contactMethod,
                interestReason: formData.interestReason,
                studyMethod: formData.studyMethod,
                sessionDate: formatDateForApi(selectedDate),
                sessionTime: selectedTime
            };

            const res = await fetch('/api/book-session', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const data = await res.json();
            if (data.error) {
                setError(data.error);
            } else if (data.success) {
                setStep(3);
            }
        } catch (err) {
            setError(t('common.error') || 'An unexpected error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const isDatePast = (date: Date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date < today;
    };

    return (
        <div className="bg-card border border-border rounded-3xl p-6 md:p-8 max-w-4xl mx-auto shadow-xl">
            {/* Steps indicator */}
            <div className="flex items-center justify-center mb-8 gap-4">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold ${step >= 1 ? 'bg-primary text-dark' : 'bg-dark text-text-muted border border-border'}`}>1</div>
                <div className={`h-1 w-16 ${step >= 2 ? 'bg-primary' : 'bg-border'}`}></div>
                <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold ${step >= 2 ? 'bg-primary text-dark' : 'bg-dark text-text-muted border border-border'}`}>2</div>
                <div className={`h-1 w-16 ${step >= 3 ? 'bg-primary' : 'bg-border'}`}></div>
                <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold ${step >= 3 ? 'bg-primary text-dark' : 'bg-dark text-text-muted border border-border'}`}>3</div>
            </div>

            {step === 1 && (
                <div>
                    <div className="text-center mb-8">
                        <h2 className="font-heading font-bold text-3xl text-text mb-2">Select a Date & Time</h2>
                        <p className="text-text-muted">Choose when you'd like to have your free consultation session.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Calendar */}
                        <div className="bg-dark/50 p-6 rounded-2xl border border-border">
                            <div className="flex justify-between items-center mb-6">
                                <button onClick={prevMonth} className="p-2 hover:bg-card rounded-full text-text transition-colors">
                                    <ChevronLeft size={20} />
                                </button>
                                <h3 className="font-bold text-lg text-text">
                                    {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
                                </h3>
                                <button onClick={nextMonth} className="p-2 hover:bg-card rounded-full text-text transition-colors">
                                    <ChevronRight size={20} />
                                </button>
                            </div>

                            <div className="grid grid-cols-7 gap-2 mb-2 text-center text-sm font-semibold text-text-muted">
                                <div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div><div>Su</div>
                            </div>

                            <div className="grid grid-cols-7 gap-2">
                                {generateCalendarDays().map((date, idx) => {
                                    if (!date) return <div key={`empty-${idx}`} className="h-10"></div>;

                                    const isSelected = selectedDate?.toDateString() === date.toDateString();
                                    const past = isDatePast(date);
                                    const isWeekend = date.getDay() === 0 || date.getDay() === 6; // Sunday or Saturday

                                    return (
                                        <button
                                            key={date.toISOString()}
                                            disabled={past || isWeekend}
                                            onClick={() => {
                                                setSelectedDate(date);
                                                setSelectedTime(null);
                                            }}
                                            className={`
                                                h-10 rounded-lg flex items-center justify-center text-sm font-sans transition-all
                                                ${past || isWeekend ? 'text-text-muted opacity-30 cursor-not-allowed' : 'hover:bg-primary/20 hover:text-primary'}
                                                ${isSelected ? 'bg-primary text-dark font-bold shadow-lg shadow-primary/20' : (!past && !isWeekend ? 'bg-card text-text' : '')}
                                            `}
                                        >
                                            {date.getDate()}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Timeslots */}
                        <div className="bg-dark/50 p-6 rounded-2xl border border-border flex flex-col">
                            <h3 className="font-bold text-lg text-text mb-6 flex items-center gap-2">
                                <Clock size={20} className="text-primary" />
                                {selectedDate ? selectedDate.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' }) : 'Select a date first'}
                            </h3>

                            {!selectedDate ? (
                                <div className="flex-1 flex items-center justify-center text-text-muted text-center p-8">
                                    Please select a date from the calendar to see available start times.
                                </div>
                            ) : loadingSlots ? (
                                <div className="flex-1 flex items-center justify-center text-text-muted">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 gap-3 mb-6">
                                    {AVAILABLE_TIMES.map((time) => {
                                        const isBooked = bookedSlots.includes(time);
                                        const isSelected = selectedTime === time;
                                        return (
                                            <button
                                                key={time}
                                                disabled={isBooked}
                                                onClick={() => setSelectedTime(time)}
                                                className={`
                                                    py-3 rounded-xl border text-sm font-semibold transition-all
                                                    ${isBooked ? 'bg-dark border-border text-text-muted opacity-50 cursor-not-allowed' :
                                                        isSelected ? 'bg-primary border-primary text-dark shadow-md shadow-primary/20' :
                                                            'bg-card border-border text-text hover:border-primary/50 hover:text-primary'}
                                                `}
                                            >
                                                {time}
                                            </button>
                                        );
                                    })}
                                </div>
                            )}

                            <div className="mt-auto pt-4 border-t border-border">
                                <button
                                    disabled={!selectedDate || !selectedTime}
                                    onClick={() => setStep(2)}
                                    className="w-full bg-primary text-dark font-bold py-4 rounded-xl hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Continue to details
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {step === 2 && (
                <div>
                    <div className="mb-8">
                        <button onClick={() => setStep(1)} className="text-text-muted hover:text-primary flex items-center gap-1 mb-4 text-sm font-semibold transition-colors">
                            <ChevronLeft size={16} /> Back to Calendar
                        </button>
                        <h2 className="font-heading font-bold text-3xl text-text mb-2">Your Details</h2>
                        <p className="text-text-muted">Please fill in the form so we can prepare for your session.</p>

                        <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 mt-6 flex items-center gap-4">
                            <div className="bg-primary/20 p-3 rounded-full text-primary">
                                <CalendarIcon size={24} />
                            </div>
                            <div>
                                <div className="text-sm text-text-muted font-semibold">Selected Session</div>
                                <div className="text-text font-bold">
                                    {selectedDate?.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })} at {selectedTime}
                                </div>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleFormSubmit} className="space-y-6">
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl text-sm font-semibold">
                                {error}
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-text mb-2">First Name <span className="text-red-500">*</span></label>
                                <input required type="text" value={formData.firstName} onChange={e => setFormData({ ...formData, firstName: e.target.value })} className="w-full bg-dark border border-border rounded-xl px-4 py-3 text-text focus:outline-none focus:border-primary transition-colors" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-text mb-2">Last Name <span className="text-red-500">*</span></label>
                                <input required type="text" value={formData.lastName} onChange={e => setFormData({ ...formData, lastName: e.target.value })} className="w-full bg-dark border border-border rounded-xl px-4 py-3 text-text focus:outline-none focus:border-primary transition-colors" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-text mb-2">Email <span className="text-red-500">*</span></label>
                                <input required type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="w-full bg-dark border border-border rounded-xl px-4 py-3 text-text focus:outline-none focus:border-primary transition-colors" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-text mb-2">Mobile Phone Number <span className="text-red-500">*</span></label>
                                <div className="flex gap-2">
                                    <select value={formData.phoneCode} onChange={e => setFormData({ ...formData, phoneCode: e.target.value })} className="bg-dark border border-border rounded-xl px-3 py-3 text-text focus:outline-none focus:border-primary transition-colors w-1/3">
                                        <option value="+971">+971</option>
                                        <option value="+216">+216</option>
                                        <option value="+33">+33</option>
                                        <option value="+1">+1</option>
                                        <option value="+44">+44</option>
                                    </select>
                                    <input required type="tel" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} className="w-2/3 bg-dark border border-border rounded-xl px-4 py-3 text-text focus:outline-none focus:border-primary transition-colors" />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-text mb-2">Country <span className="text-red-500">*</span></label>
                                <select required value={formData.country} onChange={e => setFormData({ ...formData, country: e.target.value })} className="w-full bg-dark border border-border rounded-xl px-4 py-3 text-text focus:outline-none focus:border-primary transition-colors">
                                    <option value="" disabled>Select your country</option>
                                    <option value="Tunisia">Tunisia</option>
                                    <option value="UAE">United Arab Emirates</option>
                                    <option value="France">France</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-text mb-2">City</label>
                                <input type="text" placeholder="Write your closest city/region/area" value={formData.city} onChange={e => setFormData({ ...formData, city: e.target.value })} className="w-full bg-dark border border-border rounded-xl px-4 py-3 text-text focus:outline-none focus:border-primary transition-colors" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-text mb-2">How do you want to be contacted? <span className="text-red-500">*</span></label>
                            <select required value={formData.contactMethod} onChange={e => setFormData({ ...formData, contactMethod: e.target.value })} className="w-full bg-dark border border-border rounded-xl px-4 py-3 text-text focus:outline-none focus:border-primary transition-colors">
                                <option value="" disabled>Please Select</option>
                                <option value="WhatsApp">WhatsApp</option>
                                <option value="Phone Call">Phone Call</option>
                                <option value="Email">Email</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-text mb-2">Why are you interested in English? <span className="text-red-500">*</span></label>
                                <select required value={formData.interestReason} onChange={e => setFormData({ ...formData, interestReason: e.target.value })} className="w-full bg-dark border border-border rounded-xl px-4 py-3 text-text focus:outline-none focus:border-primary transition-colors">
                                    <option value="" disabled>Please select</option>
                                    <option value="Cabin Crew Preparation">Cabin Crew Preparation</option>
                                    <option value="Professional Interview">Professional Interview</option>
                                    <option value="IELTS Preparation">IELTS Preparation</option>
                                    <option value="General Improvement">General Improvement</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-text mb-2">How do you want to study? <span className="text-red-500">*</span></label>
                                <select required value={formData.studyMethod} onChange={e => setFormData({ ...formData, studyMethod: e.target.value })} className="w-full bg-dark border border-border rounded-xl px-4 py-3 text-text focus:outline-none focus:border-primary transition-colors">
                                    <option value="" disabled>Please Select</option>
                                    <option value="1-on-1 Classes">1-on-1 Classes</option>
                                    <option value="Group Classes">Group Classes</option>
                                </select>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-border flex justify-end">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-primary text-dark font-bold py-4 px-10 rounded-xl hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20 flex items-center gap-2 disabled:opacity-70"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-dark"></div>
                                        Processing...
                                    </>
                                ) : 'Confirm Booking'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {step === 3 && (
                <div className="text-center py-12">
                    <div className="w-24 h-24 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle size={48} />
                    </div>
                    <h2 className="font-heading font-bold text-4xl text-text mb-4">You're All Set!</h2>
                    <p className="text-xl text-text-muted mb-8 max-w-lg mx-auto">
                        Your free session for <strong className="text-text">{selectedDate?.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })} at {selectedTime}</strong> has been successfully booked.
                    </p>
                    <p className="text-text-muted mb-10">
                        We will reach out to you via {formData.contactMethod} shortly to confirm and provide the meeting details.
                    </p>
                    <button onClick={() => window.location.href = '/'} className="bg-dark text-text border border-border hover:border-primary hover:text-primary transition-all font-bold py-4 px-8 rounded-xl">
                        Return to Homepage
                    </button>
                </div>
            )}
        </div>
    );
};
