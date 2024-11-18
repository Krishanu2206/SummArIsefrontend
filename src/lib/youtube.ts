export function isValidYouTubeIdOrUrl(videoIdOrURL : string) {
  // Regex to match YouTube video IDs (11 characters) and typical YouTube video URLs
  const videoIdRegex = /^[a-zA-Z0-9_-]{11}$/;
  const urlRegex = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/]+\/.*|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

  // Check if the input is a valid YouTube video ID
  if (videoIdRegex.test(videoIdOrURL)) {
    return true;
  }

  // Check if the input matches a YouTube URL and extract the video ID
  const match = videoIdOrURL.match(urlRegex);
  if (match && match[1]) {
    return true;
  }

  // If neither condition is met, the input is not valid
  return false;
}

export function isValidYouTubeUrl(videoURL : string) {
  // Regular expression to match common YouTube URL patterns
  const urlRegex = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|playlist\?list=)|youtu\.be\/)([a-zA-Z0-9_-]+)/;

  return urlRegex.test(videoURL);
}
