"use client";

import { useState,useEffect, useRef } from "react";
import { X, UserPlus, Play, Pause, Volume2, VolumeX, Heart, Share2, Download, Eye } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CopyEmailButton from "./ui/CopyEmailButton";
import { div } from "motion/react-client";
import Player from "./player/Player";
import { BackgroundLines } from "./ui/background-lines";

const videos = [
  {
    src: "/m3.mp4",
    title: "Cool Car Edits",
    description: "High-octane car edit with fast cuts and smooth transitions",
  },
  {
    src: "/brothers.mp4",
    title: "Brotherhood Ride",
    description: "Two brothers, one passion – cinematic storytelling on wheels",
  },
  {
    src: "/finalBMW.mp4",
    title: "BMW Showcase",
    description: "Luxury meets motion. Smooth transitions and cinematic vibes",
  },
];

const texts = [
  "Cinematic Visuals",
  "Rhythm in Motion",
  "Stories Through Color",
  "Edits That Leave a Mark"
];


const SixDivLayout = () => {
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState<typeof videos[0] | null>(null);


  const [index, setIndex] = useState(0);


  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, 3000); // change every 3s
    return () => clearInterval(interval);
  }, []);



  return (
    <div className="min-h-screen w-full p-8">
      {/* ================= TOP SECTION ================= */}
      <div className="flex gap-10 mb-4">
        {/* ---------- LEFT HERO ---------- */}
        <div className="relative h-[100vh] w-1/2 border-4 border-white/20 rounded-3xl shadow-lg overflow-hidden">
      <BackgroundLines>
        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
          {/* Animated H1 only */}
          <div className="h-[60px] flex items-center">
            <AnimatePresence mode="wait">
              <motion.h1
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-5xl font-bold text-white drop-shadow-lg tracking-wide"
              >
                {texts[index]}
              </motion.h1>
            </AnimatePresence>
          </div>

          {/* Static Subtext */}
          <p className="mt-4 text-lg text-neutral-300 max-w-md leading-relaxed">
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

        {/* Bottom Info */}
        <div className="absolute bottom-4 left-5 flex items-center gap-6 text-neutral-400 text-xs">
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
        className="bg-white/10 backdrop-blur-sm border border-white/30 
                   rounded-xl p-2 shadow-md flex items-center justify-center 
                   hover:shadow-pink-500/30 hover:border-pink-400/50"
      >
        <img
          src={item.src}
          alt={item.label}
          className="inline-block w-6 h-6 object-contain"
        />
      </motion.div>
      {/* Tooltip */}
      <span className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 
                       bg-black/80 text-white text-[10px] px-2 py-1 rounded-md transition-all">
        {item.label}
      </span>
    </div>
  ))}
