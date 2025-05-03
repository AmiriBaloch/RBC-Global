import React from 'react';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import handleApplyNow from '../../utils/applyNowHandler';

/**
 * A reusable Apply Now button component that can be used anywhere in the site
 * This ensures consistent styling and behavior for all Apply Now buttons
 * 
 * @param {Object} props - Component props
 * @param {string} props.jobTitle - Optional job title to pre-fill in the form
 * @param {string} props.size - Button size (sm, md, lg)
 * @param {string} props.className - Additional CSS classes
 * @param {Object} props.style - Additional inline styles
 * @param {boolean} props.block - Whether button should be full width
 * @param {string} props.text - Custom button text (defaults to "Apply Now")
 */
const ApplyButton = ({ 
  jobTitle = '', 
  size = 'md', 
  className = '', 
  style = {}, 
  block = false,
  text = 'Apply Now'
}) => {
  const navigate = useNavigate();
  
  const handleClick = (e) => {
    handleApplyNow(e, jobTitle, navigate);
  };
  
  const baseClass = `apply-now-${size === 'lg' ? 'button-large' : 'button'}`;
  const fullClassName = `${baseClass} ${className}`;
  
  const defaultStyle = {
    backgroundColor: '#2AA96B',
    borderColor: '#2AA96B',
    ...(block ? { width: '100%' } : {}),
    ...style
  };
  
  return (
    <Link to="/join-our-team" onClick={handleClick}>
      <Button 
        variant="primary" 
        size={size !== 'lg' ? size : undefined}
        className={fullClassName}
        style={defaultStyle}
      >
        {text}
      </Button>
    </Link>
  );
};

export default ApplyButton; 