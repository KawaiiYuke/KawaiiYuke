import React from 'react';
import "bootstrap/dist/css/bootstrap.css";
import { Navbar, Nav, Container } from "react-bootstrap";
import { BrowserRouter,  Routes, Route, Link } from "react-router-dom";
import { Explore } from "./Explore";
import { SignIn } from "./SignIn";
import { SignOut } from "./SignOut";
import { Home } from "./Home";

const Paths = () => {
  return (
    <BrowserRouter>
      <div className="Paths">
        <>
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
        </>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<Explore />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signout" element={<SignOut />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default Paths;

// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import MusicPlayer from './MusicPlayer';

// const Paths = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/music" element={<MusicPlayer />} />
//       </Routes>
//     </Router>
//   );
// };

// export default Paths;