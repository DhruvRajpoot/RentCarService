import React, { useEffect } from "react";
import "../styles/not-found.css";

const NotFound = () => {
  // scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="not-found">
      <h1 className="not-found-heading">404 Not Found</h1>
      <p className="not-found-para">
        The page you are looking for does not exist.
      </p>
    </div>
  );
};

export default NotFound;
