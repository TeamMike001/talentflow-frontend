// src/app/(auth)/forgot-password/page.js
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, Shield, CheckCircle, AlertCircle } from 'lucide-react';

const API_BASE_URL = 'http://localhost:8080';

export default function ForgotPasswordPage() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [questions, setQuestions] = useState({});
  const [answers, setAnswers] = useState({ answer1: '', answer2: '', answer3: '' });
  const [resetToken, setResetToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleCheckEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setQuestions(data.questions);
        setStep(2);
      } else {
        setError(data.error || 'Email not found');
      }
    } catch (err) {
      setError('Failed to verify email');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyAnswers = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/verify-security-answers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, answers })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setResetToken(data.resetToken);
        setStep(3);
      } else {
        setError(data.error || 'Incorrect answers');
      }
    } catch (err) {
      setError('Failed to verify answers');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, resetToken, newPassword })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setSuccess('Password reset successfully! Redirecting to login...');
        setTimeout(() => {
          router.push('/signin');
        }, 2000);
      } else {
        setError(data.error || 'Failed to reset password');
      }
    } catch (err) {
      setError('Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        {/* Progress Steps */}
        <div className="flex mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex-1 text-center">
              <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center text-sm font-semibold ${
                step >= s ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                {step > s ? <CheckCircle size={16} /> : s}
              </div>
              <p className="text-xs mt-1 text-gray-500">
                {s === 1 && 'Email'}
                {s === 2 && 'Security'}
                {s === 3 && 'Reset'}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="text-blue-600" size={32} />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            {step === 1 && 'Forgot Password?'}
            {step === 2 && 'Security Verification'}
            {step === 3 && 'Create New Password'}
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            {step === 1 && 'Enter your email to verify your identity'}
            {step === 2 && 'Answer your security questions'}
            {step === 3 && 'Enter your new password'}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm flex items-center gap-2">
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-lg text-sm flex items-center gap-2">
            <CheckCircle size={16} />
            {success}
          </div>
        )}

        {/* Step 1: Email */}
        {step === 1 && (
          <form onSubmit={handleCheckEmail} className="space-y-4">
            <input
              type="email"
              placeholder="Email address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Verifying...' : 'Continue'}
            </button>
          </form>
        )}

        {/* Step 2: Security Questions */}
        {step === 2 && (
          <form onSubmit={handleVerifyAnswers} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {questions.question1 || 'Security Question 1'}
              </label>
              <input
                type="text"
                required
                value={answers.answer1}
                onChange={(e) => setAnswers({ ...answers, answer1: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                placeholder="Your answer"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {questions.question2 || 'Security Question 2'}
              </label>
              <input
                type="text"
                required
                value={answers.answer2}
                onChange={(e) => setAnswers({ ...answers, answer2: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                placeholder="Your answer"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {questions.question3 || 'Security Question 3'}
              </label>
              <input
                type="text"
                required
                value={answers.answer3}
                onChange={(e) => setAnswers({ ...answers, answer3: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                placeholder="Your answer"
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Verifying...' : 'Verify Answers'}
            </button>
          </form>
        )}

        {/* Step 3: New Password */}
        {step === 3 && (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                placeholder="Enter new password (min 6 characters)"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                placeholder="Confirm new password"
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>
        )}

        <Link
          href="/signin"
          className="inline-flex items-center gap-1.5 text-gray-500 text-sm mt-6 hover:text-blue-600 transition-colors"
        >
          <ChevronLeft size={16} />
          Back to Sign in
        </Link>
      </div>
    </div>
  );
}