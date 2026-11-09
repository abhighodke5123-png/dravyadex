import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getDravyaBySlug, getRelatedDravyas, getAllDravyas } from '@/lib/database/repository';
import { DravyaDetailsView } from '@/components/dravya/DravyaDetailsView';

export async function generateStaticParams() {
  const dravyas = getAllDravyas();
  // Pre-render benchmark medicinal plants
  return dravyas.slice(0, 30).map(d => ({
    slug: d.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const dravya = getDravyaBySlug(slug);

  if (!dravya) {
    return {
      title: 'Dravya Not Found — DRAVYADEX',
    };
  }

  return {
    title: `${dravya.canonical_name} (${dravya.botanical_name}) — Dravyaguna Monograph | DRAVYADEX`,
    description: `Complete Ayurvedic pharmacology monograph for ${dravya.canonical_name} (${dravya.botanical_name}). Classical Rasa, Guna, Virya, Vipaka, Prabhava, Dosha Karma, and research citations.`,
  };
}

export default async function DravyaDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dravya = getDravyaBySlug(slug);

  if (!dravya) {
    notFound();
  }

  const related = getRelatedDravyas(dravya, 4);

  return <DravyaDetailsView dravya={dravya} relatedDravyas={related} />;
}
