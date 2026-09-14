import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const useJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/jobs`);
        setJobs(response.data);
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to fetch jobs');
        setJobs([
          {
            id: 1,
            title: 'Senior Frontend Developer',
            company: 'TechCorp',
            location: 'Remote',
            type: 'Full-time',
            salary: '$120k - $150k',
            description: 'We are looking for a Senior Frontend Developer with 5+ years of experience in React and modern JavaScript frameworks.',
            postedAt: '2 days ago'
          },
          {
            id: 2,
            title: 'UX/UI Designer',
            company: 'DesignStudio',
            location: 'New York, NY',
            type: 'Contract',
            salary: '$80k - $100k',
            description: 'Join our creative team to design beautiful and intuitive user experiences for our clients.',
            postedAt: '5 days ago'
          },
          {
            id: 3,
            title: 'Data Analyst',
            company: 'DataInsights',
            location: 'San Francisco, CA',
            type: 'Full-time',
            salary: '$90k - $120k',
            description: 'Analyze complex data sets and provide actionable insights to drive business decisions.',
            postedAt: '1 week ago'
          },
          {
            id: 4,
            title: 'Product Manager',
            company: 'InnovateCo',
            location: 'Austin, TX',
            type: 'Full-time',
            salary: '$110k - $140k',
            description: 'Lead product development from conception to launch, working with cross-functional teams.',
            postedAt: '3 days ago'
          },
          {
            id: 5,
            title: 'DevOps Engineer',
            company: 'CloudTech',
            location: 'Remote',
            type: 'Full-time',
            salary: '$130k - $160k',
            description: 'Design and implement CI/CD pipelines, manage cloud infrastructure and ensure system reliability.',
            postedAt: '4 days ago'
          },
          {
            id: 6,
            title: 'Marketing Specialist',
            company: 'GrowthHub',
            location: 'Chicago, IL',
            type: 'Part-time',
            salary: '$60k - $80k',
            description: 'Develop and execute marketing campaigns to drive brand awareness and customer acquisition.',
            postedAt: '1 day ago'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return { jobs, loading, error };
};