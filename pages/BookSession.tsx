const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);
  setError(null);  // Changed from '' for consistency

  try {
    console.log('Submitting booking...', formData);

    const response = await fetch('/api/booking', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Booking failed');
    }

    const data = await response.json();
    console.log('Response:', data);

    // Success! Redirect to success page
    navigate('/booking-success', {
      state: {
        bookingId: data.bookingId,
        customerName: formData.fullName,
        email: formData.email
      }
    });

  } catch (err: any) {
    console.error('Booking error:', err);
    setError(err.message || 'Something went wrong. Please try again.');
    window.scrollTo(0, 0);
  } finally {
    setIsSubmitting(false);
  }
};
