import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiBriefcase, FiMapPin, FiCalendar, FiDollarSign, FiUsers, FiCheckCircle, FiClock } from 'react-icons/fi';
import { useJobs } from '../hooks/useJobs';
import LoadingSpinner from '../components/common/LoadingSpinner';

const JobDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { jobs, loading } = useJobs();
  const [job, setJob] = useState(null);

  useEffect(() => {
    document.title = 'Job Details - Aboriginal Jobline';
    const foundJob = jobs.find(j => j.id === parseInt(id));
    if (foundJob) {
      setJob(foundJob);
      document.title = `${foundJob.title} - Aboriginal Jobline`;
    } else if (!loading) {
      navigate('/404');
    }
  }, [id, jobs, loading, navigate]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!job) {
    return null;
  }

  return (
    <div className="py-6 sm:py-8 bg-[#F5F0E8] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link 
          to="/browse-jobs" 
          className="inline-flex items-center gap-2 text-[#8B4513] hover:text-[#6B3410] transition mb-6 font-semibold group"
        >
          <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Jobs
        </Link>

        <div className="bg-white rounded-2xl shadow-xl border border-[#EDE4D8] p-4 sm:p-6 md:p-8">
          {/* Header */}
          <div className="border-b border-[#EDE4D8] pb-4 sm:pb-6 mb-4 sm:mb-6">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2C1810]">
                  {job.title}
                </h1>
                <p className="text-lg sm:text-xl text-[#8B4513] font-medium mt-1">
                  {job.company}
                </p>
              </div>
              <span className="bg-[#8B4513]/10 text-[#8B4513] px-4 py-1.5 rounded-full text-sm font-semibold">
                {job.type}
              </span>
            </div>
          </div>

          {/* Job Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="flex items-center gap-2 text-[#4A2A1A] bg-[#F5F0E8] px-4 py-2.5 rounded-xl">
              <FiMapPin className="text-[#8B4513]" size={18} />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-2 text-[#4A2A1A] bg-[#F5F0E8] px-4 py-2.5 rounded-xl">
              <FiBriefcase className="text-[#8B4513]" size={18} />
              <span>{job.type}</span>
            </div>
            <div className="flex items-center gap-2 text-[#4A2A1A] bg-[#F5F0E8] px-4 py-2.5 rounded-xl">
              <FiDollarSign className="text-[#8B4513]" size={18} />
              <span>{job.salary || '$60k - $90k'}</span>
            </div>
            <div className="flex items-center gap-2 text-[#4A2A1A] bg-[#F5F0E8] px-4 py-2.5 rounded-xl">
              <FiCalendar className="text-[#8B4513]" size={18} />
              <span>Posted {job.postedAt || '2 days ago'}</span>
            </div>
          </div>

          {/* Job Description */}
          <div className="space-y-4 sm:space-y-6">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-[#2C1810] mb-3 flex items-center gap-2">
                <span className="w-1 h-6 bg-[#8B4513] rounded-full"></span>
                Job Description
              </h2>
              <p className="text-[#4A2A1A]/80 text-sm sm:text-base leading-relaxed">
                {job.description || 'Exciting opportunity to join our team and make a difference in the community. We are looking for passionate individuals who want to grow their career while contributing to meaningful work.'}
              </p>
            </div>

            {/* Requirements */}
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-[#2C1810] mb-3 flex items-center gap-2">
                <span className="w-1 h-6 bg-[#8B4513] rounded-full"></span>
                Requirements
              </h2>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-[#4A2A1A]/80 text-sm sm:text-base">
                  <FiCheckCircle className="text-[#8B4513] mt-0.5 flex-shrink-0" size={16} />
                  <span>Bachelor's degree in Computer Science or related field</span>
                </li>
                <li className="flex items-start gap-2 text-[#4A2A1A]/80 text-sm sm:text-base">
                  <FiCheckCircle className="text-[#8B4513] mt-0.5 flex-shrink-0" size={16} />
                  <span>5+ years of experience in {job.title}</span>
                </li>
                <li className="flex items-start gap-2 text-[#4A2A1A]/80 text-sm sm:text-base">
                  <FiCheckCircle className="text-[#8B4513] mt-0.5 flex-shrink-0" size={16} />
                  <span>Strong problem-solving and communication skills</span>
                </li>
                <li className="flex items-start gap-2 text-[#4A2A1A]/80 text-sm sm:text-base">
                  <FiCheckCircle className="text-[#8B4513] mt-0.5 flex-shrink-0" size={16} />
                  <span>Experience with modern development tools and practices</span>
                </li>
              </ul>
            </div>

            {/* Benefits */}
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-[#2C1810] mb-3 flex items-center gap-2">
                <span className="w-1 h-6 bg-[#8B4513] rounded-full"></span>
                Benefits
              </h2>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-[#4A2A1A]/80 text-sm sm:text-base">
                  <FiCheckCircle className="text-[#8B4513] mt-0.5 flex-shrink-0" size={16} />
                  <span>Competitive salary and equity package</span>
                </li>
                <li className="flex items-start gap-2 text-[#4A2A1A]/80 text-sm sm:text-base">
                  <FiCheckCircle className="text-[#8B4513] mt-0.5 flex-shrink-0" size={16} />
                  <span>Health, dental, and vision insurance</span>
                </li>
                <li className="flex items-start gap-2 text-[#4A2A1A]/80 text-sm sm:text-base">
                  <FiCheckCircle className="text-[#8B4513] mt-0.5 flex-shrink-0" size={16} />
                  <span>Flexible working hours and remote work options</span>
                </li>
                <li className="flex items-start gap-2 text-[#4A2A1A]/80 text-sm sm:text-base">
                  <FiCheckCircle className="text-[#8B4513] mt-0.5 flex-shrink-0" size={16} />
                  <span>Professional development opportunities</span>
                </li>
              </ul>
            </div>

            {/* Company Info */}
            <div className="bg-[#F5F0E8] rounded-xl p-4 sm:p-6 border border-[#EDE4D8]">
              <h3 className="font-bold text-[#2C1810] flex items-center gap-2 mb-2">
                <FiUsers className="text-[#8B4513]" /> About {job.company}
              </h3>
              <p className="text-sm text-[#4A2A1A]/80">
                {job.company} is committed to inclusive hiring and creating opportunities for Indigenous professionals. 
                We value diversity and believe in building stronger communities through meaningful employment.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="bg-white px-3 py-1 rounded-full text-xs text-[#4A2A1A] border border-[#EDE4D8]">
                  <FiClock className="inline mr-1" size={12} /> Active hirer
                </span>
                <span className="bg-white px-3 py-1 rounded-full text-xs text-[#4A2A1A] border border-[#EDE4D8]">
                  <FiUsers className="inline mr-1" size={12} /> 50+ employees
                </span>
              </div>
            </div>
          </div>

          {/* Apply Button */}
          <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-[#EDE4D8] flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="text-sm text-[#4A2A1A]/60">
              <FiClock className="inline mr-1" size={14} /> Applications close in 2 weeks
            </div>
            <button className="bg-[#8B4513] text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-[#6B3410] transition-all hover:scale-105 shadow-lg flex items-center gap-2 w-full sm:w-auto">
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;