import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { useInView } from 'react-intersection-observer';
import { collection, query, where, getDocs, getCountFromServer, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import globeVideo from '../assets/globe1.mp4';
import './shared.css';

// Register required Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const WhereWeStand = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [count, setCount] = useState(0);
  const [barValues, setBarValues] = useState([0, 0, 0, 0, 0]);
  const [chartData, setChartData] = useState({
    labels: ['Completed Projects', 'Ongoing Projects', 'Upcoming Projects', 'Support Services', 'Partnerships'],
    datasets: [
      {
        data: [3, 2.5, 2, 1.5, 1], // Default proportions for initial render
        backgroundColor: ['#28a745', '#ffc107', '#dc3545', '#17a2b8', '#6f42c1'],
        borderColor: ['#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff'],
        borderWidth: 1,
        cutout: '75%',
      },
    ],
  });
  const [projectCounts, setProjectCounts] = useState({
    completed: 0,
    ongoing: 0,
    upcoming: 0,
    partnerships: 0,
    total: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  // Fetch project counts from Firebase
  useEffect(() => {
    const fetchProjectCounts = async () => {
      try {
        const postsRef = collection(db, 'posts');
        
        // Get total count
        const totalSnapshot = await getCountFromServer(postsRef);
        const totalCount = totalSnapshot.data().count;
        
        // Get completed projects count (assuming there's a status field)
        const completedQuery = query(postsRef, where("status", "==", "completed"));
        const completedSnapshot = await getCountFromServer(completedQuery);
        const completedCount = completedSnapshot.data().count;
        
        // Get ongoing projects count
        const ongoingQuery = query(postsRef, where("status", "==", "ongoing"));
        const ongoingSnapshot = await getCountFromServer(ongoingQuery);
        const ongoingCount = ongoingSnapshot.data().count;
        
        // Get upcoming projects count
        const upcomingQuery = query(postsRef, where("status", "==", "upcoming"));
        const upcomingSnapshot = await getCountFromServer(upcomingQuery);
        const upcomingCount = upcomingSnapshot.data().count;

        // Calculate partnerships or other categories
        const partnershipsCount = totalCount - completedCount - ongoingCount - upcomingCount;
        
        // Set the actual total count directly to the display count
        setCount(totalCount || 0);
        
        setProjectCounts({
          completed: completedCount || 0,
          ongoing: ongoingCount || 0,
          upcoming: upcomingCount || 0,
          partnerships: partnershipsCount || 0,
          total: totalCount || 0
        });
        
        // Set chart data immediately with proper proportions
        const segmentProportions = [0.3, 0.25, 0.2, 0.15, 0.1]; // Total = 1
        const projectValues = segmentProportions.map(
          proportion => (totalCount || 1) * proportion
        );
        
        setChartData({
          labels: ['Completed Projects', 'Ongoing Projects', 'Upcoming Projects', 'Support Services', 'Partnerships'],
          datasets: [
            {
              data: projectValues,
              backgroundColor: ['#28a745', '#ffc107', '#dc3545', '#17a2b8', '#6f42c1'],
              borderColor: ['#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff'],
              borderWidth: 1,
              cutout: '75%',
            },
          ],
        });
        
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching project counts:", error);
        // Use default values if there's an error
        setProjectCounts({
          completed: 0,
          ongoing: 0,
          upcoming: 0,
          partnerships: 0,
          total: 0
        });
        setCount(0);
        setIsLoading(false);
      }
    };

    fetchProjectCounts();
    
    // Set up a real-time listener for project count changes
    const postsRef = collection(db, 'posts');
    const unsubscribe = onSnapshot(postsRef, (snapshot) => {
      const totalCount = snapshot.size;
      setCount(totalCount);
      setProjectCounts(prev => ({
        ...prev,
        total: totalCount
      }));
      
      // Update chart immediately when count changes
      const segmentProportions = [0.3, 0.25, 0.2, 0.15, 0.1]; // Total = 1
      const projectValues = segmentProportions.map(
        proportion => totalCount * proportion
      );
      
      setChartData({
        labels: ['Completed Projects', 'Ongoing Projects', 'Upcoming Projects', 'Support Services', 'Partnerships'],
        datasets: [
          {
            data: projectValues,
            backgroundColor: ['#28a745', '#ffc107', '#dc3545', '#17a2b8', '#6f42c1'],
            borderColor: ['#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff'],
            borderWidth: 1,
            cutout: '75%',
          },
        ],
      });
    });
    
    // Clean up the listener when component unmounts
    return () => unsubscribe();
  }, []);

  // Final values
  const finalBarValues = [1.5, 2.0, 2.7, 3.2, 3.8];
  const chartColors = ['#28a745', '#ffc107', '#dc3545', '#17a2b8', '#6f42c1'];

  // Animation effect
  useEffect(() => {
    if (inView && !isLoading) {
      // We no longer need to animate the count as it's now directly from Firebase
      // and updates in real-time via the onSnapshot listener
      
      // Animate progress bars only - not the chart
      let currentBarStep = 0;
      const barInterval = setInterval(() => {
        currentBarStep += 1;
        const newBarValues = finalBarValues.map(value => Math.min((value / 20) * currentBarStep, value));
        setBarValues(newBarValues);
        if (currentBarStep >= 20) {
          clearInterval(barInterval);
        }
      }, 100);

      // Set chart data immediately without animation
      const segmentProportions = [0.3, 0.25, 0.2, 0.15, 0.1]; // Total = 1
      const projectValues = segmentProportions.map(
        proportion => projectCounts.total * proportion
      );
      
      setChartData({
        labels: ['Completed Projects', 'Ongoing Projects', 'Upcoming Projects', 'Support Services', 'Partnerships'],
        datasets: [
          {
            data: projectValues,
            backgroundColor: chartColors,
            borderColor: ['#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff'],
            borderWidth: 1,
            cutout: '75%',
          },
        ],
      });

      return () => {
        clearInterval(barInterval);
      };
    }
  }, [inView, isLoading, projectCounts]);

  // Options for the donut chart
  const donutOptions = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: function(context) {
            const labels = ['Completed Projects', 'Ongoing Projects', 'Upcoming Projects', 'Support Services', 'Partnerships'];
            return labels[context.dataIndex] + ': ' + Math.round(context.raw);
          }
        }
      },
    },
    maintainAspectRatio: true,
    responsive: true,
  };

  // Progress bar data (manually created)
  const progressBars = [
    { id: 'P1', value: barValues[0] },
    { id: 'P2', value: barValues[1] },
    { id: 'P3', value: barValues[2] },
    { id: 'P4', value: barValues[3] },
    { id: 'P5', value: barValues[4] },
  ];

  // Calculate the progress average for display
  const progressAverage = barValues.reduce((acc, curr) => acc + curr, 0) / barValues.length;

  return (
    <section className="where-we-stand-section py-5" style={{ backgroundColor: 'var(--page-bg)' }} ref={ref}>
      <div className="section-heading-container bg-success" style={{ backgroundColor: '#2AA96B !important' }}>
        <Container>
          <h2 className="section-heading text-white py-2">Where We Stand</h2>
        </Container>
      </div>
      <Container>
        <div className="mb-5 p-4 border rounded" style={{ backgroundColor: '#ffffff' }}>
          <p style={{ textAlign: 'justify' }}>
            At ROSEBELT CONSULTANTS GLOBAL, we stand at the intersection of innovation and strategic excellence. Our approach combines cutting-edge 
            methodologies with practical solutions, ensuring that our clients receive the highest quality service tailored to their unique challenges. We believe in 
            sustainable growth, ethical business practices, and creating long-term value for all stakeholders. Our team of experts is committed to continuous 
            learning and improvement, staying ahead of industry trends to provide forward-thinking solutions that drive success.
          </p>
        </div>
        
        <Row className="justify-content-center">
          <Col md={4} className="text-center mb-4">
            <div className="p-4 h-100 border rounded d-flex flex-column align-items-center justify-content-between" style={{ backgroundColor: '#ffffff' }}>
              <div style={{ width: '200px', height: '200px', position: 'relative' }}>
                <Doughnut data={chartData} options={donutOptions} />
                <div 
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    fontSize: '2.5rem',
                    fontWeight: 'bold',
                    color: '#002366',
                    fontFamily: 'Arial, sans-serif',
                    textShadow: '0 1px 2px rgba(0,0,0,0.1)'
                  }}
                >
                  {count}<span style={{ fontSize: '1.5rem', color: '#0033cc' }}>+</span>
                </div>
              </div>
              {/* Legend for Impactful Endeavors */}
              <div className="mt-3" style={{ width: '100%' }}>
                <div className="d-flex flex-wrap justify-content-center" style={{ fontSize: '0.9rem' }}>
                  {chartData.labels.map((label, index) => (
                    <div key={index} className="d-flex align-items-center me-3 mb-1">
                      <span 
                        style={{
                          display: 'inline-block',
                          width: '12px',
                          height: '12px',
                          backgroundColor: chartColors[index],
                          marginRight: '5px',
                          borderRadius: '3px'
                        }}
                      ></span>
                      {label}
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-3">
                <span className="d-inline-block px-4 py-2 bg-success text-white rounded-pill" style={{ backgroundColor: '#2AA96B !important' }}>
                  Impactful Endeavors
                </span>
              </div>
            </div>
          </Col>
          
          <Col md={4} className="text-center mb-4">
            <div className="p-4 h-100 border rounded d-flex flex-column align-items-center justify-content-between" style={{ backgroundColor: '#ffffff' }}>
              <div style={{ width: '100%', maxWidth: '300px' }}>
                {progressBars.map((bar, index) => (
                  <div key={index} className="mb-3">
                    <div className="d-flex justify-content-between mb-1">
                      <span>{`Project ${index + 1}`}</span>
                      <span>&nbsp;</span>
                    </div>
                    <div className="progress" style={{ height: '20px' }}>
                      <div 
                        className="progress-bar" 
                        role="progressbar" 
                        style={{ 
                          width: `${(bar.value/5)*100}%`, 
                          backgroundColor: '#ff9933' 
                        }} 
                        aria-valuenow={bar.value} 
                        aria-valuemin="0" 
                        aria-valuemax="5"
                      ></div>
                    </div>
                  </div>
                ))}
                <div className="text-end mt-2" style={{ color: '#ff9933', fontWeight: 'bold' }}>
                  {progressAverage.toFixed(1)}/5
                </div>
              </div>
              <div className="mt-3">
                <span className="d-inline-block px-4 py-2 bg-success text-white rounded-pill" style={{ backgroundColor: '#2AA96B !important' }}>
                  Ongoing Projects
                </span>
              </div>
            </div>
          </Col>
          
          <Col md={4} className="text-center mb-4">
            <div className="p-4 h-100 border rounded d-flex flex-column align-items-center justify-content-between" style={{ backgroundColor: '#ffffff' }}>
              <div style={{ width: '200px', height: '200px' }}>
                <video 
                  src={globeVideo} 
                  className="rounded-circle" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              </div>
              {/* Legend for In Planning Phase */}
              <div className="mt-3" style={{ width: '100%' }}>
                <div className="d-flex flex-wrap justify-content-center" style={{ fontSize: '0.9rem' }}>
                  <div className="d-flex align-items-center me-3 mb-1">
                    <span style={{ display: 'inline-block', width: '12px', height: '12px', backgroundColor: '#ffc107', marginRight: '5px', borderRadius: '3px' }}></span>
                    Consulting Projects
                  </div>
                  <div className="d-flex align-items-center me-3 mb-1">
                    <span style={{ display: 'inline-block', width: '12px', height: '12px', backgroundColor: '#28a745', marginRight: '5px', borderRadius: '3px' }}></span>
                    Health Projects
                  </div>
                  <div className="d-flex align-items-center me-3 mb-1">
                    <span style={{ display: 'inline-block', width: '12px', height: '12px', backgroundColor: '#17a2b8', marginRight: '5px', borderRadius: '3px' }}></span>
                    IT Projects
                  </div>
                  <div className="d-flex align-items-center me-3 mb-1">
                    <span style={{ display: 'inline-block', width: '12px', height: '12px', backgroundColor: '#6f42c1', marginRight: '5px', borderRadius: '3px' }}></span>
                    Research Projects
                  </div>
                  <div className="d-flex align-items-center me-3 mb-1">
                    <span style={{ display: 'inline-block', width: '12px', height: '12px', backgroundColor: '#0033cc', marginRight: '5px', borderRadius: '3px' }}></span>
                    Internal Initiatives
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <span className="d-inline-block px-4 py-2 bg-success text-white rounded-pill" style={{ backgroundColor: '#2AA96B !important' }}>
                  15+ In Planning Phase
                </span>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      <style jsx="true">{`
        .animate-globe {
          animation: fadeInRotate 2s ease-out;
        }
        
        @keyframes fadeInRotate {
          0% {
            opacity: 0;
            transform: scale(0.5) rotate(0deg);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotate(360deg);
          }
        }
      `}</style>
    </section>
  );
};

export default WhereWeStand; 