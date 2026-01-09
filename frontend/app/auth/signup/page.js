"use client";
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { registerUser } from '../../services/authApi';
import ThemeToggle from '../../components/ThemeToggle';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const router = useRouter();

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
            await registerUser({ name, email, password });
            setSuccess(true);
            setTimeout(() => {
                router.push('/auth/login');
            }, 2000);
        } catch (err) {
            setError(err.message || 'Registration failed');
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
                <h2 className="text-3xl font-bold text-text-primary text-center mb-8">Create Account</h2>
                
                {error && (
                    <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-lg text-sm text-center">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="bg-green-500/10 border border-green-500 text-green-500 p-3 rounded-lg text-sm text-center">
                        Registration successful! Redirecting to login...
                    </div>
                )}

                <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium text-text-secondary">Full Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Enter your full name"
                        required
                        className="w-full px-4 py-3 rounded-lg bg-task-card border border-task-card-border text-text-primary focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

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
                        placeholder="Create a password"
                        required
                        className="w-full px-4 py-3 rounded-lg bg-task-card border border-task-card-border text-text-primary focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button 
                    type="submit" 
                    disabled={loading || success}
                    className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-all active:scale-[0.98] shadow-lg mt-4 ${(loading || success) ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {loading ? 'Creating Account...' : 'Sign Up'}
                </button>
            </form>
            <div className="mt-6 text-center">
                <p className="text-text-secondary">
                    Already have an account? <a href="/auth/login" className="text-blue-500 hover:underline font-medium">Login</a>
                </p>
            </div>
        </div>
    </div>
  )
}

export default Signup;
