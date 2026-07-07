import React from 'react';

const EmployerCard = ({ employer }) => {
  return (
    <div className="card p-4 sm:p-6 text-center hover:shadow-xl transition-all duration-300 dark:bg-gray-800">
      <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full overflow-hidden mb-3 border-2 border-primary-100 dark:border-primary-800">
        <img src={employer.logo} alt={employer.name} className="w-full h-full object-cover" />
      </div>
      <h3 className="font-semibold text-gray-800 dark:text-white">{employer.name}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">{employer.industry || 'Technology'}</p>
      <p className="text-xs text-primary-600 dark:text-primary-400 mt-1">{employer.jobs || '10+'} jobs</p>
    </div>
  );
};

export default EmployerCard;