"use client"
import React, {useRef, useState, ChangeEvent, FormEvent } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';


type ReCAPTCHAWithReset = ReCAPTCHA & {
  reset: () => void;
};
const siteKey = process.env.NEXT_PUBLIC_SITE_KEY;
const Form: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    message: '',
  });
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  
  const recaptchaRef = useRef<ReCAPTCHAWithReset | null>(null);

  // Handle changes in input fields
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
  
    if (isSubmitting) return;  // Prevent multiple submissions
  
    if (!recaptchaValue) {
      alert('Please complete the reCAPTCHA');
      return;
    }
  
    setIsSubmitting(true);
  
    try {
      // Prepare the JSON data
      const jsonData = {
        fullName: formData.fullName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        message: formData.message,
        recaptchaToken: recaptchaValue,
      };
  
      const response = await fetch('https://contact.a-eskandarzadeh.eu/index.asmx/SendMail', {
        method: 'POST',
        headers: {
          'Content-Type': 'text/xml; charset=utf-8',
        },
        body:JSON.stringify(jsonData),
      });
  
      if (response.ok) {
        const responseText = await response.text();
        // Extract and display the response (e.g., "Hello World" or the actual result)
        alert(`API Response: ${responseText}`);
        setFormData({ fullName: '', email: '', phoneNumber: '', message: '' });
        setRecaptchaValue(null);
        recaptchaRef.current?.reset?.();
      } else {
        alert('Form submission failed');
      }
    } catch (error) {
      console.error('Error during form submission:', error);
      alert('An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form className="w-full max-w-md p-8 space-y-6 rounded-lg shadow-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold text-center">Contact Us</h2>
        <div>
          <label className="block text-sm font-medium text-yellow-300" htmlFor="fullName">Full Name</label>
          <input
            className="w-full px-4 py-2 mt-1 text-sm border text-slate-950 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            type="text"
            name="fullName"
            id="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-yellow-300" htmlFor="email">Email</label>
          <input
            className="w-full px-4 py-2 mt-1 text-sm border text-slate-950 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-yellow-300" htmlFor="phoneNumber">Phone Number</label>
          <input
            className="w-full px-4 py-2 mt-1 text-sm border text-slate-950 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            type="tel"
            name="phoneNumber"
            id="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-yellow-300" htmlFor="message">Message</label>
          <textarea
            className="w-full px-4 py-2 mt-1 text-sm text-slate-950 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            name="message"
            id="message"
            value={formData.message}
            onChange={handleChange}
            rows={5}
            required
          />
        </div>
        <ReCAPTCHA
          sitekey={siteKey || ''}
          onChange={(value) => setRecaptchaValue(value)}
        />
        <button
          type="submit"
          className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-500 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default Form;
