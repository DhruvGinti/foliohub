"use client"
import { motion, AnimatePresence } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Pause, Play, Volume2, VolumeX, Maximize, Info, X, FileVideo, Clock, HardDrive, Monitor } from "lucide-react"

import React from "react"

interface VideoSliderProps {
  containerRef: React.RefObject<HTMLDivElement>
}

const VideoSlider: React.FC<VideoSliderProps> = ({ containerRef }) => {

  
  const [videoIndex, setVideoIndex] = useState(0)
  const [ismuted, setIsmuted] = useState(false)
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
      type: "MP4 Video",
      size: "156.2 MB",
      resolution: "1920 × 1080",
      codec: "H.264",
      duration: "4:32",
      created: "Dec 15, 2023",
      thumbnail: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=300&fit=crop&crop=center",
      description: "Original unedited footage"
    },
    {
      src: "/@mitrox_mx.mp4", 
      name: "Edited Video",
      type: "MP4 Video",
      size: "89.7 MB",
      resolution: "1280 × 720",
      codec: "H.264",
      duration: "3:18",
      created: "Nov 28, 2023",
      thumbnail: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&h=300&fit=crop&crop=center",
      description: "Professionally edited version"
    }
  ]

  // Handle video selection with smooth transition
  const handleVideoSelection = (index: number) => {
    if (index !== videoIndex && !isTransitioning) {
      setIsTransitioning(true)
      setIsplay(false)
      
      // Pause current video
      if (videoRef.current) {
        videoRef.current.pause()
      }
      
      // Smooth transition
      setTimeout(() => {
        setVideoIndex(index)
        setTimeout(() => {
          setIsTransitioning(false)
        }, 400)
      }, 200)
    }
  }

  // Get video duration
  const handleMetadata = (e: React.SyntheticEvent<HTMLVideoElement>, index: number) => {
    const duration = e.currentTarget.duration
    setDurations((prev) => {
      const updated = [...prev]
      updated[index] = duration
      return updated
    })
  }

  // Track current time
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const updateTime = () => setCurrentTime(video.currentTime)
    video.addEventListener("timeupdate", updateTime)

    return () => {
      video.removeEventListener("timeupdate", updateTime)
    }
  }, [videoIndex])

  // Reset time when video changes
  useEffect(() => {
    setCurrentTime(0)
    setIsplay(false)
  }, [videoIndex])

  // Play / Pause toggle
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

  // Mute / Unmute toggle
  const handleMute = () => {
    if (videoRef.current) {
      const value = !videoRef.current.muted
      videoRef.current.muted = value
      setIsmuted(value)
    }
  }

  // Fullscreen
  const handleFullscreen = () => {
    if (videoRef.current && videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen()
    }
  }

  // Format seconds → mm:ss
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
    <div  className="min-h-screen h-full w-[45%] relative overflow-hidden">
      <div className="flex items-center justify-center" style={{ height: "10vh" }}>
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-3xl flex text-start font-bold text-transparent mb-2 bg-gradient-to-r from-blue-400 via-purple-500 to-orange-500 
                       bg-clip-text 
                       drop-shadow-[0_0_35px_rgba(168,85,247,0.8)]">
            Premium Video Player
          </h1>
          <p className="text-lg text-white text-center">
            Experience cinematic quality with seamless transitions and premium controls
          </p>
        </div>
      </div>

      <motion.div
        className="h-full w-full border-white/30 border-2 z-[9999] relative flex flex-col items-center bg-black rounded-2xl overflow-hidden group shadow-2xl"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        {/* Enhanced Mac-style window buttons */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-30">
          <div className="flex gap-2">
            <motion.button 
              className="h-3.5 w-3.5 bg-red-500 rounded-full border border-red-700 shadow-inner hover:bg-red-400 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            />
            <motion.button 
              className="h-3.5 w-3.5 bg-yellow-400 rounded-full border border-yellow-500 shadow-inner hover:bg-yellow-300 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            />
            <motion.button 
              className="h-3.5 w-3.5 bg-green-500 rounded-full border border-green-700 shadow-inner hover:bg-green-400 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            />
          </div>
          
          <div className="flex items-center">
            <p className="text-white text-sm font-medium">Premium Video Experience</p>
          </div>
          
          <motion.button
            onClick={() => setShowInfo(!showInfo)}
            className="h-5 w-5 bg-gray-400 hover:bg-gray-500 rounded-full border border-gray-500 shadow-inner flex items-center justify-center text-white text-xs font-bold transition-all duration-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Info size={10} />
          </motion.button>
        </div>

        {/* Video container with smooth transitions */}
        <div className="h-[50vh] w-full mt-10 p-8 backdrop-blur-xl bg-black shadow-xl rounded-2xl relative">
          <div className="relative w-full h-full">
            <motion.video
              key={videoIndex}
              ref={videoRef}
              src={videos[videoIndex].src}
              onLoadedMetadata={(e) => handleMetadata(e, videoIndex)}
              className="w-full h-full object-contain rounded-xl"
              playsInline
              preload="auto"
              muted={ismuted}
              onPlay={() => setIsplay(true)}
              onPause={() => setIsplay(false)}
              animate={{
                filter: isTransitioning ? "blur(20px)" : "blur(0px)",
                scale: isTransitioning ? 1.05 : 1,
                opacity: isTransitioning ? 0.7 : 1
              }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            />

            {/* Bottom gradient overlay */}
            <div className="pointer-events-none absolute -bottom-1 left-0 w-full h-14 bg-gradient-to-b from-transparent to-black z-20" />

            {/* Progress bar overlay */}
            {progressPercent > 0 && (
              <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20 z-25">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            )}
            
            {/* Info Overlay */}
            <AnimatePresence>
              {showInfo && (
                <motion.div
                  initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                  animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
                  exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-black/60 rounded-xl z-40 flex items-center justify-center"
                >
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 max-w-sm w-full mx-4 shadow-2xl border border-white/20"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold text-white">File Details</h3>
                      <motion.button
                        onClick={() => setShowInfo(false)}
                        className="p-1 rounded-full hover:bg-white/20 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <X size={18} className="text-white" />
                      </motion.button>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-500/20 rounded-lg">
                          <FileVideo size={20} className="text-blue-400" />
                        </div>
                        <div>
                          <p className="font-medium text-white">{videos[videoIndex].name}</p>
                          <p className="text-sm text-gray-300">{videos[videoIndex].description}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                          <div className="flex items-center gap-2 mb-1">
                            <Monitor size={14} className="text-gray-300" />
                            <span className="font-medium text-gray-200">Resolution</span>
                          </div>
                          <p className="text-gray-300">{videos[videoIndex].resolution}</p>
                        </div>

                        <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                          <div className="flex items-center gap-2 mb-1">
                            <HardDrive size={14} className="text-gray-300" />
                            <span className="font-medium text-gray-200">Size</span>
                          </div>
                          <p className="text-gray-300">{videos[videoIndex].size}</p>
                        </div>

                        <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                          <div className="flex items-center gap-2 mb-1">
                            <Clock size={14} className="text-gray-300" />
                            <span className="font-medium text-gray-200">Duration</span>
                          </div>
                          <p className="text-gray-300">
                            {durations[videoIndex] ? formatTime(durations[videoIndex]) : videos[videoIndex].duration}
                          </p>
                        </div>

                        <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                          <div className="flex items-center gap-2 mb-1">
                            <FileVideo size={14} className="text-gray-300" />
                            <span className="font-medium text-gray-200">Codec</span>
                          </div>
                          <p className="text-gray-300">{videos[videoIndex].codec}</p>
                        </div>
                      </div>

                      <div className="bg-blue-500/10 rounded-lg p-3 border border-blue-500/20">
                        <p className="text-sm font-medium text-blue-300 mb-1">Current Status</p>
                        <div className="text-xs text-blue-200 space-y-1">
                          <p>Progress: {Math.round(progressPercent)}% ({formatTime(currentTime)})</p>
                          <p>State: {isplay ? "Playing" : "Paused"} • Audio: {ismuted ? "Muted" : "On"}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Controls bar */}
        <div className="w-[90%] max-w-4xl flex flex-col px-5 py-3 bg-white/10 backdrop-blur-md rounded-2xl">
          <div className="w-full h-12 flex items-center justify-between">
            <div className="flex items-center gap-3">  
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                onClick={handlePlay}
                className="bg-white/20 hover:bg-white/30 rounded-full p-3 text-white transition-all shadow-lg"
              >
                {isplay ? <Pause size={18} /> : <Play size={18} />}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                onClick={handleMute}
                className="bg-white/20 hover:bg-white/30 rounded-full p-3 text-white transition-all shadow-lg"
              >
                {ismuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </motion.button>
            </div>

            <div className="w-full flex items-center justify-center">
              <div className="hover:bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white transition-all duration-200 text-sm font-medium border border-white/10">
                {formatTime(currentTime)} / {durations[videoIndex] ? formatTime(durations[videoIndex]) : videos[videoIndex].duration}
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={handleFullscreen}
              className="bg-white/20 hover:bg-white/30 rounded-full p-3 text-white transition-all shadow-lg"
            >
              <Maximize size={18} />
            </motion.button>
          </div>
        </div>

        {/* Premium Video Selection Thumbnails */}
        <div className="w-full max-w-2xl mt-6 px-6">
          <div className="text-center mb-4">
            <span className="text-white/90 text-sm font-semibold tracking-wide">SELECT VIDEO VERSION</span>
          </div>
          {/* main div of containeng those 2 img */}
          <div className="grid grid-cols-2 gap-6 "> 
            {videos.map((video, index) => (
              <motion.div
                key={index}
                onClick={() => handleVideoSelection(index)}
                className={`relative cursor-pointer group overflow-hidden ${
                  videoIndex === index 
                    ? 'ring-3 ring-red-500 rounded-xl shadow-md shadow-blue-500/50' 
                    : 'hover:ring-2 hover:ring-white/30 rounded-xl'
                } overflow-hidden transition-all duration-300`}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Thumbnail Image */}
                <div className="relative h-32 bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden rounded-xl">
                  <img 
                    src={video.thumbnail} 
                    alt={video.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 rounded-xl"
                  />
                  
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent rounded-xl" />
                  
                  {/* Active indicator */}
                  {videoIndex === index && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-3 right-3 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-lg"
                    >
                      <div className="w-3 h-3 bg-white rounded-full" />
                    </motion.div>
                  )}
                
                </div>
                
                {/* Video Info */}
                <div className="p-3 bg-white/5 backdrop-blur-sm border-t border-white/10 rounded-b-xl">
                  <h4 className="font-semibold text-white text-sm mb-1">{video.name}</h4>
                  <p className="text-xs text-gray-300 mb-2">{video.description}</p>
                </div>
                
                {/* Loading state for transitions */}
                <AnimatePresence>
                  {isTransitioning && videoIndex === index && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center rounded-xl"
                    >
                      <div className="w-4 h-4 border border-white/40 border-t-white rounded-full animate-spin" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
          
          {/* Selected video indicator */}
          <div className="text-center mt-4">
            <motion.p 
              key={videoIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
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

export default VideoSlider