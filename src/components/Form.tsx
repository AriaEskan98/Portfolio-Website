"use client";

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

interface FormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  message: string;
}

export const Form: React.FC = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phoneNumber: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Basic validation to ensure all fields are filled
    const { fullName, email, phoneNumber, message } = formData;
    if (!fullName || !email || !phoneNumber || !message) {
      alert('All fields are required');
      return;
    }

    if (!executeRecaptcha) {
      alert('Recaptcha not yet available');
      return;
    }

    setIsSubmitting(true);

    try {
      const recaptchaToken = await executeRecaptcha('submit');

      const response = await fetch('https://contacts.a-eskandarzadeh.eu/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          recaptchaToken,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Network response was not ok: ${response.status} ${response.statusText} - ${errorText}`);
      }

      const result = await response.json();
      console.log('Success:', result);
      alert('Form submitted successfully');
      // Optionally, clear the form here
      setFormData({
        fullName: '',
        email: '',
        phoneNumber: '',
        message: '',
      });
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error:', error.message);
        alert(`There was an error submitting the form: ${error.message}`);
      } else {
        console.error('Unknown error:', error);
        alert('An unknown error occurred.');
      }
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
            className="w-full px-4 py-2 mt-1 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            name="message"
            id="message"
            value={formData.message}
            onChange={handleChange}
            rows={5}
            required
          />
        </div>
        <ReCAPTCHA
          sitekey="6LcHxB8qAAAAAPF5lR6u50EmMp-2af2DHpaOgZ04"
          onChange={handleRecaptchaChange}
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
