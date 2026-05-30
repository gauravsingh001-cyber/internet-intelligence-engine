export const COMPANY_CANONICAL_NAMES: Record<string, string> = {
  openai: 'OpenAI',
  google: 'Google',
  alphabet: 'Google',
  microsoft: 'Microsoft',
  meta: 'Meta',
  facebook: 'Meta',
  amazon: 'Amazon',
  aws: 'Amazon',
  apple: 'Apple',
  nvidia: 'NVIDIA',
  xai: 'xAI',
  anthropic: 'Anthropic',
  mistral: 'Mistral',
  cohere: 'Cohere',
  infosys: 'Infosys',
  'infosys limited': 'Infosys',
  tcs: 'TCS',
  'tata consultancy services': 'TCS',
  wipro: 'Wipro',
  hcl: 'HCL',
  hcltech: 'HCL',
  'hcl technologies': 'HCL',
  accenture: 'Accenture',
  ibm: 'IBM',
};

export function normalizeQuery(query: string): string {
  return query.trim().replace(/\s+/g, ' ').toLowerCase();
}

export function canonicalCompanyName(value: string): string {
  const normalizedValue = normalizeQuery(value);
  return COMPANY_CANONICAL_NAMES[normalizedValue] ?? value.trim();
}

export function getCompanyAliases(value: string): string[] {
  const normalized = normalizeQuery(value);
  const aliases = new Set<string>([normalized]);

  for (const [alias, canonical] of Object.entries(COMPANY_CANONICAL_NAMES)) {
    if (normalizeQuery(canonical) === normalized) {
      aliases.add(alias);
      aliases.add(normalizeQuery(canonical));
    }
  }

  if (normalized.endsWith(' inc') || normalized.endsWith(' ltd')) {
    aliases.add(normalized.replace(/\b(?:inc|ltd)\b/g, '').trim());
  }

  return Array.from(aliases).filter(Boolean);
}

export function matchesCompanyName(text: string, companyName: string): boolean {
  const normalizedText = text.trim().toLowerCase();
  return getCompanyAliases(companyName).some((alias) => normalizedText.includes(alias));
}
