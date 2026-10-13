import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import {
  ArtworkLeaf,
  ArtworkPulse,
  ArtworkWater,
  ArtworkFolder,
  ArtworkSoundwaves,
  ArtworkScanner,
} from './ServiceCardArtworks';
import { SpeechReader } from '@/components/common/SpeechReader';

interface ServiceCardItem {
  id: string;
  title: string;
  description: string;
  artwork: React.ReactNode;
  route: string;
  accentColor: string;
  badge: string;
}

export const ServiceCardsExperienceC: React.FC<{ onOpenVoiceModal?: () => void }> = ({ onOpenVoiceModal }) => {
  const services: ServiceCardItem[] = [
    {
      id: 'awareness',
      title: 'Health Awareness',
      description: 'Explore evidence-informed preventive care insights, nutritional principles, and baseline hygiene protocols.',
      artwork: <ArtworkLeaf />,
      route: '/wellness',
      accentColor: 'border-mint-200 hover:border-emerald-500/40',
      badge: 'Preventive Care',
    },
    {
      id: 'symptoms',
      title: 'Symptom Information',
      description: 'Educational symptom encyclopedia with vital distinction between self-care observations and urgent red flags.',
      artwork: <ArtworkPulse />,
      route: '/symptoms',
      accentColor: 'border-emerald-500/20 hover:border-teal-700/50',
      badge: 'Educational Guide',
    },
    {
      id: 'daily-wellness',
      title: 'Daily Wellness',
      description: 'Interactive routines for hydration, restful sleep hygiene, and daily physical movement tracking.',
      artwork: <ArtworkWater />,
      route: '/wellness',
      accentColor: 'border-teal-700/20 hover:border-emerald-400',
      badge: 'Daily Routines',
    },
    {
      id: 'health-records',
      title: 'Personal Health Records',
      description: 'Private personal health note ledger secured with database Row Level Security and categorization.',
      artwork: <ArtworkFolder />,
      route: '/dashboard/notes',
      accentColor: 'border-navy-800/15 hover:border-teal-800',
      badge: 'RLS Secured',
    },
    {
      id: 'voice-accessibility',
      title: 'Voice Accessibility',
      description: 'Integrated Web Speech audio narration and microphone dictation for hands-free inclusivity.',
      artwork: <ArtworkSoundwaves />,
      route: '#voice-modal',
      accentColor: 'border-lavender-400/30 hover:border-lavender-500',
      badge: 'Assistive Tech',
    },
    {
      id: 'medical-reports',
      title: 'Medical Report Vault',
      description: 'Organize and safely view your private laboratory panels and prescriptions in private cloud storage.',
      artwork: <ArtworkScanner />,
      route: '/dashboard/reports',
      accentColor: 'border-emerald-500/30 hover:border-emerald-600',
      badge: 'Encrypted Vault',
    },
  ];

  return (
    <section id="services" className="py-24 bg-canvas relative overflow-hidden" aria-labelledby="services-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-teal-800/5 border border-teal-800/15 text-teal-800">
            <span>Living Wellness Services</span>
          </div>
          <h2 id="services-heading" className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-800 tracking-tight font-display">
            Six Pillars of <span className="text-gradient-teal">Personal Care</span>
          </h2>
          <p className="text-base text-navy-700/80 leading-relaxed">
            Crafted with custom SVG visual identities, accessible interfaces, and zero fabricated medical metrics.
          </p>
        </div>

        {/* 6 Illustrated Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((item, index) => {
            const isVoiceCard = item.id === 'voice-accessibility';

            const cardContent = (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className={`group relative h-full bg-white/80 backdrop-blur-md rounded-3xl p-7 border transition-all duration-300 shadow-card hover:shadow-glass-hover flex flex-col justify-between ${item.accentColor}`}
              >
                <div>
                  {/* Top Bar: Artwork + Badge + Audio Reader */}
                  <div className="flex items-start justify-between gap-4 mb-6">
                    {item.artwork}
                    <div className="flex flex-col items-end gap-2">
                      <span className="text-[11px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-canvas border border-teal-800/10 text-teal-800">
                        {item.badge}
                      </span>
                      <SpeechReader
                        textToRead={`${item.title}. ${item.description}`}
                        label="Listen"
                        compact
                      />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-navy-800 group-hover:text-teal-800 transition-colors duration-200">
                    {item.title}
                  </h3>
                  <p className="text-sm text-navy-600/80 mt-2.5 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Footer Action link */}
                <div className="pt-6 mt-6 border-t border-teal-800/10 flex items-center justify-between text-xs font-bold text-teal-800 group-hover:text-emerald-600 transition-colors">
                  <span>Explore Feature</span>
                  <div className="w-8 h-8 rounded-full bg-teal-50 group-hover:bg-emerald-500 group-hover:text-white flex items-center justify-center transition-all duration-200 shadow-sm">
                    <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </motion.div>
            );

            if (isVoiceCard && onOpenVoiceModal) {
              return (
                <div
                  key={item.id}
                  onClick={onOpenVoiceModal}
                  className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-3xl"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onOpenVoiceModal();
                    }
                  }}
                  aria-label={`Open ${item.title}`}
                >
                  {cardContent}
                </div>
              );
            }

            return (
              <Link
                key={item.id}
                to={item.route}
                className="focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-3xl block h-full"
                aria-label={`Navigate to ${item.title}`}
              >
                {cardContent}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
