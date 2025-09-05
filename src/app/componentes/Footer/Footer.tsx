import React from 'react'
import { Instagram, Twitter, Github } from 'lucide-react'

const socials = [
  { name: 'Instagram', href: 'https://instagram.com', icon: <Instagram /> },
  { name: 'Twitter', href: 'https://twitter.com', icon: <Twitter /> },
  { name: 'Github', href: 'https://github.com', icon: <Github /> },
]

const Footer = () => {
  return (
    <section className="bg-black flex items-center justify-center flex-col text-white py-8">
      {/* Top line */}
      <div className="w-[85%] h-px bg-gray-600"></div>
      
      {/* Footer content */}
      <div 
        // CHANGED: These classes make the layout responsive.
        // - On mobile (default): `flex-col` stacks items vertically with a `gap-6`.
        // - On medium screens and up (`md:`): `flex-row` and `justify-between` create the horizontal layout.
        className="w-4/5 mx-auto flex flex-col md:flex-row items-center md:justify-between gap-6 md:gap-5 py-8 text-sm text-center md:text-left"
      >
        {/* Copyright info - moved to the top for better mobile order */}
        <p className="order-3 md:order-1">© 2025 Dhruv. All rights reserved.</p>
        
        {/* Social media links */}
        <div className="flex gap-5 order-1 md:order-2">
          {socials.map((item) => (
            <a
              href={item.href}
              key={item.name}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.name}
              className="text-gray-400 hover:text-white transition-transform duration-200 hover:scale-110"
            >
              {item.icon}
              <span className="sr-only">{item.name}</span>
            </a>
          ))}
        </div>
        
        {/* Legal links */}
        <div className="flex gap-2 order-2 md:order-3 text-gray-400">
          <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
          <span>|</span>
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
        </div>
      </div>
    </section>
  )
}

export default Footer