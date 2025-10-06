import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import Swal from "sweetalert2";

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                Swal.fire({
                    title: "Login Failed",
                    text: "Invalid email or password.",
                    icon: "error",
                    timer: 2000, // 2 seconds
                    showConfirmButton: false
                });
                return;
            }

            const data = await response.json();
            localStorage.setItem("token", data.token);

            Swal.fire({
                title: "Welcome Admin!",
                text: "Redirecting to your dashboard...",
                icon: "success",
                timer: 2000, // 2 seconds
                showConfirmButton: false,
                willClose: () => {
                    window.location.href = "/admin"; // auto redirect after popup closes
                }
            });

        } catch (err) {
            console.error(err);
            Swal.fire({
                title: "Error",
                text: "Something went wrong. Please try again.",
                icon: "error",
                timer: 2000,
                showConfirmButton: false
            });
        }
    };




    return (
        <div className="flex h-screen">
            {/* Left Side - Image Section */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 relative overflow-hidden">
                <div className="absolute inset-0 bg-black opacity-20"></div>

                {/* Decorative Elements */}
                <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>

                <div className="relative z-10 flex flex-col justify-center items-center w-full p-12 text-white">
                    <div className="max-w-lg">
                        {/* Logo/Brand */}
                        <div className="mb-8">
                            <h1 className="text-5xl font-bold mb-4">Nexus Talent</h1>
                            <div className="h-1 w-24 bg-blue-400 rounded"></div>
                        </div>

                        {/* Welcome Message */}
                        <h2 className="text-3xl font-semibold mb-6">
                            Welcome to Admin Portal
                        </h2>
                        <p className="text-lg text-blue-100 mb-8 leading-relaxed">
                            Manage your recruitment process efficiently with our comprehensive HR management system. Connect with top talent and streamline your hiring workflow.
                        </p>

                        {/* Features List */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                <p className="text-blue-100">Post and manage job listings</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                <p className="text-blue-100">Track applicant progress</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                <p className="text-blue-100">Handle bulk company contracts</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
                <div className="w-full max-w-md">
                    {/* Mobile Logo */}
                    <div className="lg:hidden mb-8 text-center">
                        <h1 className="text-3xl font-bold text-blue-900">Nexus Talent</h1>
                        <p className="text-gray-600 mt-2">Admin Portal</p>
                    </div>

                    {/* Login Card */}
                    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">Sign In</h2>
                            <p className="text-gray-600">Enter your credentials to access your account</p>
                        </div>

                        <div className="space-y-6">
                            {/* Email Field */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                        placeholder="admin@nexustalent.com"
                                    />
                                </div>
                            </div>

                            {/* Password Field */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                        placeholder="Enter your password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                        ) : (
                                            <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Remember Me & Forgot Password */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    />
                                    <label className="ml-2 block text-sm text-gray-700">
                                        Remember me
                                    </label>
                                </div>

                            </div>

                            {/* Login Button */}
                            <button
                                onClick={handleLogin}
                                className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-medium"
                            >
                                Sign In
                                <ArrowRight className="h-5 w-5" />
                            </button>

                            {/* Divider */}
                            <div className="relative my-6">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">Need help?</span>
                                </div>
                            </div>

                            {/* Support Link */}
                            <div className="text-center">
                                <p className="text-sm text-gray-600">
                                    Contact support at{' '}
                                    <a href="mailto:support@nexustalent.com" className="font-medium text-blue-600 hover:text-blue-500">
                                        support@nexustalent.com
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-8 text-center text-sm text-gray-600">
                        <p>© 2024 Nexus Talent HR. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;