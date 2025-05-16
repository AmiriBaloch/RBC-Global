import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

// Page components
import CarouselSlider from './components/CarouselSlider';
import Introduction from './components/Introduction';
import StickyNotes from './components/StickyNotes';
import WhereWeStand from './components/WhereWeStand';
import ClientsTicker from './components/ClientsTicker';
import AboutUsSimple from './components/AboutUsSimple';
import Team from './components/Team';
import Careers from './components/Careers';
import CoreContributors from './components/CoreContributors';
import Announcements from './components/Announcements';
import OurIdeas from './components/OurIdeas';
import Projects from './components/Projects';
import ApplicantsList from './components/ApplicantsList';

// Import new Newsroom component
import Newsroom from './components/Newsroom';

// Our Company pages (formerly Who We Are)
import AboutOverview from './components/AboutOverview';
import OurValues from './components/OurValues';
import OurTrust from './components/OurTrust';

// Meet Our Experts pages (formerly What We Do)
import ServicesOverview from './components/ServicesOverview';
import ServicesConsultants from './components/ServicesConsultants';
import ServicesHealthExperts from './components/ServicesHealthExperts';
import ServicesITExperts from './components/ServicesITExperts';
import ServicesResearchers from './components/ServicesResearchers';
import ServicesAdvisors from './components/ServicesAdvisors';
import ServicesData from './components/ServicesData';

// Social buttons
import WhatsAppButton from './components/WhatsAppButton';
import FacebookButton from './components/FacebookButton';
import InstagramButton from './components/InstagramButton';
import SeeListButton from './components/SeeListButton';

// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Only log in development mode
const isDev = process.env.NODE_ENV === 'development';
const logDebug = (message, data) => {
  if (isDev && false) { // Set to false to disable debug logs
    if (data) {
      console.debug('[App]', message, data);
    } else {
      console.debug('[App]', message);
    }
  }
};

// Loading spinner component
const LoadingSpinner = () => (
  <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

// Placeholder for pages not yet implemented
const ComingSoon = ({ title }) => {
  return (
    <div className="coming-soon-page">
      <div className="page-hero">
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-md-8">
              <h1 className="display-4 mb-3">{title}</h1>
              <p className="lead fw-bold">This page is coming soon</p>
            </div>
          </div>
        </div>
      </div>
      <div className="container py-5 text-center">
        <div className="py-5 my-5">
          <h2 className="mb-4">We're working on it!</h2>
          <p className="fs-5 mb-4">This page is currently under development and will be available soon.</p>
          <p className="fs-5">Please check back later for updates.</p>
        </div>
      </div>
    </div>
  );
};

// Placeholder component for idea details
const IdeaDetails = () => {
  return <ComingSoon title="Idea Details" />;
};

// Placeholder component for article details
const ArticleDetails = () => {
  return <ComingSoon title="Article Details" />;
};

// Placeholder component for all articles
const AllArticles = () => {
  return <ComingSoon title="All Articles" />;
};

// Placeholder component for Project Details page (replacing the deleted component)
const ProjectDetailsPlaceholder = () => {
  return <ComingSoon title="Project Details" />;
};

// Home page content component for WHO WE ARE page
export const HomePageContent = () => {
  return (
    <>
      <div className="full-width-container no-top-space no-bottom-space" style={{ backgroundColor: '#E3EBF2', padding: 0, margin: 0 }}>
        <CarouselSlider />
      </div>
      <Introduction />
      <StickyNotes />
      <WhereWeStand />
      <Projects limitCount={9} showViewAllButton={true} />
      <ClientsTicker title="Our Valuable Clients" />
      <CoreContributors />
    </>
  );
};

// Set default title for the entire app
document.title = "RBC Global";

// WHO WE ARE landing page
const WhoWeAre = () => {
  useEffect(() => {
    document.title = "RBC | WHO WE ARE";
  }, []);
  
  return <HomePageContent />;
};

// Page View Tracker component for GTM
const PageViewTracker = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Default title for the home page
    if (location.pathname === '/') {
      document.title = "RBC Global";
    }
    
    // Make sure dataLayer exists
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      
      try {
        // Clear the existing event data to avoid interference between navigations
        window.dataLayer.push({
          event: 'clear-page-data'
        });
        
        // Reset dataLayer object for this page
        window.dataLayer.push({
          'page.path': undefined,
          'page.title': undefined,
          'virtualPageURL': undefined, 
          'virtualPageTitle': undefined
        });
        
        // Create a unique event ID to ensure distinct page views
        const uniqueId = `pageview-${Date.now()}-${Math.floor(Math.random() * 1000000)}`;
        
        // First push a standard GA4 page_view event that most tags use by default
        window.dataLayer.push({
          event: 'page_view',
          page_location: window.location.href,
          page_path: location.pathname,
          page_title: document.title,
          send_to: 'GTM-MLHJMJ7M'
        });
        
        // Then push our custom virtualPageview event
        window.dataLayer.push({
          event: 'virtualPageview',
          virtualPageURL: location.pathname,
          virtualPageTitle: document.title,
          pageTimestamp: new Date().getTime(),
          eventId: uniqueId,
          'gtm.uniqueEventId': Math.floor(Math.random() * 1000000000),
          page: {
            path: location.pathname,
            title: document.title,
            referrer: document.referrer,
            host: window.location.hostname
          }
        });
        
        console.log(`Pageview tracked: ${location.pathname} (${uniqueId})`);
      } catch (err) {
        console.error('Error pushing to dataLayer:', err);
      }
    }
  }, [location]);
  
  return null;
};

