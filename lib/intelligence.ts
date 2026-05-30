import { canonicalCompanyName, getCompanyAliases } from '@/lib/query';

export interface AnakinSearchResult {
  title: string;
  url?: string;
  snippet?: string;
  date?: string;
  lastUpdated?: string;
}

export interface BusinessIntelligence {
  companyOverview: string;
  industry: string;
  category: 'AI' | 'Semiconductor' | 'Cloud' | 'SaaS' | 'Social Media' | 'E-commerce' | 'Fintech' | 'Other';
  sentiment: 'positive' | 'neutral' | 'negative';
  confidence: number;
  intelligenceScore: number;
  keyFindings: string[];
  competitors: string[];
  growthSignals: string[];
  riskSignals: string[];
  recentDevelopments: string[];
  keySources: string[];
}

type IntelligenceCategory = BusinessIntelligence['category'] | 'Technology Services' | 'Consumer Technology';

const GROWTH_KEYWORDS = [
  'funding',
  'acquisition',
  'hiring',
  'expansion',
  'product launch',
  'product launches',
  'partnership',
  'partnerships',
  'raise',
  'investment',
  'merger',
  'joint venture',
  'office',
  'new market',
  'growth',
  'revenue',
  'customer expansion',
];

const RISK_KEYWORDS = [
  'layoff',
  'layoffs',
  'lawsuit',
  'lawsuits',
  'investigation',
  'investigations',
  'security incident',
  'data breach',
  'breach',
  'decline',
  'declining',
  'slowdown',
  'restructur',
  'missed guidance',
  'profit warning',
  'cut jobs',
  'regulatory',
];

const POSITIVE_KEYWORDS = [
  'expanded',
  'strong',
  'record',
  'growing',
  'growth',
  'raised',
  'launch',
  'launched',
  'partnership',
  'investment',
  'innovation',
  'benefit',
  'outperform',
  'strength',
  'positive',
  'hire',
  'hiring',
  'profit',
  'beat expectations',
  'momentum',
];

const NEGATIVE_KEYWORDS = [
  'layoff',
  'layoffs',
  'lawsuit',
  'lawsuits',
  'investigation',
  'investigations',
  'breach',
  'decline',
  'declining',
  'slowdown',
  'fallen',
  'negative',
  'warning',
  'missed guidance',
  'risk',
  'loss',
  'challeng',
  'restructur',
  'default',
  'shutdown',
];

const CATEGORY_KEYWORDS: Record<BusinessIntelligence['category'], string[]> = {
  AI: ['ai', 'artificial intelligence', 'machine learning', 'llm', 'generative', 'model', 'neural network'],
  Semiconductor: ['semiconductor', 'chip', 'silicon', 'processor', 'gpu', 'fab', 'wafer'],
  Cloud: ['cloud', 'infrastructure', 'data center', 'hybrid cloud', 'iaas', 'paas'],
  SaaS: ['saas', 'software platform', 'workflow', 'productivity', 'analytics platform', 'subscription'],
  'Social Media': ['social media', 'social network', 'feed', 'community', 'ads', 'influencer'],
  'E-commerce': ['e-commerce', 'marketplace', 'online shopping', 'checkout', 'retail platform', 'consumer goods'],
  Fintech: ['fintech', 'payments', 'digital wallet', 'banking', 'trading', 'financial services', 'insurance'],
  Other: [],
};

const INDUSTRY_LABELS: Record<BusinessIntelligence['category'], string> = {
  AI: 'Artificial Intelligence',
  Semiconductor: 'Semiconductors',
  Cloud: 'Cloud Infrastructure',
  SaaS: 'Software-as-a-Service',
  'Social Media': 'Social Media',
  'E-commerce': 'E-commerce',
  Fintech: 'Financial Technology',
  Other: 'Technology',
};

const CATEGORY_INDUSTRY_LABELS: Record<string, string> = {
  ...INDUSTRY_LABELS,
  'Technology Services': 'IT Services and Consulting',
  'Consumer Technology': 'Consumer Technology',
};

interface IndustryClassifier {
  category: IntelligenceCategory;
  industry: string;
  keywords: Array<[string, number]>;
}

const INDUSTRY_CLASSIFIERS: IndustryClassifier[] = [
  {
    category: 'Technology Services',
    industry: 'IT Services, Consulting and Digital Transformation',
    keywords: [
      ['it services', 8],
      ['information technology services', 8],
      ['consulting', 7],
      ['digital transformation', 8],
      ['managed services', 6],
      ['enterprise technology', 6],
      ['systems integration', 6],
      ['business process services', 5],
      ['application modernization', 5],
      ['outsourcing', 5],
      ['technology services', 7],
    ],
  },
  {
    category: 'AI',
    industry: 'Artificial Intelligence',
    keywords: [
      ['artificial intelligence company', 8],
      ['ai research', 8],
      ['frontier model', 7],
      ['large language model', 7],
      ['generative ai company', 7],
      ['machine learning model', 5],
      ['developer ai platform', 5],
      ['ai lab', 6],
    ],
  },
  {
    category: 'Cloud',
    industry: 'Cloud Infrastructure',
    keywords: [
      ['cloud infrastructure', 8],
      ['cloud computing', 7],
      ['data center', 5],
      ['hybrid cloud', 6],
      ['iaas', 5],
      ['cloud platform', 6],
    ],
  },
  {
    category: 'E-commerce',
    industry: 'E-commerce',
    keywords: [
      ['e-commerce', 8],
      ['online marketplace', 8],
      ['retail marketplace', 7],
      ['online shopping', 6],
      ['fulfillment', 5],
      ['retail platform', 5],
    ],
  },
  {
    category: 'Social Media',
    industry: 'Social Media',
    keywords: [
      ['social media', 8],
      ['social networking', 7],
      ['social network', 7],
      ['digital advertising', 5],
      ['messaging platform', 5],
      ['creator platform', 5],
    ],
  },
  {
    category: 'Consumer Technology',
    industry: 'Consumer Technology, Devices and Digital Services',
    keywords: [
      ['consumer technology', 8],
      ['smartphone', 7],
      ['personal computer', 5],
      ['devices', 4],
      ['hardware', 4],
      ['digital services', 4],
      ['wearables', 5],
    ],
  },
  {
    category: 'Semiconductor',
    industry: 'Semiconductors',
    keywords: [
      ['semiconductor', 8],
      ['chip', 5],
      ['processor', 5],
      ['gpu', 6],
      ['silicon', 5],
      ['wafer', 5],
    ],
  },
  {
    category: 'SaaS',
    industry: 'Software-as-a-Service',
    keywords: [
      ['saas', 8],
      ['software platform', 6],
      ['subscription software', 6],
      ['workflow platform', 5],
      ['analytics platform', 5],
    ],
  },
  {
    category: 'Fintech',
    industry: 'Financial Technology',
    keywords: [
      ['fintech', 8],
      ['payments', 6],
      ['digital wallet', 6],
      ['banking technology', 6],
      ['financial services platform', 5],
    ],
  },
];

