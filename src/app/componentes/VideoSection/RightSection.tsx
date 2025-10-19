"use client"
import { motion, AnimatePresence, useInView, useScroll, useSpring, useTransform } from "motion/react"
import { useRef, useState, useEffect } from "react"
import { Pause, Play, Volume2, VolumeX, Maximize, Info, X, FileVideo, Clock, HardDrive, Monitor } from "lucide-react"
import React from "react"

interface VideoSliderProps {
  containerRef?: React.RefObject<HTMLDivElement>
}

const videos = [
  {
    src: "/videos/Oldone.mp4",
    name: "Original Video",
    type: "MP4 Video",
    size: "156.2 MB",
    resolution: "1920 × 1080",
    codec: "H.264",
    duration: "4:32",
    created: "Dec 15, 2023",
    thumbnail: "/2.png", 
    description: "Original unedited footage",
  },
  {
    src: "/videos/Realone.mp4", 
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

const VideoSlider: React.FC<VideoSliderProps> = () => {
  const [videoIndex, setVideoIndex] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [durations, setDurations] = useState<number[]>([0, 0])
  const [currentTime, setCurrentTime] = useState(0)
  const [showInfo, setShowInfo] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  // For scroll-based animation
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-20% 0px -20% 0px" })
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] })
  // Animate opacity and y on mount, and then scroll-based subtle parallax
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.2, 1], [0, 1, 1]), { stiffness: 80, damping: 20 })
  const y = useSpring(useTransform(scrollYProgress, [0, 0.2, 1], [60, 0, -20]), { stiffness: 80, damping: 20 })

  // Handle video selection with smooth transition
  const handleVideoSelection = (index: number) => {
    if (index !== videoIndex && !isTransitioning) {
      setIsTransitioning(true)
      setIsPlaying(false)
      if (videoRef.current) {
        videoRef.current.pause()
      }
      setTimeout(() => {
        setVideoIndex(index)
        setTimeout(() => {
          setIsTransitioning(false)
          // Auto-play the new video after transition
          if (videoRef.current) {
            videoRef.current.play()
            setIsPlaying(true)
          }
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
    setIsPlaying(false)
  }, [videoIndex])

  // Play / Pause toggle
  const handlePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play()
        setIsPlaying(true)
      } else {
        videoRef.current.pause()
        setIsPlaying(false)
      }
    }
  }

  // Mute / Unmute toggle
  const handleMute = () => {
    if (videoRef.current) {
      const value = !videoRef.current.muted
      videoRef.current.muted = value
      setIsMuted(value)
    }
  }

  // Fullscreen
  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen()
      } else if ((videoRef.current as HTMLVideoElement & { webkitRequestFullscreen?: () => void }).webkitRequestFullscreen) {
        (videoRef.current as HTMLVideoElement & { webkitRequestFullscreen: () => void }).webkitRequestFullscreen()
      } else if ((videoRef.current as HTMLVideoElement & { mozRequestFullScreen?: () => void }).mozRequestFullScreen) {
        (videoRef.current as HTMLVideoElement & { mozRequestFullScreen: () => void }).mozRequestFullScreen()
      } else if ((videoRef.current as HTMLVideoElement & { msRequestFullscreen?: () => void }).msRequestFullscreen) {
        (videoRef.current as HTMLVideoElement & { msRequestFullscreen: () => void }).msRequestFullscreen()
      }
    }
  }

  // Format seconds → mm:ss
  const formatTime = (seconds: number) => {
    if (typeof seconds !== "number" || isNaN(seconds) || seconds < 0) return "0:00"
    const minutes = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`
  }

  const progressPercent = durations[videoIndex]
    ? (currentTime / durations[videoIndex]) * 100
    : 0

  return (
    <div
      ref={sectionRef}
      className="w-full relative items-center justify-center overflow-hidden px-0"
    >
      {/* Right section heading */}
      <motion.div
        style={{ opacity, y }}
        initial={{ opacity: 0, y: 60 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="w-full flex items-center justify-between mb-3 md:mb-4 px-2 md:px-0">
          <h2 className="sm:text-lg md:text-2xl font-sans font-bold font-poppins text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-orange-500 bg-clip-text drop-shadow-[0_0_20px_rgba(168,85,247,0.6)] tracking-tight ">
            Edit <span className="underline underline-offset-2 decoration-pink-400 decoration-2">Showdown</span>: Side-by-Side
          </h2>
        </div>
        <p className="text-sm md:text-base text-white/80 mb-2 md:mb-3 px-2 md:px-0">Watch and compare different edits seamlessly.</p>
      </motion.div>

      <motion.div
        className="h-auto w-full border-white/30 border-2 z-[1] relative flex flex-col justify-center items-center bg-black rounded-2xl overflow-hidden group cursor-pointer shadow-2xl"
        style={{ opacity, y }}
        initial={{ opacity: 0, y: 60 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Enhanced Mac-style window buttons - Responsive */}
        <div className="absolute top-2 md:top-4 left-2 md:left-4 right-2 md:right-4 flex items-center justify-between z-30">
          <div className="flex gap-1.5 md:gap-2">
            <motion.button 
              className="h-2.5 w-2.5 md:h-3.5 md:w-3.5 bg-red-500 rounded-full border border-red-700 shadow-inner hover:bg-red-400 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              tabIndex={-1}
              aria-label="Close"
            />
            <motion.button 
              className="h-2.5 w-2.5 md:h-3.5 md:w-3.5 bg-yellow-400 rounded-full border border-yellow-500 shadow-inner hover:bg-yellow-300 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              tabIndex={-1}
              aria-label="Minimize"
            />
            <motion.button 
              className="h-2.5 w-2.5 md:h-3.5 md:w-3.5 bg-green-500 rounded-full border border-green-700 shadow-inner hover:bg-green-400 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              tabIndex={-1}
              aria-label="Maximize"
            />
          </div>
          <div className="flex items-center">
            <p className="text-white text-xs md:text-sm font-medium hidden sm:block">Premium Video Experience</p>
          </div>
          <motion.button
            onClick={() => setShowInfo((v) => !v)}
            className="h-4 w-4 md:h-5 md:w-5 bg-gray-400 hover:bg-gray-500 rounded-full border border-gray-500 shadow-inner flex items-center justify-center text-white text-xs font-bold transition-all duration-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Show Info"
          >
            <Info size={8} />
          </motion.button>
        </div>

        {/* Video container with responsive height */}
        <motion.div
          className="h-[40vh] md:h-[38vh] lg:h-[48vh] w-full mt-6 md:mt-8 p-4 md:p-6 backdrop-blur-xl bg-black shadow-xl rounded-2xl relative"
          style={{ opacity, y }}
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <div className="relative w-full h-full">
            <motion.video
              key={videoIndex}
              ref={videoRef}
              src={videos[videoIndex].src}
              onLoadedMetadata={(e) => handleMetadata(e, videoIndex)}
              className="w-full h-full object-contain rounded-xl"
              playsInline
              preload="auto"
              muted={isMuted}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              animate={{
                scale: isTransitioning ? 1.02 : 1,
                opacity: isTransitioning ? 0.7 : 1
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              controls={false}
            />

            {/* Progress bar overlay */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20 z-25">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            
            {/* Info Overlay - Responsive */}
            <AnimatePresence>
              {showInfo && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-black/60 rounded-xl z-40 flex items-center justify-center p-2"
                >
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 md:p-6 max-w-xs md:max-w-sm w-full mx-2 md:mx-4 shadow-2xl border border-white/20 max-h-[90%] overflow-y-auto"
                  >
                    <div className="flex items-center justify-between mb-3 md:mb-4">
                      <h3 className="text-lg md:text-xl font-semibold text-white">File Details</h3>
                      <motion.button
                        onClick={() => setShowInfo(false)}
                        className="p-1 rounded-full hover:bg-white/20 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label="Close Info"
                      >
                        <X size={16} className="text-white md:w-[18px] md:h-[18px]" />
                      </motion.button>
                    </div>

                    <div className="space-y-3 md:space-y-4">
                      <div className="flex items-center gap-2 md:gap-3">
                        <div className="p-1.5 md:p-2 bg-blue-500/20 rounded-lg">
                          <FileVideo size={16} className="text-blue-400 md:w-[20px] md:h-[20px]" />
                        </div>
                        <div>
                          <p className="font-medium text-white text-sm md:text-base">{videos[videoIndex].name}</p>
                          <p className="text-xs md:text-sm text-gray-300">{videos[videoIndex].description}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 md:gap-4 text-xs md:text-sm">
                        <div className="bg-white/5 rounded-lg p-2 md:p-3 border border-white/10">
                          <div className="flex items-center gap-1 md:gap-2 mb-1">
                            <Monitor size={12} className="text-gray-300 md:w-[14px] md:h-[14px]" />
                            <span className="font-medium text-gray-200">Resolution</span>
                          </div>
                          <p className="text-gray-300">{videos[videoIndex].resolution}</p>
                        </div>

                        <div className="bg-white/5 rounded-lg p-2 md:p-3 border border-white/10">
                          <div className="flex items-center gap-1 md:gap-2 mb-1">
                            <HardDrive size={12} className="text-gray-300 md:w-[14px] md:h-[14px]" />
                            <span className="font-medium text-gray-200">Size</span>
                          </div>
                          <p className="text-gray-300">{videos[videoIndex].size}</p>
                        </div>

                        <div className="bg-white/5 rounded-lg p-2 md:p-3 border border-white/10">
                          <div className="flex items-center gap-1 md:gap-2 mb-1">
                            <Clock size={12} className="text-gray-300 md:w-[14px] md:h-[14px]" />
                            <span className="font-medium text-gray-200">Duration</span>
                          </div>
                          <p className="text-gray-300">
                            {durations[videoIndex] ? formatTime(durations[videoIndex]) : videos[videoIndex].duration}
                          </p>
                        </div>

                        <div className="bg-white/5 rounded-lg p-2 md:p-3 border border-white/10">
                          <div className="flex items-center gap-1 md:gap-2 mb-1">
                            <FileVideo size={12} className="text-gray-300 md:w-[14px] md:h-[14px]" />
                            <span className="font-medium text-gray-200">Codec</span>
                          </div>
                          <p className="text-gray-300">{videos[videoIndex].codec}</p>
                        </div>
                      </div>

                      <div className="bg-blue-500/10 rounded-lg p-2 md:p-3 border border-blue-500/20">
                        <p className="text-xs md:text-sm font-medium text-blue-300 mb-1">Current Status</p>
                        <div className="text-xs text-blue-200 space-y-1">
                          <p>Progress: {Math.round(progressPercent)}% ({formatTime(currentTime)})</p>
                          <p>State: {isPlaying ? "Playing" : "Paused"} • Audio: {isMuted ? "Muted" : "On"}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Controls bar - Responsive */}
        <motion.div
          className="w-[95%] md:w-[90%] max-w-4xl flex flex-col px-3 md:px-5 py-2 md:py-3 bg-white/10 backdrop-blur-md rounded-2xl mb-4"
          style={{ opacity, y }}
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="w-full h-10 md:h-12 flex items-center justify-between">
            <div className="flex items-center gap-2 md:gap-3">   
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                onClick={handlePlay}
                className="bg-white/20 hover:bg-white/30 rounded-full p-2 md:p-3 text-white transition-all shadow-lg"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <Pause size={14} className="md:w-[18px] md:h-[18px]" /> : <Play size={14} className="md:w-[18px] md:h-[18px]" />}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                onClick={handleMute}
                className="bg-white/20 hover:bg-white/30 rounded-full p-2 md:p-3 text-white transition-all shadow-lg"
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX size={14} className="md:w-[18px] md:h-[18px]" /> : <Volume2 size={14} className="md:w-[18px] md:h-[18px]" />}
              </motion.button>
            </div>

            <div className="flex-1 flex items-center justify-center px-2">
              <div className="hover:bg-white/20 backdrop-blur-sm px-2 md:px-4 py-1 md:py-2 rounded-full text-white transition-all duration-200 text-xs md:text-sm font-medium border border-white/10">
                {formatTime(currentTime)} / {durations[videoIndex] ? formatTime(durations[videoIndex]) : videos[videoIndex].duration}
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={handleFullscreen}
              className="bg-white/20 hover:bg-white/30 rounded-full p-2 md:p-3 text-white transition-all shadow-lg"
              aria-label="Fullscreen"
            >
              <Maximize size={14} className="md:w-[18px] md:h-[18px]" />
            </motion.button>
          </div>
        </motion.div>

        {/* Premium Video Selection Thumbnails - Responsive */}
        <motion.div
          className="w-full max-w-2xl px-4 md:px-6 pb-4 md:pb-6"
          style={{ opacity, y }}
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.1, ease: "easeOut" }}
        >
          <div className="text-center mb-3 md:mb-4">
            <span className="text-white/90 text-xs md:text-sm font-semibold tracking-wide">SELECT VIDEO VERSION</span>
          </div>
          
          <div className="grid grid-cols-2 gap-3 md:gap-6"> 
            {videos.map((video, index) => (
              <motion.div
                key={index}
                onClick={() => handleVideoSelection(index)}
                className={`relative cursor-pointer group overflow-hidden ${
                  videoIndex === index 
                    ? 'ring-2 md:ring-3 ring-red-500 rounded-xl shadow-md shadow-blue-500/50' 
                    : 'hover:ring-2 hover:ring-white/30 rounded-xl'
                } transition-all duration-300`}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1 + 0.2 }}
                aria-current={videoIndex === index}
                tabIndex={0}
                role="button"
              >
                {/* Thumbnail Image - Responsive height */}
                <div className="relative h-20 md:h-32 bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden rounded-xl">
                  <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center rounded-xl">
                    <span className="text-white text-sm">{video.name}</span>
                  </div>
                  
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent rounded-xl" />
                  
                  {/* Active indicator */}
                  {videoIndex === index && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-2 md:top-3 right-2 md:right-3 w-6 h-6 md:w-8 md:h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-lg"
                    >
                      <div className="w-2 h-2 md:w-3 md:h-3 bg-white rounded-full" />
                    </motion.div>
                  )}
                </div>
                
                {/* Video Info - Responsive text */}
                <div className="p-2 md:p-3 bg-white/5 backdrop-blur-sm border-t border-white/10 rounded-b-xl">
                  <h4 className="font-semibold text-white text-xs md:text-sm mb-1">{video.name}</h4>
                  <p className="text-xs text-gray-300 mb-1 md:mb-2 line-clamp-2">{video.description}</p>
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
                      <div className="w-3 h-3 md:w-4 md:h-4 border border-white/40 border-t-white rounded-full animate-spin" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
          
          {/* Selected video indicator */}
          <div className="text-center mt-3 md:mt-4">
            <motion.p 
              key={videoIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-white/70 text-xs md:text-sm px-2"
            >
              Now showing: <span className="text-white font-medium">{videos[videoIndex].name}</span>
            </motion.p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default VideoSlider