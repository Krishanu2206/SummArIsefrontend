"use client";

import ReactPlayer from "react-player/youtube";

// function generateYouTubeUrl(videoId: string) {
//   const baseUrl = new URL("https://www.youtube.com/watch");
//   baseUrl.searchParams.append("v", videoId);
//   return baseUrl.href;
// }

export default function YouTubePlayer({videoId} : {videoId : string}) {
  if (!videoId) return null;
  const videoUrl = videoId;

  return (
    <div className="relative aspect-video rounded-md overflow-hidden">
      <ReactPlayer
        url={videoUrl}
        width="100%"
        height="100%"
        controls
        className="absolute top-0 left-0"
      />
    </div>
  );
}