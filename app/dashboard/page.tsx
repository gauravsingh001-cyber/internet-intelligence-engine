"use client";

import { useEffect, useMemo, useState } from 'react';
import { normalizeQuery } from '@/lib/query';

interface BusinessIntelligence {
  companyOverview: string;
  industry: string;
  category: 'AI' | 'Semiconductor' | 'Cloud' | 'SaaS' | 'Social Media' | 'E-commerce' | 'Fintech' | 'Other';
  sentiment: 'positive' | 'neutral' | 'negative';
  confidence: number;
  intelligenceScore: number;
  keyFindings: string[];
  recentDevelopments: string[];
  growthSignals: string[];
  riskSignals: string[];
  competitors: string[];
  keySources: string[];
}

interface IntelligenceResponse {
  ok: boolean;
  intelligence: BusinessIntelligence | null;
  error?: string;
}

const DEFAULT_QUERY = 'OpenAI';
const NO_RELIABLE_INTELLIGENCE = 'No reliable intelligence available.';

export default function Dashboard() {
  const [query, setQuery] = useState<string>(normalizeQuery(DEFAULT_QUERY));
  const [searchTerm, setSearchTerm] = useState<string>(DEFAULT_QUERY);
  const [intelligence, setIntelligence] = useState<BusinessIntelligence | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const sentimentStyles = useMemo(() => {
    if (!intelligence) return 'text-slate-300';
    switch (intelligence.sentiment) {
      case 'positive':
        return 'text-emerald-400';
      case 'negative':
        return 'text-rose-400';
      default:
        return 'text-sky-300';
    }
  }, [intelligence]);

  const filteredCompetitors = useMemo(() => {
    if (!intelligence) return [];
    const normalizedQuery = query.trim().toLowerCase();

    return (Array.isArray(intelligence.competitors) ? intelligence.competitors : []).filter((competitor) => {
      const normalizedCompetitor = competitor.trim().toLowerCase();
      return normalizedCompetitor !== normalizedQuery;
    });
  }, [intelligence, query]);

  async function fetchIntelligence(searchQuery: string) {
    setLoading(true);
    setError(null);
    setIntelligence(null);

    try {
      const response = await fetch(`/api/intelligence?q=${encodeURIComponent(searchQuery)}`);
      const payload = (await response.json()) as IntelligenceResponse;

      if (!response.ok || !payload.ok || !payload.intelligence) {
        throw new Error(payload.error || 'Could not load intelligence.');
      }

      setIntelligence(payload.intelligence);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const loadDefaultIntelligence = async () => {
      await fetchIntelligence(normalizeQuery(DEFAULT_QUERY));
    };

    loadDefaultIntelligence();
  }, []);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = searchTerm.trim();
    if (!trimmed) return;
    const normalized = normalizeQuery(trimmed);
    if (!normalized) return;
    setQuery(normalized);
    fetchIntelligence(normalized);
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.18),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(99,102,241,0.18),_transparent_25%),linear-gradient(180deg,#020617_0%,#020617_35%,#0b1221_100%)] text-white">
      <section className="relative overflow-hidden px-6 py-10 sm:px-10 lg:px-16">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-cyan-500/15 to-transparent blur-3xl" />
        <div className="mx-auto grid max-w-7xl gap-10">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl sm:p-12">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.15),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.15),_transparent_30%)]" />
            <div className="relative space-y-8">
              <div className="max-w-3xl space-y-4">
                <p className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-500/10 px-4 py-1 text-sm uppercase tracking-[0.24em] text-cyan-300">
                  Business Intelligence
                </p>
                <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                  Modern AI-powered company signals in one dashboard.
                </h1>
                <p className="max-w-2xl text-lg text-slate-300 sm:text-xl">
                  Search any company, uncover the latest growth and risk signals, competitor mentions, sentiment, and structured findings.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-[1fr_auto]">
                <label className="sr-only" htmlFor="company-query">
                  Company name
                </label>
                <input
                  id="company-query"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Search a company, e.g. OpenAI"
                  className="w-full rounded-3xl border border-white/10 bg-slate-950/70 px-5 py-4 text-white outline-none transition focus:border-cyan-400/70 focus:ring-2 focus:ring-cyan-500/20"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-3xl bg-gradient-to-r from-cyan-400 to-blue-500 px-7 py-4 text-sm font-semibold text-slate-950 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
                  disabled={loading}
                >
                  {loading ? 'Searching...' : 'Search'}
                </button>
              </form>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-5 shadow-xl shadow-slate-950/30 backdrop-blur-xl">
                  <p className="text-sm uppercase tracking-[0.22em] text-slate-400">Current query</p>
                  <p className="mt-3 text-2xl font-semibold text-white">{query}</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-5 shadow-xl shadow-slate-950/30 backdrop-blur-xl">
                  <p className="text-sm uppercase tracking-[0.22em] text-slate-400">Status</p>
                  <p className="mt-3 text-2xl font-semibold text-white">
                    {loading ? 'Loading' : error ? 'Error' : 'Ready'}
                  </p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-5 shadow-xl shadow-slate-950/30 backdrop-blur-xl">
                  <p className="text-sm uppercase tracking-[0.22em] text-slate-400">Sentiment</p>
                  <p className={`mt-3 text-2xl font-semibold ${sentimentStyles}`}>
                    {intelligence?.sentiment ?? 'Neutral'}
                  </p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-5 shadow-xl shadow-slate-950/30 backdrop-blur-xl">
                  <p className="text-sm uppercase tracking-[0.22em] text-slate-400">Industry</p>
                  <p className="mt-3 text-2xl font-semibold text-white">
                    {intelligence?.industry ?? 'N/A'}
                  </p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-5 shadow-xl shadow-slate-950/30 backdrop-blur-xl">
                  <p className="text-sm uppercase tracking-[0.22em] text-slate-400">Category</p>
                  <p className="mt-3 text-2xl font-semibold text-white">
                    {intelligence?.category ?? 'Other'}
                  </p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-5 shadow-xl shadow-slate-950/30 backdrop-blur-xl">
                  <p className="text-sm uppercase tracking-[0.22em] text-slate-400">Confidence</p>
                  <p className="mt-3 text-2xl font-semibold text-emerald-400">
                    {intelligence?.confidence ?? 0}%
                  </p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-5 shadow-xl shadow-slate-950/30 backdrop-blur-xl">
                  <p className="text-sm uppercase tracking-[0.22em] text-slate-400">Intelligence Score</p>
                  <p className="mt-3 text-2xl font-semibold text-blue-300">
                    {intelligence?.intelligenceScore ?? 0}/100
                  </p>
                </div>
              </div>
            </div>
          </div>

          {error ? (
            <div className="rounded-3xl border border-rose-400/20 bg-rose-500/10 p-6 text-rose-200 shadow-lg shadow-rose-500/10">
              <h2 className="text-xl font-semibold">Unable to load intelligence</h2>
              <p className="mt-2 text-slate-300">{error}</p>
            </div>
          ) : null}

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-6">
              <section className="glass glass-hover rounded-[2rem] border-white/10 p-8 shadow-2xl shadow-cyan-500/5">
                <div className="mb-4 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-cyan-300">Company Overview</p>
                    <h2 className="text-2xl font-semibold text-white">Summary</h2>
                  </div>
                  <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-sm text-cyan-200">Overview</span>
                </div>
                <p className="text-slate-300">
                  {loading ? 'Fetching company overview...' : intelligence?.companyOverview ?? 'No overview available.'}
                </p>
              </section>

              <section className="glass glass-hover rounded-[2rem] border-white/10 p-8 shadow-2xl shadow-blue-500/5">
                <div className="mb-4 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-sky-300">Key Findings</p>
                    <h2 className="text-2xl font-semibold text-white">Insights</h2>
                  </div>
                  <span className="rounded-full bg-sky-500/10 px-3 py-1 text-sm text-sky-200">Highlights</span>
                </div>
                <div className="space-y-3">
                  {loading ? (
                    <p className="text-slate-400">Loading findings…</p>
                  ) : Array.isArray(intelligence?.keyFindings) && intelligence.keyFindings.length ? (
                    intelligence.keyFindings.map((finding, index) => (
                      <p key={index} className="text-slate-300">• {finding}</p>
                    ))
                  ) : (
                    <p className="text-slate-400">{NO_RELIABLE_INTELLIGENCE}</p>
                  )}
                </div>
              </section>
            </div>

            <div className="space-y-6">
              <section className="glass glass-hover rounded-[2rem] border-white/10 p-8 shadow-2xl shadow-cyan-500/5">
                <div className="mb-4 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-cyan-300">Recent Developments</p>
                    <h2 className="text-2xl font-semibold text-white">Updates</h2>
                  </div>
                  <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-sm text-cyan-200">Latest</span>
                </div>
                <div className="space-y-3">
                  {loading ? (
                    <p className="text-slate-400">Checking news snippets…</p>
                  ) : Array.isArray(intelligence?.recentDevelopments) && intelligence.recentDevelopments.length ? (
                    intelligence.recentDevelopments.map((item, index) => (
                      <p key={index} className="text-slate-300">• {item}</p>
                    ))
                  ) : (
                    <p className="text-slate-400">{NO_RELIABLE_INTELLIGENCE}</p>
                  )}
                </div>
              </section>

              <section className="glass glass-hover rounded-[2rem] border-white/10 p-8 shadow-2xl shadow-blue-500/5">
                <div className="mb-4 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-sky-300">Competitors</p>
                    <h2 className="text-2xl font-semibold text-white">Market players</h2>
                  </div>
                  <span className="rounded-full bg-sky-500/10 px-3 py-1 text-sm text-sky-200">Peers</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {loading ? (
                    <p className="text-slate-400">Evaluating competitor mentions…</p>
                  ) : filteredCompetitors.length ? (
                    filteredCompetitors.map((competitor) => (
                      <span key={competitor} className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-2 text-sm text-slate-200">
                        {competitor}
                      </span>
                    ))
                  ) : (
                    <p className="text-slate-400">{NO_RELIABLE_INTELLIGENCE}</p>
                  )}
                </div>
              </section>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <section className="glass glass-hover rounded-[2rem] border-white/10 p-6 shadow-2xl shadow-cyan-500/5">
              <h3 className="mb-4 text-lg font-semibold text-white">Growth Signals</h3>
              <div className="space-y-3">
                {loading ? (
                  <p className="text-slate-400">Scanning for growth cues…</p>
                ) : Array.isArray(intelligence?.growthSignals) && intelligence.growthSignals.length ? (
                  intelligence.growthSignals.map((signal, index) => (
                    <p key={index} className="text-slate-300">• {signal}</p>
                  ))
                ) : (
                  <p className="text-slate-400">{NO_RELIABLE_INTELLIGENCE}</p>
                )}
              </div>
            </section>

            <section className="glass glass-hover rounded-[2rem] border-white/10 p-6 shadow-2xl shadow-blue-500/5">
              <h3 className="mb-4 text-lg font-semibold text-white">Risk Signals</h3>
              <div className="space-y-3">
                {loading ? (
                  <p className="text-slate-400">Scanning for risk signals…</p>
                ) : Array.isArray(intelligence?.riskSignals) && intelligence.riskSignals.length ? (
                  intelligence.riskSignals.map((signal, index) => (
                    <p key={index} className="text-slate-300">• {signal}</p>
                  ))
                ) : (
                  <p className="text-slate-400">{NO_RELIABLE_INTELLIGENCE}</p>
                )}
              </div>
            </section>

            <section className="glass glass-hover rounded-[2rem] border-white/10 p-6 shadow-2xl shadow-cyan-500/5">
              <h3 className="mb-4 text-lg font-semibold text-white">Sources</h3>
              <div className="space-y-3">
                {loading ? (
                  <p className="text-slate-400">Loading source references…</p>
                ) : Array.isArray(intelligence?.keySources) && intelligence.keySources.length ? (
                  intelligence.keySources.map((source, index) => (
                    <p key={index} className="text-slate-300 break-words">• {source}</p>
                  ))
                ) : (
                  <p className="text-slate-400">No sources available.</p>
                )}
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
