import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  // 🚫 Hide header completely on /admin and /login
  if (location.pathname.startsWith("/admin") || location.pathname.startsWith("/login")) {
    return null;
  }

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Careers', href: '/jobs' },
    { name: 'Cleaning Services', href: '/cleaning-services' },
    {name: 'Request Workforce', href: '/workforce' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'About', href: '/about' },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <img
                  src="/WhatsApp Image 2025-09-14 at 17.59.41_20fe9daf.jpg"
                  alt="Nexus Human Resources Consultancy"
                  className="h-10 w-auto"
              />
              <div>
                <span className="text-xl font-bold text-gray-900">Talent Nexus HR</span>
                <div className="text-xs text-blue-600 font-medium">Excellence • Innovation • Growth</div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                  <Link
                      key={item.name}
                      to={item.href}
                      className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                          isActive(item.href)
                              ? 'bg-blue-100 text-blue-700'
                              : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                      }`}
                  >
                    {item.name}
                  </Link>
              ))}
              <Link
                  to="/jobs"
                  className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-200 shadow-md"
              >
                View Careers
              </Link>
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
              <div className="md:hidden border-t border-gray-200 py-4">
                {navigation.map((item) => (
                    <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`block px-3 py-2 text-base font-medium rounded-lg mb-2 transition-all duration-200 ${
                            isActive(item.href)
                                ? 'bg-blue-100 text-blue-700'
                                : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                        }`}
                    >
                      {item.name}
                    </Link>
                ))}
                <Link
                    to="/jobs"
                    onClick={() => setIsMenuOpen(false)}
                    className="block bg-gradient-to-r from-blue-600 to-blue-700 text-white px-3 py-2 rounded-lg font-medium text-center mt-4 hover:from-blue-700 hover:to-blue-800 transition-all duration-200"
                >
                  View Careers
                </Link>
              </div>
          )}
        </div>
      </header>
  );
};

export default Header;