interface CompanyIntelligenceProfile {
  industry: string;
  category: IntelligenceCategory;
  marketPosition: string;
  productStrengths: string;
  growthIndicators: string;
  strategicAdvantages: string;
  risks: string;
  fallbackCompetitors: string[];
}

const COMPANY_PROFILES: Record<string, CompanyIntelligenceProfile> = {
  Infosys: {
    industry: 'IT Services, Consulting and Digital Transformation',
    category: 'Technology Services',
    marketPosition: 'Infosys is a global IT services and consulting company focused on enterprise digital transformation, application modernization, cloud, data, automation, and managed services.',
    productStrengths: 'Its strengths include large-scale delivery, consulting-led transformation, enterprise software implementation, cloud migration, data services, and industry-specific technology programs.',
    growthIndicators: 'Growth indicators include digital transformation demand, enterprise modernization programs, cloud adoption, cost optimization initiatives, and long-term managed-services contracts.',
    strategicAdvantages: 'Infosys benefits from global delivery scale, deep enterprise relationships, consulting capabilities, domain expertise, and a broad talent base for complex technology programs.',
    risks: 'Key risks include discretionary IT spending pressure, pricing competition, margin pressure, client concentration, and execution risk in large transformation deals.',
    fallbackCompetitors: ['TCS', 'Wipro', 'HCL', 'Accenture', 'IBM'],
  },
  TCS: {
    industry: 'IT Services and Enterprise Technology',
    category: 'Technology Services',
    marketPosition: 'TCS is a global IT services, consulting, and enterprise technology company serving large organizations across industries with digital transformation and managed technology programs.',
    productStrengths: 'Its strengths include enterprise application services, consulting, cloud migration, engineering services, business process services, and large-scale technology operations.',
    growthIndicators: 'Growth indicators include enterprise modernization, cloud transformation, outsourcing demand, automation programs, and long-running strategic client relationships.',
    strategicAdvantages: 'TCS benefits from delivery scale, diversified enterprise accounts, industry depth, operating discipline, and a broad portfolio of technology services.',
    risks: 'Key risks include slowing discretionary technology budgets, wage inflation, pricing pressure, currency volatility, and competition from global consulting and services firms.',
    fallbackCompetitors: ['Infosys', 'Wipro', 'HCL', 'Accenture', 'IBM'],
  },
  Wipro: {
    industry: 'IT Services and Consulting',
    category: 'Technology Services',
    marketPosition: 'Wipro is a global IT services and consulting company focused on digital transformation, cloud, cybersecurity, engineering, application services, and business process solutions.',
    productStrengths: 'Its strengths include technology consulting, managed services, cloud transformation, cybersecurity offerings, engineering services, and enterprise application modernization.',
    growthIndicators: 'Growth indicators include enterprise cloud programs, cybersecurity demand, application modernization, automation, and transformation work across regulated industries.',
    strategicAdvantages: 'Wipro benefits from global delivery capacity, diversified service lines, enterprise relationships, and experience running complex technology programs.',
    risks: 'Key risks include intense services competition, margin pressure, slower client decision cycles, execution risk, and sensitivity to enterprise IT spending cycles.',
    fallbackCompetitors: ['Infosys', 'TCS', 'HCL', 'Accenture', 'IBM'],
  },
  HCL: {
    industry: 'IT Services, Engineering and Digital Transformation',
    category: 'Technology Services',
    marketPosition: 'HCL is a global technology services company focused on IT services, engineering, cloud, digital transformation, software, infrastructure management, and enterprise operations.',
    productStrengths: 'Its strengths include engineering services, infrastructure management, cloud operations, application modernization, cybersecurity, and enterprise technology transformation.',
    growthIndicators: 'Growth indicators include engineering services demand, cloud migration, infrastructure modernization, digital operations, and enterprise transformation contracts.',
    strategicAdvantages: 'HCL benefits from engineering depth, delivery scale, infrastructure expertise, and long-term relationships with global enterprise clients.',
    risks: 'Key risks include competitive pricing, project execution complexity, technology spending cycles, wage pressure, and demand volatility in discretionary transformation work.',
    fallbackCompetitors: ['Infosys', 'TCS', 'Wipro', 'Accenture', 'IBM'],
  },
  Accenture: {
    industry: 'Management Consulting, IT Services and Digital Transformation',
    category: 'Technology Services',
    marketPosition: 'Accenture is a global professional services company spanning management consulting, technology services, systems integration, digital transformation, and managed operations.',
    productStrengths: 'Its strengths include consulting, strategy, enterprise transformation, systems integration, cloud, data, managed services, and industry-specific delivery capabilities.',
    growthIndicators: 'Growth indicators include enterprise transformation demand, cloud modernization, managed services, data programs, and strategic consulting engagements.',
    strategicAdvantages: 'Accenture benefits from C-suite relationships, consulting-led delivery, global scale, industry depth, and a broad portfolio from strategy through operations.',
    risks: 'Key risks include consulting demand cycles, pricing pressure, talent costs, execution complexity, and client budget scrutiny.',
    fallbackCompetitors: ['IBM', 'Infosys', 'TCS', 'Wipro', 'HCL'],
  },
  IBM: {
    industry: 'Enterprise Technology, Hybrid Cloud and Consulting',
    category: 'Technology Services',
    marketPosition: 'IBM is an enterprise technology and consulting company focused on hybrid cloud, software, infrastructure, AI-enabled enterprise tools, and technology consulting.',
    productStrengths: 'Its strengths include Red Hat, hybrid-cloud software, enterprise infrastructure, consulting services, automation, security, and long-standing enterprise relationships.',
    growthIndicators: 'Growth indicators include hybrid cloud adoption, automation demand, enterprise AI programs, consulting engagements, and recurring software revenue.',
    strategicAdvantages: 'IBM benefits from enterprise trust, Red Hat distribution, deep infrastructure expertise, consulting reach, and credibility with regulated industries.',
    risks: 'Key risks include cloud competition, legacy portfolio pressure, consulting demand cycles, execution complexity, and the need to sustain software growth.',
    fallbackCompetitors: ['Microsoft', 'Accenture', 'Oracle', 'Google', 'Amazon'],
  },
  Google: {
    industry: 'Internet Platforms and AI Infrastructure',
    category: 'AI',
    marketPosition: 'Google is one of the dominant global internet platforms, anchored by search, advertising, Android, YouTube, cloud infrastructure, and an expanding AI portfolio.',
    productStrengths: 'Its strengths include search distribution, high-intent advertising data, consumer products at global scale, Google Cloud, Gemini models, and deep technical infrastructure.',
    growthIndicators: 'Growth indicators include continued AI integration across search, cloud, productivity tools, developer platforms, and consumer services.',
    strategicAdvantages: 'Google benefits from massive user reach, proprietary data, custom infrastructure, AI research depth, and monetization through performance advertising.',
    risks: 'Key risks include regulatory pressure, search monetization disruption, cloud competition, and execution risk around AI product adoption.',
    fallbackCompetitors: ['Microsoft', 'Amazon', 'Meta', 'OpenAI'],
  },
  OpenAI: {
    industry: 'Artificial Intelligence',
    category: 'AI',
    marketPosition: 'OpenAI is a leading AI research and deployment company with broad mindshare in generative AI, developer APIs, and consumer AI assistants.',
    productStrengths: 'Its strengths include frontier language and multimodal models, ChatGPT distribution, enterprise API adoption, developer tooling, and rapid product iteration.',
    growthIndicators: 'Growth indicators include enterprise adoption, API usage, consumer subscription demand, model releases, partnerships, and expansion of AI-native workflows.',
    strategicAdvantages: 'OpenAI benefits from brand leadership, a large developer ecosystem, research velocity, and a product portfolio that spans consumer, enterprise, and platform use cases.',
    risks: 'Key risks include model commoditization, compute cost intensity, safety and regulatory scrutiny, and dependence on large-scale infrastructure partnerships.',
    fallbackCompetitors: ['Anthropic', 'Google', 'Meta', 'xAI', 'Mistral', 'Cohere'],
  },
  Anthropic: {
    industry: 'Artificial Intelligence',
    category: 'AI',
    marketPosition: 'Anthropic is a major AI model company focused on enterprise-grade assistants, frontier model safety, and reliable deployment of Claude across business workflows.',
    productStrengths: 'Its strengths include Claude models, safety positioning, long-context capabilities, developer tools, enterprise adoption, and credibility with risk-sensitive customers.',
    growthIndicators: 'Growth indicators include rising enterprise interest in AI assistants, developer adoption, model upgrades, cloud marketplace distribution, and strategic funding support.',
    strategicAdvantages: 'Anthropic differentiates through safety research, enterprise trust, a focused model portfolio, and partnerships that improve compute access and distribution.',
    risks: 'Key risks include intense frontier-model competition, infrastructure costs, monetization pressure, regulatory scrutiny, and the need to keep model quality at the frontier.',
    fallbackCompetitors: ['OpenAI', 'Google', 'xAI', 'Mistral', 'Cohere', 'Meta'],
  },
  Microsoft: {
    industry: 'Cloud, Productivity Software and AI Platforms',
    category: 'Cloud',
    marketPosition: 'Microsoft is a global enterprise technology leader across cloud infrastructure, productivity software, operating systems, developer tools, gaming, and AI-enabled workflows.',
    productStrengths: 'Its strengths include Azure, Microsoft 365, Windows, Teams, GitHub, security software, enterprise sales reach, and Copilot integration across core products.',
    growthIndicators: 'Growth indicators include cloud demand, enterprise AI adoption, recurring Microsoft 365 revenue, security expansion, and integration of AI into productivity workflows.',
    strategicAdvantages: 'Microsoft benefits from deep enterprise relationships, bundled software distribution, hybrid-cloud capabilities, developer ecosystems, and a broad base of recurring revenue.',
    risks: 'Key risks include cloud competition, regulatory review, AI margin pressure, cybersecurity exposure, and execution complexity across a very broad product portfolio.',
    fallbackCompetitors: ['Google', 'Amazon', 'Oracle', 'Salesforce', 'Apple'],
  },
  Meta: {
    industry: 'Social Platforms, Advertising and AI',
    category: 'Social Media',
    marketPosition: 'Meta is a global social platform and digital advertising leader built around Facebook, Instagram, WhatsApp, Messenger, AI ranking systems, and immersive computing investments.',
    productStrengths: 'Its strengths include massive social reach, ad targeting, creator and messaging products, Reels distribution, WhatsApp engagement, and AI-driven content recommendation.',
    growthIndicators: 'Growth indicators include advertising demand, AI-enhanced engagement, monetization of messaging, creator tools, and continued scale across Instagram and WhatsApp.',
    strategicAdvantages: 'Meta benefits from network effects, first-party engagement data, advertising infrastructure, high-margin software economics, and ownership of multiple scaled social graphs.',
    risks: 'Key risks include privacy regulation, platform safety costs, ad market cyclicality, competition for attention, and long-term uncertainty around metaverse investments.',
    fallbackCompetitors: ['Google', 'TikTok', 'Snap', 'Amazon', 'Microsoft'],
  },
  Amazon: {
    industry: 'E-commerce, Cloud and Digital Services',
    category: 'E-commerce',
    marketPosition: 'Amazon is a global commerce, cloud infrastructure, logistics, advertising, media, and digital services company anchored by its marketplace and AWS.',
    productStrengths: 'Its strengths include marketplace scale, fulfillment infrastructure, Prime, AWS, advertising, devices, streaming, and data-driven operating systems.',
    growthIndicators: 'Growth indicators include cloud infrastructure demand, retail marketplace scale, advertising growth, logistics optimization, and subscription engagement.',
    strategicAdvantages: 'Amazon benefits from operational scale, logistics infrastructure, AWS leadership, customer data, marketplace network effects, and recurring Prime engagement.',
    risks: 'Key risks include retail margin pressure, cloud competition, labor and regulatory scrutiny, logistics costs, and execution complexity across a broad portfolio.',
    fallbackCompetitors: ['Walmart', 'Microsoft', 'Google', 'Shopify', 'Apple'],
  },
  Apple: {
    industry: 'Consumer Technology, Devices and Digital Services',
    category: 'Consumer Technology',
    marketPosition: 'Apple is a global consumer technology company built around integrated hardware, software, services, silicon, retail, and a high-value device ecosystem.',
    productStrengths: 'Its strengths include iPhone, Mac, iPad, Apple Watch, services, custom silicon, privacy positioning, brand loyalty, and ecosystem integration.',
    growthIndicators: 'Growth indicators include services expansion, device ecosystem retention, silicon innovation, wearables adoption, and monetization across installed-base services.',
    strategicAdvantages: 'Apple benefits from premium brand strength, vertical integration, supply-chain scale, custom chips, developer ecosystems, and a large installed base.',
    risks: 'Key risks include hardware replacement cycles, regulatory scrutiny, supply-chain concentration, China exposure, and services platform pressure.',
    fallbackCompetitors: ['Samsung', 'Google', 'Microsoft', 'Amazon', 'Meta'],
  },
};

