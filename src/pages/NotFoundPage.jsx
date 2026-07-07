import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaExclamationTriangle } from 'react-icons/fa';

const NotFoundPage = () => {
  useEffect(() => {
    document.title = 'Page Not Found - JobPortal';
  }, []);

  return (
    <div className="min-h-[60vh] flex items-center justify-center py-12">
      <div className="text-center px-4">
        <FaExclamationTriangle className="w-20 h-20 sm:w-24 sm:h-24 text-primary-600 mx-auto mb-4" />
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800 dark:text-white mb-2">404</h1>
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-700 dark:text-gray-300 mb-4">Page Not Found</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="btn-primary inline-flex items-center gap-2">
          <FaHome /> Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;