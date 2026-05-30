export interface Company {
  id: string;
  name: string;
  industry: string;
  location: string;
  employees: number;
  hiringCount: number;
  repoCount: number;
  growthScore: number;
  lastUpdated: string;
  signal: 'high' | 'medium' | 'low';
  description?: string;
  website?: string;
  funding?: string;
}

export interface Event {
  id: string;
  companyId: string;
  type: 'hiring' | 'github' | 'news' | 'funding';
  title: string;
  description: string;
  date: string;
  metadata?: {
    count?: number;
    url?: string;
  };
}

export interface Insight {
  id: string;
  title: string;
  category: 'market' | 'hiring' | 'technology' | 'growth';
  description: string;
  companies: string[];
  confidence: number;
  date: string;
}

export interface MetricsData {
  companiesTracked: number;
  hiringSignals: number;
  githubSignals: number;
  aiInsights: number;
}

export interface TrendData {
  date: string;
  hiring: number;
  activity: number;
}

export const mockCompanies: Company[] = [
  {
    id: '1',
    name: 'TechVenture AI',
    industry: 'Artificial Intelligence',
    location: 'San Francisco, CA',
    employees: 250,
    hiringCount: 32,
    repoCount: 1247,
    growthScore: 8.9,
    lastUpdated: '2026-05-29',
    signal: 'high',
    description: 'Building next-generation AI infrastructure and enterprise solutions.',
    website: 'techventure.ai',
    funding: '$45M Series B',
  },
  {
    id: '2',
    name: 'DataFlow Systems',
    industry: 'Data Analytics',
    location: 'New York, NY',
    employees: 180,
    hiringCount: 18,
    repoCount: 856,
    growthScore: 7.2,
    lastUpdated: '2026-05-28',
    signal: 'medium',
    description: 'Real-time data analytics platform for enterprises.',
    website: 'dataflow.io',
    funding: '$22M Series A',
  },
  {
    id: '3',
    name: 'CloudScale Inc',
    industry: 'Cloud Infrastructure',
    location: 'Seattle, WA',
    employees: 420,
    hiringCount: 45,
    repoCount: 2134,
    growthScore: 8.4,
    lastUpdated: '2026-05-29',
    signal: 'high',
    description: 'Scalable cloud infrastructure platform for modern applications.',
    website: 'cloudscale.io',
    funding: '$80M Series C',
  },
  {
    id: '4',
    name: 'SecureGuard Labs',
    industry: 'Cybersecurity',
    location: 'Boston, MA',
    employees: 95,
    hiringCount: 12,
    repoCount: 512,
    growthScore: 6.1,
    lastUpdated: '2026-05-27',
    signal: 'low',
    description: 'Enterprise security solutions with AI-powered threat detection.',
    website: 'secureguard.io',
    funding: '$12M Seed',
  },
  {
    id: '5',
    name: 'BioML Solutions',
    industry: 'Biotech AI',
    location: 'San Diego, CA',
    employees: 156,
    hiringCount: 28,
    repoCount: 743,
    growthScore: 7.8,
    lastUpdated: '2026-05-29',
    signal: 'high',
    description: 'Machine learning solutions for biotech research and drug discovery.',
    website: 'bioml.ai',
    funding: '$35M Series A+',
  },
  {
    id: '6',
    name: 'FinTech Innovations',
    industry: 'Financial Technology',
    location: 'Chicago, IL',
    employees: 310,
    hiringCount: 22,
    repoCount: 1456,
    growthScore: 7.5,
    lastUpdated: '2026-05-28',
    signal: 'medium',
    description: 'Next-generation fintech platform for payments and settlement.',
    website: 'fintechinnovations.com',
    funding: '$55M Series B',
  },
  {
    id: '7',
    name: 'EdgeCompute Networks',
    industry: 'Edge Computing',
    location: 'Austin, TX',
    employees: 134,
    hiringCount: 16,
    repoCount: 678,
    growthScore: 6.8,
    lastUpdated: '2026-05-29',
    signal: 'medium',
    description: 'Edge computing platform for IoT and distributed systems.',
    website: 'edgecompute.io',
    funding: '$18M Series A',
  },
  {
    id: '8',
    name: 'QuantumLeap Tech',
    industry: 'Quantum Computing',
    location: 'Mountain View, CA',
    employees: 87,
    hiringCount: 35,
    repoCount: 892,
    growthScore: 8.7,
    lastUpdated: '2026-05-29',
    signal: 'high',
    description: 'Quantum computing algorithms and enterprise applications.',
    website: 'quantumleap.io',
    funding: '$52M Series B',
  },
  {
    id: '9',
    name: 'GreenEnergy AI',
    industry: 'Clean Technology',
    location: 'Denver, CO',
    employees: 213,
    hiringCount: 19,
    repoCount: 567,
    growthScore: 7.1,
    lastUpdated: '2026-05-28',
    signal: 'medium',
    description: 'AI-powered renewable energy optimization and forecasting.',
    website: 'greenergyai.com',
    funding: '$28M Series A',
  },
  {
    id: '10',
    name: 'VoiceAI Platform',
    industry: 'Voice Technology',
    location: 'Portland, OR',
    employees: 142,
    hiringCount: 25,
    repoCount: 945,
    growthScore: 7.6,
    lastUpdated: '2026-05-29',
    signal: 'high',
    description: 'Voice AI platform for conversational interfaces and analytics.',
    website: 'voiceai.com',
    funding: '$40M Series B',
  },
];

