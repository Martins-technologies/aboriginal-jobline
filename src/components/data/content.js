import {
  FiSearch,
  FiUsers,
  FiHeart,
  FiBriefcase,
  FiTool,
  FiBookOpen,
  FiTruck,
  FiUser,
  FiSend,
  FiMonitor,
} from 'react-icons/fi'
import { FaRegHeart, FaHandshake, FaBell } from 'react-icons/fa'
import { PiBellSimple, PiForkKnife } from 'react-icons/pi'

export const NAV_LINKS = ['Home', 'Browse Jobs', 'Employers', 'About Us', 'Contact']

export const FEATURES = [
  {
    icon: FiSearch,
    color: 'pine',
    title: 'Easy Job Search',
    text: 'Find opportunities that match your skills, goals, and values.',
  },
  {
    icon: FiUsers,
    color: 'rust',
    title: 'Inclusive Employers',
    text: 'Connect with employers who value inclusion and Indigenous talent.',
  },
  {
    icon: FiHeart,
    color: 'gold',
    title: 'Community Focus',
    text: 'Building stronger communities through meaningful employment.',
  },
]

export const CATEGORIES = [
  {
    icon: FiBriefcase,
    title: 'Office & Administration',
    text: 'Find roles in data entry, customer service, HR, and more.',
  },
  {
    icon: FiTool,
    title: 'Skilled Trades',
    text: 'Explore opportunities in construction, welding, electrician, and more.',
  },
  {
    icon: FiBookOpen,
    title: 'Education',
    text: 'Find jobs in teaching, support services, and educational leadership.',
  },
  {
    icon: FaRegHeart,
    title: 'Healthcare',
    text: 'Discover roles in nursing, caregiving, wellness, and allied health.',
  },
  {
    icon: PiForkKnife,
    title: 'Hospitality',
    text: 'Find opportunities in hotels, restaurants, tourism, and events.',
  },
  {
    icon: FiTruck,
    title: 'Transportation',
    text: 'Explore driving, logistics, warehouse, and fleet support roles.',
  },
]

export const STEPS = [
  {
    icon: FiSearch,
    color: 'pine',
    title: 'Search Jobs',
    text: 'Browse thousands of job listings across Canada that match your skills and interests.',
  },
  {
    icon: FiUser,
    color: 'rust',
    title: 'Create Profile',
    text: 'Build your profile, showcase your experience, and let employers find you.',
  },
  {
    icon: FiSend,
    color: 'gold',
    title: 'Apply with Confidence',
    text: 'Apply to jobs that fit you best and connect with inclusive employers who value your talent.',
  },
]

export const JOBS = [
  {
    icon: FiBriefcase,
    color: 'pine',
    title: 'Indigenous Employment Coordinator',
    location: 'Winnipeg, MB',
    type: 'Full-time',
  },
  {
    icon: FiBookOpen,
    color: 'rust',
    title: 'Administrative Assistant',
    location: 'Toronto, ON',
    type: 'Full-time',
  },
  {
    icon: FiHeart,
    color: 'gold',
    title: 'Community Support Worker',
    location: 'Vancouver, BC',
    type: 'Part-time',
  },
  {
    icon: FiTruck,
    color: 'rust',
    title: 'Heavy Equipment Operator',
    location: 'Fort McMurray, AB',
    type: 'Full-time',
  },
  {
    icon: PiBellSimple,
    color: 'pine',
    title: 'Guest Services Associate',
    location: 'Calgary, AB',
    type: 'Part-time',
  },
  {
    icon: FaRegHeart,
    color: 'gold',
    title: 'Health Care Aide',
    location: 'Halifax, NS',
    type: 'Full-time',
  },
]

export const WHY_EMPLOYERS = [
  {
    icon: FiUsers,
    color: 'pine',
    title: 'Trusted Community Reach',
    text: 'Connect with Indigenous talent across urban, rural, and remote communities nationwide.',
  },
  {
    icon: FaHandshake,
    color: 'rust',
    title: 'Inclusive Recruitment',
    text: 'Promote diversity and inclusion by reaching a platform built for Indigenous job seekers.',
  },
  {
    icon: FiMonitor,
    color: 'pine',
    title: 'Easy Job Posting',
    text: 'Post jobs quickly and manage applications with our simple, user-friendly tools.',
  },
  {
    icon: FaHandshake,
    color: 'gold',
    title: 'Meaningful Connections',
    text: 'Build long-term relationships and strengthen your organization with engaged, dedicated talent.',
  },
]

export const RESOURCES = [
  {
    badge: 'JOB SEEKERS',
    badgeColor: 'pine',
    imageTone: 'gold',
    title: 'Resume Tips for Aboriginal Job Seekers',
    text: 'Highlight your strengths, skills, and community experience with confidence.',
  },
  {
    badge: 'EMPLOYERS',
    badgeColor: 'rust',
    imageTone: 'pine',
    title: 'How Employers Can Build Inclusive Hiring Practices',
    text: 'Create workplaces where Indigenous talent thrives and communities prosper.',
  },
  {
    badge: 'COMMUNITY',
    badgeColor: 'gold',
    imageTone: 'rust',
    title: 'Career Growth in Indigenous Communities',
    text: 'Explore opportunities, training, and pathways to long-term success.',
  },
]

export const TESTIMONIALS = [
  {
    quote:
      'Aboriginal Jobline helped me find a job where I can grow, support my family, and give back to my community.',
    name: 'Melissa K.',
    role: 'Job Seeker',
    color: 'pine',
  },
  {
    quote:
      "We've connected with incredible Indigenous talent through Aboriginal Jobline. It's a valuable partner in our hiring journey.",
    name: 'James T.',
    role: 'Employer',
    color: 'rust',
  },
  {
    quote:
      'The resources and guidance I found here helped me build confidence and take the next step in my career.',
    name: 'Tanya R.',
    role: 'Job Seeker',
    color: 'gold',
  },
]

export const FOOTER_COLUMNS = [
  {
    heading: 'Quick Links',
    links: ['Home', 'Browse Jobs', 'Employers', 'About Us', 'Contact Us', 'FAQ'],
  },
  {
    heading: 'Job Seekers',
    links: [
      'Browse Jobs',
      'Resume Tips',
      'Career Resources',
      'Community Stories',
      'Success Stories',
      'Support & FAQ',
    ],
  },
  {
    heading: 'Employers',
    links: [
      'Post a Job',
      'Inclusive Hiring',
      'Why Hire Indigenous Talent',
      'Employer Resources',
      'Partnerships',
      'Contact Us',
    ],
  },
]

/** Shared color lookup so icon circles stay consistent everywhere. */
export const TONE = {
  pine: {
    solid: 'bg-pine-700 text-white',
    soft: 'bg-pine-700/10 text-pine-700',
    ring: 'border-pine-700',
    text: 'text-pine-700',
  },
  rust: {
    solid: 'bg-rust-600 text-white',
    soft: 'bg-rust-600/10 text-rust-600',
    ring: 'border-rust-600',
    text: 'text-rust-600',
  },
  gold: {
    solid: 'bg-gold-500 text-white',
    soft: 'bg-gold-500/15 text-gold-600',
    ring: 'border-gold-500',
    text: 'text-gold-600',
  },
}
