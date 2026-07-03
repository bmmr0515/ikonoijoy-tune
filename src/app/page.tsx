import React from 'react';
import AppHeader from '../components/AppHeader';
import HeroSection from '../components/HeroSection';
import LegalFooter from '../components/LegalFooter';
import BottomNavigation from '../components/BottomNavigation';

export default function Home() {
  return (
    <>
      {/* Header */}
      <AppHeader showBack={false} />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col justify-between overflow-y-auto pb-16 lg:pb-6 lg:min-h-[calc(100vh-65px)]">
        <HeroSection />
        <LegalFooter />
      </main>

      {/* Navigation */}
      <BottomNavigation />
    </>
  );
}
