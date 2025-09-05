"use client"
import { motion, AnimatePresence } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Pause, Play, Volume2, VolumeX, Maximize, Info, X } from "lucide-react"
import React from "react"

// ... (interface and other setup remains the same)
interface VideoSliderProps {
  containerRef: React.RefObject<HTMLDivElement>
}

const VideoSlider: React.FC<VideoSliderProps> = ({ containerRef }) => {
  const [videoIndex, setVideoIndex] = useState(0)
  const [ismuted, setIsmuted] = useState(true)
  const [isplay, setIsplay] = useState(false)
  const [durations, setDurations] = useState<number[]>([])
  const [currentTime, setCurrentTime] = useState(0)
  const [showInfo, setShowInfo] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const videos = [
    {
      src: "/Editor Challenge Footage (NEEDS TO BE EDITED).mp4",
      name: "Original Video",
      description: "Original unedited footage",
      thumbnail: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=300&fit=crop&crop=center",
    },
    {
      src: "/@mitrox_mx.mp4", 
      name: "Edited Video",
      description: "Professionally edited version",
      thumbnail: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&h=300&fit=crop&crop=center",
    }
  ]

  // ... (All your handler functions and useEffects remain the same)
  const handleVideoSelection = (index: number) => {
    if (index !== videoIndex && !isTransitioning) {
      setIsTransitioning(true)
      setIsplay(false)
      if (videoRef.current) {
        videoRef.current.pause()
      }
      setTimeout(() => {
        setVideoIndex(index)
        setTimeout(() => {
          setIsTransitioning(false)
        }, 400)
      }, 200)
    }
  }

  const handleMetadata = (e: React.SyntheticEvent<HTMLVideoElement>, index: number) => {
    const duration = e.currentTarget.duration
    setDurations((prev) => {
      const updated = [...prev]
      updated[index] = duration
      return updated
    })
  }

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const updateTime = () => setCurrentTime(video.currentTime)
    video.addEventListener("timeupdate", updateTime)
    return () => {
      video.removeEventListener("timeupdate", updateTime)
    }
  }, [videoIndex])

  useEffect(() => {
    setCurrentTime(0)
    videoRef.current?.play().then(() => setIsplay(true)).catch(() => setIsplay(false))
  }, [videoIndex])

  const handlePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play()
        setIsplay(true)
      } else {
        videoRef.current.pause()
        setIsplay(false)
      }
    }
  }

  const handleMute = () => {
    if (videoRef.current) {
      const value = !videoRef.current.muted
      videoRef.current.muted = value
      setIsmuted(value)
    }
  }

  const handleFullscreen = () => {
    if (videoRef.current && videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen()
    }
  }

  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return "0:00"
    const minutes = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`
  }

  const progressPercent = durations[videoIndex]
    ? (currentTime / durations[videoIndex]) * 100
    : 0

  return (
    <div className="w-full relative">
      <motion.div
        className="w-full border-white/10 border-2 z-10 relative flex flex-col items-center bg-black rounded-2xl overflow-hidden shadow-2xl"
      >
        <div className="absolute top-0 left-0 right-0 h-10 bg-black/50 backdrop-blur-sm flex items-center justify-between px-4 z-30">
          <div className="flex gap-2">
            <div className="h-3 w-3 bg-red-500 rounded-full" />
            <div className="h-3 w-3 bg-yellow-400 rounded-full" />
            <div className="h-3 w-3 bg-green-500 rounded-full" />
          </div>
          {/*<p className="text-white text-sm font-medium">Premium Experience</p>*/}
          <motion.button
            onClick={() => setShowInfo(!showInfo)}
            className="h-5 w-5 bg-gray-600 hover:bg-gray-500 rounded-full flex items-center justify-center text-white"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Info size={12} />
          </motion.button>
        </div>

        {/* REDUCED: Top and bottom padding to tighten the layout */}
        <div className="w-full px-4 pt-12 pb-2">
          {/* REDUCED: Max height of the video to give more room to controls */}
          <div className="relative w-full aspect-[9/16] max-h-[55vh] bg-black rounded-lg overflow-hidden">
            <motion.video
              key={videoIndex}
              ref={videoRef}
              src={videos[videoIndex].src}
              onLoadedMetadata={(e) => handleMetadata(e, videoIndex)}
              className="w-full h-full object-contain"
              playsInline
              preload="auto"
              muted={ismuted}
              autoPlay
              onPlay={() => setIsplay(true)}
              onPause={() => setIsplay(false)}
            />
          </div>

          {/* REDUCED: Top margin */}
          <div className="relative w-full h-1 mt-3 bg-white/20 rounded-full">
            <motion.div 
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* REDUCED: Top margin */}
          <div className="w-full flex justify-center mt-2">
            <div className="flex items-center gap-4 text-white bg-black/40 backdrop-blur-md rounded-full px-4 py-2 border border-white/10">
              <motion.button onClick={handlePlay} whileTap={{ scale: 0.9 }}>
                {isplay ? <Pause size={20} /> : <Play size={20} />}
              </motion.button>
              
              <motion.button onClick={handleMute} whileTap={{ scale: 0.9 }}>
                {ismuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </motion.button>
              
              <div className="text-sm font-mono tracking-tighter w-24 text-center">
                {formatTime(currentTime)} / {durations[videoIndex] ? formatTime(durations[videoIndex]) : "0:00"}
              </div>
              
              <motion.button onClick={handleFullscreen} whileTap={{ scale: 0.9 }}>
                <Maximize size={20} />
              </motion.button>
            </div>
          </div>
        </div>
        
        {/* REDUCED: Padding to tighten the section */}
        <div className="w-full max-w-2xl p-3 bg-white/5 border-t border-white/10">
          {/* REDUCED: Bottom margin */}
          <div className="text-center mb-3">
            <span className="text-white/90 text-sm font-semibold tracking-wide">SELECT VIDEO VERSION</span>
          </div>
          {/* REDUCED: Gap between thumbnails */}
          <div className="grid grid-cols-2 gap-3">
            {videos.map((video, index) => (
              <motion.div
                key={index}
                onClick={() => handleVideoSelection(index)}
                className={`relative cursor-pointer group overflow-hidden rounded-lg ${
                  videoIndex === index 
                    ? 'ring-2 ring-blue-500' 
                    : 'hover:ring-2 hover:ring-white/30'
                } transition-all duration-300`}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* REDUCED: Height of the thumbnail image */}
                <div className="relative h-28 bg-gray-800 overflow-hidden">
                  <img 
                    src={video.thumbnail} 
                    alt={video.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  {videoIndex === index && (
                    <motion.div
                      layoutId="active-indicator"
                      className="absolute top-2 right-2 w-7 h-7 bg-blue-500 rounded-full flex items-center justify-center shadow-lg"
                    >
                      <div className="w-2.5 h-2.5 bg-white rounded-full" />
                    </motion.div>
                  )}
                </div>
                {/* REDUCED: Padding in the text area */}
                <div className="p-2 bg-gray-900/80 backdrop-blur-sm">
                  <h4 className="font-semibold text-white text-sm truncate">{video.name}</h4>
                  <p className="text-xs text-gray-300 truncate">{video.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
          {/* REDUCED: Top margin */}
          <div className="text-center mt-3">
            <motion.p 
              key={videoIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-white/70 text-sm"
            >
              Now showing: <span className="text-white font-medium">{videos[videoIndex].name}</span>
            </motion.p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default VideoSlider;