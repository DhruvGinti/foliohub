"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { SparklesCore } from '../ui/sparkles'; // Restored original import

const skills = ["Adobe Premiere Pro", "After Effects", "DaVinci Resolve", "Color Grading", "Cinematic Editing", "Motion Graphics"];

const About = () => {
  return (
    // Main container: Changed fixed height to min-height for responsiveness. Added padding.
    <div className="relative w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md min-h-screen py-20 px-4">
      
      {/* Sparkles Background - Unchanged as requested */}
      <div className="absolute inset-0 w-full h-full">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>

      {/* Content Container - positioned relative to overlay on sparkles */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
        {/* Heading with responsive font size */}
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
          A Bit About Me
        </h2>

        {/* Section now stacks vertically on mobile (flex-col) and horizontally on desktop (md:flex-row) */}
        <section className="flex flex-col md:flex-row items-center gap-10 max-w-6xl w-full">
          
          {/* Left - Image / Reel - Takes full width on mobile, half on desktop */}
          <div className="w-full md:w-1/2 flex items-center justify-center">
             {/* Image container with responsive sizing */}
            <div className="h-64 w-64 md:h-[45vh] md:w-[45vh] rounded-full overflow-hidden shadow-lg flex-shrink-0">
              <img 
                src="/profile_pic.jpg"
                alt="about-img" 
                className="rounded-full h-full w-full object-cover" 
              />
            </div>
          </div>

          {/* Right - Text Content - Takes full width on mobile, half on desktop. Text centered on mobile. */} 
          <div className="w-full md:w-1/2 flex flex-col items-center text-center md:items-start md:text-left">
            <h3 className="text-2xl font-bold mb-4 text-pink-400">
              Who Am I?
            </h3>
            <p className="text-white text-lg leading-relaxed mb-6">
              I&apos;m a passionate <span className="text-pink-400 font-semibold">Video Editor & Storyteller</span> 
              who turns raw footage into captivating stories. 
              With expertise in <span className="text-pink-400 font-semibold">cinematic editing, color grading, and motion graphics</span>, 
              I craft videos that not only look stunning but also connect deeply with audiences. 
            </p>

            {/* Skills now justify-center on mobile */}
            <div className="flex flex-wrap gap-2 mb-6 justify-center md:justify-start">
              {skills.map((skill, i) => (
                <span 
                  key={i} 
                  className="px-3 py-1 text-sm bg-pink-500/20 text-pink-300 rounded-full border border-pink-400/40 hover:scale-105 transition"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Stats */}
            <div className="flex gap-8 text-pink-300 font-semibold">
              <div>
                <p className="text-3xl">10+</p>
                <p className="text-sm text-white/80">Projects Delivered</p>
              </div>
              <div>
                <p className="text-3xl">2+</p>
                <p className="text-sm text-white/80">Years Experience</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default About;