const INSUFFICIENT_INTELLIGENCE_OVERVIEW = 'No reliable company intelligence could be generated from available public sources.';
const MIN_SOURCE_COUNT = 3;
const MIN_TRUSTED_SOURCE_COUNT = 2;
const MIN_TITLE_MENTIONS = 1;
const MIN_SNIPPET_MENTIONS = 1;
const MIN_AVERAGE_RELEVANCE = 3;
const MIN_SOURCE_QUALITY = 45;
const MIN_VALIDATION_CONFIDENCE = 40;

const TRUSTED_DOMAINS = [
  'wikipedia.org',
  'linkedin.com',
  'crunchbase.com',
  'forbes.com',
  'techcrunch.com',
];

const COMPETITOR_NAMES = [
  'OpenAI',
  'Google',
  'Microsoft',
  'Anthropic',
  'Meta',
  'Amazon',
  'NVIDIA',
  'xAI',
  'Mistral',
  'Cohere',
];

const COMPETITOR_CONTEXT_KEYWORDS = [
  'competitor',
  'competitors',
  'rival',
  'rivalry',
  'compete',
  'competes',
  'competing',
  'against',
  'vs',
  'versus',
  'peer',
  'market share',
  'direct competitor',
  'industry rival',
  'competing with',
];

const COMPETITOR_EXCLUDE_KEYWORDS = [
  'investor',
  'investors',
  'investit',
  'investissent',
  'invested',
  'backed',
  'founder',
  'founders',
  'founded by',
  'former member',
  'former members',
  'former employee',
  'former employees',
  'partner',
  'partnership',
  'stakeholder',
  'advisor',
  'shareholder',
  'raised',
  'acquired by',
  'acquired',
  'joined',
];

