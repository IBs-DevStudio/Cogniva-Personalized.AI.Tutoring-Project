'use client';

import Link from 'next/link';
import { Sparkles, Lock } from 'lucide-react';

interface CompanionCreditBadgeProps {
  used: number;
  limit: number;
}

const CompanionCreditBadge = ({ used, limit }: CompanionCreditBadgeProps) => {
  // Don't render for unlimited (pro) users
  if (!isFinite(limit)) return null;

  const isAtLimit = used >= limit;
  const isNearLimit = !isAtLimit && used >= limit - 1;
  const remaining = Math.max(limit - used, 0);

  const containerClass = [
    'inline-flex items-center gap-2.5 rounded-full border px-3.5 py-1.5 text-xs font-medium select-none',
    isAtLimit
      ? 'border-red-200 bg-red-50 text-red-700'
      : isNearLimit
      ? 'border-amber-200 bg-amber-50 text-amber-700'
      : 'border-primary/20 bg-primary/5 text-primary',
  ].join(' ');

  return (
    <div className={containerClass}>
      {/* Dot indicators */}
      <span className="flex items-center gap-1">
        {Array.from({ length: limit }).map((_, i) => (
          <span
            key={i}
            className={[
              'h-2 w-2 rounded-full transition-colors duration-300',
              i < used
                ? isAtLimit
                  ? 'bg-red-400'
                  : isNearLimit
                  ? 'bg-amber-400'
                  : 'bg-primary'
                : 'bg-gray-200',
            ].join(' ')}
          />
        ))}
      </span>

      {isAtLimit ? (
        <span className="flex items-center gap-1.5">
          <Lock className="h-3 w-3" />
          Limit reached —{' '}
          <Link
            href="/subscription"
            className="underline underline-offset-2 hover:opacity-80 transition-opacity"
          >
            Upgrade
          </Link>
        </span>
      ) : (
        <span className="flex items-center gap-1.5">
          {remaining} of {limit} companion{remaining !== 1 ? 's' : ''} remaining
          {!isNearLimit && <Sparkles className="h-3 w-3 opacity-60" />}
        </span>
      )}
    </div>
  );
};

export default CompanionCreditBadge;