function App() {
  // Set browser's scrollRestoration to 'manual' to prevent browser's default scroll position restoration
  useEffect(() => {
    // Set default title
    if (window.location.pathname === '/' || window.location.pathname === '') {
      document.title = "RBC Global";
    }
    
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    
    // Force scroll to top on first load
    window.scrollTo(0, 0);
    
    // In development mode, clean up console warnings about third-party cookies
    if (isDev) {
      const originalConsoleWarn = console.warn;
      console.warn = function(...args) {
        // Filter out specific cookie and CORS warnings that clutter the console
        if (args[0] && typeof args[0] === 'string') {
          if (args[0].includes('third-party cookie') || 
              args[0].includes('CORS') || 
              args[0].includes('Chrome is moving towards a state')) {
            return;
          }
        }
        originalConsoleWarn.apply(console, args);
      };
      
      // Restore original on cleanup
      return () => {
        console.warn = originalConsoleWarn;
      };
    }
  }, []);

  return (
    <Router basename="/">
      <ScrollToTop />
      <PageViewTracker />
      <div className="App">
        <Header />
        <Routes>
          {/* WHO WE ARE as the home page */}
          <Route path="/" element={<WhoWeAre />} />
          
          {/* OUR COMPANY routes (formerly OUR WORKPLACE) */}
          <Route path="/our-company">
            <Route index element={<Navigate to="/our-company/locations" replace />} />
            <Route path="locations" element={<AboutOverview />} />
            <Route path="who-trusts-us" element={<OurTrust />} />
            <Route path="what-we-believe" element={<OurValues />} />
            {/* Catch any other /our-company/* paths and redirect to locations */}
            <Route path="*" element={<Navigate to="/our-company/locations" replace />} />
          </Route>
          
          {/* Legacy OUR WORKPLACE routes for backward compatibility */}
          <Route path="/our-workplace">
            <Route index element={<Navigate to="/our-company/locations" replace />} />
            <Route path="offices" element={<Navigate to="/our-company/locations" replace />} />
            <Route path="accredited" element={<Navigate to="/our-company/who-trusts-us" replace />} />
            <Route path="values" element={<Navigate to="/our-company/what-we-believe" replace />} />
            <Route path="*" element={<Navigate to="/our-company/locations" replace />} />
          </Route>
          
          {/* Legacy ABOUT routes for backward compatibility */}
          <Route path="/about">
            <Route index element={<Navigate to="/our-company/locations" replace />} />
            <Route path="overview" element={<Navigate to="/our-company/locations" replace />} />
            <Route path="trust" element={<Navigate to="/our-company/who-trusts-us" replace />} />
            <Route path="values" element={<Navigate to="/our-company/what-we-believe" replace />} />
            <Route path="*" element={<Navigate to="/our-company/locations" replace />} />
          </Route>
          
          {/* MEET OUR EXPERTS routes (formerly WHAT WE DO) */}
          <Route path="/meet-our-experts">
            <Route index element={<Navigate to="/meet-our-experts/leadership" replace />} />
            <Route path="leadership" element={<ServicesOverview />} />
            <Route path="consultants" element={<ServicesConsultants />} />
            <Route path="health-experts" element={<ServicesHealthExperts />} />
            <Route path="it-experts" element={<ServicesITExperts />} />
            <Route path="researchers" element={<ServicesResearchers />} />
            {/* Removed advisors and data as they don't appear in the nav menu */}
            {/* Catch any other /meet-our-experts/* paths and redirect to leadership */}
            <Route path="*" element={<Navigate to="/meet-our-experts/leadership" replace />} />
          </Route>
          
          {/* Legacy WHAT WE DO routes for backward compatibility */}
          <Route path="/what-we-do">
            <Route index element={<Navigate to="/meet-our-experts/leadership" replace />} />
            <Route path="overview" element={<Navigate to="/meet-our-experts/leadership" replace />} />
            <Route path="consultants" element={<Navigate to="/meet-our-experts/consultants" replace />} />
            <Route path="health-experts" element={<Navigate to="/meet-our-experts/health-experts" replace />} />
            <Route path="it-experts" element={<Navigate to="/meet-our-experts/it-experts" replace />} />
            <Route path="researchers" element={<Navigate to="/meet-our-experts/researchers" replace />} />
            <Route path="advisors" element={<Navigate to="/meet-our-experts/leadership" replace />} />
            <Route path="data" element={<Navigate to="/meet-our-experts/leadership" replace />} />
            <Route path="*" element={<Navigate to="/meet-our-experts/leadership" replace />} />
          </Route>
          
          {/* Legacy SERVICES routes for backward compatibility */}
          <Route path="/services">
            <Route index element={<Navigate to="/meet-our-experts/leadership" replace />} />
            <Route path="overview" element={<Navigate to="/meet-our-experts/leadership" replace />} />
            <Route path="consultants" element={<Navigate to="/meet-our-experts/consultants" replace />} />
            <Route path="health-experts" element={<Navigate to="/meet-our-experts/health-experts" replace />} />
            <Route path="it-experts" element={<Navigate to="/meet-our-experts/it-experts" replace />} />
            <Route path="researchers" element={<Navigate to="/meet-our-experts/researchers" replace />} />
            <Route path="advisors" element={<Navigate to="/meet-our-experts/leadership" replace />} />
            <Route path="data" element={<Navigate to="/meet-our-experts/leadership" replace />} />
            <Route path="*" element={<Navigate to="/meet-our-experts/leadership" replace />} />
          </Route>
          
          {/* OUR IDEAS routes */}
          <Route path="/our-ideas">
            <Route index element={<OurIdeas />} />
            <Route path="details/:id" element={<IdeaDetails />} />
            <Route path="article/:id" element={<ArticleDetails />} />
            <Route path="articles" element={<AllArticles />} />
            {/* Catch any other /our-ideas/* paths and redirect to ideas index */}
            <Route path="*" element={<Navigate to="/our-ideas" replace />} />
          </Route>
          
          {/* Legacy IDEAS routes for backward compatibility */}
          <Route path="/ideas">
            <Route index element={<Navigate to="/our-ideas" replace />} />
            <Route path="details/:id" element={<Navigate to={to => `/our-ideas/details/${to.params.id}`} replace />} />
            <Route path="article/:id" element={<Navigate to={to => `/our-ideas/article/${to.params.id}`} replace />} />
            <Route path="articles" element={<Navigate to="/our-ideas/articles" replace />} />
            <Route path="*" element={<Navigate to="/our-ideas" replace />} />
          </Route>
          
          {/* NEWSROOM routes (formerly PRESS) */}
          <Route path="/newsroom" element={<Newsroom />} />
          
          {/* Legacy PRESS route for backward compatibility */}
          <Route path="/press" element={<Navigate to="/newsroom" replace />} />
          
          {/* JOIN OUR TEAM routes */}
          <Route path="/join-our-team" element={<Careers />} />
          
          {/* Legacy CAREERS route for backward compatibility */}
          <Route path="/careers" element={<Navigate to="/join-our-team" replace />} />
          
          {/* CONTACT route - redirect to home */}
          <Route path="/contact" element={<Navigate to="/" replace />} />
          
          {/* Projects routes with placeholder components */}
          <Route path="/projects" element={<Projects />} />
          <Route path="/project-details/:id" element={<ProjectDetailsPlaceholder />} />
          <Route path="/team">
            <Route index element={<Team />} />
            <Route path="*" element={<Navigate to="/team" replace />} />
          </Route>
          
          {/* Legacy route for AboutUsSimple */}
          <Route path="/about-us" element={<AboutUsSimple />} />
          
          {/* Applicants List route */}
          <Route path="/applicants-list" element={<ApplicantsList />} />
          
          {/* Redirect all unknown routes to home page */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        
        {/* Social media buttons */}
        <WhatsAppButton />
        <FacebookButton />
        <InstagramButton />
        <SeeListButton />
        
        {/* Announcements box */}
        <Announcements />
        
        <Footer />
      </div>
    </Router>
  );
}

export default App; 