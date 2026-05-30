import { NextResponse } from 'next/server';
import { searchAnakin } from '@/lib/anakin';
import { normalizeQuery } from '@/lib/query';

const DEFAULT_QUERY = 'OpenAI';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const rawQuery = searchParams.get('q') ?? DEFAULT_QUERY;
  const query = normalizeQuery(rawQuery) || normalizeQuery(DEFAULT_QUERY);

  try {
    const result = await searchAnakin({ q: query, limit: 5 });

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

    return NextResponse.json(
      {
        ok: false,
        query,
        results: [],
        total: 0,
        source: 'error',
        status: 'error',
        warning: message,
        isLoading: false,
      },
      { status }
    );
  }
}
