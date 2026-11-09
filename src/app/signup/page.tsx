'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { UserPlus, Mail, Lock, User, GraduationCap, ArrowRight, Sparkles } from 'lucide-react';

export default function SignUpPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('BAMS Student');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    const supabase = createClient();

    if (supabase) {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role: role,
          },
        },
      });

      if (error) {
        setErrorMessage(error.message);
        setIsLoading(false);
        return;
      }
    } else {
      localStorage.setItem(
        'dravyadex_mock_user',
        JSON.stringify({
          email,
          role,
          name: fullName || 'Ayurvedic Scholar',
          createdAt: new Date().toISOString(),
        })
      );
    }

    setIsLoading(false);
    router.push('/profile');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md bg-[#101C2A] border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        {/* Open Development Banner */}
        <div className="mb-6 p-3.5 rounded-2xl bg-[#6BAA83]/10 border border-[#6BAA83]/30 text-xs text-[#B5D3BD] flex items-start gap-2.5">
          <Sparkles className="w-4 h-4 text-[#6BAA83] shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-[#F4F5F1] block">Open Development Mode</span>
            Registration is completely optional! All features are freely accessible to all researchers.
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            localStorage.setItem(
              'dravyadex_mock_user',
              JSON.stringify({
                email: 'scholar@dravyadex.org',
                role: 'Dravyaguna Scholar',
                name: 'Guest Scholar',
                createdAt: new Date().toISOString(),
              })
            );
            router.push('/explore');
          }}
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#6BAA83] to-[#83C9F5] text-[#07090C] font-bold text-xs tracking-wider uppercase transition-all duration-200 hover:brightness-110 flex items-center justify-center gap-2 shadow-lg shadow-[#6BAA83]/25 mb-6"
        >
          <Sparkles className="w-4 h-4" />
          <span>Enter Directly Without Sign Up</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <div className="relative flex py-2 items-center mb-6">
          <div className="flex-grow border-t border-white/10"></div>
          <span className="flex-shrink mx-3 text-[11px] font-mono uppercase text-[#636D7A]">or create an account</span>
          <div className="flex-grow border-t border-white/10"></div>
        </div>

        {errorMessage && (
          <div className="mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-300 text-center">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSignUp} className="space-y-4">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[#929BA7] mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-[#636D7A] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                placeholder="Vaidya Priya Sharma"
                className="w-full bg-[#0A1420] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#F4F5F1] placeholder-[#636D7A] outline-none focus:border-[#6BAA83]/50"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[#929BA7] mb-1.5">
              Academic / Clinical Role
            </label>
            <div className="relative">
              <GraduationCap className="w-4 h-4 text-[#636D7A] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <select
                value={role}
                onChange={e => setRole(e.target.value)}
                className="w-full bg-[#0A1420] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#F4F5F1] outline-none focus:border-[#6BAA83]/50 cursor-pointer"
              >
                <option value="BAMS Student">BAMS Undergraduate Student</option>
                <option value="Ayurvedic Clinical Doctor">Ayurvedic Clinical Doctor (BAMS/MD)</option>
                <option value="Dravyaguna Researcher">Dravyaguna Researcher / PG Scholar</option>
                <option value="Ayurveda Educator">Ayurveda Faculty / Professor</option>
                <option value="Botanical Researcher">Botanical / Pharmacognosy Researcher</option>
              </select>
            </div>
          </div>

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
                placeholder="priya.sharma@ayurveda.edu"
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
                minLength={6}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Minimum 6 characters"
                className="w-full bg-[#0A1420] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#F4F5F1] placeholder-[#636D7A] outline-none focus:border-[#6BAA83]/50"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl bg-[#6BAA83] hover:bg-[#5aa073] text-[#07090C] font-semibold text-xs tracking-wide transition-colors flex items-center justify-center gap-2 shadow-lg shadow-[#6BAA83]/20 mt-6"
          >
            {isLoading ? (
              <Sparkles className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <span>Complete Registration</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-[#929BA7]">
          Already have an account?{' '}
          <Link href="/login" className="text-[#6BAA83] hover:underline font-medium">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
