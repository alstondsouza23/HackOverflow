// app/fetch-data/page.tsx
"use client"; // Required if using Next.js App Router

import { useState } from 'react';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { app } from '@/app/firebase/config';// Adjust path based on your Firebase config

export default function FetchDataPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [securityKey, setSecurityKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Initialize Firestore
  const db = getFirestore(app);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    // Simple validation
    if (!name || !email || !securityKey) {
      setError('All fields are required');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    try {
      setLoading(true);
      // Add document to Firestore
      await addDoc(collection(db, 'users'), {
        name,
        email,
        securityKey,
        createdAt: new Date(),
      });
      setSuccess(true);
      // Reset form
      setName('');
      setEmail('');
      setSecurityKey('');
    } catch (err) {
      setError('Error submitting form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-8 px-4">
      <div className="max-w-md w-full mx-auto bg-black-800 rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-6 text-white">Registration Form</h1>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
        )}
        
        {success && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
            Form submitted successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white-700 mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-white-700 mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-white  -700 mb-2" htmlFor="securityKey">
              Security Key
            </label>
            <input
              type="password"
              id="securityKey"
              value={securityKey}
              onChange={(e) => setSecurityKey(e.target.value)}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              disabled={loading}
            />
          </div>

        <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
          <p className="mt-4 text-center text-sm text-gray-600">
        Done with form?{" "}
        <a 
          href="/sign-in" 
          className="font-medium text-blue-600 hover:text-blue-500"
        >
          log in
        </a>
      </p>
        </form>
      </div>
    </div>
  );
}