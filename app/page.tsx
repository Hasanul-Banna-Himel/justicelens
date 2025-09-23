"use client";
import Link from "next/link";
import Feed from "@/components/views/Feed";
import { useApp } from "@/store";

export default function Home() {
  const { loggedInStatus } = useApp();

  if (loggedInStatus) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <aside className="md:col-start-1 md:col-span-3"></aside>
        <main className="md:col-start-4 md:col-span-6">
          <Feed />
        </main>
        <aside className="md:col-start-9 md:col-span-3"></aside>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--aj-background-substitute)]/70 via-transparent to-transparent pointer-events-none" />
        <div className="px-6 py-20 md:py-28 text-center text-[var(--aj-foreground)] bg-[radial-gradient(ellipse_at_top,rgba(125,211,252,0.12),transparent_45%),radial-gradient(ellipse_at_bottom,rgba(190,242,100,0.12),transparent_45%)]">
          <span className="inline-block text-xs tracking-wide uppercase opacity-80 border border-[var(--aj-primary)]/30 text-[var(--aj-primary)] px-3 py-1 rounded-full">Community Safety for Bangladesh</span>
          <h1 className="mt-4 text-4xl md:text-6xl font-extrabold leading-tight">
            Nirapotta
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto opacity-90">
            A community-driven crime reporting and verification platform. Report incidents, verify together, and build safer communities with data-driven insights.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link href="/register" className="px-6 py-3 rounded-xl bg-[var(--aj-primary)] text-[var(--aj-background)] hover:opacity-90 shadow-lg shadow-[var(--aj-primary)]/10">Get Started</Link>
            <Link href="#learn-more" className="px-6 py-3 rounded-xl border border-[var(--aj-primary)] text-[var(--aj-primary)] hover:bg-[var(--aj-primary)]/10">Learn More</Link>
          </div>
        </div>
      </section>

      <section id="about" className="px-6 py-16 md:py-24 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          <div className="p-6 rounded-2xl bg-[var(--aj-background-substitute)]/70 backdrop-blur border border-[var(--aj-border)]">
            <h3 className="text-xl font-semibold">Vision</h3>
            <p className="mt-2 opacity-90">Create a safer Bangladesh through technology-enabled community participation, transparent reporting, and data-driven safety insights.</p>
          </div>
          <div className="p-6 rounded-2xl bg-[var(--aj-background-substitute)]/70 backdrop-blur border border-[var(--aj-border)]">
            <h3 className="text-xl font-semibold">Mission</h3>
            <ul className="mt-2 space-y-2 opacity-90 list-disc list-inside text-left">
              <li>Empower safe and anonymous reporting</li>
              <li>Build trust via collaborative verification</li>
              <li>Provide actionable insights to communities</li>
              <li>Bridge citizens and law enforcement</li>
            </ul>
          </div>
          <div className="p-6 rounded-2xl bg-[var(--aj-background-substitute)]/70 backdrop-blur border border-[var(--aj-border)]">
            <h3 className="text-xl font-semibold">Target Users</h3>
            <ul className="mt-2 space-y-2 opacity-90 list-disc list-inside text-left">
              <li>Citizens across urban and rural Bangladesh</li>
              <li>Local authorities, police, NGOs</li>
              <li>Researchers, journalists, policy makers</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="features" className="px-6 pb-24 max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold text-center">How Nirapotta Works</h2>
        <div className="mt-8 grid md:grid-cols-3 gap-6 md:gap-8">
          <div className="p-6 rounded-2xl bg-[var(--aj-background-substitute)]/70 backdrop-blur border border-[var(--aj-border)]">
            <h4 className="font-semibold">Report</h4>
            <p className="mt-2 opacity-90">Submit incidents with photos or videos. Choose to report anonymously. Categorize using Bangladesh-specific context.</p>
          </div>
          <div className="p-6 rounded-2xl bg-[var(--aj-background-substitute)]/70 backdrop-blur border border-[var(--aj-border)]">
            <h4 className="font-semibold">Verify</h4>
            <p className="mt-2 opacity-90">Community members and moderators help verify information to build trust and reduce misinformation.</p>
          </div>
          <div className="p-6 rounded-2xl bg-[var(--aj-background-substitute)]/70 backdrop-blur border border-[var(--aj-border)]">
            <h4 className="font-semibold">Insights</h4>
            <p className="mt-2 opacity-90">Get area-based insights by division/district to stay informed and enable proactive safety actions.</p>
          </div>
        </div>
        <div id="explore" className="mt-10 text-center">
          <Link href="/login" className="px-6 py-3 rounded-xl bg-[var(--aj-primary)] text-[var(--aj-background)] hover:opacity-90 shadow-lg shadow-[var(--aj-primary)]/10">Start Reporting</Link>
        </div>
      </section>
    </div>
  );
}
