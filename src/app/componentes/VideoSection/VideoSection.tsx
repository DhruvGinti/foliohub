"use client"

import RightSection from "./RightSection"
import { motion } from "motion/react"
import React, { useEffect, useRef, useState } from "react"

const EditorShowcase = () => {
  const [isHovered, setIsHovered] = useState(false)
  const [coords, setCoords] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null) // Ref for the new single video

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setCoords({ x, y })
  }

  const singleVideoSrc = encodeURI("/img/VN20250905_013823.mp4") // New video source

  useEffect(() => {
    videoRef.current?.play().catch(err => {
      console.warn("Single video autoplay failed:", err)
      videoRef.current!.controls = true
    })
  }, [])

  return (
    <div
      ref={containerRef}
      className="bg-black min-h-screen h-full w-full text-white flex flex-col items-center justify-center gap-12 px-6 py-5 md:px-12 relative"
    >
      <section className="flex flex-col md:flex-row h-full w-full flex-1 items-center justify-between gap-8">
        {/* LEFT BOX */}
        <div className="h-full w-full md:w-[60%] flex flex-col justify-between gap-8">
          {/* Page Title */}
          <div className="flex items-start justify-start h-30 mb-4">
            <motion.h1
              className="text-3xl h-full md:text-7xl font-semibold tracking-tight flex 
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
          <motion.div className="relative flex flex-col items-center justify-center p-3">
            <div
              className="relative z-10 w-full flex justify-center h-[50vh] md:h-[60vh]" // Adjusted height
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onMouseMove={handleMouseMove}
            >
              <div className="relative overflow-hidden rounded-2xl group">
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
            <div className="relative z-10 mt-6 text-center w-full"> {/* Centered text */}
              <motion.h2
                className="text-3xl font-semibold font-sans text-white"
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
        <RightSection containerRef={containerRef as React.RefObject<HTMLDivElement>} />
      </section>
    </div>
  )
}

export default EditorShowcase