import React from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div>
      HomePage
      <Link to="/music">
        <div>Go to music page</div>
      </Link>
      <Link to="/login">
        <div>Go to login page</div>
      </Link>
    </div>
  );
}
