'use client';

import { useEffect, useState } from 'react';
import CompanionCard from "@/components/CompanionCard";
import CompanionsList from "@/components/CompanionsList";
import CTA from "@/components/CTA";
// import { DashboardWelcomeCarousel } from "@/components/DashboardWelcomeCarousel";
import DashboardWelcomeCarousel from "@/components/DashboardWelcomeCarousel";
import {recentSessions} from "@/constants";
import {getAllCompanions, getRecentSessions} from "@/lib/actions/companions.action";
import {getSubjectColor} from "@/lib/utils";


const HomePage = () => {
    const [companions, setCompanions] = useState<Companion[]>([]);
    const [recentSessionsCompanions, setRecentSessionsCompanions] = useState<Companion[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch featured companions
                const fetchedCompanions = await getAllCompanions({ limit: 3 });
                if (!fetchedCompanions || fetchedCompanions.length === 0) {
                    setCompanions(recentSessions.slice(0, 3));
                } else {
                    setCompanions(fetchedCompanions);
                }
            } catch (error) {
                console.warn('Failed to fetch featured companions, using mock data:', error);
                setCompanions(recentSessions.slice(0, 3));
            }

            try {
                // Fetch recent sessions
                const fetchedRecentSessions = await getRecentSessions(10);
                if (!fetchedRecentSessions || fetchedRecentSessions.length === 0) {
                    setRecentSessionsCompanions([]);
                } else {
                    setRecentSessionsCompanions(fetchedRecentSessions);
                }
            } catch (error) {
                console.warn('Failed to fetch recent sessions from database:', error);
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
            <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading your dashboard...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main>
      {/* Dashboard Welcome Carousel */}
      <DashboardWelcomeCarousel/>
      
      <h1>Featured Companions</h1>

        <section className="home-section">
            {companions.map((companion) => (
                <CompanionCard
                    key={companion.id}
                    {...companion}
                    color={getSubjectColor(companion.subject)}
                />
            ))}

        </section>
        <section className="home-section">
            {recentSessionsCompanions.length > 0 ? (
                <CompanionsList
                    title="Recently completed sessions"
                    companions={recentSessionsCompanions}
                    classNames="w-2/3 max-lg:w-full"
                />
            ) : (
                <div className="w-2/3 max-lg:w-full">
                    <h2 className="font-bold text-3xl mb-4">Recently completed sessions</h2>
                    <div className="bg-gray-50 rounded-lg p-8 text-center">
                        <p className="text-gray-600">
                            No sessions completed yet. Start a session with any companion to see your history here!
                        </p>
                    </div>
                </div>
            )}
            <CTA />
        </section>
    </main>
  )
}

export default HomePage
