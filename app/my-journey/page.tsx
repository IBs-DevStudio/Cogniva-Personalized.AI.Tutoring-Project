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

function getLevel(sessions: number) {
  if (sessions >= 50) return { level: 10, title: "Grand Sage" };
  if (sessions >= 35) return { level: 8,  title: "Strategist" };
  if (sessions >= 25) return { level: 6,  title: "Explorer" };
  if (sessions >= 10) return { level: 4,  title: "Apprentice" };
  if (sessions >= 5)  return { level: 3,  title: "Learner" };
  if (sessions >= 1)  return { level: 2,  title: "Newcomer" };
  return                     { level: 1,  title: "Rookie" };
}

function getAIQuip(sessions: number, companions: number, name: string) {
  const quips = [
    `${name}, your curiosity is literally making you smarter. Keep going.`,
    `${sessions} sessions in — the average learner quits at 3. You're not average.`,
    `You've built ${companions} companion${companions !== 1 ? "s" : ""}. That's ${companions === 0 ? "about to change." : "a solid roster."}`,
    `${sessions * 8} minutes of focused learning. That's not nothing.`,
    `The AI has noted your dedication. You're on the good list.`,
  ];
  return quips[sessions % quips.length];
}

const Profile = async () => {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  let companions: Companion[] = [];
  let sessionHistory: Companion[] = [];

  try {
    companions = (await getUserCompanions(user.id)) ?? [];
  } catch { companions = []; }

  try {
    sessionHistory = (await getUserSessions(user.id)) ?? [];
  } catch { sessionHistory = []; }

  const sessionCount   = sessionHistory.length;
  const companionCount = companions.length;
  const { level, title } = getLevel(sessionCount);
  const quip = getAIQuip(sessionCount, companionCount, user.firstName ?? "Learner");

  return (
    <main className="min-lg:w-3/4">

      {/* ── Profile Header ─────────────────────────────────────────── */}
      <section className="rounded-4xl border border-black bg-white px-8 py-8 flex flex-col gap-6">

        {/* Avatar + name */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <Image
            src={user.imageUrl}
            alt={user.firstName!}
            width={88}
            height={88}
            className="rounded-full border-2 border-black"
          />
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-3xl font-bold">
                {user.firstName} {user.lastName}
              </h1>
              <span className="bg-[#fe5933] text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
                Lvl {level} · {title}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              {user.emailAddresses[0].emailAddress}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { value: sessionCount,           label: "Sessions Completed", icon: "/icons/check.svg"  },
            { value: companionCount,         label: "Companions Built",   icon: "/icons/cap.svg"    },
            { value: `Lvl ${level}`,         label: "Current Rank",       icon: "/icons/star.png"   },
            { value: `${sessionCount * 8}m`, label: "Mins Learned",       icon: "/icons/clock.svg"  },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-3xl border border-black px-5 py-4 flex flex-col gap-1"
            >
              <div className="flex items-center gap-2">
                <Image src={stat.icon} alt="" width={18} height={18} />
                <span className="text-2xl font-bold">{stat.value}</span>
              </div>
              <span className="text-xs text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* AI quip */}
        <div className="rounded-3xl border border-black/10 bg-[#f9f9f9] px-5 py-3 flex items-start gap-3">
          <span className="text-base mt-0.5">🤖</span>
          <p className="text-sm text-muted-foreground italic">{quip}</p>
        </div>
      </section>

      {/* ── Accordion ──────────────────────────────────────────────── */}
      <Accordion type="multiple">
        <AccordionItem value="recent">
          <AccordionTrigger className="text-2xl font-bold">
            Recent Sessions
            <span className="ml-2 text-sm font-normal text-muted-foreground">({sessionCount})</span>
          </AccordionTrigger>
          <AccordionContent>
            {sessionHistory.length > 0 ? (
              <CompanionsList title="Recent Sessions" companions={sessionHistory} />
            ) : (
              <p className="text-muted-foreground text-sm py-4">No sessions yet — go start one!</p>
            )}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="companions">
          <AccordionTrigger className="text-2xl font-bold">
            My Companions
            <span className="ml-2 text-sm font-normal text-muted-foreground">({companionCount})</span>
          </AccordionTrigger>
          <AccordionContent>
            {companions.length > 0 ? (
              <CompanionsList title="My Companions" companions={companions} />
            ) : (
              <p className="text-muted-foreground text-sm py-4">No companions built yet — create your first one!</p>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </main>
  );
};

export default Profile;