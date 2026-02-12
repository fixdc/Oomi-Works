import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const StaggeredMenu = ({ items, logoUrl, socialItems }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setIsDarkMode(isDark);
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    if (html.classList.contains('dark')) {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDarkMode(false);
    } else {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDarkMode(true);
    }
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  // Animasi Responsif (Mobile Slide vs Desktop Pop)
  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;

  const menuVariants = {
    closed: { 
      opacity: 0, scale: 0.95, y: -20, x: "100%", 
      transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] } 
    },
    open: { 
      opacity: 1, scale: 1, y: 0, x: 0, 
      transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] } 
    },
    desktopClosed: { opacity: 0, scale: 0.9, y: -20, x: 0, pointerEvents: "none" },
    desktopOpen: { opacity: 1, scale: 1, y: 0, x: 0, pointerEvents: "auto", transition: { type: "spring", stiffness: 300, damping: 30 } }
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${isScrolled ? 'py-4' : 'py-6'}`}>
        <div className={`absolute inset-0 bg-white/80 dark:bg-oomi-dark/80 backdrop-blur-md border-b border-gray-200 dark:border-white/10 transition-opacity duration-300 ${isScrolled ? 'opacity-100' : 'opacity-0'}`} />
        <div className="relative max-w-7xl mx-auto px-6 sm:px-14 lg:px-48 flex items-center justify-between">
          
          <a href="#" className="flex items-center gap-2 group z-[102]">
            <img src={logoUrl} alt="Logo" className="h-8 w-auto dark:invert transition-transform duration-300 group-hover:scale-110" />
            <span className="font-black text-xl tracking-tighter text-oomi-dark dark:text-white">OOMI.</span>
          </a>

          <div className="flex items-center gap-4 z-[102]">
            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-oomi-dark dark:text-white transition-colors" aria-label="Toggle Theme">
              {isDarkMode ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
              )}
            </button>

            <button onClick={toggleMenu} className="relative w-10 h-10 flex flex-col justify-center items-center gap-1.5 group">
              <span className={`h-0.5 bg-oomi-dark dark:bg-white transition-all duration-300 ${isOpen ? 'w-6 rotate-45 translate-y-2' : 'w-8 group-hover:w-6'}`} />
              <span className={`h-0.5 bg-oomi-dark dark:bg-white transition-all duration-300 ${isOpen ? 'opacity-0' : 'w-6 group-hover:w-8'}`} />
              <span className={`h-0.5 bg-oomi-dark dark:bg-white transition-all duration-300 ${isOpen ? 'w-6 -rotate-45 -translate-y-2' : 'w-4 group-hover:w-6'}`} />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={toggleMenu}
            className="fixed inset-0 z-[90] bg-black/20 backdrop-blur-sm hidden md:block"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial={isMobile ? "closed" : "desktopClosed"}
            animate={isMobile ? "open" : "desktopOpen"}
            exit={isMobile ? "closed" : "desktopClosed"}
            className={`
              fixed z-[91] bg-oomi-dark text-white flex flex-col
              inset-0 justify-center px-6
              md:inset-auto md:top-24 md:right-14 lg:right-48
              md:w-[400px] md:h-auto md:rounded-[2rem] md:py-12 md:px-10 md:shadow-2xl md:border md:border-white/10
            `}
          >
            <div className="flex flex-col gap-4 md:gap-2">
              {items.map((item, index) => (
                <motion.div key={index} initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1, transition: { delay: 0.1 + (index * 0.1) } }}>
                  <a href={item.link} onClick={toggleMenu} className="block text-5xl md:text-4xl font-black tracking-tighter hover:text-oomi-accent hover:translate-x-4 transition-all duration-300 uppercase">{item.label}</a>
                </motion.div>
              ))}
            </div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.4 } }} className="mt-12 pt-8 border-t border-white/10 flex flex-col gap-4">
              <div className="flex gap-6 text-sm font-bold tracking-widest">
                {socialItems?.map((social, idx) => (
                  <a key={idx} href={social.link} className="hover:text-oomi-accent transition-colors">{social.label}</a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default StaggeredMenu;