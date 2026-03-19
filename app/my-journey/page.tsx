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

// ── Gamification helpers ──────────────────────────────────────────────────────

function getLevel(sessions: number) {
  if (sessions >= 100) return { level: 10, title: "Grand Sage", next: Infinity };
  if (sessions >= 75)  return { level: 9,  title: "Archmage",   next: 100 };
  if (sessions >= 50)  return { level: 8,  title: "Strategist", next: 75 };
  if (sessions >= 35)  return { level: 7,  title: "Scholar",    next: 50 };
  if (sessions >= 25)  return { level: 6,  title: "Analyst",    next: 35 };
  if (sessions >= 15)  return { level: 5,  title: "Explorer",   next: 25 };
  if (sessions >= 10)  return { level: 4,  title: "Apprentice", next: 15 };
  if (sessions >= 5)   return { level: 3,  title: "Learner",    next: 10 };
  if (sessions >= 2)   return { level: 2,  title: "Newcomer",   next: 5  };
  return                      { level: 1,  title: "Rookie",     next: 2  };
}

function getXP(sessions: number) {
  return sessions * 120 + Math.floor(sessions / 5) * 250;
}

function getStreak(sessions: number) {
  // Deterministic fake streak derived from session count
  return Math.min(sessions, 7 + (sessions % 8));
}

function getAIQuip(sessions: number, companions: number, firstName: string) {
  const quips = [
    `${firstName}, your curiosity is literally training me to be better. Keep going.`,
    `${sessions} sessions in — the average learner quits at 3. You're not average.`,
    `You've built ${companions} companion${companions !== 1 ? "s" : ""}. Some people never even build one.`,
    `The AI overlords have noted your dedication. You're on the good list.`,
    `Fun fact: ${sessions * 8} minutes of focused learning. That's not nothing.`,
    `Your learning streak is showing. The neurons are firing. I can tell.`,
  ];
  return quips[sessions % quips.length];
}

function getBadges(sessions: number, companions: number) {
  const badges = [];
  if (sessions >= 1)   badges.push({ icon: "🚀", label: "First Flight",    desc: "Completed your first session" });
  if (sessions >= 5)   badges.push({ icon: "🔥", label: "On Fire",         desc: "5 sessions completed" });
  if (sessions >= 10)  badges.push({ icon: "⚡", label: "Electric",        desc: "10 sessions — momentum unlocked" });
  if (sessions >= 25)  badges.push({ icon: "🧠", label: "Big Brain",       desc: "25 sessions — you're actually serious" });
  if (companions >= 1) badges.push({ icon: "🛠️", label: "Maker",           desc: "Built your first companion" });
  if (companions >= 3) badges.push({ icon: "🎭", label: "Collector",       desc: "3 companions in the roster" });
  if (sessions === 0 && companions === 0)
                       badges.push({ icon: "👁️", label: "The Observer",   desc: "Watching. Waiting. Almost ready." });
  return badges;
}

// ── Component ─────────────────────────────────────────────────────────────────

