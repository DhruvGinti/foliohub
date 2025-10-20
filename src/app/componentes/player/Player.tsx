"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Heart,
  Share2,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Monitor,
  Palette,
  Zap,
} from "lucide-react";

interface VideoData {
  src: string;
  title: string;
  description: string;
  views: number | string;
  duration?: string;
  thumbnail?: string;
}

interface PlayerProps {
  close: () => void;
  video: VideoData;
}

const Player: React.FC<PlayerProps> = ({ close, video }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const videoRef = useRef<HTMLVideoElement>(null);
  const controlsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Hide controls after 3 seconds if playing
  const hideControlsWithDelay = useCallback(() => {
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
  }, [isPlaying]);

  const sharePage = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: video.title,
          text: video.description,
          url: window.location.href,
        });
      } catch (error) {
        console.error("Error sharing page:", error);
      }
    }
  };

  // Show controls and reset hide timer
  const showControlsHandler = useCallback(() => {
    setShowControls(true);
    hideControlsWithDelay();
  }, [hideControlsWithDelay]);

  // Mouse move shows controls
  const handleVideoMouseMove = useCallback(() => {
    showControlsHandler();
  }, [showControlsHandler]);

  // Auto-hide controls when playing
  useEffect(() => {
    if (isPlaying) {
      hideControlsWithDelay();
    } else {
      setShowControls(true);
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    }
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [isPlaying, hideControlsWithDelay]);

  // Auto-play on video load
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [video]);

  const togglePlayPause = useCallback(() => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  }, [isPlaying]);

  const toggleMute = useCallback(() => {
    if (videoRef.current) {
      const newMuted = !isMuted;
      videoRef.current.muted = newMuted;
      setIsMuted(newMuted);
    }
  }, [isMuted]);

  const toggleFullscreen = useCallback(() => {
    if (videoRef.current && typeof document !== "undefined") {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoRef.current.requestFullscreen();
      }
    }
  }, []);

  const formatTime = (seconds: number) => {
    if (!isFinite(seconds) || isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Video event handlers
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleLoadedMetadata = () => {
      setDuration(video.duration);
      setIsLoading(false);
    };
    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };
    const handleLoadStart = () => setIsLoading(true);
    const handleCanPlay = () => setIsLoading(false);
    const handleWaiting = () => setIsLoading(true);
    const handlePlaying = () => setIsLoading(false);

    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("loadstart", handleLoadStart);
    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("waiting", handleWaiting);
    video.addEventListener("playing", handlePlaying);

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("loadstart", handleLoadStart);
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("waiting", handleWaiting);
      video.removeEventListener("playing", handlePlaying);
    };
  }, []);

  const progress =
    duration > 0 && isFinite(currentTime)
      ? Math.min((currentTime / duration) * 100, 100)
      : 0;

  const editingSoftware = [
    { name: "DaVinci Resolve", icon: Palette },
  ];

  // Custom scrollbar styles for overflow areas
  const customScrollbarStyles = `
    /* For Webkit browsers */
    .player-scrollbar::-webkit-scrollbar {
      width: 8px;
      height: 8px;
      background: transparent;
    }
    .player-scrollbar::-webkit-scrollbar-thumb {
      background: linear-gradient(135deg, #6366f1 40%, #a21caf 100%);
      border-radius: 8px;
      min-height: 24px;
      min-width: 24px;
      border: 2px solid #18181b;
    }
    .player-scrollbar::-webkit-scrollbar-corner {
      background: #18181b;
      border-radius: 0 0 8px 0;
    }
    /* For Firefox */
    .player-scrollbar {
      scrollbar-width: thin;
      scrollbar-color: #a21caf #18181b;
    }
  `;

  return (
    <>
      <style>{customScrollbarStyles}</style>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-1 sm:p-0"
        style={{
          background: isPlaying
            ? "rgba(0, 0, 0, 0.92)"
            : "rgba(0, 0, 0, 0.85)",
        }}
      >
        <div
          className="absolute   sm:overflow-y-hidden inset-0"
          style={{
            backdropFilter: isPlaying ? "blur(12px)" : "blur(6px)",
            transition: "backdrop-filter 0.3s ease",
            willChange: "backdrop-filter",
          }}
        />

        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: "spring", duration: 0.4 }}
          className={`
            relative w-full max-w-4xl sm:overflow-y-hidden max-h-[90vh]
             bg-zinc-900
            backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-white/10
            flex flex-col sm:flex-row
            sm:max-h-[90vh]  min-h-[240px] sm:min-h-[320px]
          `}
        >
          {/* button */}
          <AnimatePresence>
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={close}
              className="absolute top-1.5 right-1.5 sm:top-4 sm:right-4 z-10 text-white bg-black/40 hover:bg-black/60 backdrop-blur-sm rounded-full p-1.5 sm:p-2 transition-all duration-200"
            >
              <X size={16} className="sm:w-[18px] sm:h-[18px] w-[16px] h-[16px]" />
            </motion.button>
          </AnimatePresence>

          <div className="flex flex-col sm:flex-row h-full max-h-[90vh] w-full">
            <div
              className="relative flex-[2] min-h-0 w-full"
              onMouseMove={handleVideoMouseMove}
              onMouseEnter={handleVideoMouseMove}
            >
              <video
                ref={videoRef}
                src={video.src}
                className={`
                  w-full h-full object-contain object-center
                  rounded-t-2xl sm:rounded-l-2xl sm:rounded-t-none
                  max-h-[42vh] sm:max-h-[60vh]
                `}
                preload="auto"
                playsInline
                muted={false}
                style={{
                  transform: "translateZ(0)",
                  backfaceVisibility: "hidden",
                  perspective: 1000,
                  // background: "#18181b",
                }}
              />
              {/* loading state */}
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-t-2xl sm:rounded-l-2xl">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-6 h-6 sm:w-8 sm:h-8 border-2 border-white/20 border-t-white rounded-full"
                  />
                </div>
              )}

              <AnimatePresence>
                {showControls && !isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-transparent rounded-t-2xl sm:rounded-l-2xl"
                    style={{ willChange: "opacity" }}
                  >
                    {/* Center Play/Pause button for mobile and desktop */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={togglePlayPause}
                        className="bg-white/20 hover:bg-white/30 backdrop-blur-sm p-1.5 sm:p-4 rounded-full text-white transition-all duration-200 pointer-events-auto"
                        aria-label={isPlaying ? "Pause" : "Play"}
                      >
                        {isPlaying ? (
                          <Pause size={16} className="sm:w-6 sm:h-6 w-4 h-4" />
                        ) : (
                          <Play size={16} className="sm:w-6 sm:h-6 w-4 h-4" />
                        )}
                      </motion.button>
                    </div>

                    {/* Controls bar, responsive for mobile */}
                    <div className="absolute bottom-0 left-0 right-0 p-1.5 sm:p-4">
                      <div className="flex flex-col sm:flex-row items-center gap-1.5 sm:gap-6 text-white w-full">
                        <div className="flex flex-row items-center gap-1.5 sm:gap-3 w-full sm:w-auto">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={togglePlayPause}
                            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-1.5 sm:p-3 transition-all duration-200"
                            aria-label={isPlaying ? "Pause" : "Play"}
                          >
                            {isPlaying ? (
                              <Pause size={10} className="sm:w-4 sm:h-4 w-2.5 h-2.5" />
                            ) : (
                              <Play size={10} className="sm:w-4 sm:h-4 w-2.5 h-2.5" />
                            )}
                          </motion.button>

                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={toggleMute}
                            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-1.5 sm:p-3 transition-all duration-200"
                            aria-label={isMuted ? "Unmute" : "Mute"}
                          >
                            {isMuted ? (
                              <VolumeX size={10} className="sm:w-4 sm:h-4 w-2.5 h-2.5" />
                            ) : (
                              <Volume2 size={10} className="sm:w-4 sm:h-4 w-2.5 h-2.5" />
                            )}
                          </motion.button>
                        </div>

                        {/* Time display, always visible and responsive */}
                        <div className="flex-1 w-full min-w-0">
                          {/* Mobile: show progress bar and bg color */}
                          <div
                            className={`
                              flex
                              relative
                              rounded-full
                              items-center
                              justify-center
                              text-[10px] sm:text-xs text-white/80
                              w-full
                              bg-white/10
                              backdrop-blur-sm
                              min-w-0
                              sm:bg-transparent sm:backdrop-blur-none
                            `}
                            style={{
                              willChange: "width",
                            }}
                          >
                            {/* Progress background: only visible on mobile */}
                            {duration > 0 && (
                              <span
                                className="absolute left-0 top-0 h-full bg-violet-500/40 rounded-full transition-all duration-300 sm:hidden"
                                style={{
                                  width: `${Math.min(progress, 100)}%`,
                                  zIndex: 0,
                                }}
                                aria-hidden="true"
                              />
                            )}
                            <span className="relative z-10  flex whitespace-nowrap w-full justify-center">
                              {duration > 0
                                ? `${formatTime(currentTime)} / ${formatTime(duration)}`
                                : video.duration || "0:00"}
                            </span>
                          </div>
                        </div>

                        {/* Fullscreen button, visible on sm and up */}
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={toggleFullscreen}
                          className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-200 sm:inline-flex hidden"
                          aria-label="Fullscreen"
                        >
                          <Monitor className="sm:w-4 sm:h-4 w-2.5 h-2.5" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div
              className={`
                flex-1 p-2.5 sm:p-6 space-y-3 sm:space-y-4
                bg-gradient-to-b from-neutral-900/98 to-neutral-800/98
                backdrop-blur-xl
                overflow-y-auto max-h-[32vh] sm:max-h-none
                player-scrollbar
              `}
              style={{
                // fallback for browsers that don't support custom scrollbars
                WebkitOverflowScrolling: "touch",
              }}
            >
              <div className="space-y-2 sm:space-y-3 mt-2 sm:mt-3">
                <h2 className="text-base sm:text-xl font-bold text-white leading-tight">
                  {video.title}
                </h2>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  {video.description}
                </p>
              </div>

              <div className="space-y-2 sm:space-y-3">
                <h3 className="text-white font-semibold text-xs sm:text-sm flex items-center gap-1.5 sm:gap-2">
                  <Monitor size={13} className="sm:w-4 sm:h-4 w-3 h-3" />
                  Software Used
                </h3>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {editingSoftware.map((software, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-white/10 to-white/5 border border-white/20 rounded-full px-2.5 py-1.5 sm:px-3 sm:py-2 text-[10px] sm:text-xs text-neutral-200 backdrop-blur-sm shadow-lg hover:from-blue-500/20 hover:to-purple-500/20 hover:border-blue-400/30 transition-all duration-300"
                    >
                      <software.icon size={10} className="sm:w-3 sm:h-3 w-2.5 h-2.5 text-blue-400" />
                      <span className="font-medium">{software.name}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2.5 sm:gap-3 pt-3 sm:pt-4">
                <motion.button
                  whileHover={{ scale: 1.03, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setIsLiked(!isLiked)}
                  className={`flex items-center gap-2.5 sm:gap-3 px-3.5 py-2 sm:px-5 sm:py-3 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 backdrop-blur-sm shadow-lg ${
                    isLiked
                      ? "bg-gradient-to-r from-pink-500/30 to-red-500/30 text-pink-300 border border-pink-400/40 shadow-pink-500/20"
                      : "bg-gradient-to-r from-white/10 to-white/5 hover:from-white/15 hover:to-white/10 text-white border border-white/20 hover:border-white/30"
                  }`}
                >
                  <Heart
                    size={15}
                    fill={isLiked ? "currentColor" : "none"}
                    className="transition-all duration-200 sm:w-[18px] sm:h-[18px] w-[15px] h-[15px]"
                  />
                  <span>{isLiked ? "Liked" : "Like"}</span>
                </motion.button>

                <motion.button
                  onClick={() => {
                    sharePage();
                  }}
                  whileHover={{ scale: 1.03, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2.5 sm:gap-3 px-3.5 py-2 sm:px-5 sm:py-3 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30 text-white border border-blue-400/30 hover:border-blue-400/50 transition-all duration-300 text-xs sm:text-sm font-medium backdrop-blur-sm shadow-lg hover:shadow-blue-500/20"
                >
                  <Share2 size={15} className="sm:w-[18px] sm:h-[18px] w-[15px] h-[15px]" />
                  <span>Share</span>
                </motion.button>
              </div>

              {/* 
                The following block is now hidden on mobile (using 'hidden' and 'sm:inline-flex').
                It will only be visible on small screens and up (sm and above).
                This is achieved by using 'hidden sm:inline-flex' classes.
                On mobile, this section is hidden to avoid redundancy or to fit a different layout.
              */}
                {(duration > 0 || video.duration) && (
                <div className="pt-3 sm:pt-4 hidden sm:flex flex-col gap-2 border-t border-white/10">
                  <div className="flex items-center justify-between text-xs font-medium">
                    <span className="text-neutral-400">
                      Duration:{" "}
                      <span className="text-white">
                        {duration > 0 ? formatTime(duration) : video.duration}
                      </span>
                    </span>
                    {duration > 0 && (
                      <span className="text-blue-400 font-semibold">
                        {Math.round(progress)}% watched
                      </span>
                    )}
                  </div>
                  {duration > 0 && (
                    <div className="w-full h-1 bg-white/10 rounded-full mt-1 overflow-hidden">
                      <div
                        className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-200"
                        style={{
                          width: `${Math.min(progress, 100)}%`,
                          willChange: "width",
                        }}
                      />
                    </div>
                  )}
                </div>
              )}

              <div className="pt-3 sm:pt-4 border-t border-white/10">
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-[11px] sm:text-xs font-bold">
                    D
                  </div>
                  <div>
                    <p className="text-white font-medium text-xs sm:text-sm">Dhruv</p>
                    <p className="text-neutral-400 text-[10px] sm:text-xs">Video Editor</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default Player;
