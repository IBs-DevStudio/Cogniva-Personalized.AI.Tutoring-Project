import {
  getAllCompanions,
  getCompanionCredits,
} from "@/lib/actions/companions.action";
import CompanionCard from "@/components/CompanionCard";
import { getSubjectColor } from "@/lib/utils";
import SearchInput from "@/components/SearchInputs";
import SubjectFilter from "@/components/SubjectFilter";
import Link from "next/link";
import { recentSessions } from "@/constants";
import CompanionCreditBadge from "@/components/CompanionCreditBadge";

const CompanionsLibrary = async ({ searchParams }: SearchParams) => {
  const filters = await searchParams;
  const subject = filters.subject ? filters.subject : "";
  const topic = filters.topic ? filters.topic : "";

  let companions;
  let credits = { used: 0, limit: 3, canCreate: true };

  try {
    credits = await getCompanionCredits();
  } catch {
    // fall back to defaults
  }

  try {
    companions = await getAllCompanions({ subject, topic });
    // Only show actual database companions, no fallback to mock data
    if (!companions) {
      companions = [];
    }
  } catch (error) {
    console.warn("Failed to fetch companions from database:", error);
    companions = [];
  }

  return (
    <main>
      <section className="flex flex-col sm:flex-row sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold shrink-0">Companion Library</h1>
        <div className="flex items-center gap-3 flex-wrap">
          <CompanionCreditBadge used={credits.used} limit={credits.limit} />
          <SearchInput />
          <SubjectFilter />
        </div>
      </section>
      <section className="companions-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {companions.length > 0 ? (
          companions.map((companion) => (
            <CompanionCard
              key={companion.id}
              {...companion}
              color={getSubjectColor(companion.subject)}
            />
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-12 text-center px-4">
            <div className="bg-gray-100 rounded-lg p-6 sm:p-8 w-full max-w-md">
              <h3 className="text-xl font-semibold mb-4">No Companions Yet</h3>
              <p className="text-gray-600 mb-6">
                You haven't created any companions yet. Create your first AI
                tutor to get started!
              </p>
              <Link
                href={credits.canCreate ? "/companions/new" : "/subscription"}
                className="btn-primary inline-block"
              >
                {credits.canCreate
                  ? "Create Your First Companion"
                  : "Upgrade to Create Companions"}
              </Link>
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

export default CompanionsLibrary;
