"use client"

import React, { useState } from "react"
import { PlayCircle, Play } from "lucide-react"
import Player from "@/app/componentes/player/Player"
import { motion } from "motion/react"

// Define the type for video data
type VideoData = {
  title: string
  duration: string
  date: string
  thumbnail: string
  src?: string
  description?: string
}

// Dummy data for the video grid
const videoCatalogue: VideoData[] = [
  {
    title: "Cinematic Reel 2024",
    duration: "1:35",
    date: "Jan 15, 2024",
    thumbnail: "/path/to/cinematic_thumb.jpg",
    src: "/videos/brothers (1).mp4",
    description: "A fast-paced cinematic showcase of 2024 highlights.",
  },
  {
    title: "Vlog Editing Showcase",
    duration: "4:00",
    date: "Feb 28, 2024",
    thumbnail: "/path/to/vlog_thumb.jpg",
    src: "/finalBMW.mp4",
    description: "A fun, energetic vlog edit with creative transitions.",
  },
  {
    title: "Motion Graphics Demo",
    duration: "0:45",
    date: "Mar 10, 2024",
    thumbnail: "/path/to/motion_thumb.jpg",
    src: "/videos/OverlayThumb.mp4",
    description: "A quick demo of motion graphics and animation.",
  },
  {
    title: "Masterpiece Project",
    duration: "0:30",
    date: "Apr 05, 2024",
    thumbnail: "/path/to/ad_thumb.jpg",
    src: "/videos/Dhruv_Masterpiease.mp4",
    description: "A cinematic storytelling piece with rich color grading.",
  },
  {
    title: "Color Grading",
    duration: "0:30",
    date: "Apr 05, 2024",
    thumbnail: "/path/to/ad_thumb.jpg",
    src: "/videos/CCG.mp4",
    description: "A cinematic storytelling piece with rich color grading.",
  },
  {
    title: "Color Grading",
    duration: "0:30",
    date: "Apr 05, 2024",
    thumbnail: "/path/to/ad_thumb.jpg",
    src: "/videos/Realone.mp4",
    description: "A cinematic storytelling piece with rich color grading.",
  },
  {
    title: "Color Grading",
    duration: "0:30",
    date: "Apr 05, 2024",
    thumbnail: "/path/to/ad_thumb.jpg",
    src: "/videos/boka_intro_fin.mp4",
    description: "A cinematic storytelling piece with rich color grading.",
  },
  {
    title: "Color Grading",
    duration: "0:30",
    date: "Apr 05, 2024",
    thumbnail: "/path/to/ad_thumb.jpg",
    src: "/videos/kabhikabhi.mp4",
    description: "A cinematic storytelling piece with rich color grading.",
  },
]
// Fix getRandomShadow logic so each card gets a consistent shadow color per render
const shadowColors = [
  "hover:shadow-violet-500/60",
  "hover:shadow-blue-500/60",
  "hover:shadow-cyan-500/60",
  "hover:shadow-emerald-500/60",
  "hover:shadow-amber-500/60",
  "hover:shadow-rose-500/60",
]

// Assign a shadow color to each video based on its index for consistenc


const VideoCatalogPage = () => {
  const [isCardOpen, setIsCardOpen] = useState(false)
  const [activeVideo, setActiveVideo] = useState<VideoData | null>(null)

  const handleVideoClick = (video: VideoData) => {
    setActiveVideo(video)
    setIsCardOpen(true)
  }

  return (
    <div className="min-h-screen bg-black text-white py-12 px-4 sm:px-6 lg:px-8">
      {/* Catalog Header */}
      <header className="max-w-7xl mt-20 mx-auto mb-10 text-center lg:text-left">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-2">
          My Video Editing Portfolio
        </h1>
        <p className="text-lg text-gray-400">
          A showcase of my recent work in cinematic editing, color grading, and motion graphics.
        </p>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mt-20 mx-auto">
        {/* Featured Video Player */}
        {isCardOpen && activeVideo && (
          <Player video={activeVideo} close={() => setIsCardOpen(false)} />
        )}

        {/* Video Catalogue Grid Section */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-6 border-b border-gray-700 pb-2">
            More Projects
          </h2>

          <div className="grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {videoCatalogue.map((video, index) => (
              <motion.div
                key={index}
                // ${shadowColors[index % shadowColors.length]}
                className={`bg-gray-900 rounded-lg overflow-hidden shadow-xl transition-all duration-300 cursor-pointer group `}
                onClick={() => handleVideoClick(video)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.08, duration: 0.5, ease: "easeOut" }}
                whileHover={{ scale: 1.02 }}
              >
                {/* Thumbnail */}
                <div className="aspect-video relative overflow-hidden">
                  {!video.thumbnail && (
                    <PlayCircle
                      size={32}
                      className="text-white opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                  )}

                  <video
                    src={video.src}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    // muted
                    playsInline
                    preload="metadata"
                    controls={false}
                    // autoPlay
                    // poster={video.thumbnail}
                    style={{ pointerEvents: "none" }}
                  />

                  {/* Play Button Overlay */}
                  <motion.div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-black/50 backdrop-blur-sm rounded-full p-4">
                      <Play className="w-8 h-8 text-white" fill="white" />
                    </div>
                  </motion.div>

                  {/* Title + Description Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 pb-4 h-32 flex flex-col justify-end bg-gradient-to-t from-black/90 to-transparent z-10">
                    <h3 className="text-lg font-semibold text-white transition-colors truncate">
                      {video.title}
                    </h3>
                    {video.description && (
                      <p className="text-sm text-gray-300 mt-1 line-clamp-2">
                        {video.description}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default VideoCatalogPage
