import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import HomePage from '../pages/HomePage';
import BrowseJobsPage from '../pages/BrowseJobPage';
import PostJobPage from '../pages/PostJobPage';
import EmployersPage from '../pages/EmployersPage';
import ContactPage from '../pages/ContactPage';
import JobDetailsPage from '../pages/JobDetail';
import NotFoundPage from '../pages/NotFoundPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="browse-jobs" element={<BrowseJobsPage />} />
        <Route path="job/:id" element={<JobDetailsPage />} />
        <Route path="post-job" element={<PostJobPage />} />
        <Route path="employers" element={<EmployersPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="404" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;