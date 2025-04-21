import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// This component handles scrolling to top when navigating between routes
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top when pathname changes
    window.scrollTo(0, 0);
  }, [pathname]);

  // Add a separate effect for page refresh
  useEffect(() => {
    // Scroll to top when the page loads/refreshes
    const handlePageLoad = () => {
      window.scrollTo(0, 0);
    };

    // Add event listener for page load
    window.addEventListener('load', handlePageLoad);
    
    // Call it once immediately for current page load
    handlePageLoad();

    // Clean up
    return () => {
      window.removeEventListener('load', handlePageLoad);
    };
  }, []);

  // This component doesn't render anything
  return null;
}

export default ScrollToTop; 