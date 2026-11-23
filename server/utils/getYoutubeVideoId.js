import { YouTube } from "youtube-sr";

/**
 * Search YouTube for the first video matching the query and return its videoId.
 * This uses the `youtube-sr` library which performs a scrape‑based search and does
 * not require a Google Cloud API key.
 */
export default async function getYoutubeVideoId(query) {
  try {
    const results = await YouTube.search(query, { limit: 1 });
    return results?.[0]?.id?.videoId ?? null;
  } catch (err) {
    console.error("YouTube search error:", err);
    return null;
  }
}
