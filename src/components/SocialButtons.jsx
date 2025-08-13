import React, { useContext } from 'react';
import { NavbarContext } from './Header';
import InstagramButton from './InstagramButton';
import FacebookButton from './FacebookButton';
import WhatsAppButton from './WhatsAppButton';
import LinkedInButton from './LinkedInButton';

const SocialButtons = () => {
  const { expanded, isMobile } = useContext(NavbarContext);
  
  // Return null if there's no context yet (prevents errors during initial render)
  if (expanded === undefined) return null;
  
  // If mobile menu is expanded, these buttons will be handled in the Header component
  if (isMobile && expanded) {
    return null;
  }
  
  // Otherwise show the normal floating buttons
  return (
    <div className="social-buttons">
      <InstagramButton />
      <FacebookButton />
      <WhatsAppButton />
      <LinkedInButton />
    </div>
  );
};

export default SocialButtons; 