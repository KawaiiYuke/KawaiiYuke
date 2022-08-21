import React from "react";
import useAuth from "./useAuth";

const Home = ({ code }) => {
  const accessToken = useAuth(code);
  return (
    <div>
      <h3>Welcome</h3>
      {code}
    </div>
  );
};

export default Home;
