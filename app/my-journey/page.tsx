import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import {
  getUserCompanions,
  getUserSessions,
} from "@/lib/actions/companions.action";
import Image from "next/image";
import CompanionsList from "@/components/CompanionsList";
import { ProfileStyles } from './ProfileClient'

function getLevel(sessions: number) {
  if (sessions >= 50) return { level: 10, title: "Grand Sage",  color: "#f59e0b", glow: "#f59e0b40" };
  if (sessions >= 35) return { level: 8,  title: "Strategist", color: "#8b5cf6", glow: "#8b5cf640" };
  if (sessions >= 25) return { level: 6,  title: "Explorer",   color: "#06b6d4", glow: "#06b6d440" };
  if (sessions >= 10) return { level: 4,  title: "Apprentice", color: "#22c55e", glow: "#22c55e40" };
  if (sessions >= 5)  return { level: 3,  title: "Learner",    color: "#3b82f6", glow: "#3b82f640" };
  if (sessions >= 1)  return { level: 2,  title: "Newcomer",   color: "#fe5933", glow: "#fe593340" };
  return                     { level: 1,  title: "Rookie",     color: "#94a3b8", glow: "#94a3b840" };
}

function getAIQuip(sessions: number, companions: number, name: string) {
  const quips = [
    `${name}, your curiosity is literally making you smarter. Keep going.`,
    `${sessions} sessions in — the average learner quits at 3. You're not average.`,
    `You've built ${companions} companion${companions !== 1 ? "s" : ""}. ${companions === 0 ? "That's about to change." : "That's a solid roster."}`,
    `${sessions * 8} minutes of focused learning. That's not nothing.`,
    `The AI has noted your dedication. You're on the good list.`,
  ];
  return quips[sessions % quips.length];
}

function getProgressToNext(sessions: number) {
  if (sessions >= 50) return { current: sessions, next: 50, label: "MAX LEVEL" };
  if (sessions >= 35) return { current: sessions - 35, next: 15, label: "to Grand Sage" };
  if (sessions >= 25) return { current: sessions - 25, next: 10, label: "to Strategist" };
  if (sessions >= 10) return { current: sessions - 10, next: 15, label: "to Explorer" };
  if (sessions >= 5)  return { current: sessions - 5,  next: 5,  label: "to Apprentice" };
  if (sessions >= 1)  return { current: sessions - 1,  next: 4,  label: "to Learner" };
  return                     { current: sessions,       next: 1,  label: "to Newcomer" };
}

const STATS = (sessionCount: number, companionCount: number) => [
  {
    value: sessionCount,
    label: "Sessions",
    sublabel: "Completed",
    icon: "✦",
    accent: "#fe5933",
  },
  {
    value: companionCount,
    label: "Companions",
    sublabel: "Built",
    icon: "⬡",
    accent: "#f59e0b",
  },
  {
    value: `${sessionCount * 8}`,
    label: "Minutes",
    sublabel: "Learned",
    icon: "◎",
    accent: "#22c55e",
  },
  {
    value: `${Math.max(1, Math.round(sessionCount / Math.max(companionCount, 1)))}x`,
    label: "Avg Sessions",
    sublabel: "Per Companion",
    icon: "◈",
    accent: "#8b5cf6",
  },
];

