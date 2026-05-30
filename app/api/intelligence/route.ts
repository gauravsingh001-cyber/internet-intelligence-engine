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
    const searchResult = await searchAnakin({ q: query, limit: 5 });
    const intelligence = transformSearchResults(searchResult.results, query);

    console.log(JSON.stringify(intelligence, null, 2));

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

    return NextResponse.json(
      {
        ok: false,
        intelligence: null,
        error: message,
      },
      { status }
    );
  }
}
