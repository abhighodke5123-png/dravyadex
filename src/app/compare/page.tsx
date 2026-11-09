import React, { Suspense } from 'react';
import { getCompareDravyas } from '@/lib/database/repository';
import { CompareMatrix } from '@/components/comparison/CompareMatrix';
import { Sparkles } from 'lucide-react';

export default async function ComparePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  let slugs: string[] = [];

  if (params.slug) {
    if (Array.isArray(params.slug)) {
      slugs = params.slug;
    } else {
      slugs = [params.slug];
    }
  }

  // Default comparison benchmark if no herbs specified
  if (slugs.length === 0) {
    slugs = ['ashwagandha', 'shatavari'];
  }

  const herbs = getCompareDravyas(slugs.slice(0, 3));

  return (
    <Suspense
      fallback={
        <div className="py-32 flex flex-col items-center justify-center gap-3 text-[#929BA7]">
          <Sparkles className="w-6 h-6 animate-spin text-[#6BAA83]" />
          <div className="text-sm">Loading Comparative Matrix...</div>
        </div>
      }
    >
      <CompareMatrix initialHerbs={herbs} />
    </Suspense>
  );
}