const Profile = async () => {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  let companions: Companion[] = [];
  let sessionHistory: Companion[] = [];

  try {
    const fetched = await getUserCompanions(user.id);
    companions = fetched ?? [];
  } catch { companions = []; }

  try {
    const fetched = await getUserSessions(user.id);
    sessionHistory = fetched ?? [];
  } catch { sessionHistory = []; }

  const sessionCount  = sessionHistory.length;
  const companionCount = companions.length;
  const { level, title, next } = getLevel(sessionCount);
  const xp            = getXP(sessionCount);
  const streak        = getStreak(sessionCount);
  const progressPct   = next === Infinity ? 100 : Math.min(100, Math.round((sessionCount / next) * 100));
  const quip          = getAIQuip(sessionCount, companionCount, user.firstName ?? "Learner");
  const badges        = getBadges(sessionCount, companionCount);

  return (
    <main className="min-lg:w-3/4">

      {/* ── Hero Banner ──────────────────────────────────────────────────── */}
      <section className="relative rounded-4xl overflow-hidden bg-[#1a1a1a] text-white mb-2">
        {/* Background grid texture */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(#fe5933 1px, transparent 1px), linear-gradient(90deg, #fe5933 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        {/* Orange glow */}
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-[#fe5933] opacity-20 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center gap-6 px-8 py-8">

          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <div className="rounded-full p-1 bg-gradient-to-br from-[#fe5933] to-[#fccc41]">
              <Image
                src={user.imageUrl}
                alt={user.firstName!}
                width={96}
                height={96}
                className="rounded-full object-cover"
              />
            </div>
            {/* Level bubble */}
            <div className="absolute -bottom-2 -right-2 bg-[#fe5933] text-white text-xs font-bold rounded-full w-8 h-8 flex items-center justify-center border-2 border-[#1a1a1a]">
              {level}
            </div>
          </div>

          {/* Name + title */}
          <div className="flex flex-col gap-1 flex-grow">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">
                {user.firstName} {user.lastName}
              </h1>
              <span className="bg-[#fccc41] text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                {title}
              </span>
            </div>
            <p className="text-sm text-white/50">{user.emailAddresses[0].emailAddress}</p>

            {/* XP Bar */}
            <div className="mt-3 max-w-sm">
              <div className="flex justify-between text-xs text-white/60 mb-1">
                <span>{xp.toLocaleString()} XP</span>
                {next !== Infinity && (
                  <span>{sessionCount}/{next} sessions → Lvl {level + 1}</span>
                )}
                {next === Infinity && <span>MAX LEVEL 🏆</span>}
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#fe5933] to-[#fccc41] rounded-full transition-all duration-700"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div className="flex gap-3 flex-shrink-0 flex-wrap lg:flex-nowrap">
            {[
              { value: sessionCount, label: "Sessions",   icon: "✅" },
              { value: companionCount, label: "Companions", icon: "🤖" },
              { value: streak,       label: "Day Streak",  icon: "🔥" },
              { value: `Lvl ${level}`, label: "Rank",     icon: "⭐" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3 flex flex-col items-center gap-0.5 min-w-[80px]"
              >
                <span className="text-lg">{stat.icon}</span>
                <span className="text-xl font-bold">{stat.value}</span>
                <span className="text-xs text-white/50 whitespace-nowrap">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* AI Quip bar */}
        <div className="relative z-10 border-t border-white/10 px-8 py-3 flex items-center gap-3">
          <span className="text-lg">🤖</span>
          <p className="text-sm text-white/70 italic">{quip}</p>
        </div>
      </section>

      {/* ── Badges ───────────────────────────────────────────────────────── */}
      <section className="rounded-4xl border border-black bg-white px-7 py-6 flex flex-col gap-4">
        <h2 className="font-bold text-xl">Achievements</h2>
        <div className="flex flex-wrap gap-3">
          {badges.map((b) => (
            <div
              key={b.label}
              className="flex items-center gap-2 border border-black rounded-2xl px-4 py-2 hover:bg-black hover:text-white transition-colors duration-200 cursor-default group"
              title={b.desc}
            >
              <span className="text-xl">{b.icon}</span>
              <div>
                <p className="text-sm font-bold leading-none">{b.label}</p>
                <p className="text-xs text-muted-foreground group-hover:text-white/70 leading-none mt-0.5">{b.desc}</p>
              </div>
            </div>
          ))}
          {/* Locked badge teaser */}
          <div className="flex items-center gap-2 border border-dashed border-black/30 rounded-2xl px-4 py-2 opacity-40 cursor-default">
            <span className="text-xl">🔒</span>
            <div>
              <p className="text-sm font-bold leading-none">???</p>
              <p className="text-xs text-muted-foreground leading-none mt-0.5">Keep going to unlock</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Accordion History ────────────────────────────────────────────── */}
      <Accordion type="multiple" className="flex flex-col gap-3 mt-2">
        <AccordionItem
          value="recent"
          className="rounded-4xl border border-black bg-white px-7 overflow-hidden"
        >
          <AccordionTrigger className="text-xl font-bold py-5 hover:no-underline">
            <span className="flex items-center gap-2">
              🕐 Recent Sessions
              <span className="bg-black text-white text-xs rounded-full px-2 py-0.5">{sessionCount}</span>
            </span>
          </AccordionTrigger>
          <AccordionContent>
            {sessionHistory.length > 0 ? (
              <CompanionsList title="Recent Sessions" companions={sessionHistory} />
            ) : (
              <p className="text-muted-foreground text-sm pb-5">No sessions yet — go start one!</p>
            )}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="companions"
          className="rounded-4xl border border-black bg-white px-7 overflow-hidden"
        >
          <AccordionTrigger className="text-xl font-bold py-5 hover:no-underline">
            <span className="flex items-center gap-2">
              🤖 My Companions
              <span className="bg-black text-white text-xs rounded-full px-2 py-0.5">{companionCount}</span>
            </span>
          </AccordionTrigger>
          <AccordionContent>
            {companions.length > 0 ? (
              <CompanionsList title="My Companions" companions={companions} />
            ) : (
              <p className="text-muted-foreground text-sm pb-5">No companions built yet — create your first one!</p>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </main>
  );
};

export default Profile;