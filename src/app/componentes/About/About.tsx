"use client"  

import React, { useRef } from 'react'
import Image from 'next/image'
import { SparklesCore } from '../ui/sparkles'
import { Video, Edit, Palette, Play, Award, Calendar } from 'lucide-react'
import { motion, useInView } from 'motion/react' // 👈 IMPORT FRAMER MOTION

// Assign different colors for each skill
const skills = [
  { name: "Adobe Premiere Pro", icon: Video, color: "bg-yellow-500/20 text-yellow-300 border-yellow-400/40 hover:bg-yellow-500/30" },
  { name: "After Effects", icon: Edit, color: "bg-indigo-500/20 text-indigo-300 border-indigo-400/40 hover:bg-indigo-500/30" },
  { name: "DaVinci Resolve", icon: Play, color: "bg-cyan-500/20 text-cyan-300 border-cyan-400/40 hover:bg-cyan-500/30" },
  { name: "Color Grading", icon: Palette, color: "bg-emerald-500/20 text-emerald-300 border-emerald-400/40 hover:bg-emerald-500/30" },
  { name: "Cinematic Editing", icon: Video, color: "bg-pink-500/20 text-pink-300 border-pink-400/40 hover:bg-pink-500/30" },
  { name: "Motion Graphics", icon: Edit, color: "bg-orange-500/20 text-orange-300 border-orange-400/40 hover:bg-orange-500/30" }
]

// Removed all variants

const About = () => {
  const ref = useRef(null)
  // useInView hook detects when the element is visible
  const isInView = useInView(ref, { once: true, amount: 0.3 }) // Trigger once when 30% visible

  return (
    <div 
      ref={ref} // Attach the ref to the main container
      className="min-h-screen lg:h-[40rem] relative w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md py-8 lg:py-0"
    >
      
      {/* Sparkles Background */}
      <div className="absolute inset-0 w-full h-full">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#a78bfa" // violet-400 hex
        />
      </div>

      {/* Content Container */}
      <motion.div // Apply motion to the main content
        className="relative z-10 w-full h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1, transition: { duration: 0.7, ease: "easeOut" } } : { opacity: 0 }}
      >
        
        {/* Heading */}
        <motion.div 
          className="text-center mb-8 lg:mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.1 } } : { opacity: 0, y: 30 }}
        >
          <div className="flex items-center justify-center gap-3 mb-2">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-wide">
              A Bit About Me
            </h2>
          </div>
        </motion.div>

        <section className="flex flex-col lg:flex-row gap-8 lg:gap-6 max-w-6xl w-full">
          
          {/* Left - Image / Reel */}
          <motion.div
            className="w-full lg:w-1/2 flex items-center justify-center"
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.2, ease: "easeOut" } } : { opacity: 0, x: -60 }}
          >
            <div className="h-64 w-64 sm:h-80 sm:w-80 lg:h-[45vh] lg:w-[45vh] rounded-full overflow-hidden shadow-2xl border-4 border-violet-400/20">
              <Image
                src="/DP.jpg"
                alt="about-img"
                className="rounded-full h-full w-full object-cover hover:scale-102 transition-transform duration-300"
                width={400}
                height={400}
                loading="lazy"
              />
            </div>
          </motion.div>

          {/* Right - Text Content */}
          <motion.div 
            className="w-full lg:w-1/2 flex flex-col justify-center text-center lg:text-left"
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.3, ease: "easeOut" } } : { opacity: 0, x: 60 }}
          >
            
            {/* Who Am I Section */}
            <motion.div 
                className="flex items-center justify-center lg:justify-start gap-2 mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.4 } } : { opacity: 0, y: 20 }}
            >
              <Video className="w-6 h-6 text-violet-400" />
              <h3 className="text-2xl sm:text-3xl font-bold text-violet-400">
                Who Am I? <span className="text-neutral-300 font-semibold ">— I&apos;m Dhruv</span>
              </h3>
            </motion.div>
            
            <motion.p 
                className="text-white text-base sm:text-lg leading-relaxed mb-6 max-w-2xl mx-auto lg:mx-0"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.5 } } : { opacity: 0, y: 20 }}
            >
              I&apos;m a passionate <span className="text-violet-400 font-semibold">Video Editor & Storyteller</span>
              {' '}who turns raw footage into captivating stories.
              With expertise in <span className="text-violet-400 font-semibold">cinematic editing, color grading, and motion graphics</span>,
              I craft videos that not only look stunning but also connect deeply with audiences.
            </motion.p>

            {/* Animated Skills */}
            <motion.div 
                className="mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.6 } } : { opacity: 0, y: 20 }}
            >
              <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
                <Edit className="w-5 h-5 text-violet-400" />
                <h4 className="text-lg font-semibold text-white">Skills & Tools</h4>
              </div>
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                {skills.map((skill, i) => {
                  const IconComponent = skill.icon
                  return (
                    <motion.span // Animate each skill badge
                      key={i}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={isInView ? { opacity: 1, scale: 1, transition: { duration: 0.3, delay: i * 0.05 + 0.7 } } : { opacity: 0, scale: 0.5 }}
                      className={`flex items-center gap-2 px-3 py-2 text-sm rounded-full border hover:scale-105 transition-all duration-200 cursor-default ${skill.color}`}
                    >
                      <IconComponent className="w-4 h-4" />
                      {skill.name}
                    </motion.span>
                  )
                })}
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div 
                className="flex flex-col sm:flex-row gap-6 sm:gap-8 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.8 } } : { opacity: 0, y: 20 }}
            >
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-2 mb-1">
                  <Award className="w-5 h-5 text-violet-400" />
                  <p className="text-2xl sm:text-3xl font-bold text-violet-300">10+</p>
                </div>
                <p className="text-sm text-white/80">Projects Delivered</p>
              </div>
              
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-2 mb-1">
                  <Calendar className="w-5 h-5 text-violet-400" />
                  <p className="text-2xl sm:text-3xl font-bold text-violet-300">2+</p>
                </div>
                <p className="text-sm text-white/80">Years Experience</p>
              </div>
            </motion.div>
            
          </motion.div>
        </section>
      </motion.div>
    </div>
  )
}

export default About