const COMPANY_CONTEXT_KEYWORDS = [
  'company',
  'corporation',
  'subsidiary',
  'holding',
  'parent',
  'CEO',
  'chief executive',
  'headquarters',
  'revenue',
  'financial',
  'business',
  'market',
  'strategy',
  'stock',
  'shareholder',
  'investment',
];

const COMPANY_PRODUCT_TERMS = [
  'product',
  'feature',
  'tool',
  'model',
  'assistant',
  'sdk',
  'api',
  'beta',
  'demo',
  'release',
  'launch',
];

const SNIPPET_SPLIT_REGEX = /[\.!?]+\s*/g;

function normalizeText(value: string): string {
  return value
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/\s+([.,!?])/g, '$1');
}

function stripSourceNoise(value: string): string {
  return normalizeText(
    value
      .replace(/\*\*/g, '')
      .replace(/\[[^\]]*\]/g, '')
      .replace(/\([^)]+\.(?:com|org|net|io|ai|co|edu|gov)[^)]+\)/gi, '')
      .replace(/https?:\/\/\S+/gi, '')
      .replace(/\^[^ ]+\^/g, '')
      .replace(/\|[^|]{0,80}\|/g, ' ')
      .replace(/\|/g, ' ')
      .replace(/\/[^/]{2,80}\//g, ' ')
      .replace(/\s*\.{3,}\s*/g, '. ')
      .replace(/\s*,\s*,/g, ',')
      .replace(/\s+([.,!?])/g, '$1')
  );
}

