import React, { useState, useEffect } from 'react';
import { Container, Table, Badge, Form, Row, Col, Button, Spinner, Modal, Tabs, Tab, Card, Alert } from 'react-bootstrap';
import { collection, query, orderBy, onSnapshot, updateDoc, doc, addDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import Swal from 'sweetalert2';
import './AdminDashboard.css';
import { useLocation } from 'react-router-dom';

const AdminDashboard = () => {
  const [contacts, setContacts] = useState([]);
  const [talentPool, setTalentPool] = useState([]);
  const [posts, setPosts] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [activeTab, setActiveTab] = useState('contacts');
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, new, inProgress, completed
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('createdAt');
  const [sortDirection, setSortDirection] = useState('desc');
  const [selectedContact, setSelectedContact] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    sector: '',
    description: '',
    conclusion: ''
  });
  const [announcementFormData, setAnnouncementFormData] = useState({
    title: '',
    content: '',
    date: new Date().toISOString().split('T')[0]
  });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState({ message: '', type: '' });
  const [showAddForm, setShowAddForm] = useState(false);
  const [showAddAnnouncementForm, setShowAddAnnouncementForm] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);

  useEffect(() => {
    document.title = "Admin Dashboard | Rosebelt Consultants";
    checkAuth();
    
    // Set active tab based on URL path
    if (location.pathname === '/admin/projects') {
      setActiveTab('projects');
    } else if (location.pathname === '/admin/announcements') {
      setActiveTab('announcements');
    } else {
      setActiveTab('contacts');
    }
  }, [location.pathname]);

  useEffect(() => {
    if (!isAuthenticated) return;
    
    const contactsQuery = query(collection(db, 'contacts'), orderBy('createdAt', 'desc'));
    const unsubscribeContacts = onSnapshot(contactsQuery, (querySnapshot) => {
      const contactsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setContacts(contactsData);
      setLoading(false);
    });

    const talentPoolQuery = query(collection(db, 'talentPool'), orderBy('submittedAt', 'desc'));
    const unsubscribeTalentPool = onSnapshot(talentPoolQuery, (querySnapshot) => {
      const talentPoolData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTalentPool(talentPoolData);
    });

    const postsQuery = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
    const unsubscribePosts = onSnapshot(postsQuery, (querySnapshot) => {
      const postsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPosts(postsData);
    });

    const announcementsQuery = query(collection(db, 'announcements'), orderBy('date', 'desc'));
    const unsubscribeAnnouncements = onSnapshot(announcementsQuery, (querySnapshot) => {
      const announcementsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setAnnouncements(announcementsData);
    });

    return () => {
      unsubscribeContacts();
      unsubscribeTalentPool();
      unsubscribePosts();
      unsubscribeAnnouncements();
    };
  }, [isAuthenticated]);

  const checkAuth = () => {
    const storedAuth = localStorage.getItem('adminAuth');
    if (storedAuth === 'true') {
      setIsAuthenticated(true);
    } else {
      handleLogin();
    }
  };

  const handleLogin = async () => {
    const { value: formValues } = await Swal.fire({
      title: 'Admin Login',
      html:
        '<input id="swal-input1" class="swal2-input" placeholder="Email">' +
        '<input id="swal-input2" class="swal2-input" type="password" placeholder="Password">',
      focusConfirm: false,
      preConfirm: () => {
        return [
          document.getElementById('swal-input1').value,
          document.getElementById('swal-input2').value
        ]
      }
    });

    if (formValues) {
      const [email, password] = formValues;
      if (email === 'mamiribaloch@gmail.com' && password === 'xyz.com') {
        setIsAuthenticated(true);
        localStorage.setItem('adminAuth', 'true');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Access Denied',
          text: 'Invalid credentials'
        });
      }
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminAuth');
    Swal.fire({
      icon: 'success',
      title: 'Logged Out',
      text: 'You have been successfully logged out'
    });
  };

  const handleStatusChange = async (contactId, newStatus) => {
    try {
      await updateDoc(doc(db, 'contacts', contactId), {
        status: newStatus
      });
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const getStatusBadge = (status) => {
    const variants = {
      'New': 'primary',
      'In Progress': 'warning',
      'Completed': 'success'
    };
    return <Badge bg={variants[status] || 'secondary'}>{status}</Badge>;
  };

  const handleExportCSV = () => {
    const headers = [
      'Date',
      'First Name',
      'Last Name',
      'Email',
      'Phone',
      'Company',
      'Job Title',
      'Project Type',
      'Budget',
      'Timeframe',
      'Description',
      'Status'
    ];

    const csvData = contacts
      .filter(contact => {
        if (filter === 'all') return true;
        return contact.status.toLowerCase() === filter;
      })
      .filter(contact => {
        const searchLower = searchTerm.toLowerCase();
        return (
          contact.firstName.toLowerCase().includes(searchLower) ||
          contact.lastName.toLowerCase().includes(searchLower) ||
          contact.email.toLowerCase().includes(searchLower) ||
          contact.company?.toLowerCase().includes(searchLower) ||
          contact.description.toLowerCase().includes(searchLower)
        );
      })
      .sort((a, b) => {
        const aValue = a[sortField];
        const bValue = b[sortField];
        const direction = sortDirection === 'asc' ? 1 : -1;
        return aValue > bValue ? direction : -direction;
      })
      .map(contact => [
        new Date(contact.createdAt).toLocaleDateString(),
        contact.firstName,
        contact.lastName,
        contact.email,
        contact.phone || '',
        contact.company || '',
        contact.jobTitle || '',
        contact.projectType || '',
        contact.budget || '',
        contact.timeframe || '',
        contact.description,
        contact.status
      ]);

    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `contacts_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const fetchContacts = () => {};
  const fetchTalentPool = () => {};

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredContacts = contacts
    .filter(contact => {
      if (filter === 'all') return true;
      return contact.status.toLowerCase() === filter;
    })
    .filter(contact => {
      const searchLower = searchTerm.toLowerCase();
      return (
        contact.firstName.toLowerCase().includes(searchLower) ||
        contact.lastName.toLowerCase().includes(searchLower) ||
        contact.email.toLowerCase().includes(searchLower) ||
        contact.company?.toLowerCase().includes(searchLower) ||
        contact.description.toLowerCase().includes(searchLower)
      );
    })
    .sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      const direction = sortDirection === 'asc' ? 1 : -1;
      return aValue > bValue ? direction : -direction;
    });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus({ message: '', type: '' });

    try {
      if (!formData.title.trim() || !formData.description.trim() || !formData.type.trim() || !formData.sector.trim()) {
        throw new Error('Title, Type, Sector, and Description are required');
      }

      const postData = {
        ...formData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      await addDoc(collection(db, 'posts'), postData);
      
      setFormData({
        title: '',
        type: '',
        sector: '',
        description: '',
        conclusion: ''
      });
      
      setShowAddForm(false);
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Project added successfully!',
        timer: 1500
      });
    } catch (error) {
      console.error('Submit error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message || 'Failed to add project. Please try again.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleReadMore = (project) => {
    setSelectedProject(project);
    setShowProjectModal(true);
  };

  const handleCloseProjectModal = () => {
    setShowProjectModal(false);
    setSelectedProject(null);
  };

  const handleCloseAddForm = () => {
    setShowAddForm(false);
    setFormData({
      title: '',
      type: '',
      sector: '',
      description: '',
      conclusion: ''
    });
  };

  const handleAnnouncementChange = (e) => {
    const { name, value } = e.target;
    setAnnouncementFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAnnouncementSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus({ message: '', type: '' });

    try {
      if (!announcementFormData.title.trim() || !announcementFormData.content.trim()) {
        throw new Error('Title and content are required');
      }

      const announcementData = {
        ...announcementFormData,
        date: new Date(announcementFormData.date).toISOString()
      };

      await addDoc(collection(db, 'announcements'), announcementData);
      
      setAnnouncementFormData({
        title: '',
        content: '',
        date: new Date().toISOString().split('T')[0]
      });
      
      setShowAddAnnouncementForm(false);
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Announcement added successfully!',
        timer: 1500
      });
    } catch (error) {
      console.error('Submit error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message || 'Failed to add announcement. Please try again.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditAnnouncement = (announcement) => {
    setSelectedAnnouncement(announcement);
    setAnnouncementFormData({
      title: announcement.title,
      content: announcement.content,
      date: new Date(announcement.date).toISOString().split('T')[0]
    });
    setShowAddAnnouncementForm(true);
  };

  const handleUpdateAnnouncement = async () => {
    setSubmitting(true);
    
    try {
      if (!announcementFormData.title.trim() || !announcementFormData.content.trim()) {
        throw new Error('Title and content are required');
      }

      const announcementData = {
        ...announcementFormData,
        date: new Date(announcementFormData.date).toISOString()
      };

      await updateDoc(doc(db, 'announcements', selectedAnnouncement.id), announcementData);
      
      setAnnouncementFormData({
        title: '',
        content: '',
        date: new Date().toISOString().split('T')[0]
      });
      
      setShowAddAnnouncementForm(false);
      setSelectedAnnouncement(null);
      
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Announcement updated successfully!',
        timer: 1500
      });
    } catch (error) {
      console.error('Update error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message || 'Failed to update announcement. Please try again.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteAnnouncement = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "This announcement will be permanently deleted!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteDoc(doc(db, 'announcements', id));
          Swal.fire(
            'Deleted!',
            'The announcement has been deleted.',
            'success'
          );
        } catch (error) {
          console.error('Delete error:', error);
          Swal.fire(
            'Error!',
            'Failed to delete the announcement.',
            'error'
          );
        }
      }
    });
  };

  const handleCloseAnnouncementForm = () => {
    setShowAddAnnouncementForm(false);
    setAnnouncementFormData({
      title: '',
      content: '',
      date: new Date().toISOString().split('T')[0]
    });
    setSelectedAnnouncement(null);
  };

  if (!isAuthenticated) {
    return (
      <Container className="py-5 text-center">
        <h1>Admin Login Required</h1>
        <p className="mb-4">You need to login to access the admin dashboard.</p>
        <Button variant="primary" onClick={handleLogin}>
          Login
        </Button>
      </Container>
    );
  }

  return (
    <div className="admin-dashboard">
      <Container className="py-5">
        <h1 className="text-center mb-5">Admin Dashboard</h1>
        
        <Tabs
          activeKey={activeTab}
          onSelect={(k) => setActiveTab(k)}
          className="mb-4"
        >
          <Tab eventKey="contacts" title="Contact Requests">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2>Contact Submissions Dashboard</h2>
              <div>
                <Button variant="success" className="me-2" onClick={handleExportCSV}>
                  Export CSV
                </Button>
                <Button variant="outline-danger" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            </div>
            
            <Row className="mb-4">
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Filter by Status</Form.Label>
                  <Form.Select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                  >
                    <option value="all">All Submissions</option>
                    <option value="new">New</option>
                    <option value="in progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Search</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Search contacts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Sort by</Form.Label>
                  <Row>
                    <Col xs={8}>
                      <Form.Select
                        value={sortField}
                        onChange={(e) => setSortField(e.target.value)}
                      >
                        <option value="createdAt">Date</option>
                        <option value="firstName">First Name</option>
                        <option value="lastName">Last Name</option>
                        <option value="company">Company</option>
                        <option value="status">Status</option>
                      </Form.Select>
                    </Col>
                    <Col xs={4}>
                      <Button
                        variant="outline-secondary"
                        onClick={() => setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')}
                      >
                        {sortDirection === 'asc' ? '↑' : '↓'}
                      </Button>
                    </Col>
                  </Row>
                </Form.Group>
              </Col>
            </Row>

            {loading ? (
              <div className="text-center">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            ) : (
              <div className="table-responsive">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Company</th>
                      <th>Project Type</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredContacts.map(contact => (
                      <tr key={contact.id}>
                        <td>{new Date(contact.createdAt).toLocaleDateString()}</td>
                        <td>{`${contact.firstName} ${contact.lastName}`}</td>
                        <td>
                          <a href={`mailto:${contact.email}`}>{contact.email}</a>
                        </td>
                        <td>{contact.company || '-'}</td>
                        <td>{contact.projectType || '-'}</td>
                        <td>{getStatusBadge(contact.status)}</td>
                        <td>
                          <div className="d-flex gap-2">
                            <Form.Select
                              size="sm"
                              value={contact.status}
                              onChange={(e) => handleStatusChange(contact.id, e.target.value)}
                              style={{ width: 'auto' }}
                            >
                              <option value="New">New</option>
                              <option value="In Progress">In Progress</option>
                              <option value="Completed">Completed</option>
                            </Form.Select>
                            <Button
                              size="sm"
                              variant="info"
                              onClick={() => {
                                setSelectedContact(contact);
                                setShowModal(true);
                              }}
                            >
                              View
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            )}
          </Tab>

          <Tab eventKey="talentPool" title="Talent Pool">
            <div className="table-responsive">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Position</th>
                    <th>Cover Letter</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {talentPool.map((candidate) => (
                    <tr key={candidate.id}>
                      <td>{candidate.name}</td>
                      <td>{candidate.email}</td>
                      <td>{candidate.phone}</td>
                      <td>{candidate.position}</td>
                      <td>
                        <Button 
                          variant="link" 
                          onClick={() => alert(candidate.coverLetter)}
                          className="p-0"
                        >
                          View Details
                        </Button>
                      </td>
                      <td>{formatDate(candidate.submittedAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Tab>
          
          <Tab eventKey="projects" title="Projects Management">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2>Projects Management</h2>
              <Button variant="success" onClick={() => setShowAddForm(true)}>
                Add New Project
              </Button>
            </div>
            
            {status.message && (
              <Alert 
                variant={status.type} 
                dismissible 
                onClose={() => setStatus({ message: '', type: '' })}
              >
                {status.message}
              </Alert>
            )}
            
            <div className="table-responsive">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Type</th>
                    <th>Sector</th>
                    <th>Created At</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map(post => (
                    <tr key={post.id}>
                      <td>{post.title}</td>
                      <td>{post.type}</td>
                      <td>{post.sector}</td>
                      <td>{new Date(post.createdAt).toLocaleDateString()}</td>
                      <td>
                        <Button
                          size="sm"
                          variant="info"
                          className="me-2"
                          onClick={() => handleReadMore(post)}
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Tab>

          <Tab eventKey="announcements" title="Announcements">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2>Announcements Management</h2>
              <Button variant="success" onClick={() => setShowAddAnnouncementForm(true)}>
                Add New Announcement
              </Button>
            </div>
            
            {status.message && (
              <Alert 
                variant={status.type} 
                dismissible 
                onClose={() => setStatus({ message: '', type: '' })}
              >
                {status.message}
              </Alert>
            )}
            
            <div className="table-responsive">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Content</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {announcements.map(announcement => (
                    <tr key={announcement.id}>
                      <td>{announcement.title}</td>
                      <td>{announcement.content.substring(0, 50)}...</td>
                      <td>{new Date(announcement.date).toLocaleDateString()}</td>
                      <td>
                        <Button
                          size="sm"
                          variant="info"
                          className="me-2"
                          onClick={() => handleEditAnnouncement(announcement)}
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() => handleDeleteAnnouncement(announcement.id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Tab>
        </Tabs>

        <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Contact Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedContact && (
              <div className="contact-details">
                <Row className="mb-3">
                  <Col sm={4}><strong>Date:</strong></Col>
                  <Col>{new Date(selectedContact.createdAt).toLocaleString()}</Col>
                </Row>
                <Row className="mb-3">
                  <Col sm={4}><strong>Name:</strong></Col>
                  <Col>{`${selectedContact.firstName} ${selectedContact.lastName}`}</Col>
                </Row>
                <Row className="mb-3">
                  <Col sm={4}><strong>Email:</strong></Col>
                  <Col><a href={`mailto:${selectedContact.email}`}>{selectedContact.email}</a></Col>
                </Row>
                <Row className="mb-3">
                  <Col sm={4}><strong>Phone:</strong></Col>
                  <Col>{selectedContact.phone || '-'}</Col>
                </Row>
                <Row className="mb-3">
                  <Col sm={4}><strong>Company:</strong></Col>
                  <Col>{selectedContact.company || '-'}</Col>
                </Row>
                <Row className="mb-3">
                  <Col sm={4}><strong>Job Title:</strong></Col>
                  <Col>{selectedContact.jobTitle || '-'}</Col>
                </Row>
                <Row className="mb-3">
                  <Col sm={4}><strong>Project Type:</strong></Col>
                  <Col>{selectedContact.projectType || '-'}</Col>
                </Row>
                <Row className="mb-3">
                  <Col sm={4}><strong>Budget:</strong></Col>
                  <Col>{selectedContact.budget || '-'}</Col>
                </Row>
                <Row className="mb-3">
                  <Col sm={4}><strong>Timeframe:</strong></Col>
                  <Col>{selectedContact.timeframe || '-'}</Col>
                </Row>
                <Row className="mb-3">
                  <Col sm={4}><strong>Description:</strong></Col>
                  <Col>{selectedContact.description}</Col>
                </Row>
                <Row className="mb-3">
                  <Col sm={4}><strong>Status:</strong></Col>
                  <Col>{getStatusBadge(selectedContact.status)}</Col>
                </Row>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showProjectModal} onHide={handleCloseProjectModal} size="lg">
          {selectedProject && (
            <>
              <Modal.Header closeButton>
                <Modal.Title>{selectedProject.title || 'Untitled Project'}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="project-detail-metadata">
                  <p><strong>Type:</strong> {selectedProject.type || 'No Type'}</p>
                  <p><strong>Sector:</strong> {selectedProject.sector || 'No Sector'}</p>
                  <p><strong>Posted on:</strong> {new Date(selectedProject.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="project-detail-description">
                  <h5>Description</h5>
                  <p>{selectedProject.description || 'No description available'}</p>
                </div>
                {selectedProject.conclusion && (
                  <div className="project-detail-conclusion">
                    <h5>Conclusion</h5>
                    <p>{selectedProject.conclusion}</p>
                  </div>
                )}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseProjectModal}>
                  Close
                </Button>
              </Modal.Footer>
            </>
          )}
        </Modal>

        <Modal show={showAddForm} onHide={handleCloseAddForm} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Add New Project</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Project Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter project title"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Project Type</Form.Label>
                <Form.Control
                  type="text"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  placeholder="Enter project type (e.g., Consulting, Development)"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Sector</Form.Label>
                <Form.Control
                  type="text"
                  name="sector"
                  value={formData.sector}
                  onChange={handleChange}
                  placeholder="Enter project sector (e.g., Healthcare, Technology)"
                  required
                />
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label>Project Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your project in detail"
                  required
                />
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label>Conclusion</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="conclusion"
                  value={formData.conclusion}
                  onChange={handleChange}
                  placeholder="What was the outcome or conclusion of this project?"
                />
              </Form.Group>
              
              <Button 
                variant="success" 
                type="submit" 
                disabled={submitting}
                className="mt-2"
              >
                {submitting ? 'Submitting...' : 'Submit Project'}
              </Button>
            </Form>
          </Modal.Body>
        </Modal>

        <Modal show={showAddAnnouncementForm} onHide={handleCloseAnnouncementForm} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>{selectedAnnouncement ? 'Edit Announcement' : 'Add New Announcement'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={selectedAnnouncement ? handleUpdateAnnouncement : handleAnnouncementSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Announcement Title *</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={announcementFormData.title}
                  onChange={handleAnnouncementChange}
                  required
                />
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label>Content *</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  name="content"
                  value={announcementFormData.content}
                  onChange={handleAnnouncementChange}
                  required
                />
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label>Date *</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  value={announcementFormData.date}
                  onChange={handleAnnouncementChange}
                  required
                />
              </Form.Group>
              
              <div className="d-flex justify-content-end">
                <Button variant="secondary" className="me-2" onClick={handleCloseAnnouncementForm}>
                  Cancel
                </Button>
                <Button variant="success" type="submit" disabled={submitting}>
                  {submitting ? 'Saving...' : (selectedAnnouncement ? 'Update Announcement' : 'Add Announcement')}
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  );
};

export default AdminDashboard; 