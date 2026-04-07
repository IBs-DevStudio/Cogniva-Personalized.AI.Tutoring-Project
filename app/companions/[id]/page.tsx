'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter, useParams } from 'next/navigation';
import { getCompanion } from "@/lib/actions/companions.action";
import { getSubjectColor } from "@/lib/utils";
import Image from "next/image";
import CompanionComponent from "@/components/CompanionComponent";
import AILearningFlashCard from "@/components/AILearningFlashCard";
import { recentSessions } from "@/constants";

const CompanionSession = () => {
    const params = useParams();
    const id = params.id as string;
    const { user, isLoaded } = useUser();
    const router = useRouter();
    type SessionCompanion = {
        id?: string;
        name: string;
        subject: string;
        topic: string;
        duration: number;
        author?: string;
        voice?: string;
        style?: string;
        [key: string]: unknown;
    };
    const [companion, setCompanion] = useState<SessionCompanion | null>(null);
    const [loading, setLoading] = useState(true);
    const [showAIFlashCard, setShowAIFlashCard] = useState(false);
    const [tutorialCompleted, setTutorialCompleted] = useState(false);

    useEffect(() => {
        if (!isLoaded) return;

        if (!user) {
            router.push('/sign-in');
            return;
        }

        const fetchCompanion = async () => {
            try {
                let fetchedCompanion = await getCompanion(id);

                // Verify the companion belongs to the current user
                if (fetchedCompanion && fetchedCompanion.author !== user.id) {
                    // User doesn't own this companion, check if it's a mock companion they can access
                    const mockCompanion = recentSessions.find(session => session.id === id);
                    if (!mockCompanion) {
                        router.push('/companions');
                        return;
                    }
                    fetchedCompanion = null; // Force to use mock data
                }

                // If no companion from database, use mock data
                if (!fetchedCompanion) {
                    fetchedCompanion = recentSessions.find(session => session.id === id);
                }

                // If still no companion found, redirect
                if (!fetchedCompanion) {
                    router.push('/companions');
                    return;
                }

                setCompanion(fetchedCompanion);

                // Always show AI flash card first when landing on companion page
                const hasSeenAIFlashCard = localStorage.getItem(`ai-flash-card-${id}`);
                if (!hasSeenAIFlashCard) {
                    // Show tutorial immediately without delay
                    setShowAIFlashCard(true);
                } else {
                    // If tutorial was seen before, skip directly to companion
                    setTutorialCompleted(true);
                }

            } catch (error) {
                console.error('Error fetching companion from database:', error);
                // Fallback to mock data
                const mockCompanion = recentSessions.find(session => session.id === id);
                if (mockCompanion) {
                    setCompanion(mockCompanion);
                } else {
                    router.push('/companions');
                    return;
                }
            } finally {
                setLoading(false);
            }
        };

        fetchCompanion();
    }, [id, user, isLoaded, router]);

    const handleCloseAIFlashCard = () => {
        setShowAIFlashCard(false);
        localStorage.setItem(`ai-flash-card-${id}`, 'seen');
        // Enable the companion interface after tutorial is completed
        setTutorialCompleted(true);
    };


    const handleShowTutorialAgain = () => {
        localStorage.removeItem(`ai-flash-card-${id}`);
        setShowAIFlashCard(true);
        setTutorialCompleted(false);
    };

    if (!isLoaded || loading) {
        return (
            <main>
                <div className="flex items-center justify-center min-h-[400px]">
                    <p className="text-muted-foreground">Loading your learning session...</p>
                </div>
            </main>
        );
    }

    if (!companion) {
        return null;
    }

    const { name, subject, topic, duration } = companion;
    return (
        <main>
            {/* AI Learning Flash Card */}
            <AILearningFlashCard
                show={showAIFlashCard}
                onClose={handleCloseAIFlashCard}
            />

            {/* Only show companion interface after tutorial is completed */}
            {tutorialCompleted && (
                <>
                    <article className="flex rounded-border justify-between p-6 max-md:flex-col">
                        <div className="flex items-center gap-2">
                            <div className="size-[72px] flex items-center justify-center rounded-lg max-md:hidden" style={{ backgroundColor: getSubjectColor(subject) }}>
                                <Image src={`/icons/${subject}.svg`} alt={subject} width={35} height={35} />
                            </div>

                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2">
                                    <p className="font-bold text-2xl">
                                        {name}
                                    </p>
                                    <div className="subject-badge max-sm:hidden">
                                        {subject}
                                    </div>
                                </div>
                                <p className="text-lg">{topic}</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-end gap-2 max-md:flex-row max-md:justify-between max-md:items-center">
                            <div className="text-2xl max-md:hidden">
                                {duration} minutes
                            </div>
                            <button
                                onClick={handleShowTutorialAgain}
                                className="text-sm text-primary hover:text-primary/80 underline transition-colors duration-200"
                            >
                                Show Tutorial Again
                            </button>
                        </div>
                    </article>

                    <CompanionComponent
                        {...companion}
                        companionId={id}
                        userName={user.firstName!}
                        userImage={user.imageUrl!}
                        voice={companion.voice ?? ""}
                        style={companion.style ?? ""}
                    />
                </>
            )}

            {/* Show message when tutorial hasn't been completed yet */}
            {!tutorialCompleted && !showAIFlashCard && (
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-cta-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl">🎓</span>
                        </div>
                        <h2 className="text-2xl font-bold text-foreground mb-2">Complete the Tutorial First</h2>
                        <p className="text-muted-foreground mb-6">
                            Please complete the AI learning tutorial to start your session with {name}
                        </p>
                        <button
                            onClick={handleShowTutorialAgain}
                            className="bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-primary/90 transition-colors duration-200"
                        >
                            Start Tutorial
                        </button>
                    </div>
                </div>
            )}
        </main>
    )
}

export default CompanionSession