export const mockEvents: Event[] = [
  {
    id: '1',
    companyId: '1',
    type: 'hiring',
    title: 'New VP of Engineering Hired',
    description: 'TechVenture AI announces VP of Engineering from Google',
    date: '2026-05-28',
    metadata: { count: 32 },
  },
  {
    id: '2',
    companyId: '1',
    type: 'github',
    title: 'Major Repository Update',
    description: 'Release of new AI framework v2.0 with 47 commits',
    date: '2026-05-27',
    metadata: { count: 47 },
  },
  {
    id: '3',
    companyId: '3',
    type: 'hiring',
    title: 'Security Team Expansion',
    description: 'CloudScale Inc expanding security team by 15 engineers',
    date: '2026-05-29',
    metadata: { count: 15 },
  },
  {
    id: '4',
    companyId: '8',
    type: 'funding',
    title: 'Series B Funding Announcement',
    description: 'QuantumLeap Tech raises $52M in Series B',
    date: '2026-05-25',
    metadata: { url: 'quantumleap.io/news' },
  },
  {
    id: '5',
    companyId: '5',
    type: 'github',
    title: 'Drug Discovery Framework Released',
    description: 'Open-source ML framework for biotech research',
    date: '2026-05-26',
    metadata: { count: 156 },
  },
];

export const mockInsights: Insight[] = [
  {
    id: '1',
    title: 'AI Infrastructure Boom',
    category: 'market',
    description: 'Increased hiring in AI infrastructure companies signals strong market demand for AI tooling and platforms.',
    companies: ['1', '3', '8'],
    confidence: 0.92,
    date: '2026-05-29',
  },
  {
    id: '2',
    title: 'Enterprise Security Priority',
    category: 'technology',
    description: 'Companies across industries prioritizing security hiring with 150% increase in job postings.',
    companies: ['3', '4', '6'],
    confidence: 0.88,
    date: '2026-05-28',
  },
  {
    id: '3',
    title: 'Rapid Cloud Adoption',
    category: 'growth',
    description: 'Cloud infrastructure providers showing strongest growth metrics with 45+ open positions.',
    companies: ['3'],
    confidence: 0.95,
    date: '2026-05-27',
  },
  {
    id: '4',
    title: 'Biotech AI Renaissance',
    category: 'market',
    description: 'Convergence of AI and biotech creating new opportunities with specialized ML frameworks.',
    companies: ['5'],
    confidence: 0.85,
    date: '2026-05-26',
  },
  {
    id: '5',
    title: 'Voice AI Adoption',
    category: 'technology',
    description: 'Enterprise voice AI integration increasing with focus on conversational interfaces and analytics.',
    companies: ['10'],
    confidence: 0.82,
    date: '2026-05-25',
  },
];

export const mockTrendData: TrendData[] = [
  { date: 'May 1', hiring: 120, activity: 140 },
  { date: 'May 5', hiring: 145, activity: 165 },
  { date: 'May 10', hiring: 168, activity: 188 },
  { date: 'May 15', hiring: 195, activity: 210 },
  { date: 'May 20', hiring: 218, activity: 245 },
  { date: 'May 25', hiring: 245, activity: 278 },
  { date: 'May 29', hiring: 268, activity: 312 },
];

export const mockMetrics: MetricsData = {
  companiesTracked: 1234,
  hiringSignals: 268,
  githubSignals: 456,
  aiInsights: 892,
};
