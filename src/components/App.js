// import React from "react";
// import SignUpPage from "./SignUpPage";
// import { Container } from "react-bootstrap";
// import { AuthProvider } from "../contexts/AuthContext";
// import {
//   Switch,
//   Route,
//   BrowserRouter as Router,
//   Routes,
// } from "react-router-dom";
// import Dashboard from "./Dashboard";
// import Login from "./Login";
// import PrivateRoute from "./PrivateRoute";
// import ForgotPassword from "./ForgotPassword";
// import UpdateProfile from "./UpdateProfile";

// function App() {
//   return (
//     <Container
//       className="d-flex align-items-center justify-content-center"
//       style={{ minHeight: "100vh" }}
//     >
//       <div className="w-100" style={{ maxWidth: "400px" }}>
//         <Router>
//           <AuthProvider>
//             <Routes>
//               <Route path="/music" element={<MusicPlayer />} />
//               <PrivateRoute exact path="/" component={Dashboard} />
//               <PrivateRoute path="/update-profile" component={UpdateProfile} />
//               <Route exact path="/signup" component={SignUpPage} />
//               <Route exact path="/login" component={Login} />
//               <Route exact path="/forgot-password" component={ForgotPassword} />
//             </Routes>
//           </AuthProvider>
//         </Router>
//       </div>
//     </Container>
//   );
// }

// export default App;
