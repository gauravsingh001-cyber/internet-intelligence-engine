'use client';

import Sidebar from '@/components/dashboard/sidebar';
import { mockCompanies, mockEvents, mockTrendData } from '@/data/mockData';
import { use } from 'react';
import {
  Activity,
  ArrowRight,
  BadgeAlert,
  BriefcaseBusiness,
  CalendarDays,
  GitBranch,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import { notFound } from 'next/navigation';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface CompanyDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function CompanyDetailsPage({ params }: CompanyDetailPageProps) {
  const { id } = use(params);
  const company = mockCompanies.find((item) => item.id === id);

  if (!company) {
    notFound();
  }

  const riskScore = Math.max(35, Math.min(95, Math.round(company.growthScore * 7 + (company.signal === 'high' ? 18 : company.signal === 'medium' ? 8 : -4))));
  const marketMomentum = Math.max(45, Math.min(98, Math.round(company.growthScore * 8 + company.hiringCount * 0.4)));
  const hiringTrend = mockTrendData.map((item, index) => ({
    label: item.date,
    hiring: Math.round(item.hiring * (0.7 + company.growthScore / 10)),
    target: Math.round(item.activity * (0.55 + company.growthScore / 12) + index * 2),
  }));
  const githubTrend = [
    { week: 'W1', commits: Math.max(24, Math.round(company.repoCount / 55)), prs: Math.max(6, Math.round(company.repoCount / 180)) },
    { week: 'W2', commits: Math.max(31, Math.round(company.repoCount / 48)), prs: Math.max(8, Math.round(company.repoCount / 150)) },
    { week: 'W3', commits: Math.max(40, Math.round(company.repoCount / 42)), prs: Math.max(10, Math.round(company.repoCount / 130)) },
    { week: 'W4', commits: Math.max(52, Math.round(company.repoCount / 35)), prs: Math.max(12, Math.round(company.repoCount / 110)) },
  ];

  const recommendations = [
    `Prioritize ${company.industry.toLowerCase()} talent pipelines to support the current hiring velocity of ${company.hiringCount} open roles.`,
    `Monitor ${company.name} for follow-on funding and partner announcements, since its momentum score is ${marketMomentum}.`,
    `Use the GitHub activity trend to align product roadmap decisions with the company’s engineering cadence.`,
  ];

  return (
    <div className="flex min-h-screen bg-black text-white">
      <Sidebar />

      <main className="flex-1 overflow-auto">
        <header className="sticky top-0 z-40 border-b border-white/10 bg-black/70 backdrop-blur-xl">
          <div className="px-6 py-6">
            <p className="text-sm uppercase tracking-[0.25em] text-cyan-400">Company intelligence</p>
            <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
              <div>
                <h1 className="text-3xl font-semibold text-white">{company.name}</h1>
                <p className="mt-1 text-sm text-gray-300">{company.industry} · {company.location}</p>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-200">
                <span className="rounded-full border border-cyan-500/40 bg-cyan-500/10 px-3 py-1">Risk Score: {riskScore}</span>
                <span className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1">Growth Score: {company.growthScore.toFixed(1)}</span>
              </div>
            </div>
          </div>
        </header>

        <section className="mx-auto flex w-full max-w-7xl flex-col gap-6 p-6 lg:p-8">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              { label: 'Hiring Signals', value: `${company.hiringCount} open roles`, icon: BriefcaseBusiness, tint: 'text-cyan-400' },
              { label: 'GitHub Activity', value: `${company.repoCount.toLocaleString()} repos`, icon: GitBranch, tint: 'text-blue-400' },
              { label: 'Funding Signals', value: company.funding ?? 'Private funding', icon: ShieldCheck, tint: 'text-emerald-400' },
              { label: 'Market Momentum', value: `${marketMomentum}%`, icon: TrendingUp, tint: 'text-violet-400' },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <article key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-2xl shadow-black/20 backdrop-blur-xl">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-300">{item.label}</p>
                    <Icon className={`h-5 w-5 ${item.tint}`} />
                  </div>
                  <p className="mt-4 text-2xl font-semibold text-white">{item.value}</p>
                  <p className="mt-2 text-xs text-gray-400">Live intelligence signal #{index + 1}</p>
                </article>
              );
            })}
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <article className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-300">Hiring Trend</p>
                  <h2 className="text-xl font-semibold text-white">Open roles and hiring velocity</h2>
                </div>
                <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs text-cyan-100">MoM +18%</span>
              </div>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={hiringTrend}>
                    <CartesianGrid stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
                    <XAxis dataKey="label" tick={{ fill: '#cbd5e1', fontSize: 12 }} />
                    <YAxis tick={{ fill: '#cbd5e1', fontSize: 12 }} />
                    <Tooltip contentStyle={{ backgroundColor: '#04070d', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12 }} />
                    <Line type="monotone" dataKey="hiring" stroke="#22d3ee" strokeWidth={3} dot={{ r: 4 }} />
                    <Line type="monotone" dataKey="target" stroke="#818cf8" strokeWidth={2} dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </article>

            <article className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-300">GitHub Activity</p>
                  <h2 className="text-xl font-semibold text-white">Commit and PR momentum</h2>
                </div>
                <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-100">Healthy</span>
              </div>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={githubTrend}>
                    <defs>
                      <linearGradient id="commitsFill" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.35} />
                        <stop offset="95%" stopColor="#22d3ee" stopOpacity={0.02} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
                    <XAxis dataKey="week" tick={{ fill: '#cbd5e1', fontSize: 12 }} />
                    <YAxis tick={{ fill: '#cbd5e1', fontSize: 12 }} />
                    <Tooltip contentStyle={{ backgroundColor: '#04070d', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12 }} />
                    <Area type="monotone" dataKey="commits" stroke="#22d3ee" fill="url(#commitsFill)" strokeWidth={3} />
                    <Line type="monotone" dataKey="prs" stroke="#a78bfa" strokeWidth={2} dot={{ r: 3 }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </article>
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <article className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl">
              <div className="mb-4 flex items-center gap-2 text-cyan-100">
                <CalendarDays className="h-5 w-5" />
                <h2 className="text-xl font-semibold text-white">Recent Events Timeline</h2>
              </div>
              <div className="space-y-4">
                {mockEvents.filter((event) => event.companyId === company.id).length ? (
                  mockEvents
                    .filter((event) => event.companyId === company.id)
                    .map((event) => (
                      <div key={event.id} className="rounded-xl border border-white/10 bg-black/30 p-4">
                        <div className="flex items-start gap-3">
                          <div className="mt-1 h-2.5 w-2.5 rounded-full bg-cyan-400" />
                          <div>
                            <p className="text-sm font-semibold text-white">{event.title}</p>
                            <p className="mt-1 text-sm text-gray-300">{event.description}</p>
                            <p className="mt-2 text-xs uppercase tracking-[0.25em] text-gray-400">{event.date}</p>
                          </div>
                        </div>
                      </div>
                    ))
                ) : (
                  <p className="text-sm text-gray-300">No recent events available for this company yet.</p>
                )}
              </div>
            </article>

            <section className="space-y-6">
              <article className="rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl">
                <div className="mb-3 flex items-center gap-2 text-cyan-100">
                  <Sparkles className="h-5 w-5" />
                  <h2 className="text-xl font-semibold text-white">AI Generated Summary</h2>
                </div>
                <p className="text-sm text-gray-100">{company.name} is showing a strong expansion profile with {company.hiringCount} hiring signals, high repository activity, and a market momentum score of {marketMomentum}. The current mix suggests an aggressive growth phase and strong interest from investors and talent.</p>
                <div className="mt-4 flex items-center gap-2 text-sm text-cyan-100">
                  <BadgeAlert className="h-4 w-4" />
                  <span>Risk Score: {riskScore} / 100</span>
                </div>
              </article>

              <article className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl">
                <div className="mb-3 flex items-center gap-2 text-emerald-100">
                  <Activity className="h-5 w-5" />
                  <h2 className="text-xl font-semibold text-white">Strategic Recommendations</h2>
                </div>
                <ul className="space-y-3 text-sm text-gray-100">
                  {recommendations.map((item) => (
                    <li key={item} className="flex items-start gap-3 rounded-xl border border-white/10 bg-black/25 p-3">
                      <ArrowRight className="mt-0.5 h-4 w-4 text-emerald-300" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </section>
          </div>
        </section>
      </main>
    </div>
  );
}
