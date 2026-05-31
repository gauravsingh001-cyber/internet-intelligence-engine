import { NextResponse } from 'next/server';
import { searchAnakin } from '@/lib/anakin';
import { normalizeQuery } from '@/lib/query';

const DEFAULT_QUERY = 'OpenAI';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const rawQuery = searchParams.get('q') ?? DEFAULT_QUERY;
  const query = normalizeQuery(rawQuery) || normalizeQuery(DEFAULT_QUERY);

  try {
    console.info('[api.search.request]', {
      rawQuery,
      query,
      hasAnakinApiKey: Boolean(process.env.ANAKIN_API_KEY?.trim()),
      anakinApiKeyLength: process.env.ANAKIN_API_KEY?.trim().length ?? 0,
      anakinBaseUrl: process.env.ANAKIN_API_BASE_URL ?? null,
    });

    const result = await searchAnakin({ q: query, limit: 5 });

    console.info('[api.search.success]', {
      query,
      source: result.source,
      total: result.total,
      status: result.status,
    });

    return NextResponse.json(
      {
        ok: true,
        query,
        results: result.results,
        total: result.total,
        source: result.source,
        status: result.status,
        warning: result.warning ?? null,
        isLoading: false,
      },
      { status: 200 }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error while searching.';
    const status = error && typeof error === 'object' && 'status' in error ? Number((error as { status?: number }).status) || 500 : 500;
    const code = error && typeof error === 'object' && 'code' in error ? String((error as { code?: string }).code) : 'UNKNOWN_ERROR';

    console.error('[api.search.error]', {
      status,
      code,
      message,
    });

    return NextResponse.json(
      {
        ok: false,
        query,
        results: [],
        total: 0,
        source: 'error',
        status: 'error',
        warning: message,
        code,
        isLoading: false,
      },
      { status }
    );
  }
}
