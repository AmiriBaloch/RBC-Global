import React, { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

// Page components
import CarouselSlider from './components/CarouselSlider';
import Introduction from './components/Introduction';
import StickyNotes from './components/StickyNotes';
import Projects from './components/Projects';
import FeaturedProjects from './components/FeaturedProjects';
import WhereWeStand from './components/WhereWeStand';
// ContactUs component has been removed
import ClientsTicker from './components/ClientsTicker';
import AboutUsSimple from './components/AboutUsSimple';
import Team from './components/Team';
import Careers from './components/Careers';
import CoreContributors from './components/CoreContributors';
import Announcements from './components/Announcements';
import OurIdeas from './components/OurIdeas';

// Who We Are pages
import AboutOverview from './components/AboutOverview';
import OurValues from './components/OurValues';
import OurTrust from './components/OurTrust';

// What We Do pages
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

// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Loading spinner component for lazy-loaded routes
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

// Contact Us page has been removed

// Home page content component for About/Overview page
export const HomePageContent = () => {
  return (
    <>
      <div className="full-width-container no-top-space no-bottom-space" style={{ backgroundColor: '#E3EBF2', padding: 0, margin: 0 }}>
        <CarouselSlider />
      </div>
      <Introduction />
      <StickyNotes />
      <FeaturedProjects />
      <WhereWeStand />
      <ClientsTicker title="Our Valuable Clients" />
      <CoreContributors />
    </>
  );
};

// WHO WE ARE landing page
const WhoWeAre = () => {
  return <HomePageContent />;
};

function App() {
  // Set browser's scrollRestoration to 'manual' to prevent browser's default scroll position restoration
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    
    // Force scroll to top on first load
    window.scrollTo(0, 0);
  }, []);

  return (
    <Router basename="/">
      <ScrollToTop />
      <div className="App">
        <Header />
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {/* WHO WE ARE as the home page */}
            <Route path="/" element={<WhoWeAre />} />
            
            {/* OUR WORKPLACE routes (previously WHO WE ARE / ABOUT) */}
            <Route path="/our-workplace">
              <Route index element={<Navigate to="/our-workplace/offices" replace />} />
              <Route path="offices" element={<AboutOverview />} />
              <Route path="accredited" element={<OurTrust />} />
              <Route path="values" element={<OurValues />} />
              {/* Catch any other /our-workplace/* paths and redirect to offices */}
              <Route path="*" element={<Navigate to="/our-workplace/offices" replace />} />
            </Route>
            
            {/* Legacy ABOUT routes for backward compatibility */}
            <Route path="/about">
              <Route index element={<Navigate to="/our-workplace/offices" replace />} />
              <Route path="overview" element={<Navigate to="/our-workplace/offices" replace />} />
              <Route path="trust" element={<Navigate to="/our-workplace/accredited" replace />} />
              <Route path="values" element={<Navigate to="/our-workplace/values" replace />} />
              <Route path="*" element={<Navigate to="/our-workplace/offices" replace />} />
            </Route>
            
            {/* WHAT WE DO routes */}
            <Route path="/what-we-do">
              <Route index element={<Navigate to="/what-we-do/overview" replace />} />
              <Route path="overview" element={<ServicesOverview />} />
              <Route path="consultants" element={<ServicesConsultants />} />
              <Route path="health-experts" element={<ServicesHealthExperts />} />
              <Route path="it-experts" element={<ServicesITExperts />} />
              <Route path="researchers" element={<ServicesResearchers />} />
              <Route path="advisors" element={<ServicesAdvisors />} />
              <Route path="data" element={<ServicesData />} />
              {/* Catch any other /what-we-do/* paths and redirect to overview */}
              <Route path="*" element={<Navigate to="/what-we-do/overview" replace />} />
            </Route>
            
            {/* Legacy SERVICES routes for backward compatibility */}
            <Route path="/services">
              <Route index element={<Navigate to="/what-we-do/overview" replace />} />
              <Route path="overview" element={<Navigate to="/what-we-do/overview" replace />} />
              <Route path="consultants" element={<Navigate to="/what-we-do/consultants" replace />} />
              <Route path="health-experts" element={<Navigate to="/what-we-do/health-experts" replace />} />
              <Route path="it-experts" element={<Navigate to="/what-we-do/it-experts" replace />} />
              <Route path="researchers" element={<Navigate to="/what-we-do/researchers" replace />} />
              <Route path="advisors" element={<Navigate to="/what-we-do/advisors" replace />} />
              <Route path="data" element={<Navigate to="/what-we-do/data" replace />} />
              <Route path="*" element={<Navigate to="/what-we-do/overview" replace />} />
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
            
            {/* JOIN OUR TEAM routes */}
            <Route path="/join-our-team" element={<Careers />} />
            
            {/* Legacy CAREERS route for backward compatibility */}
            <Route path="/careers" element={<Navigate to="/join-our-team" replace />} />
            
            {/* CONTACT route - redirect to home */}
            <Route path="/contact" element={<Navigate to="/" replace />} />
            
            {/* Other main routes */}
            <Route path="/projects" element={<Projects />} />
            <Route path="/team">
              <Route index element={<Team />} />
              <Route path="*" element={<Navigate to="/team" replace />} />
            </Route>
            
            {/* Legacy route for AboutUsSimple */}
            <Route path="/about-us" element={<AboutUsSimple />} />
            
            {/* Redirect all unknown routes to home page */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
        
        {/* Social media buttons */}
        <WhatsAppButton />
        <FacebookButton />
        <InstagramButton />
        
        {/* Announcements box */}
        <Announcements />
        
        <Footer />
      </div>
    </Router>
  );
}

export default App; 