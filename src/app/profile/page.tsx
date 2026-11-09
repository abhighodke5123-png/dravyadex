'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, Bookmark, LogOut, ShieldCheck, Compass, Sparkles, BookOpen } from 'lucide-react';

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; email: string; role: string } | null>(null);
  const [favoriteSlugs, setFavoriteSlugs] = useState<string[]>([]);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('dravyadex_mock_user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        // Fallback default scholar profile
        setUser({
          name: 'Vaidya Scholar',
          email: 'scholar@dravyadex.org',
          role: 'BAMS Student & Dravyaguna Researcher',
        });
      }

      const storedFavs = localStorage.getItem('dravyadex_user_favorites');
      if (storedFavs) {
        setFavoriteSlugs(JSON.parse(storedFavs));
      }
    } catch (e) {}
  }, []);

  const handleLogout = () => {
    try {
      localStorage.removeItem('dravyadex_mock_user');
    } catch (e) {}
    setUser({
      name: 'Guest Scholar',
      email: 'guest@dravyadex.org',
      role: 'Dravyaguna Research Visitor (Open Access)',
    });
  };

  if (!user) return null;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Profile Card */}
      <div className="bg-[#101C2A] border border-white/5 rounded-3xl p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#6BAA83] to-[#101C2A] border border-[#6BAA83]/40 flex items-center justify-center text-white font-serif font-bold text-2xl shadow-xl">
            {user.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-2xl font-bold text-[#F4F5F1]">
                {user.name}
              </h1>
              <span className="text-[10px] font-mono text-[#6BAA83] bg-[#6BAA83]/10 border border-[#6BAA83]/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                Verified
              </span>
            </div>
            <div className="text-xs text-[#929BA7] mt-0.5 font-mono">{user.email}</div>
            <div className="text-xs text-[#B5D3BD] mt-1 font-medium">{user.role}</div>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0A1420] border border-white/10 hover:border-red-400/40 text-xs text-[#929BA7] hover:text-red-400 transition-colors self-start md:self-center"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#101C2A] border border-white/5 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono uppercase text-[#929BA7]">Saved Favorites</span>
            <Bookmark className="w-4 h-4 text-[#6BAA83]" />
          </div>
          <div className="font-serif text-3xl font-bold text-[#F4F5F1]">
            {favoriteSlugs.length}
          </div>
          <div className="text-[11px] text-[#636D7A] mt-1">Bookmarked monographs</div>
        </div>

        <div className="bg-[#101C2A] border border-white/5 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono uppercase text-[#929BA7]">Study Collections</span>
            <BookOpen className="w-4 h-4 text-[#83C9F5]" />
          </div>
          <div className="font-serif text-3xl font-bold text-[#F4F5F1]">3</div>
          <div className="text-[11px] text-[#636D7A] mt-1">Curated research lists</div>
        </div>

        <div className="bg-[#101C2A] border border-white/5 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono uppercase text-[#929BA7]">Platform Access</span>
            <Sparkles className="w-4 h-4 text-[#B5D3BD]" />
          </div>
          <div className="font-serif text-3xl font-bold text-[#6BAA83]">Full</div>
          <div className="text-[11px] text-[#636D7A] mt-1">All 483 Dravyas unlocked</div>
        </div>
      </div>

      {/* Saved Favorites Section */}
      <div className="bg-[#101C2A] border border-white/5 rounded-3xl p-8 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-white/5">
          <h2 className="font-serif text-xl font-bold text-[#F4F5F1]">
            Saved Herb Monographs ({favoriteSlugs.length})
          </h2>
          <Link href="/explore" className="text-xs text-[#6BAA83] hover:underline flex items-center gap-1">
            <Compass className="w-3.5 h-3.5" />
            <span>Explore More</span>
          </Link>
        </div>

        {favoriteSlugs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {favoriteSlugs.map(slug => (
              <Link
                key={slug}
                href={`/dravya/${slug}`}
                className="p-4 rounded-xl bg-[#0A1420] border border-white/5 hover:border-[#6BAA83]/40 transition-colors block group"
              >
                <div className="text-base font-serif font-bold text-[#F4F5F1] group-hover:text-[#6BAA83] transition-colors capitalize">
                  {slug.replace(/-/g, ' ')}
                </div>
                <div className="text-xs text-[#929BA7] mt-1">
                  View full Dravyaguna monograph →
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center text-xs text-[#929BA7]">
            You have not bookmarked any medicinal plants yet. Click &quot;Save to Study&quot; on any herb page to save it here.
          </div>
        )}
      </div>
    </div>
  );
}
