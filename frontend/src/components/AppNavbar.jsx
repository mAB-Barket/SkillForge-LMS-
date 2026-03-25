import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';

const AppNavbar = ({ theme, onToggleTheme }) => {
  const { user, isAuthenticated, logout } = useAuth();

  const roleLinks = {
    student: [
      { to: '/student/my-courses', label: 'My Courses' },
      { to: '/student/profile', label: 'Profile' }
    ],
    instructor: [
      { to: '/instructor/create-course', label: 'Create Course' },
      { to: '/instructor/manage-courses', label: 'Manage Courses' },
      { to: '/instructor/upload-lessons', label: 'Upload Lessons' }
    ],
    admin: [
      { to: '/admin/manage-users', label: 'Manage Users' },
      { to: '/admin/manage-courses', label: 'Manage Courses' },
      { to: '/admin/reports', label: 'Reports' }
    ]
  };

  const currentRoleLinks = user?.role ? roleLinks[user.role] || [] : [];

  return (
    <Navbar className="app-navbar" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <span className="brand-pill">SKILLFORGE</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="lms-navbar" />
        <Navbar.Collapse id="lms-navbar">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/about">
              About
            </Nav.Link>
            <Nav.Link as={NavLink} to="/courses">
              Courses
            </Nav.Link>
          </Nav>

          <Nav className="align-items-center gap-2">
            <button className="theme-toggle" onClick={onToggleTheme} type="button">
              {theme === 'light' ? 'Dark Theme' : 'Light Theme'}
            </button>
            {!isAuthenticated ? (
              <>
                <Nav.Link as={NavLink} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={NavLink} to="/register">
                  Register
                </Nav.Link>
              </>
            ) : (
              <>
                <div className="role-action-links d-flex flex-wrap align-items-center gap-2">
                  {currentRoleLinks.map((item) => (
                    <Nav.Link className="role-action-link" as={NavLink} to={item.to} key={item.to}>
                      {item.label}
                    </Nav.Link>
                  ))}
                </div>

                <NavDropdown title={user?.name} align="end" className="account-dropdown">
                  <NavDropdown.Header>{user?.role?.toUpperCase()} ACCOUNT</NavDropdown.Header>
                  <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                </NavDropdown>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
