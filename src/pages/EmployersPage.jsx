import React, { useEffect, useState } from 'react';
import { FiUsers, FiBriefcase, FiMapPin, FiArrowRight } from 'react-icons/fi';

const EmployersPage = () => {
  useEffect(() => {
    document.title = 'Employers - Aboriginal Jobline';
  }, []);

  const [employers] = useState([
    { id: 1, name: 'Google', logo: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=200&h=200&fit=crop', industry: 'Technology', jobs: 45, location: 'Toronto, ON' },
    { id: 2, name: 'Microsoft', logo: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=200&h=200&fit=crop&sat=-100', industry: 'Software', jobs: 32, location: 'Vancouver, BC' },
    { id: 3, name: 'Amazon', logo: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=200&h=200&fit=crop&sat=-50', industry: 'E-commerce', jobs: 67, location: 'Calgary, AB' },
    { id: 4, name: 'Apple', logo: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=200&h=200&fit=crop&sat=-20', industry: 'Technology', jobs: 28, location: 'Ottawa, ON' },
    { id: 5, name: 'Meta', logo: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=200&h=200&fit=crop&sat=-70', industry: 'Social Media', jobs: 53, location: 'Montreal, QC' },
    { id: 6, name: 'Netflix', logo: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=200&h=200&fit=crop&sat=-30', industry: 'Entertainment', jobs: 19, location: 'Winnipeg, MB' },
  ]);

  const employerImages = [
    'https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=600&h=400&fit=crop&sat=-30',
    'https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=600&h=400&fit=crop&sat=-50',
    'https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=600&h=400&fit=crop&sat=-70',
  ];

  return (
    <div className="py-6 sm:py-8 bg-[#F5F0E8] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <span className="inline-block text-[#8B4513] font-semibold text-sm uppercase tracking-wider mb-2">
            Partner Companies
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#2C1810]">
            Top <span className="text-[#8B4513]">Employers</span>
          </h1>
          <p className="text-[#4A2A1A]/70 mt-2 max-w-2xl mx-auto">
            Join leading companies that value Indigenous talent and inclusive workplaces
          </p>
        </div>

        {/* Employer Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {employers.map((employer) => (
            <article 
              key={employer.id} 
              className="bg-white rounded-2xl shadow-lg border border-[#EDE4D8] p-6 hover:shadow-2xl transition-all hover:-translate-y-1 group"
            >
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#8B4513]/20 group-hover:border-[#8B4513] transition-colors flex-shrink-0">
                  <img 
                    src={employer.logo} 
                    alt={employer.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-[#2C1810] group-hover:text-[#8B4513] transition-colors truncate">
                    {employer.name}
                  </h3>
                  <p className="text-sm text-[#8B4513] font-medium">{employer.industry}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1 text-xs bg-[#F5F0E8] px-2 py-1 rounded-full text-[#4A2A1A]">
                      <FiBriefcase size={12} /> {employer.jobs} jobs
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs bg-[#F5F0E8] px-2 py-1 rounded-full text-[#4A2A1A]">
                      <FiMapPin size={12} /> {employer.location}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-[#EDE4D8] flex justify-between items-center">
                <span className="text-xs text-[#4A2A1A]/50">Active hirer</span>
                <button className="inline-flex items-center gap-1 text-[#8B4513] font-semibold text-sm hover:text-[#6B3410] transition group">
                  View Jobs <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Featured Images */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-6 sm:mt-8">
          {employerImages.map((url, index) => (
            <div key={index} className="rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <img src={url} alt={`Employer ${index + 1}`} className="w-full h-24 sm:h-32 md:h-40 object-cover" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmployersPage;