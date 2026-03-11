"use client";
// import { removeBookmark } from "@/lib/actions/companion.actions";
// import { addBookmark } from "@/lib/actions/companion.actions";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { formatSubjectName, getSubjectColor } from "@/lib/utils";
import CompanionLaunchOverlay from "@/components/CompanionLaunchOverlay";

interface CompanionCardProps {
  id: string;
  name: string;
  topic: string;
  subject: string;
  duration: number;
  color?: string; // Make color optional since we'll calculate it
  
}

const CompanionCard = ({
  id,
  name,
  topic,
  subject,
  duration,
  color,
}: CompanionCardProps) => {
  const router = useRouter();
  const [isLaunching, setIsLaunching] = useState(false);

  const cardBackgroundColor = color || getSubjectColor(subject);

  const handleLaunch = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isLaunching) return;
    setIsLaunching(true);
    setTimeout(() => {
      router.push(`/companions/${id}`);
    }, 900);
  };

  return (
    <>
      {isLaunching && (
        <CompanionLaunchOverlay
          label="Opening your session..."
          subLabel="Loading your AI tutor."
        />
      )}
      <article className="companion-card" style={{ backgroundColor: cardBackgroundColor }}>
      <div className="flex justify-between items-center">
        <div className="subject-badge">{formatSubjectName(subject)}</div>
        <button className="companion-bookmark" >
          <Image
            src={
               "/icons/bookmark.svg"
            }
            alt="bookmark"
            width={12.5}
            height={15}
          />
        </button>
      </div>

      <h2 className="text-2xl font-bold">{name}</h2>
      <p className="text-sm">{topic}</p>
      <div className="flex items-center gap-2">
        <Image
          src="/icons/clock.svg"
          alt="duration"
          width={13.5}
          height={13.5}
        />
        <p className="text-sm">{duration} minutes</p>
      </div>

      <button
        onClick={handleLaunch}
        className="btn-primary w-full justify-center mt-2"
      >
        Launch Lesson
      </button>
    </article>
    </>
  );
};

export default CompanionCard;