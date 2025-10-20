"use client";

import { useState, useEffect, useRef } from "react";
import { UserPlus, Play } from "lucide-react";
import { motion, useInView, AnimatePresence } from "motion/react";
import type { Variants } from "motion/react";
import Image from "next/image";
import CopyEmailButton from "./ui/CopyEmailButton";
import Player from "./player/Player";
import { BackgroundLines } from "./ui/background-lines";

import { useRouter } from "next/navigation";
// Define types for videos and toolIcons
type Video = {
  src: string;
  title: string;
  description: string;
  views: number;
};

type ToolIcon = {
  src: string;
  label: string;
};

const videos: Video[] = [
  {
    src: "videos/OrigionalVideo.mp4",
    title: "Overlay Edit Skills",
    description: "Demonstrating creative overlay techniques, advanced transitions, and visual storytelling to enhance video edits.",
    views: 0,
  },
  {
    src: "videos/brothers (1).mp4",
    title: "Brotherhood Ride",
    description: "Two brothers, one passion – cinematic storytelling on wheels",
    views: 0,
  },
  {
    src: "/finalBMW.mp4",
    title: "BMW Showcase",
    description: "Luxury meets motion. Smooth transitions and cinematic vibes",
    views: 0,
  },
];

const texts: string[] = [
  "Cinematic Visuals",
  "Rhythm in Motion",
  "Stories Through Color",
  "Edits That Leave a Mark",
];

const toolIcons: ToolIcon[] = [
//  { src: "/log/Blender-Logo-3D-Software-84623.png", label: "Blender" },
  { src: "/log/images.jpeg", label: "TopazAI" },
  { src: "/log/pngwing.com.png", label: "DaVinci" },
];

// Animation variants with proper typing
const fadeInUp: Variants = {
  hidden: { 
    opacity: 0, 
    y: 40 
  },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { 
      delay: i * 0.15, 
      duration: 0.7, 
      ease: "easeOut" 
    },
  }),
};

const fadeIn: Variants = {
  hidden: { 
    opacity: 0 
  },
  visible: (i: number = 0) => ({
    opacity: 1,
    transition: { 
      delay: i * 0.1, 
      duration: 0.7, 
      ease: "easeOut" 
    },
  }),
};

const scaleIn: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.95 
  },
  visible: (i: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { 
      delay: i * 0.1, 
      duration: 0.6, 
      ease: "easeOut" 
    },
  }),
};

