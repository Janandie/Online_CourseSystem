import './App.css'
import { useState, useEffect } from 'react';
import HomePage from './pages/HomePage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import CoursePage from './pages/CoursePage';
import ContactUs from './pages/ContactUs';
import AboutUs from './pages/AboutUs';
import Admin from './pages/Admin/admin';
import AdminCourses from './pages/Admin/AdminCourses';
import UserProfile from './pages/ProfilePage.jsx';
import AdminInstructors from './pages/Admin/AdminInstructors';
import AdminStudents from './pages/Admin/AdminStudent.jsx';


function App() {
  const [currentPage, setCurrentPage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = localStorage.getItem('token');
        const userString = localStorage.getItem('user');

        if (token && userString) {
          const user = JSON.parse(userString);
          const savedPage = localStorage.getItem('currentPage');

          if (savedPage && savedPage !== 'signin' && savedPage !== 'signup') {
            if (user.role === 'ADMIN' && (savedPage === 'admin' || savedPage === 'admin-courses')) {
              setCurrentPage(savedPage);
            } else if (user.role !== 'ADMIN' && !savedPage.startsWith('admin')) {
              setCurrentPage(savedPage);
            } else {
              setCurrentPage(user.role === 'ADMIN' ? 'admin' : 'home');
            }
          } else {
            setCurrentPage(user.role === 'ADMIN' ? 'admin' : 'home');
          }
        } else {
          setCurrentPage('signin');
        }
      } catch (error) {
        localStorage.clear();
        setCurrentPage('signin');
      } finally {
        setIsLoading(false);
      }
    };

    const timer = setTimeout(checkAuthStatus, 100);
    return () => clearTimeout(timer);
  }, []);

  const isAuthenticated = () => {
    try {
      return !!(localStorage.getItem('token') && localStorage.getItem('user'));
    } catch {
      return false;
    }
  };

  const isAdmin = () => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      return user.role === 'ADMIN';
    } catch {
      return false;
    }
  };

  const navigateTo = (page, params = {}) => {
    const protectedPages = ['course', 'admin', 'admin-courses', 'course-content', 'profile', 'my-courses'];
    const adminOnlyPages = ['admin', 'admin-courses'];

    if (protectedPages.includes(page) && !isAuthenticated()) {
      localStorage.setItem('redirectAfterLogin', page);
      if (Object.keys(params).length > 0) {
        localStorage.setItem('redirectParams', JSON.stringify(params));
      }
      setCurrentPage('signin');
      localStorage.setItem('currentPage', 'signin');
      return;
    }

    if (adminOnlyPages.includes(page) && !isAdmin()) {
      setCurrentPage('home');
      localStorage.setItem('currentPage', 'home');
      return;
    }

    setCurrentPage(page);
    localStorage.setItem('currentPage', page);
  };

  const handleLogout = () => {
    localStorage.clear();
    setCurrentPage('signin');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const pageToRender = currentPage || 'signin';

  const renderPage = () => {
    const protectedPages = ['course', 'admin', 'admin-courses', 'course-content', 'profile', 'my-courses'];
    const adminOnlyPages = ['admin', 'admin-courses'];

    if (protectedPages.includes(pageToRender) && !isAuthenticated()) {
      return <SignInPage navigateTo={navigateTo} />;
    }

    if (adminOnlyPages.includes(pageToRender) && !isAdmin()) {
      return <HomePage navigateTo={navigateTo} />;
    }

    switch (pageToRender) {
      case 'course': return <CoursePage navigateTo={navigateTo} />;
      case 'signin': return <SignInPage navigateTo={navigateTo} />;
      case 'signup': return <SignUpPage navigateTo={navigateTo} />;
      case 'home': return <HomePage navigateTo={navigateTo} />;
      case 'contact': return <ContactUs navigateTo={navigateTo} />;
      case 'about': return <AboutUs navigateTo={navigateTo} />;
      case 'admin': return <Admin navigateTo={navigateTo} />;
      case 'admin-courses': return <AdminCourses navigateTo={navigateTo} />;
      case 'admin-instructors': return <AdminInstructors navigateTo={navigateTo} />;
      case 'user-profile': return <UserProfile navigateTo={navigateTo} />;
      case 'admin-students': return <AdminStudents navigateTo={navigateTo} />;
      default: return <SignInPage navigateTo={navigateTo} />;
    }
  };

  return (
    <div className="min-h-screen">
      {renderPage()}
    </div>
  );
}

export default App;
