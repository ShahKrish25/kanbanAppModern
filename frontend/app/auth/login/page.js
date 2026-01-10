"use client";
import React, { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation';
import { loginUser } from '../../services/authApi';
import { useAuth } from '../../context/authContext';
import ThemeToggle from '../../components/ThemeToggle';
import { Suspense } from 'react';

const LoginContent = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const isExpired = searchParams.get('expired') === 'true';
    const { login } = useAuth();

    useEffect(() => {
        if(localStorage.getItem('token')) {
            router.push('/');
        }
    }, [router]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const data = await loginUser({ email, password });
            // Use the login function from context to update global state
            login(data.token, data.user);
            router.push('/');
        } catch (err) {
            setError(err.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
    <div className="min-h-screen flex items-center justify-center bg-board-bg p-4">
        <div className="absolute top-6 right-6">
            <ThemeToggle />
        </div>
        <div className="bg-column-bg p-8 rounded-xl shadow-2xl border border-task-card-border w-full max-w-md transition-all duration-300">
            <form className="space-y-6" onSubmit={handleSubmit}>
                <h2 className="text-3xl font-bold text-text-primary text-center mb-8">Login</h2>
                
                {isExpired && !error && (
                    <div className="bg-amber-500/10 border border-amber-500 text-amber-500 p-3 rounded-lg text-sm text-center mb-4">
                        Your session has expired. Please login again.
                    </div>
                )}

                {error && (
                    <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-lg text-sm text-center">
                        {error}
                    </div>
                )}

                <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-text-secondary">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        required
                        className="w-full px-4 py-3 rounded-lg bg-task-card border border-task-card-border text-text-primary focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="password" className="block text-sm font-medium text-text-secondary">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                        required
                        className="w-full px-4 py-3 rounded-lg bg-task-card border border-task-card-border text-text-primary focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button 
                    type="submit" 
                    disabled={loading}
                    className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-all active:scale-[0.98] shadow-lg mt-4 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
            <div className="mt-6 text-center">
                <p className="text-text-secondary">
                    Don&apos;t have an account? <a href="/auth/signup" className="text-blue-500 hover:underline font-medium">Sign up</a>
                </p>
            </div>
        </div>
    </div>
  )
}

const Login = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-board-bg flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    }>
      <LoginContent />
    </Suspense>
  );
};

export default Login;
