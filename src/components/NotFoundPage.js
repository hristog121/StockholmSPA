import React from 'react';
import { Link } from 'react-router-dom';

/* A 404 page if something goes wrong with the navigation */
const NotFoundPage = () => (
  <div>
    404 - Something went wrong - <Link to="/">Go home</Link>
  </div>
);

export default NotFoundPage;
