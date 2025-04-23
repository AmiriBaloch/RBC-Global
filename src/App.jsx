import React, { useEffect } from 'react';
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
import ContactUs from './components/ContactUs';
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
import EmailButton from './components/EmailButton';
import InstagramButton from './components/InstagramButton';

// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Debug component for About
const AboutDebug = () => {
  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h1>About Debug Page</h1>
      <p>This is a simple debug page to test routing to the About page.</p>
    </div>
  );
};

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
    <Router>
      <ScrollToTop />
      <div className="App">
        <Header />
        <Routes>
          {/* WHO WE ARE as the home page */}
          <Route path="/" element={<WhoWeAre />} />
          
          {/* Legacy routes */}
          <Route path="/projects" element={<Projects />} />
          <Route path="/about" element={<AboutUsSimple />} />
          <Route path="/team" element={<Team />} />
          <Route path="/team/board" element={<Team />} />
          <Route path="/team/consultants" element={<Team />} />
          <Route path="/team/health" element={<Team />} />
          <Route path="/team/it" element={<Team />} />
          <Route path="/team/researchers" element={<Team />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<ContactUs />} />
          
          {/* Who We Are routes */}
          <Route path="/about/overview" element={<AboutOverview />} />
          <Route path="/about/trust" element={<OurTrust />} />
          <Route path="/about/values" element={<OurValues />} />
          
          {/* What We Do routes */}
          <Route path="/services/overview" element={<ServicesOverview />} />
          <Route path="/services/consultants" element={<ServicesConsultants />} />
          <Route path="/services/health-experts" element={<ServicesHealthExperts />} />
          <Route path="/services/it-experts" element={<ServicesITExperts />} />
          <Route path="/services/researchers" element={<ServicesResearchers />} />
          <Route path="/services/implement" element={<ComingSoon title="RoseBelt Implement" />} />
          <Route path="/services/research" element={<ComingSoon title="RoseBelt Research" />} />
          
          {/* New main routes */}
          <Route path="/experience" element={<ComingSoon title="Our Experience" />} />
          <Route path="/ideas" element={<OurIdeas />} />
          <Route path="/ideas/details/:id" element={<IdeaDetails />} />
          <Route path="/ideas/article/:id" element={<ArticleDetails />} />
          <Route path="/ideas/articles" element={<AllArticles />} />
          <Route path="/press" element={<ComingSoon title="Press" />} />
        </Routes>
        
        {/* Social media buttons */}
        <div className="social-buttons">
          <InstagramButton />
          <EmailButton />
          <FacebookButton />
          <WhatsAppButton />
        </div>
        
        {/* Announcements box */}
        <Announcements />
        
        <Footer />
      </div>
    </Router>
  );
}

export default App; 