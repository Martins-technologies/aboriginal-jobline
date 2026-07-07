import React, { useEffect, useState } from 'react';
import { FiPlus, FiBriefcase, FiMapPin, FiDollarSign, FiMail, FiFileText, FiX } from 'react-icons/fi';

const PostJobPage = () => {
  useEffect(() => {
    document.title = 'Post a Job - Aboriginal Jobline';
  }, []);

  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    type: 'Full-time',
    salary: '',
    description: '',
    requirements: '',
    contactEmail: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log('Job posted:', formData);
    setTimeout(() => {
      alert('Job posted successfully! Your listing will be visible to thousands of candidates.');
      setIsSubmitting(false);
      setFormData({
        title: '',
        company: '',
        location: '',
        type: 'Full-time',
        salary: '',
        description: '',
        requirements: '',
        contactEmail: ''
      });
    }, 1500);
  };

  const postImages = [
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&h=400&fit=crop',
  ];

  return (
    <div className="py-6 sm:py-8 bg-[#F5F0E8] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 sm:mb-8">
          <span className="inline-block text-[#8B4513] font-semibold text-sm uppercase tracking-wider mb-2">
            Post a Job
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#2C1810]">
            Post a <span className="text-[#8B4513]">Job</span>
          </h1>
          <p className="text-[#4A2A1A]/70 mt-2 max-w-2xl mx-auto">
            Reach thousands of qualified Indigenous candidates and build an inclusive workforce
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {postImages.map((url, index) => (
            <div key={index} className="rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <img src={url} alt={`Post ${index + 1}`} className="w-full h-24 sm:h-32 md:h-40 object-cover" />
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-[#EDE4D8] p-4 sm:p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="block text-sm font-medium text-[#2C1810] mb-1">
                  Job Title <span className="text-[#8B4513]">*</span>
                </label>
                <div className="relative">
                  <FiBriefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4A2A1A]/40" size={18} />
                  <input
                    type="text"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border-2 border-[#EDE4D8] rounded-xl focus:ring-2 focus:ring-[#8B4513] focus:border-[#8B4513] outline-none text-[#2C1810] placeholder:text-[#4A2A1A]/40 transition"
                    placeholder="e.g. Senior React Developer"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#2C1810] mb-1">
                  Company Name <span className="text-[#8B4513]">*</span>
                </label>
                <div className="relative">
                  <FiBriefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4A2A1A]/40" size={18} />
                  <input
                    type="text"
                    name="company"
                    required
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border-2 border-[#EDE4D8] rounded-xl focus:ring-2 focus:ring-[#8B4513] focus:border-[#8B4513] outline-none text-[#2C1810] placeholder:text-[#4A2A1A]/40 transition"
                    placeholder="e.g. TechCorp Inc."
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="block text-sm font-medium text-[#2C1810] mb-1">
                  Location
                </label>
                <div className="relative">
                  <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4A2A1A]/40" size={18} />
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border-2 border-[#EDE4D8] rounded-xl focus:ring-2 focus:ring-[#8B4513] focus:border-[#8B4513] outline-none text-[#2C1810] placeholder:text-[#4A2A1A]/40 transition"
                    placeholder="e.g. Remote, Toronto, etc."
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#2C1810] mb-1">
                  Job Type
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-[#EDE4D8] rounded-xl focus:ring-2 focus:ring-[#8B4513] focus:border-[#8B4513] outline-none text-[#2C1810] bg-white"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                  <option value="Remote">Remote</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#2C1810] mb-1">
                Salary Range
              </label>
              <div className="relative">
                <FiDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4A2A1A]/40" size={18} />
                <input
                  type="text"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border-2 border-[#EDE4D8] rounded-xl focus:ring-2 focus:ring-[#8B4513] focus:border-[#8B4513] outline-none text-[#2C1810] placeholder:text-[#4A2A1A]/40 transition"
                  placeholder="e.g. $80k - $100k"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#2C1810] mb-1">
                Job Description <span className="text-[#8B4513]">*</span>
              </label>
              <div className="relative">
                <FiFileText className="absolute left-3 top-3 text-[#4A2A1A]/40" size={18} />
                <textarea
                  name="description"
                  required
                  rows="4"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border-2 border-[#EDE4D8] rounded-xl focus:ring-2 focus:ring-[#8B4513] focus:border-[#8B4513] outline-none text-[#2C1810] placeholder:text-[#4A2A1A]/40 transition resize-y"
                  placeholder="Describe the job role, responsibilities, and benefits..."
                ></textarea>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#2C1810] mb-1">
                Requirements
              </label>
              <textarea
                name="requirements"
                rows="3"
                value={formData.requirements}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-[#EDE4D8] rounded-xl focus:ring-2 focus:ring-[#8B4513] focus:border-[#8B4513] outline-none text-[#2C1810] placeholder:text-[#4A2A1A]/40 transition resize-y"
                placeholder="List the requirements and qualifications..."
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#2C1810] mb-1">
                Contact Email <span className="text-[#8B4513]">*</span>
              </label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4A2A1A]/40" size={18} />
                <input
                  type="email"
                  name="contactEmail"
                  required
                  value={formData.contactEmail}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border-2 border-[#EDE4D8] rounded-xl focus:ring-2 focus:ring-[#8B4513] focus:border-[#8B4513] outline-none text-[#2C1810] placeholder:text-[#4A2A1A]/40 transition"
                  placeholder="hr@company.com"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
              <button 
                type="submit" 
                disabled={isSubmitting}
                className={`bg-[#8B4513] text-white px-8 py-3.5 rounded-xl font-semibold transition-all hover:scale-105 shadow-lg flex items-center justify-center gap-2 flex-1 ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#6B3410]'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></span>
                    Posting...
                  </>
                ) : (
                  <>
                    <FiPlus /> Post Job
                  </>
                )}
              </button>
              <button 
                type="reset" 
                className="border-2 border-[#2C1810] text-[#2C1810] px-8 py-3.5 rounded-xl font-semibold hover:bg-[#2C1810] hover:text-white transition-all hover:scale-105 flex items-center justify-center gap-2 flex-1"
              >
                <FiX /> Reset Form
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostJobPage;