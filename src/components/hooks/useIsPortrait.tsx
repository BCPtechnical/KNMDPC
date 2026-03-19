import { useState, useEffect } from 'react';

// Custom hook to check if width < height (portrait orientation)
export default function useIsPortrait() {
  // Default to false for SSR
  const [isPortrait, setIsPortrait] = useState(false);

  useEffect(() => {
    // Function to check if viewport is in portrait mode (width < height)
    const checkOrientation = () => {
      setIsPortrait(window.innerWidth < window.innerHeight);
    };

    // Check on mount
    checkOrientation();

    // Add listener for resize events
    window.addEventListener(`resize`, checkOrientation);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener(`resize`, checkOrientation);
    };
  }, []);

  return isPortrait;
}
