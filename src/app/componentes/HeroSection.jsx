"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import { Spotlight } from "./ui/Spotlight";

const dynamicWords = [
  { word: "editing", color: "text-white" },
  { word: "visuals", color: "text-white" },
  { word: "stories", color: "text-white" },
  { word: "clients", color: "text-white" },
];

const HeroSection = () => {
  const [index, setIndex] = useState(0);
  const [displayedWord, setDisplayedWord] = useState("");

  const scrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const cycle = setInterval(() => {
      setIndex((prev) => (prev + 1) % dynamicWords.length);
    }, 3000);
    return () => clearInterval(cycle);
  }, []);

  useEffect(() => {
    setDisplayedWord("");
    let i = 0;
    const word = dynamicWords[index].word;
    const typing = setInterval(() => {
      if (i < word.length) {
        setDisplayedWord(word.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typing);
      }
    }, 220);
    return () => clearInterval(typing);
  }, [index]);

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-hidden rounded-md bg-black py-10 px-4 text-white md:h-[40rem] md:flex-row md:py-0 md:px-0">
      <Spotlight
        className="-top-40 left-0 md:-top-35 md:left-20"
        fill="white"
      />

      {/* Left Side (Main Content) */}
      <div className="relative z-10 flex flex-1 w-full flex-col items-center justify-center text-center md:w-[65%] md:items-start md:pl-10 md:text-left">
        
        {/* CHANGE: Increased bottom margin from 15vh to 25vh to move the content block further up. */}
        <div className="mb-[25vh] md:mb-0">
          <motion.h1
            className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 md:mt-0 md:text-7xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Your Vision, Seamlessly Edited
          </motion.h1>

          <div className="mt-8 w-full max-w-xl space-y-6">
            <motion.p
              className="flex-wrap font-normal leading-relaxed tracking-wide text-base bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 md:text-xl"
              initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              I help brands and creators tell powerful stories through seamless
              video
              <motion.span
                key={dynamicWords[index].word}
                className={`ml-1.5 rounded-xl border-2 border-white/20 bg-white/30 py-1.5 px-4 font-normal tracking-wide text-base md:text-xl ${dynamicWords[index].color}`}
                initial={{ opacity: 0, y: 10, scale: 0.95, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, scale: 0.95, filter: "blur(6px)" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                {displayedWord}
              </motion.span>
            </motion.p>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="hidden w-full items-center justify-center md:flex md:w-1/2">
        {/* You can place an image or video preview here for desktop view */}
      </div>

      {/* Bottom Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20 h-20 w-full transition-all duration-500 ease-in-out">
        <div className="flex h-full items-center justify-between px-4 text-sm transition-all duration-500 ease-in-out md:px-8 md:text-base">
          <Link
            href="/videoeditor"
            className="group flex items-center font-medium text-white transition-all duration-300 ease-in-out hover:underline"
          >
            Discover my latest edits
            <ArrowUpRight className="ml-1 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
          </Link>

          <button
            onClick={scrollDown}
            className="group flex items-center justify-center rounded-full p-2 transition-all duration-300 ease-in-out hover:bg-white/10"
            aria-label="Scroll down"
          >
            <ArrowDown className="transition-transform duration-300 ease-in-out group-hover:translate-y-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;