// VideoPlayer.tsx
import React, { useEffect, useState } from 'react';

const VideoPlayer = ({ src }: { src: string }) => {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setError(null); // Clear any previous errors when the source changes
  }, [src]);

  const handleError = (event: React.SyntheticEvent<HTMLVideoElement, Event>) => {  // Corrected event type
    const videoError = (event.target as HTMLVideoElement).error;

    if (videoError) {
      switch (videoError.code) {
        case MediaError.MEDIA_ERR_ABORTED:
          setError('Video playback aborted.');
          break;
        case MediaError.MEDIA_ERR_NETWORK:
          setError('A network error caused the video download to fail.');
          break;
        case MediaError.MEDIA_ERR_DECODE:
          setError('The video playback was aborted due to a corruption problem or because the video used features your browser did not support.');
          break;
        case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
          setError('The video could not be loaded, either because the server or network failed or because the format is not supported.');
          break;
        default:
          setError('An unknown error occurred.');
          break;
      }
    }
  };

  return (
    <div>
      <video controls width="423" height="500" src={src} onError={handleError}>
        Your browser does not support the video tag.
      </video>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
    </div>
  );
};

export default VideoPlayer;