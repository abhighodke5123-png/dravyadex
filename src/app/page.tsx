import React from 'react';
import { BotanicalHero3D } from '@/components/hero/BotanicalHero3D';
import { HeroContent } from '@/components/hero/HeroContent';
import { DiscoverySection } from '@/components/home/DiscoverySection';
import { FeaturedDravyas } from '@/components/home/FeaturedDravyas';
import { DravyagunaExploration } from '@/components/home/DravyagunaExploration';
import { KnowledgeSourcesSection } from '@/components/home/KnowledgeSourcesSection';
import { FinalCtaSection } from '@/components/home/FinalCtaSection';
import { getFeaturedDravyas } from '@/lib/database/repository';

export default function HomePage() {
  const featured = getFeaturedDravyas(6);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Cinematic Full-screen Botanical Hero */}
      <section className="relative min-h-[90vh] flex flex-col justify-center items-center overflow-hidden bg-[#07090C]">
        <BotanicalHero3D />
        <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none">
          <div className="pointer-events-auto">
            <HeroContent />
          </div>
        </div>
      </section>

      {/* Multilingual Discovery Search Section */}
      <DiscoverySection />

      {/* Canonical Featured Dravyas */}
      <FeaturedDravyas dravyas={featured} />

      {/* Interactive Dravyaguna Exploration System */}
      <DravyagunaExploration />

      {/* 4 Pillars of Evidence Architecture */}
      <KnowledgeSourcesSection />

      {/* Closing Call to Action */}
      <FinalCtaSection />
    </div>
  );
}
