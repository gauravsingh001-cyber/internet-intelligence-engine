import { normalizeQuery } from '@/lib/query';

export interface AnakinSearchRequest {
  q: string;
  limit?: number;
}

export interface AnakinSearchResult {
  title: string;
  url?: string;
  snippet?: string;
  date?: string;
  lastUpdated?: string;
}

export interface AnakinSearchResponse {
  query: string;
  results: AnakinSearchResult[];
  total: number;
  source: "live" | "demo";
  status: "ok" | "warning";
  warning?: string;
}

const DEFAULT_BASE_URL = "https://api.anakin.io/v1";

function createError(
  message: string,
  status = 500,
  code?: string
): Error & { status: number; code?: string } {
  const error = new Error(message) as Error & {
    status: number;
    code?: string;
  };

  error.status = status;
  error.code = code;

  return error;
}

interface AnakinSearchPayload {
  results?: Array<{
    title?: string;
    url?: string;
    snippet?: string;
    date?: string;
    last_updated?: string;
  }>;
}

function normalizeResponse(
  payload: AnakinSearchPayload,
  query: string,
  source: "live" | "demo"
): AnakinSearchResponse {
  const results = Array.isArray(payload?.results)
    ? payload.results.map((item) => ({
        title: item?.title ?? "Untitled",
        url: item?.url,
        snippet: item?.snippet,
        date: item?.date,
        lastUpdated: item?.last_updated,
      }))
    : [];

  return {
    query,
    results,
    total: results.length,
    source,
    status: source === "live" ? "ok" : "warning",
    warning:
      source === "demo"
        ? "Using demo results because ANAKIN_API_KEY is not configured."
        : undefined,
  };
}

export async function searchAnakin(
  request: AnakinSearchRequest
): Promise<AnakinSearchResponse> {
  const query = normalizeQuery(request.q ?? '');

  if (!query) {
    throw createError(
      "The search query cannot be empty.",
      400,
      "INVALID_QUERY"
    );
  }

  const apiKey = process.env.ANAKIN_API_KEY;

  // Demo fallback
  if (!apiKey) {
    return normalizeResponse(
      {
        results: [
          {
            title: `Demo result for "${query}"`,
            url: "https://anakin.ai/docs",
            snippet:
              "This is a demo response because ANAKIN_API_KEY is not configured.",
            date: new Date().toISOString(),
            last_updated: new Date().toISOString(),
          },
        ],
      },
      query,
      "demo"
    );
  }

  const controller = new AbortController();

  const timeout = setTimeout(() => {
    controller.abort();
  }, 10000);

  try {
    const response = await fetch(
      `${process.env.ANAKIN_API_BASE_URL ?? DEFAULT_BASE_URL}/search`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": apiKey.trim(),
        },
        body: JSON.stringify({
          prompt: query,
          limit: request.limit ?? 5,
        }),
        cache: "no-store",
        signal: controller.signal,
      }
    );

    const rawText = await response.text();

    if (!rawText) {
      throw createError(
        "Empty response from Anakin API.",
        500,
        "EMPTY_RESPONSE"
      );
    }

    let payload: unknown;

    try {
      payload = JSON.parse(rawText);
    } catch {
      throw createError(
        "Anakin API returned non-JSON response.",
        500,
        "INVALID_JSON"
      );
    }

    if (!response.ok) {
      const body = typeof payload === 'object' && payload !== null ? payload as Record<string, unknown> : {};
      throw createError(
        (body?.message as string) ||
          (body?.error as string) ||
          "Anakin Search API returned an error.",
        response.status,
        "ANAKIN_API_ERROR"
      );
    }

    const parsedPayload = typeof payload === 'object' && payload !== null ? (payload as AnakinSearchPayload) : {};
    return normalizeResponse(parsedPayload, query, "live");
  } catch (error) {
    if ((error as Error).name === "AbortError") {
      throw createError(
        "Anakin Search API request timed out.",
        504,
        "REQUEST_TIMEOUT"
      );
    }

    throw error;
  } finally {
    clearTimeout(timeout);
  }
}