import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Video, Plus, Menu, User } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-black/95 backdrop-blur-xl shadow-lg shadow-black/20 border-b border-white/5 translate-y-0' 
        : 'bg-transparent border-b border-white/5'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link 
            to="/" 
            className="flex items-center space-x-2 transition-transform hover:scale-105"
          >
            <Video className={`h-6 w-6 transition-colors duration-300 ${
              isScrolled ? 'text-violet-500' : 'text-violet-500/80'
            }`} />
            <span className={`font-bold text-xl transition-all duration-300 ${
              isScrolled
                ? 'bg-clip-text text-transparent bg-gradient-to-r from-white to-violet-500'
                : 'bg-clip-text text-transparent bg-gradient-to-r from-white to-violet-400/80'
            }`}>
              MeetRecorder
            </span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/new"
              className={`group inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg 
                       transition-all duration-300 ease-in-out border ${
                         isScrolled
                           ? 'bg-violet-500 text-white hover:bg-violet-600 border-violet-500/50'
                           : 'bg-violet-500/10 text-violet-400 hover:bg-violet-500/20 border-violet-500/20'
                       }`}
            >
              <Plus className="h-4 w-4 mr-2 transition-transform group-hover:rotate-90 duration-300" />
              New Recording
            </Link>
            <button className={`p-2 rounded-lg transition-colors border ${
              isScrolled
                ? 'bg-violet-500/10 text-white hover:bg-violet-500/20 border-violet-500/20'
                : 'bg-card text-white/80 hover:bg-secondary-hover border-white/5'
            }`}>
              <User className="h-5 w-5" />
            </button>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors border ${
              isScrolled
                ? 'bg-violet-500/10 text-white hover:bg-violet-500/20 border-violet-500/20'
                : 'text-white/80 hover:bg-card border-white/5'
            }`}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${
        isOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
      } overflow-hidden`}>
        <div className={`px-4 py-3 space-y-3 backdrop-blur-xl border-t border-white/5 ${
          isScrolled ? 'bg-black/95' : 'bg-card'
        }`}>
          <Link
            to="/new"
            className="flex items-center px-3 py-2 rounded-lg text-violet-400 hover:bg-violet-500/10 transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Recording
          </Link>
          <button className="w-full flex items-center px-3 py-2 rounded-lg text-white/80 hover:bg-white/5 transition-colors">
            <User className="h-4 w-4 mr-2" />
            Profile
          </button>
        </div>
      </div>
    </nav>
  );
}