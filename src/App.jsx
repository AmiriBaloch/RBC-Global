import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import Header from './components/Header';
import Footer from './components/Footer';

// Page components
import CarouselSlider from './components/CarouselSlider';
import Introduction from './components/Introduction';
import StickyNotes from './components/StickyNotes';
import Projects from './components/Projects';
import FeaturedProjects from './components/FeaturedProjects';
import WhereWeStand from './components/WhereWeStand';
import ContactUs from './components/ContactUs';
import AdminDashboard from './components/AdminDashboard';
import ClientsTicker from './components/ClientsTicker';
import AboutUsSimple from './components/AboutUsSimple';
import Team from './components/Team';
import Careers from './components/Careers';
import CoreContributors from './components/CoreContributors';
import Announcements from './components/Announcements';

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

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={
            <>
              <div className="full-width-container no-top-space" style={{ backgroundColor: '#E3EBF2' }}>
                <CarouselSlider />
              </div>
              <Introduction />
              <StickyNotes />
              <FeaturedProjects />
              <WhereWeStand />
              <ClientsTicker title="Our Valuable Clients" />
              <CoreContributors />
            </>
          } />
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
          <Route path="/admin/contacts" element={<AdminDashboard />} />
          <Route path="/admin/projects" element={<AdminDashboard />} />
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