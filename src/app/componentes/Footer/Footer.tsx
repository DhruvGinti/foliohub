import React from 'react'
import { Instagram, Twitter, Github } from 'lucide-react'

const socials = [
  { name: 'Instagram', href: 'https://www.instagram.com/mitrox_mx?igsh=MWVnMDg2eXB0bnk2aA==', icon: <Instagram /> },
  // { name: 'Twitter', href: 'https://twitter.com', icon: <Twitter /> },
  { name: 'Github', href: 'https://github.com/DhruvGinti', icon: <Github /> },
]

const Footer = () => {
  return (
    <section className="bg-black flex items-center justify-center flex-col text-white">
      {/* Top line */}
      <div className="w-[85%] h-px bg-gray-600"></div>
      
      {/* Footer content with 80% width and centered */}
      <div className="w-4/5 mx-auto flex flex-wrap items-center justify-between gap-5 py-6 text-sm">
        <div className="flex gap-2">
          <p>Terms & Conditions</p>
          <p>|</p>
          <p>Privacy Policy</p>
        </div>
        
        <div className="flex gap-3">
          {socials.map((item) => (
            <a
              href={item.href}
              key={item.name}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.name}
              className="flex items-center gap-1 hover:text-gray-300 transition-colors"
            >
              {item.icon}
              <span className="sr-only">{item.name}</span>
            </a>
          ))}
        </div>
        
        <p>© 2025 Dhruv.</p>
      </div>
    </section>
  )
}

export default Footer