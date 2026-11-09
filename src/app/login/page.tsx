'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Lock, Mail, ArrowRight, Sparkles, Shield, UserCheck } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    const supabase = createClient();

    if (supabase) {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setErrorMessage(error.message);
        setIsLoading(false);
        return;
      }
    } else {
      // Local session simulation when Supabase credentials are in development/unconfigured
      localStorage.setItem(
        'dravyadex_mock_user',
        JSON.stringify({
          email: email || 'scholar@dravyadex.org',
          role: 'BAMS Researcher',
          name: email.split('@')[0] || 'Vaidya Scholar',
          createdAt: new Date().toISOString(),
        })
      );
    }

    setIsLoading(false);
    router.push('/profile');
  };

  const handleDemoLogin = () => {
    localStorage.setItem(
      'dravyadex_mock_user',
      JSON.stringify({
        email: 'scholar@dravyadex.org',
        role: 'Ayurvedic Clinical Doctor (BAMS / MD)',
        name: 'Dr. Aarav Sharma',
        createdAt: new Date().toISOString(),
      })
    );
    router.push('/profile');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md bg-[#101C2A] border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#6BAA83]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Open Development Banner */}
        <div className="mb-6 p-3.5 rounded-2xl bg-[#6BAA83]/10 border border-[#6BAA83]/30 text-xs text-[#B5D3BD] flex items-start gap-2.5">
          <Sparkles className="w-4 h-4 text-[#6BAA83] shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-[#F4F5F1] block">Open Development Mode</span>
            No login required! All 483 plant taxa, research papers, compare matrices, and collections are freely open for development and exploration.
          </div>
        </div>

        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#6BAA83]/20 border border-[#6BAA83]/40 flex items-center justify-center text-[#6BAA83] mx-auto mb-4">
            <UserCheck className="w-6 h-6" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-[#F4F5F1]">Scholar Access</h1>
          <p className="text-xs text-[#929BA7] mt-1.5">
            Explore freely or sign in to persist custom research notes.
          </p>
        </div>

        {/* Direct Instant Enter Button */}
        <button
          type="button"
          onClick={handleDemoLogin}
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#6BAA83] to-[#83C9F5] text-[#07090C] font-bold text-xs tracking-wider uppercase transition-all duration-200 hover:brightness-110 flex items-center justify-center gap-2 shadow-lg shadow-[#6BAA83]/25 mb-6"
        >
          <Sparkles className="w-4 h-4" />
          <span>Enter Directly as Guest Scholar</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <div className="relative flex py-2 items-center mb-6">
          <div className="flex-grow border-t border-white/10"></div>
          <span className="flex-shrink mx-3 text-[11px] font-mono uppercase text-[#636D7A]">or sign in below</span>
          <div className="flex-grow border-t border-white/10"></div>
        </div>

        {errorMessage && (
          <div className="mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-300 text-center">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[#929BA7] mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#636D7A] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="vaidya.scholar@institution.edu"
                className="w-full bg-[#0A1420] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#F4F5F1] placeholder-[#636D7A] outline-none focus:border-[#6BAA83]/50"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[#929BA7] mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#636D7A] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-[#0A1420] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#F4F5F1] placeholder-[#636D7A] outline-none focus:border-[#6BAA83]/50"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl bg-[#6BAA83] hover:bg-[#5aa073] text-[#07090C] font-semibold text-xs tracking-wide transition-colors flex items-center justify-center gap-2 shadow-lg shadow-[#6BAA83]/20"
          >
            {isLoading ? (
              <Sparkles className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Demo Fast Access */}
        <div className="mt-6 pt-6 border-t border-white/5 space-y-3">
          <button
            type="button"
            onClick={handleDemoLogin}
            className="w-full py-2.5 rounded-xl bg-[#0A1420] border border-white/10 hover:border-[#83C9F5]/40 text-xs text-[#83C9F5] font-medium transition-colors flex items-center justify-center gap-2"
          >
            <UserCheck className="w-4 h-4" />
            <span>Instant Demo Scholar Login</span>
          </button>
        </div>

        <div className="mt-6 text-center text-xs text-[#929BA7]">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="text-[#6BAA83] hover:underline font-medium">
            Create Scholar Account
          </Link>
        </div>
      </div>
    </div>
  );
}
