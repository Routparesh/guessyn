import dotenv from "dotenv";
import { YouTube } from "youtube-sr";
import Song from "../models/Song.js";
import connectDB from "../config/db.js";

dotenv.config();
await connectDB();

const searchYouTubeVideoId = async (query) => {
  const results = await YouTube.search(query, { limit: 1 });
  return results?.[0]?.id?.videoId ?? null;
};

try {
  const songs = await Song.find({ videoId: { $exists: false } });

  for (const song of songs) {
    const searchQuery = `${song.song} ${song.movie} song`;
    console.log(`🔍 Searching for: ${searchQuery}`);

    const videoId = await searchYouTubeVideoId(searchQuery);

    if (videoId) {
      song.videoId = videoId;
      await song.save();
      console.log(`Updated: ${song.song} → ${videoId}`);
    } else {
      console.warn(`No video found for: ${searchQuery}`);
    }
  }

  console.log("YouTube videoId update done.");
  process.exit(0);
} catch (err) {
  console.error(" Error fetching YouTube IDs:", err.message);
  process.exit(1);
}
