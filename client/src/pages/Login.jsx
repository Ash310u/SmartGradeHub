import { useState, useEffect } from 'react';
import Input from '../components/features/Input';
import Blob from '../components/Blob';
import { useLoginMutation } from '../store';
import { useDispatch } from 'react-redux';
import { setToken, setUserId } from '../store';
import { useNavigate } from 'react-router-dom';
import { setUserInfo } from '../store';

const Login = () => {
    const [login, { isLoading }] = useLoginMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');

    useEffect(() => {
        // Check if user is already logged in
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');

        if (token && userId) {
            dispatch(setToken(token));
            dispatch(setUserId(userId));
            navigate('/dashboard');
        }
    }, [dispatch, navigate]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await login(formData);
        if (response.data?.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userId', response.data.user._id);
            dispatch(setToken(response.data.token));
            dispatch(setUserInfo({
                username: response.data.user.name,
                email: response.data.user.email,
                age: response.data.user.age,
                rollNo: response.data.user.rollNo,
                department: response.data.user.department,
                year: response.data.user.year,
                sem: response.data.user.sem,
              }))
            navigate('/dashboard');
        } else {
            setError('Invalid credentials');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-violet-400 to-gray-900">
            <div className="h-[calc(100vh-64px)] flex items-center justify-center relative overflow-hidden">
                {/* Animated Background Blobs */}
                <div className="absolute inset-0 pointer-events-none">
                    <Blob color="violet" className="top-20 left-20" />
                    <Blob color="gray" className="top-40 right-20" delay="2000" />
                    <Blob color="violet" className="-bottom-8 left-40" delay="4000" />
                </div>

                {/* Main Content Box */}
                <div className="bg-white/90 rounded-3xl p-12 shadow-lg w-full max-w-3xl transform hover:scale-[1.02] transition-transform duration-300 relative min-h-[450px] backdrop-blur-sm">
                    <div className="grid grid-cols-2 gap-8 h-full">
                        {/* Left Side - Simple Welcome */}
                        <div className="flex flex-col justify-center">
                            <h1 className="text-3xl font-bold text-gray-900 mb-4">Techno International Newton</h1>
                            <p className="text-gray-600 text-lg mb-6">Your journey with 101 Learning partner begins here.</p>
                        </div>

                        {/* Right Side - Login Form */}
                        <div className="relative">
                            <div className="text-center mb-8 animate-fadeIn">
                                <h2 className="text-2xl font-semibold text-gray-900">Welcome Back</h2>
                            </div>

                            <form onSubmit={handleLogin} className="space-y-4">
                                {error && (
                                    <div className="text-red-500 text-sm mb-4">
                                        {error}
                                    </div>
                                )}
                                {[
                                    {
                                        type: "email",
                                        id: "login-email",
                                        name: "email",
                                        placeholder: "Enter your email"
                                    },
                                    {
                                        type: "password",
                                        id: "login-password",
                                        name: "password",
                                        placeholder: "Enter your password"
                                    }
                                ].map((field) => (
                                    <Input
                                        key={field.id}
                                        {...field}
                                        value={formData[field.name]}
                                        onChange={handleChange}
                                        disabled={isLoading}
                                    />
                                ))}

                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-violet-400 to-gray-900 text-white py-3 rounded-xl hover:opacity-90 transition-all duration-300 transform hover:scale-[1.02] font-medium shadow-md disabled:opacity-50"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Signing in...' : 'Sign In'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;