const SixDivLayout = () => {
  const [isCardOpen, setIsCardOpen] = useState<boolean>(false);
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);
  const [index, setIndex] = useState<number>(0);

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(scrollRef, { once: true });
  const router = useRouter()
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // const handleRedicret = ()=>{

  // }

  // 🔥 Custom hook for lazy video loading
  const LazyMotionVideo = ({
    src,
    className,
  }: {
    src: string;
    className?: string;
  }) => {
    const ref = useRef<HTMLVideoElement | null>(null);
    const videoInView = useInView(ref, { once: true });

    return (
      <motion.video
        ref={ref}
        src={videoInView ? src : undefined}
        className={className}
        loop
        autoPlay
        muted
        playsInline
        initial={{ scale: 1.05, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
    );
  };

  return (
    <motion.div className="min-h-screen w-full p-4 md:p-8 overflow-hidden">
      {/* ================= TOP SECTION ================= */}
      <motion.div
        className="flex flex-col md:flex-row gap-4 md:gap-10 mb-4"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* ---------- LEFT HERO ---------- */}
        <motion.div
          ref={scrollRef}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative h-[60vh] md:h-[100vh] w-full md:w-1/2 border-4 border-white/20 rounded-3xl shadow-lg overflow-hidden"
        >
          <BackgroundLines>
            {/* Center Text */}
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center text-center p-6"
              variants={fadeIn}
              initial="hidden"
              animate="visible"
            >
              {/* Animated H1 */}
              <div className="h-[60px] flex items-center">
                <AnimatePresence mode="wait">
                  <motion.h1
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="text-3xl md:text-5xl font-bold text-white drop-shadow-lg tracking-wide"
                  >
                    {texts[index]}
                  </motion.h1>
                </AnimatePresence>
              </div>

              <motion.p
                className="mt-4 text-sm md:text-lg text-neutral-300 max-w-md leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}
              >
                Hey, I&apos;m{" "}
                <span className="text-pink-400 font-semibold">Dhruv</span> — 
                blending motion, pacing, and vibrant color to craft edits that{" "}
                <span className="text-purple-400">feel cinematic</span>.
              </motion.p>

              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "140px" }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="h-[4px] mt-6 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full"
              />
            </motion.div>

            {/* Bottom Info */}
            <motion.div
              className="absolute bottom-4 left-5 flex items-center gap-4 md:gap-6 text-neutral-400 text-xs"
              variants={fadeIn}
              initial="hidden"
              animate="visible"
            >
              {toolIcons.map((item, i) => (
                <motion.div
                  key={i}
                  className="relative group"
                  custom={i}
                  variants={fadeInUp}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.div
                    whileHover={{ scale: 1.15 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl p-2 shadow-md flex items-center justify-center hover:shadow-pink-500/30 hover:border-pink-400/50"
                  >
                    <Image
                      src={item.src}
                      alt={item.label}
                      width={24}
                      height={24}
                      className="inline-block w-6 h-6 object-contain"
                    />
                  </motion.div>
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-black/80 text-white text-[10px] px-2 py-1 rounded-md transition-all">
                    {item.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{
                repeat: Infinity,
                repeatType: "loop",
                duration: 2.5,
                ease: [0.4, 0, 0.2, 1],
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
                  ease: "easeInOut",
                }}
              >
                Scroll for more ↓
              </motion.span>
            </motion.div>
          </BackgroundLines>
        </motion.div>

        {/* ---------- RIGHT SIDE ---------- */}
        <motion.div
          className="w-full md:w-1/2 flex flex-col gap-4"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Card 1: Car */}
          <motion.div
            onClick={() => {
              setActiveVideo(videos[0]);
              setIsCardOpen(true);
            }}
            initial={{ opacity: 0, x: 120 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 80, damping: 18, duration: 0.7 }}
            whileHover={{ scale: 1.02 }}
            className="relative h-[40vh] md:h-[50vh] rounded-3xl border border-black overflow-hidden shadow-lg hover:cursor-pointer group bg-gradient-to-b from-black via-black/80 to-black/60"
            viewport={{ once: true, amount: 0.2 }}
          >
            <LazyMotionVideo
              src="/videos/OverlayThumb.mp4"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <motion.div className="absolute -bottom-2 left-0 w-full p-5 bg-gradient-to-b from-transparent to-black rounded-b-2xl">
              <h2 className="text-xl md:text-2xl font-bold text-white">
                {videos[0].title}
              </h2>
              <p className="text-xs md:text-sm text-neutral-400">
                {videos[0].description}
              </p>
            </motion.div>
            <motion.div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-black/50 backdrop-blur-sm rounded-full p-4">
                <Play className="w-8 h-8 text-white" fill="white" />
              </div>
            </motion.div>
          </motion.div>

          {/* Card 2 + 3 Row */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {/* Brothers */}
            <motion.div
              onClick={() => {
                setActiveVideo(videos[1]);
                setIsCardOpen(true);
              }}
              className="h-[30vh] md:h-[48vh] w-full sm:w-1/2 rounded-2xl shadow-lg flex items-center justify-center relative overflow-hidden group cursor-pointer"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 80, damping: 18 }}
              initial={{ opacity: 0, y: -40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <LazyMotionVideo
                src={videos[1].src}
                className="object-center object-cover h-full w-full"
              />
              <motion.div className="absolute -bottom-2 left-0 w-full p-5 bg-gradient-to-b from-transparent to-black rounded-b-2xl">
                <h2 className="text-xl md:text-2xl font-bold text-white">
                  {videos[1].title}
                </h2>
                <p className="text-xs md:text-sm text-neutral-400">
                  {videos[1].description}
                </p>
              </motion.div>
              <motion.div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
              className="h-[30vh] md:h-[48vh] w-full sm:w-1/2 rounded-2xl shadow-lg flex items-center justify-center relative overflow-hidden group cursor-pointer border border-black"
              whileHover={{ scale: 1.04 }}
              transition={{ type: "spring", stiffness: 320, damping: 18 }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <LazyMotionVideo
                src={videos[2].src}
                className="object-center object-cover h-full w-full"
              />
              <motion.div className="absolute -bottom-2 left-0 w-full p-5 bg-gradient-to-b from-transparent to-black rounded-b-2xl">
                <h2 className="text-xl md:text-2xl font-bold text-white">
                  {videos[2].title}
                </h2>
                <p className="text-xs md:text-sm text-neutral-400">
                  {videos[2].description}
                </p>
              </motion.div>
              <motion.div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-black/50 backdrop-blur-sm rounded-full p-4">
                  <Play className="w-8 h-8 text-white" fill="white" />
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* ================= PLAYER MODAL ================= */}
      <AnimatePresence>
        {isCardOpen && activeVideo && (
          <Player video={activeVideo} close={() => setIsCardOpen(false)} />
        )}
      </AnimatePresence>

      {/* ================= BOTTOM SECTION ================= */}
      <motion.div
        className="flex flex-col md:flex-row gap-4 md:gap-6"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div
          className="h-[40vh] md:h-[50vh] w-full md:w-[30%] rounded-2xl shadow-lg border border-white/20 flex items-center justify-center relative overflow-hidden group cursor-pointer"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
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
          <motion.div
            className="flex flex-col items-center justify-center gap-6 w-full p-6 relative z-10"
            variants={scaleIn}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              className="flex items-center justify-center p-4 rounded-full bg-blue-500/30 backdrop-blur-sm border border-blue-400/30"
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <UserPlus className="w-8 h-8 md:w-12 md:h-12 text-blue-400 drop-shadow-md" />
            </motion.div>
            <motion.p className="text-center text-lg md:text-xl font-semibold text-white leading-snug">
              Do you want to start a project together?
            </motion.p>
            <CopyEmailButton />
          </motion.div>
        </motion.div>

        <motion.div
        //navigate to more videos
        
        onClick={()=> {router.push("/more/videos") }}
          className="h-[40vh]  md:h-[50vh] w-full md:w-[70%] bg-gradient-to-br from-pink-500 via-purple-500 to-violet-500 rounded-2xl shadow-lg flex items-center justify-center text-slate-900 text-xl font-bold relative overflow-hidden group cursor-pointer"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div
            className="absolute  inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12"
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div className="relative z-10 text-xl md:text-3xl text-white text-center">
            <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
              Edit's Showcase
            </motion.div>

            <motion.p className="text-xs md:text-base font-normal mt-2 text-neutral-300 opacity-80">
              Want to see more edits? Take a look!
            </motion.p>

          </motion.div>
        </motion.div>
        
      </motion.div>
    </motion.div>
  );
};

export default SixDivLayout;