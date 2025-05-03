/**
 * Utility function to handle Apply Now button clicks across the website
 * This ensures consistent behavior when users click Apply Now from any location
 * 
 * @param {Event} e - The click event
 * @param {string} jobTitle - Optional job title for pre-filling the form
 * @param {function} navigate - React Router's navigate function (if available)
 */
export const handleApplyNow = (e, jobTitle = '', navigate = null) => {
  // Prevent default behavior
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }
  
  // Check if we're already on the careers page
  const isOnCareersPage = window.location.pathname === '/join-our-team' || 
                          window.location.pathname === '/careers';
  
  if (isOnCareersPage) {
    // If already on careers page, just scroll to the form
    scrollToApplicationForm(jobTitle);
  } else {
    // Navigate to the careers page with a hash and query parameter
    const url = `/join-our-team#application-form-section${jobTitle ? `?position=${encodeURIComponent(jobTitle)}` : ''}`;
    
    // Use the navigate function if provided (from useNavigate hook)
    if (navigate) {
      navigate(url);
      
      // We still need to scroll after navigation
      setTimeout(() => {
        scrollToApplicationForm(jobTitle);
      }, 500);
    } else {
      // Fallback to window.location
      window.location.href = url;
    }
  }
};

/**
 * Helper function to scroll to the application form and set position if needed
 */
function scrollToApplicationForm(jobTitle = '') {
  // Give the DOM time to render
  setTimeout(() => {
    const formElement = document.getElementById('application-form-section');
    if (formElement) {
      // Scroll to the form with offset to account for fixed headers
      window.scrollTo({
        top: formElement.offsetTop - 50,
        behavior: 'smooth'
      });
      
      // Try to find and set the position dropdown if a job title was provided
      if (jobTitle) {
        setTimeout(() => {
          const positionSelect = document.querySelector('select[name="position"]');
          if (positionSelect) {
            // Set the value if it matches an option
            for (let i = 0; i < positionSelect.options.length; i++) {
              if (positionSelect.options[i].text === jobTitle) {
                positionSelect.value = positionSelect.options[i].value;
                // Trigger change event
                const event = new Event('change', { bubbles: true });
                positionSelect.dispatchEvent(event);
                break;
              }
            }
          }
        }, 300);
      }
    }
  }, 100);
}

export default handleApplyNow; 