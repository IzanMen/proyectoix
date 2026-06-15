export interface SanityClientConfig {
  projectId?: string;
  dataset?: string;
  apiVersion?: string;
  useCdn?: boolean;
  perspective?: string;
}

export interface SanityClient {
  fetch<T = unknown>(query: string, params?: Record<string, unknown>): Promise<T>;
  config(): SanityClientConfig;
}

export function createClient(config: SanityClientConfig): SanityClient {
  const { projectId, dataset, apiVersion = "2025-01-01", useCdn = true } = config;

  return {
    config: () => config,
    fetch: async <T = unknown>(
      query: string,
      params: Record<string, unknown> = {}
    ): Promise<T> => {
      if (!projectId || !dataset) {
        return [] as unknown as T;
      }

      const cdn = useCdn ? "apicdn.sanity.io" : "api.sanity.io";
      const encodedQuery = encodeURIComponent(query);
      const paramStr = Object.entries(params)
        .map(([k, v]) => `&$${encodeURIComponent(k)}=${encodeURIComponent(JSON.stringify(v))}`)
        .join("");

      const url = `https://${projectId}.${cdn}/v${apiVersion}/data/query/${dataset}?query=${encodedQuery}${paramStr}`;

      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Sanity fetch error: ${res.status} ${res.statusText}`);
      }
      const json = await res.json();
      return json.result as T;
    },
  };
}
