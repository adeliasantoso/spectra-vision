import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import LazyImage from "../components/LazyImage";
import GestureInteractive from "../components/GestureInteractive";
import spectra1Image from "../assets/images/landing-page/spectra1.webp";

const ProductIntro = () => {
  return (
    <section className="pt-32 pb-20 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
      {/* XR-style ambient background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, 50, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4],
            x: [0, -30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Enhanced Heading */}
        <div className="text-center mb-24">
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-light text-black mb-0"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.span
              className="block"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Introducing the new
            </motion.span>
            <motion.span
              className="font-normal bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              style={{
                backgroundSize: "200% 200%",
              }}
            >
              Spectra 1.0
            </motion.span>
          </motion.h2>
        </div>

        {/* Interactive Product Image */}
        <div className="flex justify-center py-20">
          <div className="max-w-2xl w-full">
            <GestureInteractive className="block group" sensitivity={0.5}>
              <Link to="/product/spectra-1-0" className="block">
                {/* Holographic frame */}
                <motion.div
                  className="relative p-0"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* XR-style border */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-transparent to-purple-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Main image container */}
                  <motion.div
                    className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
                    style={{
                      boxShadow: "0 20px 60px rgba(0, 0, 0, 0.1)",
                    }}
                    whileHover={{
                      boxShadow: "0 30px 80px rgba(59, 130, 246, 0.2)",
                    }}
                  >
                    <LazyImage
                      src={spectra1Image}
                      alt="Spectra 1.0 Smart Glasses"
                      className="w-full transition-all duration-700 group-hover:scale-105 object-cover"
                      style={{ aspectRatio: "3/1", height: "200px", objectPosition: "center" }}
                    />

                    {/* Holographic scanlines */}
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-30 pointer-events-none"
                      style={{
                        background:
                          "repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(59, 130, 246, 0.1) 2px, rgba(59, 130, 246, 0.1) 4px)",
                      }}
                      animate={{
                        x: ["-100%", "100%"],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "loop",
                      }}
                    />
                  </motion.div>

                  {/* Floating info cards */}
                  <motion.div
                    className="absolute -top-4 -right-4 bg-white/90 backdrop-blur-sm border border-white/20 rounded-xl p-3 opacity-0 group-hover:opacity-100"
                    initial={{ y: 20, opacity: 0 }}
                    whileHover={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <div className="text-xs text-gray-600 font-medium">
                      AR Ready
                    </div>
                    <div className="text-lg font-bold text-blue-600">1.0</div>
                  </motion.div>

                  <motion.div
                    className="absolute -bottom-4 -left-4 bg-white/90 backdrop-blur-sm border border-white/20 rounded-xl p-3 opacity-0 group-hover:opacity-100"
                    initial={{ y: -20, opacity: 0 }}
                    whileHover={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    <div className="text-xs text-gray-600 font-medium">
                      From
                    </div>
                    <div className="text-lg font-bold text-purple-600">
                      £3,299
                    </div>
                  </motion.div>
                </motion.div>

                {/* Enhanced Click indicator */}
                <motion.div
                  className="text-center mt-2 opacity-0 group-hover:opacity-100"
                  initial={{ y: 20 }}
                  whileHover={{ y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.span
                    className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-2xl font-medium text-lg shadow-lg"
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 10px 30px rgba(59, 130, 246, 0.3)",
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Experience the Future
                    <motion.span
                      className="ml-2"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </motion.span>
                </motion.div>
              </Link>
            </GestureInteractive>
          </div>
        </div>

        {/* XR-style tech specs floating around */}
        <motion.div
          className="absolute top-1/3 left-10 text-sm text-gray-400 font-mono"
          animate={{
            opacity: [0.3, 0.7, 0.3],
            y: [0, -10, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div>Resolution: 4K per eye</div>
          <div>FOV: 50°</div>
        </motion.div>

        <motion.div
          className="absolute bottom-1/3 right-10 text-sm text-gray-400 font-mono"
          animate={{
            opacity: [0.3, 0.7, 0.3],
            y: [0, 10, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        >
          <div>Weight: 65g</div>
          <div>Battery: 8h</div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductIntro;
