import React, { useState } from 'react';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { SparklesIcon } from '../components/icons/Icons';

interface LoginPageProps {
  onLogin: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Hardcoded credentials for admin and user1
    const validCredentials: { [key: string]: string } = {
      'admin': '123',
      'user1': '456',
    };

    if (validCredentials[username] && validCredentials[username] === password) {
      setError('');
      onLogin();
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
        <div className="max-w-md w-full mx-auto">
            <div className="flex justify-center items-center space-x-2 mb-8">
                <SparklesIcon className="h-10 w-10 text-primary" />
                <h1 className="text-3xl font-bold text-gray-800">
                    Elite<span className="text-primary">pro</span>
                </h1>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md space-y-6">
                <h2 className="text-2xl font-bold text-center text-gray-700">Welcome Back</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                        id="username"
                        label="Username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        placeholder="admin or user1"
                        autoComplete="username"
                    />
                    <Input
                        id="password"
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="••••••••"
                        autoComplete="current-password"
                    />
                    {error && <p className="text-sm text-danger text-center">{error}</p>}
                    <Button type="submit" className="w-full">
                        Login
                    </Button>
                </form>
            </div>
             <footer className="text-center py-4 mt-4 text-sm text-gray-500">
                <p>&copy; {new Date().getFullYear()} Elitepro. All rights reserved.</p>
            </footer>
        </div>
    </div>
  );
};