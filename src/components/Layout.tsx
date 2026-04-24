import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Book, Sparkles, Home } from 'lucide-react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Domů', icon: Home },
    { path: '/reading', label: 'Výklad', icon: Sparkles },
    { path: '/encyclopedia', label: 'Encyklopedie', icon: Book },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-mystic-900 overflow-x-hidden">
      {/* Background decorations */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-mystic-700/20 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-mystic-800/30 rounded-full blur-[120px] translate-x-1/3 translate-y-1/3"></div>
      </div>

      <header className="relative z-20 glass-panel border-x-0 border-t-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <Sparkles className="w-6 h-6 text-gold-500" />
              <span className="font-serif text-xl font-bold text-gold-400 tracking-wider">THOTH TAROT</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex flex-row items-center justify-center space-x-4">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                const Icon = link.icon;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center space-x-1 transition-colors ${
                      isActive ? 'text-gold-400' : 'text-gray-300 hover:text-gold-500'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span className="font-serif tracking-wide">{link.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-300 hover:text-gold-500 focus:outline-none"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden glass-panel border-x-0 border-b-0 absolute top-16 left-0 w-full z-30">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                const Icon = link.icon;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center space-x-2 px-3 py-4 rounded-md text-base font-serif ${
                      isActive ? 'bg-mystic-700/50 text-gold-400' : 'text-gray-300 hover:bg-mystic-800 hover:text-gold-500'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </header>

      <main className="relative z-10 flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      <footer className="relative z-20 border-t border-mystic-700/50 mt-auto bg-mystic-900">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center">
          <p className="text-gray-500 text-sm font-serif">
            Crowley Thoth Tarot Web App &copy; {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
};