const Profile = async () => {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  let companions: Companion[] = [];
  let sessionHistory: Companion[] = [];

  try { companions    = (await getUserCompanions(user.id)) ?? []; } catch { companions = []; }
  try { sessionHistory = (await getUserSessions(user.id))  ?? []; } catch { sessionHistory = []; }

  const sessionCount   = sessionHistory.length;
  const companionCount = companions.length;
  const { level, title, color, glow } = getLevel(sessionCount);
  const quip = getAIQuip(sessionCount, companionCount, user.firstName ?? "Learner");
  const { current, next, label } = getProgressToNext(sessionCount);
  const progressPct = Math.min((current / next) * 100, 100);
  const stats = STATS(sessionCount, companionCount);

  return (
    <main className="profile-root">
         <ProfileStyles />
      {/* ─── HERO HEADER ─── */}
      <section className="profile-hero">

        {/* Background decoration */}
        <div className="hero-bg-orb" style={{ background: `radial-gradient(ellipse 60% 80% at 0% 0%, ${glow}, transparent 70%)` }} />
        <div className="hero-bg-orb hero-bg-orb--right" style={{ background: `radial-gradient(ellipse 40% 60% at 100% 100%, ${color}18, transparent 70%)` }} />

        {/* Top row: avatar + identity */}
        <div className="hero-identity flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
          <div className="avatar-frame" style={{ boxShadow: `0 0 0 3px ${color}, 0 0 24px ${glow}` }}>
            <Image
              src={user.imageUrl}
              alt={user.firstName!}
              width={96}
              height={96}
              className="avatar-img"
            />
            {/* Level badge overlaid */}
            <span className="avatar-level-badge" style={{ background: color }}>
              {level}
            </span>
          </div>

          <div className="identity-text text-center sm:text-left w-full">
            <div className="identity-top flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
              <h1 className="identity-name">
                {user.firstName} {user.lastName}
              </h1>
              <span className="rank-chip" style={{ background: `${color}18`, color, borderColor: `${color}40` }}>
                ◆ {title}
              </span>
            </div>
            <p className="identity-email">{user.emailAddresses[0].emailAddress}</p>

            {/* XP Progress bar */}
            <div className="xp-wrap">
              <div className="xp-bar-track">
                <div
                  className="xp-bar-fill"
                  style={{
                    width: `${progressPct}%`,
                    background: `linear-gradient(90deg, ${color}cc, ${color})`,
                    boxShadow: `0 0 8px ${glow}`,
                  }}
                />
              </div>
              <span className="xp-label" style={{ color }}>
                {label === "MAX LEVEL" ? "⬟ MAX" : `${current}/${next} ${label}`}
              </span>
            </div>
          </div>
        </div>

        {/* Stats grid */}
        <div className="stats-grid grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-6">
          {stats.map((s) => (
            <div key={s.label} className="stat-card" style={{ "--accent": s.accent } as React.CSSProperties}>
              <span className="stat-icon" style={{ color: s.accent }}>{s.icon}</span>
              <span className="stat-value">{s.value}</span>
              <span className="stat-label">{s.label}</span>
              <span className="stat-sublabel">{s.sublabel}</span>
              <div className="stat-card-glow" style={{ background: `${s.accent}10` }} />
            </div>
          ))}
        </div>

        {/* AI quip */}
        <div className="quip-bar flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 mt-4">
          <span className="quip-icon">🤖</span>
          <p className="quip-text">{quip}</p>
          <span className="quip-tag" style={{ color, borderColor: `${color}40` }}>AI Insight</span>
        </div>
      </section>

      {/* ─── ACCORDION SECTIONS ─── */}
      <div className="accordion-wrap px-4 sm:px-6 lg:px-0 mt-6">
        <Accordion type="multiple" defaultValue={["recent"]}>

          <AccordionItem value="recent" className="accordion-item">
            <AccordionTrigger className="accordion-trigger">
              <div className="accordion-trigger-inner">
                <span className="accordion-dot" style={{ background: "#fe5933" }} />
                <span className="accordion-title">Recent Sessions</span>
                <span className="accordion-count">{sessionCount}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="accordion-content">
              {sessionHistory.length > 0 ? (
                <CompanionsList title="Recent Sessions" companions={sessionHistory} />
              ) : (
                <div className="empty-state">
                  <span className="empty-icon">◎</span>
                  <p>No sessions yet — go start one!</p>
                </div>
              )}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="companions" className="accordion-item">
            <AccordionTrigger className="accordion-trigger">
              <div className="accordion-trigger-inner">
                <span className="accordion-dot" style={{ background: "#f59e0b" }} />
                <span className="accordion-title">My Companions</span>
                <span className="accordion-count">{companionCount}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="accordion-content">
              {companions.length > 0 ? (
                <CompanionsList title="My Companions" companions={companions} />
              ) : (
                <div className="empty-state">
                  <span className="empty-icon">⬡</span>
                  <p>No companions built yet — create your first one!</p>
                </div>
              )}
            </AccordionContent>
          </AccordionItem>

        </Accordion>
      </div>

     
    </main>
  );
};

export default Profile;