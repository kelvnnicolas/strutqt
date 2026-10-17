import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import AuthInput from '../components/AuthInput';
import GoogleAuthButton from '../components/GoogleAuthButton';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await login(email, password);
      const redirectUrl = router.query.redirect || '/dashboard';
      router.push(redirectUrl);
    } catch (err) {
      if (err.status === 500) {
        setError({ type: 'server', message: 'Estamos com instabilidade no sistema. Tente novamente em instantes.' });
      } else if (err.status === 401) {
        setError({ type: 'credentials', message: 'Senha incorreta' });
      } else if (err.status === 404) {
        setError({ type: 'credentials', message: 'Usuário não encontrado' });
      } else {
        setError({ type: 'generic', message: err.message || 'Erro interno do servidor' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Login - struqt</title>
      </Head>
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Link href="/" className="flex justify-center text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-indigo-600 tracking-tight">
            struqt
          </Link>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link href="/signup" className="font-medium text-primary-600 hover:text-primary-500">
              create a new account
            </Link>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-100">
            {error && error.type === 'server' && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, scale: [1, 1.01, 1] }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                className="mb-4 bg-orange-50 border-l-4 border-orange-500 p-4 rounded-md shadow-sm"
              >
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-orange-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-orange-700">{error.message}</p>
                  </div>
                </div>
              </motion.div>
            )}

            {error && error.type !== 'server' && (
              <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4 rounded-md shadow-sm">
                <div className="flex">
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error.message}</p>
                  </div>
                </div>
              </div>
            )}
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              <AuthInput
                id="email"
                label="Email address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />

              <AuthInput
                id="password"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />

              <div>
                {error?.type === 'server' ? (
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${isLoading ? 'bg-orange-400 cursor-not-allowed' : 'bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500'} transition`}
                  >
                    {isLoading ? 'Wait...' : 'Tentar novamente'}
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${isLoading ? 'bg-primary-400 cursor-not-allowed' : 'bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500'} transition`}
                  >
                    {isLoading ? 'Signing in...' : 'Sign in'}
                  </button>
                )}
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <GoogleAuthButton mode="Sign in" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
