import { NextResponse } from 'next/server';
import { searchAnakin } from '@/lib/anakin';
import { transformSearchResults } from '@/lib/intelligence';
import { normalizeQuery } from '@/lib/query';

const DEFAULT_QUERY = 'OpenAI';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const rawQuery = searchParams.get('q') ?? DEFAULT_QUERY;
    const query = normalizeQuery(rawQuery) || normalizeQuery(DEFAULT_QUERY);

    console.info('[api.intelligence.request]', {
      rawQuery,
      query,
      hasAnakinApiKey: Boolean(process.env.ANAKIN_API_KEY?.trim()),
      anakinApiKeyLength: process.env.ANAKIN_API_KEY?.trim().length ?? 0,
      anakinBaseUrl: process.env.ANAKIN_API_BASE_URL ?? null,
    });

    const searchResult = await searchAnakin({ q: query, limit: 5 });
    const intelligence = transformSearchResults(searchResult.results, query);

    console.info('[api.intelligence.success]', {
      query,
      searchSource: searchResult.source,
      resultCount: searchResult.total,
      confidence: intelligence.confidence,
      intelligenceScore: intelligence.intelligenceScore,
    });

    return NextResponse.json(
      {
        ok: true,
        intelligence,
      },
      { status: 200 }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error while generating intelligence.';
    const status = error && typeof error === 'object' && 'status' in error ? Number((error as { status?: number }).status) || 500 : 500;
    const code = error && typeof error === 'object' && 'code' in error ? String((error as { code?: string }).code) : 'UNKNOWN_ERROR';

    console.error('[api.intelligence.error]', {
      status,
      code,
      message,
    });

    return NextResponse.json(
      {
        ok: false,
        intelligence: null,
        error: message,
        code,
      },
      { status }
    );
  }
}
