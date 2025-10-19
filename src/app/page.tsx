"use client";

import { useEffect, useState } from "react";

import HomePage from "@/app/componentes/Homepage/HomePage";
import SixDivLayout from "./componentes/SixDivLayout";
import ContactForm from "./componentes/ContactForm";
import About from "./componentes/About/About";
import VideoSection from "./componentes/VideoSection/VideoSection";
import Preloader from "./componentes/Preloader";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      document.body.style.cursor = "default";
      window.scrollTo(0, 0);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="bg-black  min-h-screen antialiased bg-grid-white/[0.02]">
      <section>
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="preloader"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed inset-0 flex items-center justify-center  z-50"
            >
              <Preloader />
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <HomePage />
              <SixDivLayout />
              <About />
              <VideoSection />
              <ContactForm />
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </main>
  );
}
