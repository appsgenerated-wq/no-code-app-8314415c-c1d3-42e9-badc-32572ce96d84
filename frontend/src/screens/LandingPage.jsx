import React, { useState } from 'react';
import config from '../constants.js';

const LandingPage = ({ onLogin, onSignup }) => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('scientist@demo.com');
  const [password, setPassword] = useState('password');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoginView) {
      onLogin(email, password);
    } else {
      onSignup(name, email, password);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-grow flex items-center justify-center">
        <div className="text-center max-w-4xl mx-auto px-4">
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight">
                Welcome to <span className="text-blue-600">Newtonian Chickens</span>
            </h1>
            <p className="mt-4 text-lg md:text-xl text-gray-600">
                The premier platform for the empirical study of theoretical poultry science. Explore the fundamental laws of the universe, one cluck at a time.
            </p>
             <div className="mt-12 max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    {isLoginView ? 'Scientist Login' : 'Join the Flock'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLoginView && (
                        <input
                            type="text"
                            placeholder="Your Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                            required
                        />
                    )}
                    <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        required
                    />
                    <button 
                        type="submit"
                        className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-transform transform hover:scale-105"
                    >
                        {isLoginView ? 'Login to Lab' : 'Create Account'}
                    </button>
                </form>
                <p className="text-sm text-gray-500 mt-4 text-center">
                    {isLoginView ? "Don't have an account?" : "Already a scientist?"} 
                    <button onClick={() => setIsLoginView(!isLoginView)} className="font-medium text-blue-600 hover:underline ml-1">
                        {isLoginView ? 'Sign up' : 'Login'}
                    </button>
                </p>
                <div className="mt-6 text-center">
                     <a href={`${config.BACKEND_URL}/admin`} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-gray-600 hover:text-blue-700 transition">
                        Access Admin Panel
                     </a>
                </div>
             </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
