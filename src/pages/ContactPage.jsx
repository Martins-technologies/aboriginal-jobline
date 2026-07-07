import React, { useEffect, useState } from 'react';
import { FiMail, FiPhone, FiMapPin, FiSend, FiUser, FiMessageSquare } from 'react-icons/fi';

const ContactPage = () => {
  useEffect(() => {
    document.title = 'Contact Us - Aboriginal Jobline';
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactImages = [
    'https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=600&h=400&fit=crop&sat=-30',
    'https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=600&h=400&fit=crop&sat=-50',
    'https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=600&h=400&fit=crop&sat=-70',
  ];

  return (
    <div className="py-6 sm:py-8 bg-[#F5F0E8] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <span className="inline-block text-[#8B4513] font-semibold text-sm uppercase tracking-wider mb-2">
            Get in Touch
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#2C1810]">
            Contact <span className="text-[#8B4513]">Us</span>
          </h1>
          <p className="text-[#4A2A1A]/70 mt-2 max-w-2xl mx-auto">
            We're here to help. Reach out to our team and we'll respond within 24 hours
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-[#EDE4D8] p-4 sm:p-6 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Left Column - Contact Info */}
            <div>
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start gap-3 sm:gap-4 group">
                  <div className="bg-[#8B4513]/10 p-3 rounded-full group-hover:bg-[#8B4513] transition-colors">
                    <FiMail className="w-5 h-5 sm:w-6 sm:h-6 text-[#8B4513] group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#2C1810]">Email</h4>
                    <p className="text-[#4A2A1A]/70 text-sm sm:text-base">info@aboriginaljobline.com</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 sm:gap-4 group">
                  <div className="bg-[#8B4513]/10 p-3 rounded-full group-hover:bg-[#8B4513] transition-colors">
                    <FiPhone className="w-5 h-5 sm:w-6 sm:h-6 text-[#8B4513] group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#2C1810]">Phone</h4>
                    <p className="text-[#4A2A1A]/70 text-sm sm:text-base">1-866-522-9898</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 sm:gap-4 group">
                  <div className="bg-[#8B4513]/10 p-3 rounded-full group-hover:bg-[#8B4513] transition-colors">
                    <FiMapPin className="w-5 h-5 sm:w-6 sm:h-6 text-[#8B4513] group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#2C1810]">Address</h4>
                    <p className="text-[#4A2A1A]/70 text-sm sm:text-base">
                      200 – 275 Slater Street<br />
                      Ottawa, ON K1P 5H9<br />
                      Canada
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Images */}
              <div className="grid grid-cols-2 gap-2 sm:gap-3 mt-6">
                {contactImages.map((url, index) => (
                  <div key={index} className="rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all hover:scale-105">
                    <img src={url} alt={`Contact ${index + 1}`} className="w-full h-20 sm:h-28 object-cover" />
                  </div>
                ))}
              </div>

              {/* Working Hours */}
              <div className="mt-6 p-4 bg-[#F5F0E8] rounded-xl border border-[#EDE4D8]">
                <h4 className="font-semibold text-[#2C1810] flex items-center gap-2">
                  <FiMessageSquare className="text-[#8B4513]" /> Working Hours
                </h4>
                <div className="mt-2 space-y-1 text-sm text-[#4A2A1A]/70">
                  <p>Monday - Friday: 9:00 AM - 6:00 PM EST</p>
                  <p>Saturday: 10:00 AM - 4:00 PM EST</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div>
              <h3 className="text-xl font-bold text-[#2C1810] mb-4">Send Us a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div>
                  <label className="block text-sm font-medium text-[#2C1810] mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-[#EDE4D8] rounded-xl focus:ring-2 focus:ring-[#8B4513] focus:border-[#8B4513] outline-none text-[#2C1810] placeholder:text-[#4A2A1A]/40 transition"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[#2C1810] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-[#EDE4D8] rounded-xl focus:ring-2 focus:ring-[#8B4513] focus:border-[#8B4513] outline-none text-[#2C1810] placeholder:text-[#4A2A1A]/40 transition"
                    placeholder="Enter your email address"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[#2C1810] mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-[#EDE4D8] rounded-xl focus:ring-2 focus:ring-[#8B4513] focus:border-[#8B4513] outline-none text-[#2C1810] placeholder:text-[#4A2A1A]/40 transition"
                    placeholder="What is this regarding?"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[#2C1810] mb-1">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-[#EDE4D8] rounded-xl focus:ring-2 focus:ring-[#8B4513] focus:border-[#8B4513] outline-none text-[#2C1810] placeholder:text-[#4A2A1A]/40 transition resize-y"
                    placeholder="Tell us how we can help you..."
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  className="bg-[#8B4513] text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-[#6B3410] transition-all hover:scale-105 shadow-lg flex items-center justify-center gap-2 w-full sm:w-auto"
                >
                  <FiSend /> Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;