</div>


        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 2.5,
            ease: [0.4, 0, 0.2, 1]
          }}
          className="absolute bottom-3 right-5 text-neutral-400 text-xs"
        >
          <motion.span
            initial={{ opacity: 0.7 }}
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              duration: 2.5,
              ease: "easeInOut"
            }}
          >
            Scroll for more ↓
          </motion.span>
        </motion.div>
      </BackgroundLines>
    </div>


        {/* ---------- RIGHT SIDE ---------- */}
        <div className="w-1/2 flex flex-col gap-4 ">
          {/* Card 1: Car */}
          <motion.div
            onClick={() => {
              setActiveVideo(videos[0]);
              setIsCardOpen(true);
            }}
            className="relative h-[50vh] rounded-3xl border border-black overflow-hidden shadow-lg hover:cursor-pointer group bg-gradient-to-b from-black via-black/80 to-black/60"
            whileHover={{ scale: 1.02 }}
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
            {/* <img src="/img/BMW-img.png" className="" alt="" /> */}
            <div className="absolute -bottom-2 left-0 w-full p-5 bg-gradient-to-b from-transparent to-black rounded-b-2xl">
              <h2 className="text-2xl font-bold text-white">{videos[0].title}</h2>
              <p className="text-sm text-neutral-400">{videos[0].description}</p>
            </div>
            <motion.div
              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ height: "40%" }} // Added height to overlay
              initial={{ scale: 0 }}
              whileHover={{ scale: 1 }}
            >
              <div className="bg-black/50 backdrop-blur-sm rounded-full p-4">
                <Play className="w-8 h-8 text-white" fill="white" />
              </div>
            </motion.div>
          </motion.div>

          {/* Card 2 + 3 Row */}
          <div className="flex gap-6">
            {/* Brothers */}
            <motion.div
              onClick={() => {
                setActiveVideo(videos[1]);
                setIsCardOpen(true);
              }}
              className="h-[48vh] w-1/2 rounded-2xl shadow-lg flex items-center justify-center relative overflow-hidden group cursor-pointer"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              
              <img src="/img/BMW-M4.jpeg" className="object-center object-cover h-full w-full" alt="" />
              <div className="absolute -bottom-2 left-0 w-full p-5 bg-gradient-to-b from-transparent to-black rounded-b-2xl">
                <h2 className="text-2xl font-bold text-white">{videos[1].title}</h2>
                <p className="text-sm text-neutral-400">{videos[1].description}</p>
              </div>
              <motion.div
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ height: "40%" }} // Added height to overlay
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
              >
                <div className="bg-black/50 backdrop-blur-sm rounded-full p-4">
                  <Play className="w-8 h-8 text-white" fill="white" />
                </div>
              </motion.div>
            </motion.div>

            {/* BMW */}
            <motion.div
              onClick={() => {
                setActiveVideo(videos[2]);
                setIsCardOpen(true);
                }}
                className="h-[48vh] w-1/2 rounded-2xl shadow-lg flex items-center justify-center relative overflow-hidden group cursor-pointer  border border-black"
                whileHover={{ scale: 1.04 }}
                transition={{ type: "spring", stiffness: 320, damping: 18 }}
              >
                <img
                src="/img/BMW-M3-editon.jpeg"
                alt=""
                // className="w-full //h-full object-cover transition-transform duration-500 group-hover:scale-105 rounded-2xl"
               className="object-center object-cover h-full w-full"
                />
              <div className="absolute -bottom-2 left-0 w-full p-5 bg-gradient-to-b from-transparent to-black rounded-b-2xl">
                <h2 className="text-2xl font-bold text-white">{videos[2].title}</h2>
                <p className="text-sm text-neutral-400">{videos[2].description}</p>
              </div>
              <motion.div
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ height: "40%" }} // Added height to overlay
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
              >
                <div className="bg-black/50 backdrop-blur-sm rounded-full p-4">
                  <Play className="w-8 h-8 text-white" fill="white" />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
        
      </div>

      {/* ================= PLAYER MODAL ================= */}
      <AnimatePresence>
        {isCardOpen && activeVideo && (
          <Player video={activeVideo} close={() => setIsCardOpen(false)} />
        )}
      </AnimatePresence>

      {/* ================= BOTTOM SECTION ================= */}

      <div className="flex gap-6">
        <motion.div
          className="h-[50vh] w-[30%] rounded-2xl shadow-lg border border-white/20 flex items-center justify-center relative overflow-hidden group cursor-pointer"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20"
            animate={{
              background: [
                "linear-gradient(45deg, rgba(59, 130, 246, 0.2), rgba(147, 51, 234, 0.2), rgba(236, 72, 153, 0.2))",
                "linear-gradient(45deg, rgba(236, 72, 153, 0.2), rgba(59, 130, 246, 0.2), rgba(147, 51, 234, 0.2))",
                "linear-gradient(45deg, rgba(147, 51, 234, 0.2), rgba(236, 72, 153, 0.2), rgba(59, 130, 246, 0.2))",
              ],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
          <div className="flex flex-col items-center justify-center gap-6 w-full p-6 relative z-10">
            <motion.div
              className="flex items-center justify-center p-4 rounded-full bg-blue-500/30 backdrop-blur-sm border border-blue-400/30"
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <UserPlus className="w-12 h-12 text-blue-400 drop-shadow-md" />
            </motion.div>
            <motion.p
              className="text-center text-xl font-semibold text-white leading-snug"
              initial={{ opacity: 0.8 }}
              whileHover={{ opacity: 1 }}
            >
              Do you want to start a project together?
            </motion.p>
            <CopyEmailButton />
          </div>
        </motion.div>

        <motion.div
          className="h-[50vh] w-[70%] bg-gradient-to-br from-pink-500 via-purple-500 to-violet-500 rounded-2xl shadow-lg flex items-center justify-center text-slate-900 text-xl font-bold relative overflow-hidden group cursor-pointer"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12"
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="relative z-10 text-3xl text-white  text-center">
            <motion.div
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              Portfolio Showcase
            </motion.div>
            <p className="text-base font-normal mt-2 text-neutral-300  opacity-80">
              More projects coming soon
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SixDivLayout;