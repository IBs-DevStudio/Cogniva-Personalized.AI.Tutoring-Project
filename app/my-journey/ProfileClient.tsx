// app/my-journey/ProfileClient.tsx
'use client'

export const ProfileStyles = () => (
  <style>{`

        /* ── Root ── */
        .profile-root {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          max-width: 900px;
          margin: 0 auto;
          padding: 1.5rem 1rem 3rem;
        }

        /* ── Hero ── */
        .profile-hero {
          position: relative;
          background: hsl(var(--card));
          border: 1.5px solid hsl(var(--border));
          border-radius: 1.75rem;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
          overflow: hidden;
        }

        .hero-bg-orb {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }
        .hero-bg-orb--right { z-index: 0; }

        /* ── Identity row ── */
        .hero-identity {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: flex-start;
          gap: 1.25rem;
          flex-wrap: wrap;
        }

        .avatar-frame {
          position: relative;
          width: 96px;
          height: 96px;
          border-radius: 50%;
          flex-shrink: 0;
          transition: box-shadow 0.3s;
        }
        .avatar-img {
          width: 96px;
          height: 96px;
          border-radius: 50%;
          object-fit: cover;
          display: block;
        }
        .avatar-level-badge {
          position: absolute;
          bottom: -4px;
          right: -4px;
          width: 26px;
          height: 26px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.65rem;
          font-weight: 900;
          color: white;
          border: 2px solid hsl(var(--card));
          letter-spacing: 0;
        }

        .identity-text {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          min-width: 200px;
        }
        .identity-top {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
        }
        .identity-name {
          font-size: 1.75rem;
          font-weight: 800;
          letter-spacing: -0.03em;
          color: hsl(var(--foreground));
          line-height: 1;
        }
        .rank-chip {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 3px 10px;
          border-radius: 999px;
          border: 1px solid;
        }
        .identity-email {
          font-size: 0.8rem;
          color: hsl(var(--muted-foreground));
        }

        /* XP bar */
        .xp-wrap {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          margin-top: 0.25rem;
        }
        .xp-bar-track {
          flex: 1;
          height: 5px;
          background: hsl(var(--border));
          border-radius: 999px;
          overflow: hidden;
          max-width: 200px;
        }
        .xp-bar-fill {
          height: 100%;
          border-radius: 999px;
          transition: width 1s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .xp-label {
          font-size: 0.68rem;
          font-weight: 700;
          white-space: nowrap;
          letter-spacing: 0.02em;
        }

        /* ── Stats grid ── */
        .stats-grid {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0.75rem;
        }
        @media (max-width: 640px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
        }

        .stat-card {
          position: relative;
          background: hsl(var(--background));
          border: 1.5px solid hsl(var(--border));
          border-radius: 1.1rem;
          padding: 1rem 0.875rem 0.875rem;
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
          overflow: hidden;
          transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s;
          cursor: default;
        }
        .stat-card:hover {
          border-color: var(--accent);
          transform: translateY(-3px);
          box-shadow: 0 8px 24px var(--accent)22;
        }
        .stat-card-glow {
          position: absolute;
          inset: 0;
          border-radius: inherit;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.2s;
        }
        .stat-card:hover .stat-card-glow { opacity: 1; }

        .stat-icon {
          font-size: 1rem;
          line-height: 1;
          margin-bottom: 0.2rem;
        }
        .stat-value {
          font-size: 1.65rem;
          font-weight: 900;
          letter-spacing: -0.04em;
          color: hsl(var(--foreground));
          line-height: 1;
        }
        .stat-label {
          font-size: 0.78rem;
          font-weight: 700;
          color: hsl(var(--foreground));
        }
        .stat-sublabel {
          font-size: 0.68rem;
          color: hsl(var(--muted-foreground));
        }

        /* ── Quip bar ── */
        .quip-bar {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: hsl(var(--background));
          border: 1.5px solid hsl(var(--border));
          border-radius: 1rem;
          padding: 0.75rem 1rem;
        }
        .quip-icon {
          font-size: 1.1rem;
          flex-shrink: 0;
        }
        .quip-text {
          flex: 1;
          font-size: 0.82rem;
          color: hsl(var(--muted-foreground));
          font-style: italic;
          line-height: 1.5;
        }
        .quip-tag {
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 2px 7px;
          border-radius: 999px;
          border: 1px solid;
          white-space: nowrap;
          flex-shrink: 0;
        }

        /* ── Accordion ── */
        .accordion-wrap {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .accordion-item {
          background: hsl(var(--card));
          border: 1.5px solid hsl(var(--border)) !important;
          border-radius: 1.25rem !important;
          overflow: hidden;
          padding: 0 1.25rem;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .accordion-item:hover {
          border-color: hsl(var(--primary) / 0.3) !important;
          box-shadow: 0 4px 16px hsl(var(--primary) / 0.06);
        }

        .accordion-trigger {
          padding: 1.1rem 0;
        }
        .accordion-trigger-inner {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          width: 100%;
        }
        .accordion-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .accordion-title {
          font-size: 1rem;
          font-weight: 700;
          color: hsl(var(--foreground));
          letter-spacing: -0.01em;
          flex: 1;
          text-align: left;
        }
        .accordion-count {
          font-size: 0.72rem;
          font-weight: 700;
          background: hsl(var(--accent));
          color: hsl(var(--muted-foreground));
          padding: 2px 9px;
          border-radius: 999px;
          letter-spacing: 0.03em;
        }

        .accordion-content {
          padding-bottom: 1rem;
        }

        /* ── Empty states ── */
        .empty-state {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1.5rem 0;
          color: hsl(var(--muted-foreground));
        }
        .empty-icon {
          font-size: 1.4rem;
          opacity: 0.4;
        }
        .empty-state p {
          font-size: 0.875rem;
        }

        /* ── Mobile ── */
        @media (max-width: 640px) {
          .profile-hero { padding: 1.25rem; }
          .identity-name { font-size: 1.4rem; }
          .avatar-frame { width: 76px; height: 76px; }
          .avatar-img { width: 76px; height: 76px; }
          .stat-value { font-size: 1.35rem; }
          .accordion-item { padding: 0 0.875rem; }
        }
      `}</style>
)