import React from 'react';
import { FaSpinner } from 'react-icons/fa';

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <FaSpinner className="w-12 h-12 text-primary-600 animate-spin" />
    </div>
  );
};

export default LoadingSpinner;