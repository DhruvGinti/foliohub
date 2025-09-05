"use client";

import { useState, useEffect } from "react";
import { UserPlus, Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CopyEmailButton from "./ui/CopyEmailButton";
import Player from "./player/Player";
import { BackgroundLines } from "./ui/background-lines";

const videos = [
  {
    src: "/m3.mp4",
    title: "Cool Car Edits",
    description: "High-octane car edit with fast cuts and smooth transitions",
  },
];

const texts = [
  "Cinematic Visuals",
  "Rhythm in Motion",
  "Stories Through Color",
  "Edits That Leave a Mark",
];

const SixDivLayout = () => {
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState<typeof videos[0] | null>(
    null
  );
  
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen w-full p-4 lg:p-8 bg-black text-white">
      <div className="flex flex-col lg:flex-row w-full mx-auto gap-8 lg:gap-6">
        
        {/* ================= SECTION 1 (Previously Left Column) ================= */}
        <div className="w-full lg:w-5/12">
          {/* CHANGE 1: Replaced vh with fixed height to prevent stretching. */}
          {/* CHANGE 2: Removed bg-[#0a0a0a] to restore the original background effect. */}
          <div className="relative h-[500px] lg:h-[calc(100vh-4rem)] w-full rounded-3xl border border-white/20 shadow-lg overflow-hidden">
            <BackgroundLines>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                <div className="h-[60px] flex items-center">
                  <AnimatePresence mode="wait">
                    <motion.h1
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="text-3xl md:text-4xl lg:text-5xl font-bold text-white drop-shadow-lg tracking-wide"
                    >
                      {texts[index]}
                    </motion.h1>
                  </AnimatePresence>
                </div>

                <p className="mt-4 text-base lg:text-lg text-neutral-300 max-w-md leading-relaxed">
                  Hey, I&apos;m <span className="text-pink-400 font-semibold">Dhruv</span> —
                  blending motion, pacing, and vibrant color to craft edits
                  that <span className="text-purple-400">feel cinematic</span>.
                </p>

                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "140px" }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="h-[4px] mt-6 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full"
                />
              </div>

              <div className="absolute bottom-6 left-6 flex items-center gap-3 text-neutral-400 text-xs">
                 {[
                  { src: "/log/pngwing.com.png", label: "DaVinci" },
                  { src: "/log/Blender-Logo-3D-Software-84623.png", label: "Blender" },
                  { src: "/log/NKe0I1.png", label: "Flowframes" },
                  { src: "/log/images.jpeg", label: "Topaz" },
                ].map((item, i) => (
                  <div key={i} className="relative group">
                    <motion.div
                      whileHover={{ scale: 1.15 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl p-2 shadow-md flex items-center justify-center hover:shadow-pink-500/30 hover:border-pink-400/50"
                    >
                      <img
                        src={item.src}
                        alt={item.label}
                        className="inline-block w-6 h-6 object-contain"
                      />
                    </motion.div>
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-black/80 text-white text-[10px] px-2 py-1 rounded-md transition-all">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, repeatType: "loop", duration: 2.5 }}
                className="absolute bottom-5 right-5 text-neutral-400 text-xs"
              >
                Scroll for more ↓
              </motion.div>
            </BackgroundLines>
          </div>
        </div>

        {/* ================= SECTION 2 (Previously Right Column) ================= */}
        <div className="w-full lg:w-7/12 flex flex-col gap-8 lg:gap-6">
          
          {/* ---------- Card: "Cool Car Edits" ---------- */}
          {/* CHANGE: Replaced vh with aspect-ratio to prevent stretching. */}
          <motion.div
            onClick={() => {
              setActiveVideo(videos[0]);
              setIsCardOpen(true);
            }}
            className="relative w-full aspect-video lg:h-1/2 rounded-3xl overflow-hidden shadow-lg hover:cursor-pointer group bg-[#111111] border border-white/10"
            whileHover={{ scale: 1.02, borderColor: "rgba(255,255,255,0.3)" }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <video
              src='/ye leh2.mp4'
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loop
              autoPlay
              muted
              playsInline
            />
            <div className="absolute bottom-0 left-0 w-full p-5 bg-gradient-to-t from-black/80 to-transparent">
              <h2 className="text-2xl font-bold text-white">{videos[0].title}</h2>
              <p className="text-sm text-neutral-400">{videos[0].description}</p>
            </div>
            <motion.div
              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={{ scale: 0 }}
              whileHover={{ scale: 1 }}
            >
              <div className="bg-black/50 backdrop-blur-sm rounded-full p-4">
                <Play className="w-8 h-8 text-white" fill="white" />
              </div>
            </motion.div>
          </motion.div>

          {/* ---------- Side-by-Side Cards Container ---------- */}
          {/* CHANGE: Replaced vh with a fixed height to prevent stretching. */}
          <div className="flex flex-row gap-4 lg:gap-6 h-80 lg:h-1/2">
            {/* Card: "Project Together" */}
            <motion.div
              className="w-1/2 h-full rounded-3xl shadow-lg flex flex-col items-center justify-center text-center gap-4 p-4 relative overflow-hidden bg-[#211939] border border-white/10"
              whileHover={{ scale: 1.02, borderColor: "rgba(147, 51, 234, 0.5)" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="p-3.5 rounded-full bg-blue-500/20 border border-blue-400/30">
                <UserPlus className="w-6 h-6 lg:w-8 lg:h-8 text-blue-300" />
              </div>
              <p className="text-base lg:text-lg font-semibold text-white">
                Do you want to start a project together?
              </p>
              <CopyEmailButton />
            </motion.div>

            {/* Card: "Portfolio Showcase" */}
            <motion.div
              className="w-1/2 h-full bg-gradient-to-br from-pink-500 via-purple-500 to-violet-600 rounded-3xl shadow-lg flex flex-col items-center justify-center text-center p-4 relative overflow-hidden group"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="relative z-10">
                <h2 className="text-xl lg:text-2xl font-bold text-white">Portfolio Showcase</h2>
                <p className="text-sm lg:text-base font-normal mt-2 text-neutral-200">
                  More projects coming soon
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isCardOpen && activeVideo && (
          <Player video={activeVideo} close={() => setIsCardOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default SixDivLayout;