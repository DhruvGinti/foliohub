"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // --- Scroll Handlers ---
  const scrollAbout = () => {
    window.scrollTo({
      // Scrolls to a position calculated relative to the viewport height
      top: window.innerHeight * 2.5,
      behavior: "smooth"
    });
    setIsOpen(false); // Close mobile menu on click
  };
  
  const scrollContact = ()=>{
    window.scrollTo({
      // Scrolls to a position near the bottom of the page
      top:(document.body.scrollHeight - 860),
      behavior:"smooth"
    });
    setIsOpen(false); // Close mobile menu on click
  }

  // --- Effect to handle navbar style on scroll ---
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- Component for Links to avoid Next.js dependency ---
  const Link = ({ href, children, ...props }) => (
    <a href={href} {...props}>
      {children}
    </a>
  );

  // --- Animation Variants for Mobile Menu ---
  const menuVariants = {
    hidden: { opacity: 0, y: -20, transition: { duration: 0.2 } },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2, staggerChildren: 0.05 } },
  };

  const linkVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  const navLinkClasses = "relative px-2 py-1 transition duration-200 hover:text-pink-400 after:content-[''] after:block after:h-0.5 after:bg-pink-400 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left";

  return (
    <>
      <div className="w-full flex justify-center">
        <nav
          className={`fixed top-0 z-50 rounded-full mt-4 shadow-lg transition-all duration-300 ${
            scrolled
              ? "backdrop-blur-lg bg-black/60 border-b border-white/10 w-[90%] md:w-[60%]"
              : "bg-gradient-to-r from-transparent via-black/40 to-black/60 w-[95%] md:w-[89%]"
          }`}
        >
          <div className="max-w-9xl mx-auto px-6 py-4 flex justify-between items-center">
            {/* Logo */}
            <Link
              href="/"
              className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-pink-400 via-fuchsia-400 to-blue-400 bg-clip-text text-transparent flex items-center gap-1"
            >
              Dhruv
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex space-x-4 md:space-x-8 text-white font-medium">
              <Link href="#" className={navLinkClasses}>Home</Link>
              <Link href="#" className={navLinkClasses}>Editor</Link>
              <button onClick={scrollAbout} className={navLinkClasses}>About</button>
              <button onClick={scrollContact} className={navLinkClasses}>Contact</button>
            </div>
            
            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-neutral-300 hover:text-white hover:bg-neutral-800 focus:outline-none"
                aria-controls="mobile-menu"
                aria-expanded={isOpen}
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            className="md:hidden fixed top-24 left-0 right-0 z-40 bg-black/95 backdrop-blur-lg pb-4 mx-4 rounded-xl border border-white/10"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={menuVariants}
          >
            <div className="px-2 pt-2 pb-3 space-y-2 sm:px-3">
              <motion.div variants={linkVariants}>
                <Link href="#" onClick={() => setIsOpen(false)} className="text-neutral-300 hover:bg-neutral-800 hover:text-white block px-3 py-2 rounded-md text-base font-medium text-center transition-colors">Home</Link>
              </motion.div>
              <motion.div variants={linkVariants}>
                <Link href="#" onClick={() => setIsOpen(false)} className="text-neutral-300 hover:bg-neutral-800 hover:text-white block px-3 py-2 rounded-md text-base font-medium text-center transition-colors">Editor</Link>
              </motion.div>
              <motion.div variants={linkVariants}>
                <button onClick={scrollAbout} className="w-full text-neutral-300 hover:bg-neutral-800 hover:text-white block px-3 py-2 rounded-md text-base font-medium text-center transition-colors">About</button>
              </motion.div>
              <motion.div variants={linkVariants}>
                <button onClick={scrollContact} className="w-full text-neutral-300 hover:bg-neutral-800 hover:text-white block px-3 py-2 rounded-md text-base font-medium text-center transition-colors">Contact</button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

