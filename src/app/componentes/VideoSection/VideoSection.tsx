"use client"

import RightSection from "./RightSection"
import { motion } from "framer-motion" // It's generally better to import from the main package
import React, { useEffect, useRef, useState } from "react"

const EditorShowcase = () => {
  const [isHovered, setIsHovered] = useState(false)
  const [coords, setCoords] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setCoords({ x, y })
  }

  const singleVideoSrc = encodeURI("/img/VN20250905_013823.mp4")

  useEffect(() => {
    // Attempt to play the video, add controls on failure
    videoRef.current?.play().catch(() => {
      if (videoRef.current) {
        videoRef.current.controls = true
      }
    })
  }, [])

  return (
    <div
      ref={containerRef}
      // CHANGE: Adjusted padding for better mobile spacing and removed justify-center to allow natural stacking from the top.
      className="bg-black min-h-screen w-full text-white flex flex-col items-center justify-start gap-12 px-6 py-12 md:px-12 relative"
    >
      <section 
        // CHANGE: This is the core of the mobile fix. It stacks children vertically by default (`flex-col`) 
        // and switches to a row layout on medium screens and up (`md:flex-row`). 
        // Increased the gap for better separation on mobile.
        className="flex flex-col md:flex-row w-full max-w-7xl items-center md:items-start justify-between gap-16"
      >
        {/* LEFT BOX */}
        {/* CHANGE: Ensured it takes full width on mobile and 60% on desktop */}
        <div className="w-full md:w-[60%] flex flex-col justify-start gap-8">
          {/* Page Title */}
          {/* CHANGE: Removed fixed height `h-30` to let content define its own height, which is better for responsiveness. */}
          <div className="flex items-start justify-start mb-4">
            <motion.h1
              className="text-4xl md:text-7xl font-semibold tracking-tight 
                         bg-gradient-to-r from-blue-400 via-purple-500 to-orange-500 
                         bg-clip-text text-transparent 
                         drop-shadow-[0_0_35px_rgba(168,85,247,0.8)]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Video Editing Portfolio
            </motion.h1>
          </div>

          {/* New Single Video Section */}
          <motion.div className="relative flex flex-col items-center justify-center">
            <div
              // CHANGE: Using aspect-ratio is much more reliable for responsive videos than a fixed viewport height (vh).
              // The video will now maintain a 16:9 aspect ratio while filling the width of its container.
              className="relative z-10 w-full aspect-video"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onMouseMove={handleMouseMove}
            >
              <div className="relative overflow-hidden rounded-2xl group w-full h-full">
                <video
                  ref={videoRef}
                  src={singleVideoSrc}
                  className="rounded-2xl object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                  muted
                  loop
                  playsInline
                  autoPlay
                  preload="metadata"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
            <div className="relative z-10 mt-6 text-center w-full">
              <motion.h2
                // CHANGE: Slightly smaller text on mobile for better balance
                className="text-2xl md:text-3xl font-semibold font-sans text-white"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                Color Grading and Smooth Transitions
              </motion.h2>
            </div>
          </motion.div>
        </div>

        {/* RIGHT BOX */}
        {/* ADDED: A wrapper div to control the width and alignment of the RightSection. */}
        <div className="w-full md:w-[40%] flex justify-center">
            <RightSection containerRef={containerRef as React.RefObject<HTMLDivElement>} />
        </div>
      </section>
    </div>
  )
}

export default EditorShowcase