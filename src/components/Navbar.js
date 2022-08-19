import React from 'react';
// import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './css/Navbar.css';

const Navigation = () => {
  return (
    <div class="wrapper">
      <div class="sidebar">
        <h2>KawaiiYuke</h2>
        <ul>
          <li>
            <Link to="/explore">
              <i class="fas fa-home"></i>Explore
            </Link>
          </li>
          <li>
            <Link to="/signin">
              <i class="fas fa-user"></i>Sign In
            </Link>
          </li>
          <li>
            <Link to="/signout">
              <i class="fas fa-address-card"></i>Sign Out
            </Link>
          </li>
        </ul>
      </div>
    </div>

    // <div id="navbar" className="navbar-wrapper-container">
    //   <div className="navbar-links-container">
    //     <Navbar bg="dark" variant="dark">
    //       <Container>
    //         <Navbar.Brand href="#home">Kawaiiyuke</Navbar.Brand>
    //         <Nav className="me-auto">
    //           {/* <Nav.Link as={Link} to="/">
    //               Home */}
    //           {/* </Nav.Link> */}
    //           <Nav.Link as={Link} to="/explore">
    //             Explore
    //           </Nav.Link>
    //           <Nav.Link as={Link} to="/signin">
    //             Sign In
    //           </Nav.Link>
    //           <Nav.Link as={Link} to="/signout">
    //             Sign Out
    //           </Nav.Link>
    //         </Nav>
    //       </Container>
    //     </Navbar>
    //   </div>
    // </div>
  );
};

export default Navigation;
