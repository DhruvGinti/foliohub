"use client";
import React, { useState } from "react";
// CORRECTED: It's standard to import from 'framer-motion' for these components
import { AnimatePresence, motion } from "framer-motion";
import { Mail, User, RotateCw, MessageCircle, Send } from "lucide-react";
import { Vortex } from "./ui/vortex";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      
      if (res.ok) {
        setStatus(true);
        setName('');
        setEmail('');
        setMessage('');
        
        setTimeout(() => {
          setStatus(false);
        }, 4000);
      } else {
        // Handle server errors if needed
        console.error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  
  return (
    <div className="relative flex items-center justify-center min-h-screen w-full bg-transparent overflow-hidden">
      <Vortex
        backgroundColor="black"
        // This is already responsive, which is great!
        className="flex items-center flex-col justify-center px-4 md:px-10 py-4 w-full h-full"
      >
        <AnimatePresence mode="wait">
          {status ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="w-full flex items-center justify-center"
            >
              <div
                // RESPONSIVE: Adjusted padding and text sizes for mobile.
                className="w-full max-w-lg backdrop-blur-sm rounded-2xl shadow-xl p-6 sm:p-8 text-center border-2 border-white/30 bg-black/70"
              >
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  // RESPONSIVE: Smaller text on mobile
                  className="text-xl sm:text-2xl font-bold text-white mb-4"
                >
                  Message Sent Successfully!
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  className="text-gray-300 mb-6 leading-relaxed text-sm sm:text-base"
                >
                  Thank you for reaching out! I've received your message and will get back to you within 24 hours.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                  className="bg-gray-900 rounded-lg p-4 mb-6 border border-gray-700 text-left"
                >
                  <p className="text-sm text-white font-medium">
                    Ready to bring your project to life?
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    I specialize in delivering high-quality solutions tailored to your needs.
                  </p>
                </motion.div>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setStatus(false)}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md"
                >
                  <RotateCw size={18} />
                  Send Another Message
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="w-full max-w-lg rounded-2xl shadow-xl border border-gray-700 backdrop-blur-lg bg-black/20 z-10"
            >
              {/* Header */}
              {/* RESPONSIVE: Adjusted padding for mobile */}
              <div className="px-6 sm:px-8 pt-6 pb-3 text-center">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  Let's Work Together
                </h2>
                <p className="text-gray-300 text-sm sm:text-base">
                  Ready to start your next project? I'd love to hear from you.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleForm} autoComplete="off">
                {/* RESPONSIVE: Adjusted padding and spacing for mobile */}
                <div className="p-6 sm:p-8 space-y-5">
                  {/* Name Field */}
                  <div className="space-y-2">
                    <label className="flex items-center text-sm font-semibold text-gray-200">
                      <User className="w-4 h-4 mr-2 text-gray-300" />
                      Full Name
                    </label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-white/5 border border-gray-600 rounded-lg p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                      placeholder="Enter your full name"
                      type="text"
                      required
                    />
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <label className="flex items-center text-sm font-semibold text-gray-200">
                      <Mail className="w-4 h-4 mr-2 text-gray-300" />
                      Email Address
                    </label>
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white/5 border border-gray-600 rounded-lg p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                      placeholder="Enter your email address"
                      type="email"
                      required
                    />
                  </div>

                  {/* Message Field */}
                  <div className="space-y-2">
                    <label className="flex items-center text-sm font-semibold text-gray-200">
                      <MessageCircle className="w-4 h-4 mr-2 text-gray-300" />
                      Project Details
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-white/5 border border-gray-600 rounded-lg p-3 h-32 resize-none text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                      placeholder="Tell me about your project..."
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 text-base font-semibold text-center rounded-lg cursor-pointer bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2 focus:ring-offset-black transition-all duration-200 shadow-lg disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </Vortex>
    </div>
  );
};

export default ContactForm;