function removeMojibake(value: string): string {
  return value
    .replace(/â/g, '-')
    .replace(/â/g, '-')
    .replace(/â/g, "'")
    .replace(/â|â/g, '"')
    .replace(/Â/g, '')
    .replace(/[ËÉÄÅÃÖÜÀ-ÿ]{2,}/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function cleanSourceText(value?: string): string {
  if (!value) {
    return '';
  }

  const cleaned = removeMojibake(stripSourceNoise(value));
  return normalizeText(cleaned)
    .replace(/\s+\./g, '.')
    .replace(/(\.\s*){2,}/g, '. ')
    .trim();
}

function wordCount(value: string): number {
  return value.split(/\s+/).filter(Boolean).length;
}

function clampWords(value: string, maxWords: number): string {
  const words = normalizeText(value).split(/\s+/).filter(Boolean);
  if (words.length <= maxWords) {
    return normalizeText(value);
  }

  return `${words.slice(0, maxWords).join(' ').replace(/[,:;]$/, '')}.`;
}

function ensureWordRange(value: string, minWords: number, maxWords: number, extender: string): string {
  const current = normalizeText(value);
  if (wordCount(current) >= minWords) {
    return clampWords(current, maxWords);
  }

  return clampWords(`${current} ${extender}`, maxWords);
}

function stripSignalLead(value: string): string {
  return normalizeText(value)
    .replace(/^growth indicators include\s+/i, '')
    .replace(/^key risks include\s+/i, '')
    .replace(/^its strengths include\s+/i, '')
    .replace(/\.$/, '');
}

function ensureSentence(value: string): string {
  const cleaned = normalizeText(value);
  return /[.!?]$/.test(cleaned) ? cleaned : `${cleaned}.`;
}

function getCompanyProfile(query: string): CompanyIntelligenceProfile | undefined {
  return COMPANY_PROFILES[canonicalCompanyName(query)];
}

function sourceCorpus(results: AnakinSearchResult[]): string {
  return results
    .map((result) => cleanSourceText([result.title, result.snippet].filter(Boolean).join('. ')))
    .filter(Boolean)
    .join(' ');
}

function insufficientIntelligence(): BusinessIntelligence {
  return {
    companyOverview: INSUFFICIENT_INTELLIGENCE_OVERVIEW,
    industry: 'Unknown',
    category: 'Unknown' as BusinessIntelligence['category'],
    sentiment: 'neutral',
    confidence: 0,
    intelligenceScore: 0,
    keyFindings: [],
    competitors: [],
    growthSignals: [],
    riskSignals: [],
    recentDevelopments: [],
    keySources: [],
  };
}

function readableList(values: string[]): string {
  if (values.length <= 1) {
    return values[0] ?? '';
  }

  return `${values.slice(0, -1).join(', ')} and ${values[values.length - 1]}`;
}

function isReadableBusinessSentence(sentence: string): boolean {
  const cleaned = cleanSourceText(sentence);
  if (cleaned.length < 45 || cleaned.length > 260) {
    return false;
  }

  if (/[|*]|\u00e2\u0080|Ã|Â|Ë|É/.test(cleaned)) {
    return false;
  }

  return /[a-zA-Z]{4,}/.test(cleaned);
}

function isCleanSourceTitle(title: string): boolean {
  return (
    title.length > 0 &&
    !/[^\x00-\x7F]/.test(title) &&
    !/\b(page you requested cannot be found|not found|sorry)\b/i.test(title)
  );
}

function uniqueStrings(values: string[]): string[] {
  const seen = new Set<string>();
  return values.filter((value) => {
    const normalized = normalizeText(value).toLowerCase();
    if (seen.has(normalized) || normalized.length === 0) {
      return false;
    }
    seen.add(normalized);
    return true;
  });
}

function toNormalizedText(value: string): string {
  return value.trim().toLowerCase();
}

function sentenceMatchesKeywords(sentence: string, keywords: string[]): boolean {
  const normalized = toNormalizedText(sentence);
  return keywords.some((keyword) => normalized.includes(keyword));
}

function countKeywordOccurrences(text: string, keywords: string[]): number {
  const normalized = toNormalizedText(text);
  return keywords.reduce((count, keyword) => {
    const matches = normalized.split(keyword).length - 1;
    return count + Math.max(matches, 0);
  }, 0);
}

function countAliasMentions(text: string, aliases: string[]): number {
  const normalized = toNormalizedText(text);
  return aliases.reduce((count, alias) => {
    const escapedAlias = alias.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const pattern = alias.length <= 3
      ? new RegExp(`\\b${escapedAlias}\\b`, 'g')
      : new RegExp(escapedAlias, 'g');
    return count + (normalized.match(pattern)?.length ?? 0);
  }, 0);
}

function hostnameFromUrl(url?: string): string {
  if (!url) {
    return '';
  }

  try {
    return new URL(url).hostname.toLowerCase().replace(/^www\./, '');
  } catch {
    return '';
  }
}

function isTrustedDomain(hostname: string): boolean {
  return TRUSTED_DOMAINS.some((domain) => hostname === domain || hostname.endsWith(`.${domain}`));
}

function isLikelyCompanyWebsite(hostname: string, company: string): boolean {
  if (!hostname || isTrustedDomain(hostname)) {
    return false;
  }

  const compactHost = hostname.replace(/[^a-z0-9]/g, '');
  const hostLabels = hostname.split('.').map((label) => label.replace(/[^a-z0-9]/g, ''));
  const aliases = getCompanyAliases(company)
    .map((alias) => alias.replace(/[^a-z0-9]/g, ''))
    .filter((alias) => alias.length >= 2);

  return aliases.some((alias) => alias.length >= 4 ? compactHost.includes(alias) : hostLabels.includes(alias));
}

function isCompanyRelatedGithub(result: AnakinSearchResult, company: string): boolean {
  const hostname = hostnameFromUrl(result.url);
  if (hostname !== 'github.com' && !hostname.endsWith('.github.com')) {
    return false;
  }

  const content = [result.title, result.snippet, result.url].filter(Boolean).join(' ');
  return countAliasMentions(content, getCompanyAliases(company)) > 0 && scoreResultRelevance(result, company) >= 3;
}

function isTrustedCompanySource(result: AnakinSearchResult, company: string): boolean {
  const hostname = hostnameFromUrl(result.url);
  if (!hostname) {
    return false;
  }

  return (
    isTrustedDomain(hostname) ||
    isLikelyCompanyWebsite(hostname, company) ||
    isCompanyRelatedGithub(result, company)
  );
}

function sourceClassificationWeight(result: AnakinSearchResult, company: string): number {
  const hostname = hostnameFromUrl(result.url);
  const url = result.url ?? '';
  let weight = 1;

  if (result.title) {
    weight += 1.5;
  }

  if (isLikelyCompanyWebsite(hostname, company)) {
    weight += 1;
  }

  if (/(^|\/)(about|company|who-we-are|investors|overview)(\/|$|-)/i.test(url)) {
    weight += 3;
  }

  if (hostname.includes('wikipedia.org')) {
    weight += 2.5;
  }

  if (hostname.includes('linkedin.com')) {
    weight += 1.5;
  }

  return weight;
}

function resultBusinessModelText(result: AnakinSearchResult): string {
  return [
    result.title ? `${result.title} ${result.title}` : '',
    result.snippet ?? '',
    result.url ?? '',
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
}

function isWellFormedSearchResult(result: AnakinSearchResult): boolean {
  const title = cleanSourceText(result.title);
  const snippet = cleanSourceText(result.snippet);

  if (!title && !snippet) {
    return false;
  }

  if (title && !isCleanSourceTitle(title)) {
    return false;
  }

  if (result.url && !hostnameFromUrl(result.url)) {
    return false;
  }

  const combined = `${title} ${snippet}`;
  if (combined.length > 0 && !/[a-zA-Z]{3,}/.test(combined)) {
    return false;
  }

  return true;
}

function extractSentences(snippet?: string): string[] {
  if (!snippet) {
    return [];
  }

  return cleanSourceText(snippet)
    .split(SNIPPET_SPLIT_REGEX)
    .map((sentence) => ensureSentence(sentence))
    .filter((sentence) => sentence.length > 20);
}

function scoreResultRelevance(result: AnakinSearchResult, company: string): number {
  const content = [result.title, result.snippet, result.url]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

  const aliases = getCompanyAliases(company);
  let score = aliases.reduce((total, alias) => (content.includes(alias) ? total + 3 : total), 0);

  if (sentenceMatchesKeywords(content, COMPANY_CONTEXT_KEYWORDS)) {
    score += 2;
  }

  if (sentenceMatchesKeywords(content, COMPANY_PRODUCT_TERMS) && !sentenceMatchesKeywords(content, COMPANY_CONTEXT_KEYWORDS)) {
    score -= 1;
  }

  if (result.url && /(about|investors|news|press|blog)/i.test(result.url)) {
    score += 1;
  }

  return score;
}

function isResultCompanyRelated(result: AnakinSearchResult, company: string): boolean {
  return scoreResultRelevance(result, company) > 0;
}

function calculateSourceQuality(results: AnakinSearchResult[], company: string): number {
  if (results.length === 0) {
    return 0;
  }

  const qualityPoints = results.reduce((total, result) => {
    let score = 0;
    const title = cleanSourceText(result.title);
    const snippet = cleanSourceText(result.snippet);

    if (title.length >= 8) score += 20;
    if (snippet.length >= 40) score += 20;
    if (result.url && hostnameFromUrl(result.url)) score += 20;
    if (isTrustedCompanySource(result, company)) score += 25;
    if (scoreResultRelevance(result, company) >= MIN_AVERAGE_RELEVANCE) score += 15;

    return total + Math.min(score, 100);
  }, 0);

  return qualityPoints / results.length;
}

interface CompanySearchValidation {
  isValid: boolean;
  sourceCount: number;
  trustedSources: number;
  titleMentions: number;
  snippetMentions: number;
  averageRelevance: number;
  sourceQuality: number;
  confidence: number;
}

export function isValidCompanySearch(results: AnakinSearchResult[], query: string): CompanySearchValidation {
  const company = canonicalCompanyName(query);
  const cleanedResults = results.filter(isWellFormedSearchResult);
  const aliases = getCompanyAliases(company);
  const sourceCount = cleanedResults.length;
  const trustedSources = cleanedResults.filter((result) => isTrustedCompanySource(result, company)).length;
  const titleMentions = cleanedResults.reduce((count, result) => count + countAliasMentions(cleanSourceText(result.title), aliases), 0);
  const snippetMentions = cleanedResults.reduce((count, result) => count + countAliasMentions(cleanSourceText(result.snippet), aliases), 0);
  const totalRelevance = cleanedResults.reduce((total, result) => total + scoreResultRelevance(result, company), 0);
  const averageRelevance = sourceCount > 0 ? totalRelevance / sourceCount : 0;
  const sourceQuality = calculateSourceQuality(cleanedResults, company);
  const confidence = Math.min(
    100,
    Math.round(
      sourceCount * 8 +
      trustedSources * 18 +
      Math.min(titleMentions, 5) * 6 +
      Math.min(snippetMentions, 5) * 4 +
      averageRelevance * 8 +
      sourceQuality * 0.3
    )
  );

  return {
    isValid:
      sourceCount >= MIN_SOURCE_COUNT &&
      trustedSources >= MIN_TRUSTED_SOURCE_COUNT &&
      titleMentions >= MIN_TITLE_MENTIONS &&
      snippetMentions >= MIN_SNIPPET_MENTIONS &&
      averageRelevance >= MIN_AVERAGE_RELEVANCE &&
      sourceQuality >= MIN_SOURCE_QUALITY &&
      confidence >= MIN_VALIDATION_CONFIDENCE,
    sourceCount,
    trustedSources,
    titleMentions,
    snippetMentions,
    averageRelevance,
    sourceQuality,
    confidence,
  };
}

function buildCompanyOverview(results: AnakinSearchResult[], query: string): string {
  const subjectCompany = canonicalCompanyName(query);
  const profile = getCompanyProfile(subjectCompany);
  const classification = inferIndustryClassification(results, query);
  const category = classification.category;
  const corpus = sourceCorpus(results);
  const sourceFacts = extractSentences(corpus)
    .filter((sentence) => {
      const lower = toNormalizedText(sentence);
      return (
        getCompanyAliases(subjectCompany).some((alias) => lower.includes(alias)) &&
        sentenceMatchesKeywords(sentence, ['headquartered', 'founded', 'developed', 'operates', 'offers', 'platform', 'products', 'services'])
      );
    })
    .slice(0, 1);

  const base = profile
    ? `${profile.marketPosition} ${profile.productStrengths} ${profile.strategicAdvantages}`
    : `${subjectCompany} operates in ${classification.industry}, with available sources indicating a business focused on ${category === 'Other' ? 'technology markets' : classification.industry.toLowerCase()}.`;

  const supportingFact = !profile && sourceFacts[0] ? ` Source context: ${sourceFacts[0]}` : '';
  const summary = `${base}${supportingFact}`;
  const minimum = wordCount(summary) < 80 && profile
    ? `${summary} ${profile.growthIndicators}`
    : summary;

  return ensureWordRange(
    minimum,
    80,
    150,
    profile
      ? `Management attention is centered on ${stripSignalLead(profile.risks)}.`
      : 'The company should be assessed through market position, product traction, competitive intensity, and execution quality.'
  );
}

function buildRecentDevelopments(results: AnakinSearchResult[], query: string): string[] {
  const subjectCompany = canonicalCompanyName(query);
  const profile = getCompanyProfile(subjectCompany);
  const developments: string[] = [];
  const datedResults = results.filter((result) => result.date || result.lastUpdated);

  for (const result of results) {
    const sentences = extractSentences(result.snippet);
    for (const sentence of sentences) {
      if (
        sentenceMatchesKeywords(sentence, [...GROWTH_KEYWORDS, ...RISK_KEYWORDS]) ||
        /\b(recent|latest|this week|today|yesterday|announced|released|update|update[s]?)\b/i.test(sentence)
      ) {
        if (
          isReadableBusinessSentence(sentence) &&
          getCompanyAliases(subjectCompany).some((alias) => toNormalizedText(sentence).includes(alias))
        ) {
          developments.push(ensureSentence(sentence));
        }
      }
    }
  }

  if (profile) {
    developments.push(
      `${subjectCompany} is showing momentum through ${stripSignalLead(profile.growthIndicators)}.`,
      `${subjectCompany}'s strategic watch areas include ${stripSignalLead(profile.risks)}.`
    );
  } else if (developments.length === 0) {
    for (const result of datedResults) {
      const title = cleanSourceText(result.title);
      if (title && isReadableBusinessSentence(title)) {
        developments.push(`Recent source coverage includes ${title}.`);
      }
    }
  }

  return uniqueStrings(developments)
    .map((development) => clampWords(development, 32))
    .slice(0, 6);
}

function buildSignals(results: AnakinSearchResult[], keywords: string[]): string[] {
  const signals: string[] = [];

  for (const result of results) {
    const sentences = extractSentences(result.snippet);
    for (const sentence of sentences) {
      if (sentenceMatchesKeywords(sentence, keywords)) {
        signals.push(sentence);
      }
    }
  }

  return uniqueStrings(signals).slice(0, 6);
}

function buildGrowthSignals(results: AnakinSearchResult[], query: string): string[] {
  const subjectCompany = canonicalCompanyName(query);
  const profile = getCompanyProfile(subjectCompany);
  const extracted = buildSignals(results, GROWTH_KEYWORDS)
    .filter((signal) => {
      const normalized = toNormalizedText(signal);
      return (
        isReadableBusinessSentence(signal) &&
        getCompanyAliases(subjectCompany).some((alias) => normalized.includes(alias))
      );
    })
    .map((signal) => clampWords(signal, 28));
  const fallback = profile
    ? [
        profile.growthIndicators,
        `Demand signal: ${subjectCompany}'s core market is being shaped by enterprise AI adoption, cloud migration, advertising scale, or platform usage depending on its operating segment.`,
      ]
    : [`Growth signal: available sources point to continued activity in ${inferIndustryClassification(results, query).industry.toLowerCase()}.`];

  return uniqueStrings([...extracted, ...fallback]).slice(0, 4);
}

function buildRiskSignals(results: AnakinSearchResult[], query: string): string[] {
  const subjectCompany = canonicalCompanyName(query);
  const profile = getCompanyProfile(subjectCompany);
  const extracted = buildSignals(results, RISK_KEYWORDS)
    .filter((signal) => {
      const normalized = toNormalizedText(signal);
      return (
        isReadableBusinessSentence(signal) &&
        getCompanyAliases(subjectCompany).some((alias) => normalized.includes(alias))
      );
    })
    .map((signal) => clampWords(signal, 28));
  const fallback = profile
    ? [profile.risks]
    : [`Risk signal: competitive pressure and execution quality remain the main watch items for ${subjectCompany}.`];

  return uniqueStrings([...extracted, ...fallback]).slice(0, 4);
}

function identifySearchSubject(results: AnakinSearchResult[], query: string): string {
  const canonicalQuery = canonicalCompanyName(query);

  if (canonicalQuery) {
    return canonicalQuery;
  }

  const aggregated = results
    .map((result) => [result.title, result.snippet].filter(Boolean).join(' '))
    .join(' ')
    .toLowerCase();

  const counts = COMPETITOR_NAMES.map((company) => {
    const key = toNormalizedText(company);
    return {
      company,
      count: aggregated.split(key).length - 1,
    };
  });

  counts.sort((a, b) => b.count - a.count);

  if (counts[0]?.count > 0) {
    return counts[0].company;
  }

  return query;
}

function buildCompetitors(results: AnakinSearchResult[], query: string): string[] {
  const subjectCompany = identifySearchSubject(results, query);
  const subjectAliases = getCompanyAliases(subjectCompany);

  const sentences = results.flatMap((result) => {
    const title = result.title ? normalizeText(result.title) : '';
    const snippet = result.snippet ? normalizeText(result.snippet) : '';
    return [...extractSentences(title), ...extractSentences(snippet)];
  });

  const competitors: string[] = [];

  for (const sentence of sentences) {
    const normalized = toNormalizedText(sentence);
    const hasExclude = sentenceMatchesKeywords(sentence, COMPETITOR_EXCLUDE_KEYWORDS);

    if (hasExclude) {
      continue;
    }

    for (const competitor of COMPETITOR_NAMES) {
      if (competitor === subjectCompany) {
        continue;
      }

      const competitorAliases = getCompanyAliases(competitor);
      const hasCompetitorMention = competitorAliases.some((alias) => normalized.includes(alias));
      if (!hasCompetitorMention) {
        continue;
      }

      const hasSubjectMention = subjectAliases.some((alias) => normalized.includes(alias));
      const hasCompetitorContext = sentenceMatchesKeywords(sentence, COMPETITOR_CONTEXT_KEYWORDS);
      const hasDirectComparison = sentenceMatchesKeywords(sentence, ['vs', 'versus', 'against', 'rival']);

      if (hasSubjectMention && (hasCompetitorContext || hasDirectComparison)) {
        competitors.push(competitor);
      }
    }
  }

  const explicitCompetitors = uniqueStrings(competitors);
  if (explicitCompetitors.length > 0) {
    return explicitCompetitors.filter((competitor) => competitor !== subjectCompany);
  }

  const fallbackCompetitors = getCompanyProfile(subjectCompany)?.fallbackCompetitors ?? [];
  return uniqueStrings(fallbackCompetitors)
    .filter((competitor) => !getCompanyAliases(subjectCompany).includes(toNormalizedText(competitor)))
    .slice(0, 5);
}

function inferIndustryClassification(results: AnakinSearchResult[], query: string): { category: IntelligenceCategory; industry: string } {
  const company = canonicalCompanyName(query);
  const profile = getCompanyProfile(company);

  if (profile) {
    return {
      category: profile.category,
      industry: profile.industry,
    };
  }

  const scores = new Map<IntelligenceCategory, number>();

  for (const result of results) {
    const text = resultBusinessModelText(result);
    const sourceWeight = sourceClassificationWeight(result, company);

    for (const classifier of INDUSTRY_CLASSIFIERS) {
      for (const [keyword, keywordWeight] of classifier.keywords) {
        if (text.includes(keyword)) {
          scores.set(
            classifier.category,
            (scores.get(classifier.category) ?? 0) + keywordWeight * sourceWeight
          );
        }
      }
    }
  }

  const ranked = INDUSTRY_CLASSIFIERS
    .map((classifier) => ({
      ...classifier,
      score: scores.get(classifier.category) ?? 0,
    }))
    .sort((a, b) => b.score - a.score);

  const top = ranked[0];
  const technologyServicesScore = scores.get('Technology Services') ?? 0;
  const aiScore = scores.get('AI') ?? 0;

  if (technologyServicesScore >= 12 && aiScore <= technologyServicesScore * 1.25) {
    const servicesClassifier = INDUSTRY_CLASSIFIERS.find((classifier) => classifier.category === 'Technology Services');
    return {
      category: 'Technology Services',
      industry: servicesClassifier?.industry ?? 'IT Services and Consulting',
    };
  }

  if (!top || top.score < 10) {
    return {
      category: 'Other',
      industry: 'Technology',
    };
  }

  return {
    category: top.category,
    industry: top.industry,
  };
}

function detectCategory(results: AnakinSearchResult[], query = ''): IntelligenceCategory {
  return inferIndustryClassification(results, query).category;
}

function detectIndustry(category: IntelligenceCategory): string {
  return CATEGORY_INDUSTRY_LABELS[category] || 'Technology';
}

function buildSentiment(results: AnakinSearchResult[]): BusinessIntelligence['sentiment'] {
  let positiveCount = 0;
  let negativeCount = 0;

  for (const result of results) {
    const text = [result.title, result.snippet].filter(Boolean).join(' ');
    positiveCount += countKeywordOccurrences(text, POSITIVE_KEYWORDS);
    negativeCount += countKeywordOccurrences(text, NEGATIVE_KEYWORDS);
  }

  if (positiveCount >= negativeCount + 2) {
    return 'positive';
  }

  if (negativeCount >= positiveCount + 2) {
    return 'negative';
  }

  return 'neutral';
}

function buildConfidence(results: AnakinSearchResult[], category: IntelligenceCategory, query: string): number {
  let score = 40;
  const overview = buildCompanyOverview(results, query);
  const matchedResults = results.filter((item) => isResultCompanyRelated(item, canonicalCompanyName(query)));

  if (overview.length > 80) score += 15;
  if (results.some((item) => item.url)) score += 10;
  if (category !== 'Other') score += 15;
  if (matchedResults.length >= 2) score += 8;
  else if (matchedResults.length === 1) score += 4;
  if (buildCompetitors(results, query).length > 0) score += 10;
  if (buildSignals(results, GROWTH_KEYWORDS).length > 0 || buildSignals(results, RISK_KEYWORDS).length > 0) score += 10;

  return Math.min(100, Math.max(0, score));
}

function buildIntelligenceScore(
  sentiment: BusinessIntelligence['sentiment'],
  growthSignals: string[],
  riskSignals: string[]
): number {
  let score = 40;

  score += sentiment === 'positive' ? 20 : sentiment === 'neutral' ? 10 : -10;
  score += Math.min(growthSignals.length, 4) * 12;
  score -= Math.min(riskSignals.length, 4) * 10;

  if (growthSignals.length >= 3 && riskSignals.length === 0) {
    score += 10;
  }

  return Math.min(100, Math.max(0, score));
}

function buildKeyFindings(results: AnakinSearchResult[], query: string): string[] {
  const subjectCompany = canonicalCompanyName(query);
  const profile = getCompanyProfile(subjectCompany);
  const classification = inferIndustryClassification(results, query);
  const category = classification.category;
  const competitors = buildCompetitors(results, query);
  const recent = buildRecentDevelopments(results, query);
  const findings = profile
    ? [
        `Market position: ${profile.marketPosition}`,
        `Product strengths: ${profile.productStrengths}`,
        `Growth indicators: ${profile.growthIndicators}`,
        `Strategic advantages: ${profile.strategicAdvantages}`,
      ]
    : [
        `Market position: ${subjectCompany} is positioned in ${classification.industry.toLowerCase()}, based on the available source set.`,
        `Product strengths: source coverage points to a technology offering with category relevance in ${category === 'Other' ? 'general technology' : category}.`,
      ];

  if (recent[0]) {
    findings.push(`Recent development: ${recent[0].replace(/\.$/, '')}.`);
  }

  if (competitors.length > 0) {
    findings.push(`Competitive set: ${subjectCompany} is most closely benchmarked against ${readableList(competitors.slice(0, 5))}.`);
  }

  return uniqueStrings(findings.map((finding) => clampWords(ensureSentence(finding), 34))).slice(0, 8);
}

function buildKeySources(results: AnakinSearchResult[]): string[] {
  const sources: string[] = [];
  const normalizedSources = results
    .map((result) => {
      const title = cleanSourceText(result.title);
      if (title && result.url && isCleanSourceTitle(title)) {
        return `${title} - ${result.url}`;
      }
      if (!title && result.url) {
        return result.url;
      }
      return '';
    })
    .filter(Boolean) as string[];

  return uniqueStrings(normalizedSources).slice(0, 5);

  for (const result of results) {
    const title = cleanSourceText(result.title);
    if (title && result.url) {
      sources.push(`${title} — ${result.url}`);
    } else if (result.url) {
      sources.push(result.url ?? '');
    } else if (title) {
      sources.push(title);
    }
  }

  return uniqueStrings(sources)
    .map((source) => source.replace(/\u00e2\u0080\u0094/g, '-'))
    .slice(0, 5);
}

export function transformSearchResults(results: AnakinSearchResult[], query: string): BusinessIntelligence {
  const cleanedResults = Array.isArray(results) ? results.filter(isWellFormedSearchResult) : [];
  const validation = isValidCompanySearch(cleanedResults, query);

  if (!validation.isValid) {
    return insufficientIntelligence();
  }

  const subjectCompany = canonicalCompanyName(query);
  const profile = getCompanyProfile(subjectCompany);
  const classification = inferIndustryClassification(cleanedResults, query);
  const category = classification.category;
  const sentiment = buildSentiment(cleanedResults);
  const growthSignals = buildGrowthSignals(cleanedResults, query);
  const riskSignals = buildRiskSignals(cleanedResults, query);
  const competitors = buildCompetitors(cleanedResults, query);

  return {
    companyOverview: buildCompanyOverview(cleanedResults, query),
    industry: profile?.industry ?? classification.industry,
    category: category as BusinessIntelligence['category'],
    sentiment,
    confidence: buildConfidence(cleanedResults, category, query),
    intelligenceScore: buildIntelligenceScore(sentiment, growthSignals, riskSignals),
    keyFindings: buildKeyFindings(cleanedResults, query),
    competitors,
    growthSignals,
    riskSignals,
    recentDevelopments: buildRecentDevelopments(cleanedResults, query),
    keySources: buildKeySources(cleanedResults),
  };
}

/**
 * Sample transformation using OpenAI search results.
 *
 * const openAiResults: AnakinSearchResult[] = [
 *   {
 *     title: 'OpenAI raises $300M in new funding round',
 *     url: 'https://example.com/openai-funding',
 *     snippet: 'OpenAI announced a $300M funding round and is expanding hiring in Europe.',
 *     date: '2026-05-24',
 *     lastUpdated: '2026-05-24',
 *   },
 *   {
 *     title: 'OpenAI launches new developer tools',
 *     url: 'https://example.com/openai-product-launch',
 *     snippet: 'OpenAI rolled out a new product launch for developer APIs and partnerships with cloud providers.',
 *     date: '2026-05-20',
 *     lastUpdated: '2026-05-20',
 *   },
 * ];
 *
 * const intelligence = transformSearchResults(openAiResults);
 * console.log(intelligence);
 */
