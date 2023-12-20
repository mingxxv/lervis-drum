import { useState, useEffect } from 'react';

const Drums = () => {
  const [isSoundPlaying, setIsSoundPlaying] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      // Map of key-sound pairs
      const keySoundMap = {
        'a': '/kick.wav',
        's': '/snare.wav',
        'd': '/close_hh.wav',
        'f': '/open_hh.wav',
      };

      const key = event.key.toLowerCase();
      const soundPath = keySoundMap[key];

      if (soundPath) {
        playSound(soundPath);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []); // Empty dependency array to ensure the event listener is added and removed only once

  const playSound = (soundPath) => {
    if (!isSoundPlaying) {
      const audio = new Audio(soundPath);
      audio.play();

      // Set the flag to true to indicate that the sound is currently playing
      setIsSoundPlaying(true);

      // Add an event listener to reset the flag when the sound ends
      audio.addEventListener('ended', () => {
        setIsSoundPlaying(false);
      });
    }
  };

  return (
    <div>
      <p>Press A, S, D, or F to play different sounds!</p>
    </div>
  );
};

export default Drums;
