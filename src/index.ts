import { handleAnalyze } from "./analyze";

export interface Env {
  ASSETS: Fetcher;
  GEMINI_API_KEY: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/analyze") {
      if (request.method !== "POST") {
        return new Response(
          JSON.stringify({ error: "Method not allowed — use POST" }),
          { status: 405, headers: { "Content-Type": "application/json" } },
        );
      }
      return handleAnalyze(request, env);
    }

    // Fall through to static assets (index.html, etc.)
    return env.ASSETS.fetch(request);
  },
};
