import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <div id="navbar" className="navbar-wrapper-container">
      <div className="navbar-links-container">
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="#home">Kawaiiyuke</Navbar.Brand>
            <Nav className="me-auto">
              {/* <Nav.Link as={Link} to="/">
                  Home */}
              {/* </Nav.Link> */}
              <Nav.Link as={Link} to="/explore">
                Explore
              </Nav.Link>
              <Nav.Link as={Link} to="/signin">
                Sign In
              </Nav.Link>
              <Nav.Link as={Link} to="/signout">
                Sign Out
              </Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </div>
    </div>
  );
};

export default Navigation;
