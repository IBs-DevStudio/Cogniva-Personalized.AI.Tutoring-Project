'use client';

import { useEffect, useState } from 'react';
import CompanionCard from "@/components/CompanionCard";
import CompanionsList from "@/components/CompanionsList";
import CTA from "@/components/CTA";
import DashboardWelcomeCarousel from "@/components/DashboardWelcomeCarousel";
import { recentSessions } from "@/constants";
import { getAllCompanions, getRecentSessions, getCompanionCredits } from "@/lib/actions/companions.action";
import { getSubjectColor } from "@/lib/utils";
import CompanionCreditBadge from "@/components/CompanionCreditBadge";


const HomePage = () => {
  const [companions, setCompanions] = useState<Companion[]>([]);
  const [recentSessionsCompanions, setRecentSessionsCompanions] = useState<Companion[]>([]);
  const [credits, setCredits] = useState<{ used: number; limit: number; canCreate: boolean }>({ used: 0, limit: 3, canCreate: true });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedCompanions = await getAllCompanions({ limit: 3 });
        setCompanions(fetchedCompanions?.length ? fetchedCompanions : recentSessions.slice(0, 3));
      } catch {
        setCompanions(recentSessions.slice(0, 3));
      }

      try {
        const fetchedCredits = await getCompanionCredits();
        setCredits(fetchedCredits);
      } catch {
        // fall back to defaults
      }

      try {
        const fetchedRecentSessions = await getRecentSessions(10);
        setRecentSessionsCompanions(fetchedRecentSessions?.length ? fetchedRecentSessions : []);
      } catch {
        setRecentSessionsCompanions([]);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <main>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading your dashboard...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main>
      <DashboardWelcomeCarousel />

      <div className="flex items-start justify-between mb-6">
        <h1 className="text-3xl font-bold">Featured Companions</h1>
        {credits.limit !== Infinity && (
          <CompanionCreditBadge used={credits.used} limit={credits.limit} />
        )}
      </div>

      <section className="home-section">
        {companions.map((companion) => (
          <CompanionCard
            key={companion.id}
            {...companion}
            color={getSubjectColor(companion.subject)}
          />
        ))}
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 items-start">
        <div>
          {recentSessionsCompanions.length > 0 ? (
            <CompanionsList
              title="Recently completed sessions"
              companions={recentSessionsCompanions}
              classNames="w-full"
            />
          ) : (
            <div className="w-full">
              <h2 className="font-bold text-3xl mb-4">Recently completed sessions</h2>
              <div className="bg-gray-50 rounded-lg p-8 text-center">
                <p className="text-gray-600">
                  No sessions completed yet. Start a session with any companion to see your history here!
                </p>
              </div>
            </div>
          )}
        </div>

        {/* CTA column — uses .cta-section class defined in globals.css */}
        <CTA canCreate={credits.canCreate} />
      </section>
    </main>
  );
};

export default HomePage;