import React from 'react';
import EmployerCard from './EmployerCard';

const EmployerList = ({ employers }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
      {employers.map((employer) => (
        <EmployerCard key={employer.id} employer={employer} />
      ))}
    </div>
  );
};

export default EmployerList;