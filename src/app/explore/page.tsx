import React, { Suspense } from 'react';
import { ExploreClient } from '@/components/explore/ExploreClient';
import { Sparkles } from 'lucide-react';

export default function ExplorePage() {
  return (
    <Suspense
      fallback={
        <div className="py-32 flex flex-col items-center justify-center gap-3 text-[#929BA7]">
          <Sparkles className="w-6 h-6 animate-spin text-[#6BAA83]" />
          <div className="text-sm">Loading Dravya Explorer...</div>
        </div>
      }
    >
      <ExploreClient />
    </Suspense>
  );
}
