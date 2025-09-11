import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import CartIcon from "../components/CartIcon";
import ProductQuickView from "../components/ProductQuickView";
import FAQ from "../components/FAQ";
import OptimizedImage from "../components/OptimizedImage";
import { measurePerformance, monitorBundleSize } from "../utils/performance";
import { useAutoRefresh } from "../hooks/useAutoRefresh";
import { setupCacheManagement } from "../utils/simpleCache";
import spectraGlassesImage from "../assets/images/landing-page/spectra1-hero.webp";
import experienceDudeImage from "../assets/images/landing-page/experience-dude.webp";
import social1Image from "../assets/images/landing-page/social1.webp";
import social2Image from "../assets/images/landing-page/social2.webp";
import social3Image from "../assets/images/landing-page/social3.webp";

const Home = React.memo(() => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  // Auto-refresh for development
  useAutoRefresh();

  // Performance monitoring
  useEffect(() => {
    measurePerformance.logMetrics();
    monitorBundleSize();

    // Setup simple cache management
    setupCacheManagement();
  }, []);

  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Hero video control
  const heroVideoRef = useRef(null);
  const [heroVideoOpacity, setHeroVideoOpacity] = useState(1);

  // YouTube embeds auto-handle playback (no manual controls needed)
  const uspVideoRefs = useRef({});

  // Animation state for sections
  const [visibleSections, setVisibleSections] = useState(new Set());
  const sectionRefs = useRef({});

  // Parallax scrolling effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // YouTube iframe doesn't support custom loop control
  // Loop is handled by YouTube embed parameters
  useEffect(() => {
    // YouTube embeds handle autoplay and loop automatically
    console.log("Hero video is handled by YouTube embed");
  }, []);

  // Animation observer for scroll-triggered animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.05,
      rootMargin: "-100px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisibleSections((prev) => new Set(prev).add(entry.target.id));
        }
      });
    }, observerOptions);

    // Observe all sections
    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  // Spectra 1.0 product data for quick view
  const spectraProduct = {
    id: "spectra-1-0",
    name: "Spectra 1.0",
    price: "2,499",
    image: spectraGlassesImage,
    description:
      "Revolutionary AR smart glasses that seamlessly blend into your routine and deliver helpful, personalized suggestions. Experience the future of wearable technology with advanced AI integration and stunning visual clarity.",
  };

  const handleQuickView = () => {
    setSelectedProduct(spectraProduct);
    setIsQuickViewOpen(true);
  };

  // YouTube embeds auto-handle playback - no manual controls needed

  return (
    <div className="min-h-screen">
      <Navigation />
      <CartIcon />

      {/* Hero Section */}
      <section
        className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-800"
        style={{ minHeight: "100vh" }}
      >
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full">
          <iframe
            ref={heroVideoRef}
            src="https://www.youtube.com/embed/fNUB1H8sJwY?autoplay=1&mute=1&loop=1&playlist=fNUB1H8sJwY&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&cc_load_policy=0&disablekb=1&fs=0&origin=https://localhost:5174"
            className="w-full h-full transition-opacity duration-500"
            style={{
              opacity: heroVideoOpacity,
              position: "absolute",
              top: "45%", // Naik sedikit dari 40% ke 45%
              left: "50%",
              width: "100vw",
              height: "56.25vw", // 16:9 aspect ratio
              minHeight: "100vh",
              minWidth: "177.78vh", // 16:9 aspect ratio
              transform: "translate(-50%, -50%)",
            }}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />

          {/* Fallback background */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800 -z-10"></div>
        </div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40 z-10"></div>

        {/* Content */}
        <div className="relative z-30 flex items-end justify-center h-full pb-8 sm:pb-12 md:pb-16 lg:pb-20">
          <div className="text-center text-white px-4 sm:px-6 md:px-8 lg:px-12 max-w-5xl mx-auto">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light mb-4 sm:mb-5 md:mb-6 lg:mb-8 leading-tight relative z-40">
              <div className="mb-2">
                <span className="animate-word-1 inline-block opacity-0">A</span>{" "}
                <span className="animate-word-2 inline-block opacity-0">
                  world
                </span>{" "}
                <span className="animate-word-3 inline-block opacity-0">
                  tailored
                </span>{" "}
                <span className="animate-word-4 inline-block opacity-0">
                  to
                </span>
              </div>
              <div className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl -mt-1 sm:-mt-2 md:-mt-3 lg:-mt-4 animate-word-5 opacity-0">
                your mind
              </div>
            </h1>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 lg:bottom-10 left-1/2 transform -translate-x-1/2 z-50">
          <div className="text-white/90 hover:text-white transition-all duration-300 cursor-pointer group">
            <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white/70 rounded-full flex justify-center group-hover:border-white transition-all duration-300 bg-black/20 backdrop-blur-sm">
              <div className="w-1 h-2 sm:h-3 bg-white/90 rounded-full mt-1.5 sm:mt-2 animate-bounce group-hover:bg-white transition-all duration-300"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Introducing Spectra 1.0 */}
      <section
        id="product-introduction"
        ref={(el) => (sectionRefs.current["product-introduction"] = el)}
        className="py-24 md:py-32 bg-white"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-black mb-24 sm:mb-28 md:mb-32 lg:mb-36">
            Introducing the new Spectra 1.0
          </h2>

          <div className="mb-6 sm:mb-8 md:mb-10">
            <OptimizedImage
              src={spectraGlassesImage}
              alt="Spectra 1.0 Smart Glasses"
              className="w-full h-auto object-contain mx-auto"
              style={{ maxWidth: "600px", maxHeight: "360px" }}
              priority={true}
            />
          </div>
        </div>
      </section>

      {/* Experience Intelligent Personalization - Full Screen Video */}
      <section
        id="new-video-section"
        ref={(el) => (sectionRefs.current["new-video-section"] = el)}
        className="py-0 bg-gradient-to-br from-gray-100 via-gray-50 to-gray-75 relative"
      >
        {/* Asymmetric radial gradient texture */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-gray-50 to-gray-75"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_20%_30%,rgba(156,163,175,0.15)_0%,transparent_40%),radial-gradient(ellipse_at_80%_70%,rgba(209,213,219,0.12)_0%,transparent_35%),radial-gradient(ellipse_at_90%_10%,rgba(156,163,175,0.08)_0%,transparent_25%),radial-gradient(ellipse_at_10%_90%,rgba(209,213,219,0.1)_0%,transparent_30%)]"></div>
        </div>
        <div className="w-full relative z-10">
          <div
            className={`enhanced-video-container relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden ${
              visibleSections.has("new-video-section") ? "animate" : ""
            }`}
          >
            <iframe
              ref={(el) => {
                if (el) {
                  uspVideoRefs.current["new-video-section"] = el;
                }
              }}
              src="https://www.youtube.com/embed/kiQ8le_fX9U?autoplay=1&mute=1&loop=1&playlist=kiQ8le_fX9U&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&cc_load_policy=0&disablekb=1&fs=0&origin=https://localhost:5174"
              className="w-full h-full"
              style={{
                position: "absolute",
                top: "70%",
                left: "50%",
                width: "100vw",
                height: "56.25vw",
                minHeight: "100vh",
                minWidth: "177.78vh",
                transform: "translate(-50%, -50%)",
              }}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>

          {/* Caption with darker contrasting background */}
          <div className="text-center px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 relative bg-gradient-to-b from-gray-800 via-gray-850 to-gray-900">
            {/* Dark background with subtle texture */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800/95 via-gray-850/98 to-gray-900"></div>
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_30%_20%,rgba(75,85,99,0.3)_0%,transparent_40%),radial-gradient(ellipse_at_80%_80%,rgba(55,65,81,0.2)_0%,transparent_35%)]"></div>
            </div>

            <div className="relative z-10">
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">
                <span
                  className={`elegant-title-word ${
                    visibleSections.has("new-video-section") ? "animate" : ""
                  }`}
                >
                  Adaptive
                </span>{" "}
                <span
                  className={`elegant-title-word ${
                    visibleSections.has("new-video-section") ? "animate" : ""
                  }`}
                >
                  and
                </span>{" "}
                <span
                  className={`elegant-title-word ${
                    visibleSections.has("new-video-section") ? "animate" : ""
                  }`}
                >
                  Timely
                </span>{" "}
                <span
                  className={`elegant-title-word ${
                    visibleSections.has("new-video-section") ? "animate" : ""
                  }`}
                >
                  Suggestions
                </span>
              </h3>
              <p
                className={`elegant-paragraph text-sm sm:text-base md:text-lg text-gray-300 max-w-xl mx-auto px-4 sm:px-6 ${
                  visibleSections.has("new-video-section") ? "animate" : ""
                }`}
              >
                Smart recommendations that anticipate your needs, delivered at the perfect moment
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Expand Your Universe */}
      <section
        id="expand-universe"
        ref={(el) => (sectionRefs.current["expand-universe"] = el)}
        className="py-6 sm:py-8 md:py-12 lg:py-16 bg-gradient-to-br from-gray-50 via-white to-gray-100 relative"
      >
        {/* Asymmetric radial gradient texture */}
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_70%_20%,rgba(156,163,175,0.1)_0%,transparent_45%),radial-gradient(ellipse_at_15%_80%,rgba(209,213,219,0.08)_0%,transparent_40%),radial-gradient(ellipse_at_85%_60%,rgba(156,163,175,0.06)_0%,transparent_35%)]"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-center">
            <div
              className={`lg:col-span-3 lg:pr-8 order-2 lg:order-1 relative ${
                visibleSections.has("expand-universe")
                  ? "scroll-animate-video visible"
                  : "scroll-animate-video"
              }`}
            >
              <div
                className={`enhanced-video-container ${
                  visibleSections.has("expand-universe") ? "animate" : ""
                }`}
              >
                <iframe
                  ref={(el) => (uspVideoRefs.current["expand-universe"] = el)}
                  src="https://www.youtube.com/embed/ZYkvvZqOG8s?autoplay=1&mute=1&loop=1&playlist=ZYkvvZqOG8s&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&cc_load_policy=0&disablekb=1&fs=0&origin=https://localhost:5174"
                  className="w-full h-auto aspect-video rounded-2xl bg-black"
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                />
              </div>
            </div>
            <div
              className={`lg:col-span-2 space-y-6 md:space-y-8 order-1 lg:order-2 ${
                visibleSections.has("expand-universe")
                  ? "scroll-animate visible"
                  : "scroll-animate"
              }`}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 leading-tight">
                <span
                  className={`elegant-title-word ${
                    visibleSections.has("expand-universe") ? "animate" : ""
                  }`}
                  style={{ transitionDelay: "0.1s" }}
                >
                  Expand
                </span>{" "}
                <span
                  className={`elegant-title-word ${
                    visibleSections.has("expand-universe") ? "animate" : ""
                  }`}
                  style={{ transitionDelay: "0.2s" }}
                >
                  your
                </span>{" "}
                <span
                  className={`elegant-title-word ${
                    visibleSections.has("expand-universe") ? "animate" : ""
                  }`}
                  style={{ transitionDelay: "0.3s" }}
                >
                  universe
                </span>
              </h2>
              <div className="space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6">
                <p
                  className={`elegant-paragraph text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed ${
                    visibleSections.has("expand-universe") ? "animate" : ""
                  }`}
                  style={{ transitionDelay: "0.4s" }}
                >
                  Seamlessly integrated across all your platforms, Spectra
                  builds tailored recommendations that reflect your unique
                  preferences, even those you haven't yet put into words.
                </p>
                <p
                  className={`elegant-paragraph text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed ${
                    visibleSections.has("expand-universe") ? "animate" : ""
                  }`}
                  style={{ transitionDelay: "0.6s" }}
                >
                  Whether you're searching for places to go, meals to try,
                  videos to watch, or ways to stay productive, every suggestion
                  is carefully customized to your needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Unlock a Life Without Barriers */}
      <section
        id="unlock-barriers"
        ref={(el) => (sectionRefs.current["unlock-barriers"] = el)}
        className="py-8 md:py-16 bg-gradient-to-bl from-gray-50 via-white to-gray-100 relative"
      >
        {/* Asymmetric radial gradient texture */}
        <div className="absolute inset-0 opacity-18">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_25%_15%,rgba(156,163,175,0.12)_0%,transparent_42%),radial-gradient(ellipse_at_90%_85%,rgba(209,213,219,0.1)_0%,transparent_38%),radial-gradient(ellipse_at_60%_50%,rgba(156,163,175,0.07)_0%,transparent_32%)]"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-center">
            <div
              className={`lg:col-span-2 space-y-6 md:space-y-8 ${
                visibleSections.has("unlock-barriers")
                  ? "scroll-animate visible"
                  : "scroll-animate"
              }`}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 leading-tight">
                <span
                  className={`elegant-title-word ${
                    visibleSections.has("unlock-barriers") ? "animate" : ""
                  }`}
                >
                  Unlock
                </span>{" "}
                <span
                  className={`elegant-title-word ${
                    visibleSections.has("unlock-barriers") ? "animate" : ""
                  }`}
                >
                  a
                </span>{" "}
                <span
                  className={`elegant-title-word ${
                    visibleSections.has("unlock-barriers") ? "animate" : ""
                  }`}
                >
                  life
                </span>{" "}
                <span
                  className={`elegant-title-word ${
                    visibleSections.has("unlock-barriers") ? "animate" : ""
                  }`}
                >
                  without
                </span>{" "}
                <span
                  className={`elegant-title-word ${
                    visibleSections.has("unlock-barriers") ? "animate" : ""
                  }`}
                >
                  barriers
                </span>
              </h2>
              <div className="space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6">
                <p
                  className={`elegant-paragraph text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed ${
                    visibleSections.has("unlock-barriers") ? "animate" : ""
                  }`}
                >
                  Powered by our latest AI model, Spectra uses ambient insights
                  to help you move beyond everyday limitations.
                </p>
                <p
                  className={`elegant-paragraph text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed ${
                    visibleSections.has("unlock-barriers") ? "animate" : ""
                  }`}
                >
                  From navigating locations to assisting in everyday
                  conversations, Spectra provides intuitive insights that keep
                  you connected and in control.
                </p>
              </div>
            </div>
            <div
              className={`lg:col-span-3 lg:pl-8 relative ${
                visibleSections.has("unlock-barriers")
                  ? "scroll-animate-video visible"
                  : "scroll-animate-video"
              }`}
            >
              <div
                className={`enhanced-video-container ${
                  visibleSections.has("unlock-barriers") ? "animate" : ""
                }`}
              >
                <iframe
                  ref={(el) => (uspVideoRefs.current["unlock-barriers"] = el)}
                  src="https://www.youtube.com/embed/auWOyxsT1ys?autoplay=1&mute=1&loop=1&playlist=auWOyxsT1ys&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&cc_load_policy=0&disablekb=1&fs=0&origin=https://localhost:5174"
                  className="w-full h-auto aspect-video rounded-2xl bg-black"
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video USP Section 1 - Smart Recognition */}
      <section
        id="smart-recognition"
        ref={(el) => (sectionRefs.current["smart-recognition"] = el)}
        className="py-8 md:py-12 bg-gradient-to-br from-gray-100 via-gray-50 to-gray-75 relative"
      >
        {/* Asymmetric radial gradient texture */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-gray-50 to-gray-75"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_20%_30%,rgba(156,163,175,0.15)_0%,transparent_40%),radial-gradient(ellipse_at_80%_70%,rgba(209,213,219,0.12)_0%,transparent_35%),radial-gradient(ellipse_at_90%_10%,rgba(156,163,175,0.08)_0%,transparent_25%),radial-gradient(ellipse_at_10%_90%,rgba(209,213,219,0.1)_0%,transparent_30%)]"></div>
        </div>
        <div className="w-full relative z-10">
          <div
            className={`enhanced-video-container relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden ${
              visibleSections.has("smart-recognition") ? "animate" : ""
            }`}
          >
            <iframe
              ref={(el) => {
                if (el) {
                  uspVideoRefs.current["smart-recognition"] = el;
                }
              }}
              src="https://www.youtube.com/embed/K-giE2RrBWE?autoplay=1&mute=1&loop=1&playlist=K-giE2RrBWE&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&cc_load_policy=0&disablekb=1&fs=0&origin=https://localhost:5174"
              className="w-full h-full"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: "100vw",
                height: "56.25vw",
                minHeight: "100vh",
                minWidth: "177.78vh",
                transform: "translate(-50%, -50%)",
              }}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>

          {/* Caption with darker contrasting background */}
          <div className="text-center px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 relative bg-gradient-to-b from-gray-800 via-gray-850 to-gray-900">
            {/* Dark background with subtle texture */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800/95 via-gray-850/98 to-gray-900"></div>
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_30%_20%,rgba(75,85,99,0.3)_0%,transparent_40%),radial-gradient(ellipse_at_80%_80%,rgba(55,65,81,0.2)_0%,transparent_35%)]"></div>
            </div>

            {/* Subtle top border separator */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-600/50 to-transparent"></div>

            <div className="relative z-10">
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">
                <span
                  className={`elegant-title-word ${
                    visibleSections.has("smart-recognition") ? "animate" : ""
                  }`}
                >
                  Attuned
                </span>{" "}
                <span
                  className={`elegant-title-word ${
                    visibleSections.has("smart-recognition") ? "animate" : ""
                  }`}
                >
                  to
                </span>{" "}
                <span
                  className={`elegant-title-word ${
                    visibleSections.has("smart-recognition") ? "animate" : ""
                  }`}
                >
                  Your
                </span>{" "}
                <span
                  className={`elegant-title-word ${
                    visibleSections.has("smart-recognition") ? "animate" : ""
                  }`}
                >
                  Surroundings
                </span>
              </h3>
              <p
                className={`elegant-paragraph text-sm sm:text-base md:text-lg text-gray-300 max-w-2xl mx-auto px-4 sm:px-6 ${
                  visibleSections.has("smart-recognition") ? "animate" : ""
                }`}
              >
                Access real-time insights drawn from the subtle cues around you
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cancel the Unwanted Noise */}
      <section
        id="cancel-noise"
        ref={(el) => (sectionRefs.current["cancel-noise"] = el)}
        className="py-6 sm:py-8 md:py-12 lg:py-16 bg-gradient-to-br from-gray-50 via-white to-gray-100 relative"
      >
        {/* Asymmetric radial gradient texture */}
        <div className="absolute inset-0 opacity-16">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_80%_25%,rgba(156,163,175,0.11)_0%,transparent_48%),radial-gradient(ellipse_at_20%_75%,rgba(209,213,219,0.09)_0%,transparent_43%),radial-gradient(ellipse_at_95%_90%,rgba(156,163,175,0.05)_0%,transparent_28%)]"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-center">
            <div
              className={`lg:col-span-3 lg:pr-8 order-2 lg:order-1 relative ${
                visibleSections.has("cancel-noise")
                  ? "scroll-animate-video visible"
                  : "scroll-animate-video"
              }`}
            >
              <div
                className={`enhanced-video-container ${
                  visibleSections.has("cancel-noise") ? "animate" : ""
                }`}
              >
                <iframe
                  ref={(el) => (uspVideoRefs.current["cancel-noise"] = el)}
                  src="https://www.youtube.com/embed/-JYdcGqnYSQ?autoplay=1&mute=1&loop=1&playlist=-JYdcGqnYSQ&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&cc_load_policy=0&disablekb=1&fs=0&origin=https://localhost:5174"
                  className="w-full h-auto aspect-video rounded-2xl bg-black"
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                />
              </div>
            </div>
            <div
              className={`lg:col-span-2 space-y-6 md:space-y-8 order-1 lg:order-2 ${
                visibleSections.has("cancel-noise")
                  ? "scroll-animate visible"
                  : "scroll-animate"
              }`}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 leading-tight">
                <span
                  className={`elegant-title-word ${
                    visibleSections.has("cancel-noise") ? "animate" : ""
                  }`}
                >
                  Cancel
                </span>{" "}
                <span
                  className={`elegant-title-word ${
                    visibleSections.has("cancel-noise") ? "animate" : ""
                  }`}
                >
                  the
                </span>{" "}
                <span
                  className={`elegant-title-word ${
                    visibleSections.has("cancel-noise") ? "animate" : ""
                  }`}
                >
                  unwanted
                </span>{" "}
                <span
                  className={`elegant-title-word ${
                    visibleSections.has("cancel-noise") ? "animate" : ""
                  }`}
                >
                  noise
                </span>
              </h2>
              <div className="space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6">
                <p
                  className={`elegant-paragraph text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed ${
                    visibleSections.has("cancel-noise") ? "animate" : ""
                  }`}
                >
                  Spectra cuts through the noise and shows you only what matters
                  to you, even when it comes to ads and product suggestions.
                </p>
                <p
                  className={`elegant-paragraph text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed ${
                    visibleSections.has("cancel-noise") ? "animate" : ""
                  }`}
                >
                  While using Spectra, you'll only hear from the brands you care
                  about and see products that serve your needs. No intrusive
                  content. Just relevance, always.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Look Through Your Head */}
      <section
        id="see-through-thoughts"
        ref={(el) => (sectionRefs.current["see-through-thoughts"] = el)}
        className="py-8 md:py-16 bg-gradient-to-bl from-gray-50 via-white to-gray-100 relative"
      >
        {/* Asymmetric radial gradient texture */}
        <div className="absolute inset-0 opacity-14">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_30%_10%,rgba(156,163,175,0.1)_0%,transparent_50%),radial-gradient(ellipse_at_85%_70%,rgba(209,213,219,0.08)_0%,transparent_45%),radial-gradient(ellipse_at_10%_85%,rgba(156,163,175,0.06)_0%,transparent_30%)]"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-2 space-y-6 md:space-y-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 leading-tight">
                <span
                  className={`elegant-title-word ${
                    visibleSections.has("see-through-thoughts") ? "animate" : ""
                  }`}
                >
                  See
                </span>{" "}
                <span
                  className={`elegant-title-word ${
                    visibleSections.has("see-through-thoughts") ? "animate" : ""
                  }`}
                >
                  through
                </span>{" "}
                <span
                  className={`elegant-title-word ${
                    visibleSections.has("see-through-thoughts") ? "animate" : ""
                  }`}
                >
                  your
                </span>{" "}
                <span
                  className={`elegant-title-word ${
                    visibleSections.has("see-through-thoughts") ? "animate" : ""
                  }`}
                >
                  thoughts
                </span>
              </h2>
              <div className="space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6">
                <p
                  className={`elegant-paragraph text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed ${
                    visibleSections.has("see-through-thoughts") ? "animate" : ""
                  }`}
                >
                  Spectra anticipates your needs by spotting patterns in your
                  real-time activity.
                </p>
                <p
                  className={`elegant-paragraph text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed ${
                    visibleSections.has("see-through-thoughts") ? "animate" : ""
                  }`}
                >
                  As your trusted assistant, it creates hyper-personalized
                  suggestions made just for you. Whatever you need, from an app
                  to a product or service, it's always just one tap away.
                </p>
              </div>
            </div>
            <div className="lg:col-span-3 lg:pl-8 relative">
              <div
                className={`enhanced-video-container ${
                  visibleSections.has("see-through-thoughts") ? "animate" : ""
                }`}
              >
                <iframe
                  ref={(el) => (uspVideoRefs.current["look-through"] = el)}
                  src="https://www.youtube.com/embed/mv2jf6y9Bko?autoplay=1&mute=1&loop=1&playlist=mv2jf6y9Bko&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&cc_load_policy=0&disablekb=1&fs=0&origin=https://localhost:5174"
                  className="w-full h-auto aspect-video rounded-2xl bg-black"
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video USP Section 2 */}
      <section
        id="intuitive-insights"
        ref={(el) => (sectionRefs.current["intuitive-insights"] = el)}
        className="py-8 md:py-12 bg-white"
      >
        <div className="w-full">
          <div
            className={`enhanced-video-container relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden ${
              visibleSections.has("intuitive-insights") ? "animate" : ""
            }`}
          >
            <iframe
              ref={(el) => (uspVideoRefs.current["intuitive-insights"] = el)}
              src="https://www.youtube.com/embed/vRHAVwK7QQM?autoplay=1&mute=1&loop=1&playlist=vRHAVwK7QQM&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&cc_load_policy=0&disablekb=1&fs=0&origin=https://localhost:5174"
              className="w-full h-full"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: "100vw",
                height: "56.25vw",
                minHeight: "100vh",
                minWidth: "177.78vh",
                transform: "translate(-50%, -50%)",
              }}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>

          {/* Caption with darker contrasting background */}
          <div className="text-center px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 relative bg-gradient-to-b from-gray-800 via-gray-850 to-gray-900">
            {/* Dark background with subtle texture */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800/95 via-gray-850/98 to-gray-900"></div>
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_40%_30%,rgba(75,85,99,0.3)_0%,transparent_40%),radial-gradient(ellipse_at_70%_70%,rgba(55,65,81,0.2)_0%,transparent_35%)]"></div>
            </div>

            {/* Subtle top border separator */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-600/50 to-transparent"></div>

            <div className="relative z-10">
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">
                <span
                  className={`elegant-title-word ${
                    visibleSections.has("intuitive-insights") ? "animate" : ""
                  }`}
                >
                  Seamlessly
                </span>{" "}
                <span
                  className={`elegant-title-word ${
                    visibleSections.has("intuitive-insights") ? "animate" : ""
                  }`}
                >
                  Integrated
                </span>{" "}
                <span
                  className={`elegant-title-word ${
                    visibleSections.has("intuitive-insights") ? "animate" : ""
                  }`}
                >
                  into
                </span>{" "}
                <span
                  className={`elegant-title-word ${
                    visibleSections.has("intuitive-insights") ? "animate" : ""
                  }`}
                >
                  Your
                </span>{" "}
                <span
                  className={`elegant-title-word ${
                    visibleSections.has("intuitive-insights") ? "animate" : ""
                  }`}
                >
                  Life
                </span>
              </h3>
              <p
                className={`elegant-paragraph text-sm sm:text-base md:text-lg text-gray-300 max-w-2xl mx-auto px-4 sm:px-6 ${
                  visibleSections.has("intuitive-insights") ? "animate" : ""
                }`}
              >
                Receive personalized suggestions that fit effortlessly into your
                routine
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience the Future, Today */}
      <section
        id="experience-future"
        ref={(el) => (sectionRefs.current["experience-future"] = el)}
        className="pt-16 md:pt-24 pb-16 md:pb-32 bg-white relative"
      >
        {/* Asymmetric radial gradient texture */}
        <div className="absolute inset-0 opacity-12">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_60%_30%,rgba(156,163,175,0.08)_0%,transparent_55%),radial-gradient(ellipse_at_15%_70%,rgba(209,213,219,0.06)_0%,transparent_48%),radial-gradient(ellipse_at_90%_15%,rgba(156,163,175,0.04)_0%,transparent_35%)]"></div>
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-center">
            <div className="order-2 lg:order-1 lg:col-span-3 relative group flex justify-center">
              <div className="relative max-w-md lg:max-w-lg xl:max-w-xl overflow-hidden rounded-2xl">
                {/* Background glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 rounded-2xl opacity-0 group-hover:opacity-75 transition-all duration-500 blur-lg group-hover:blur-xl"></div>

                {/* Image container */}
                <div className="relative bg-white rounded-2xl overflow-hidden">
                  <OptimizedImage
                    src={experienceDudeImage}
                    alt="Experience Dude"
                    width={800}
                    height={600}
                    responsiveSizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                    className="w-full h-auto transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                  />

                  {/* Animated overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

                  {/* Floating particles effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700">
                    <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/60 rounded-full animate-pulse"></div>
                    <div
                      className="absolute top-3/4 right-1/4 w-1 h-1 bg-blue-400/80 rounded-full animate-bounce"
                      style={{ animationDelay: "0.5s" }}
                    ></div>
                    <div
                      className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-purple-400/60 rounded-full animate-pulse"
                      style={{ animationDelay: "1s" }}
                    ></div>
                  </div>

                  {/* Quick View button with enhanced styling - positioned at bottom */}
                  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
                    <button
                      onClick={handleQuickView}
                      className="group/btn relative overflow-hidden bg-gradient-to-r from-gray-900 to-black text-white px-6 md:px-8 py-3 md:py-4 font-bold opacity-0 group-hover:opacity-100 transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 hover:scale-105 text-sm md:text-base rounded-full shadow-2xl border border-white/20 backdrop-blur-sm btn-enhanced interactive-hover"
                    >
                      {/* Button background shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700"></div>

                      <span className="relative z-10 flex items-center space-x-2">
                        <span>Quick View</span>
                        <svg
                          className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      </span>
                    </button>
                  </div>

                  {/* Corner accent */}
                  <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-white/40 opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-75 group-hover:scale-100"></div>
                  <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-white/40 opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-75 group-hover:scale-100"></div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-2 space-y-8 md:space-y-12 order-1 lg:order-2 text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                <div className="mb-2">
                  <span
                    className={`elegant-title-word ${
                      visibleSections.has("experience-future") ? "animate" : ""
                    }`}
                  >
                    Experience
                  </span>
                </div>
                <div className="mb-2">
                  <span
                    className={`elegant-title-word ${
                      visibleSections.has("experience-future") ? "animate" : ""
                    }`}
                  >
                    the
                  </span>{" "}
                  <span
                    className={`elegant-title-word ${
                      visibleSections.has("experience-future") ? "animate" : ""
                    }`}
                  >
                    future,
                  </span>
                </div>
                <div>
                  <span
                    className={`elegant-title-word ${
                      visibleSections.has("experience-future") ? "animate" : ""
                    }`}
                  >
                    today
                  </span>
                </div>
              </h2>
              <div className="flex justify-center lg:justify-start">
                <Link
                  to="/product/spectra-1-0"
                  className="inline-block bg-black text-white px-6 py-3 md:px-8 md:py-4 rounded-full text-base md:text-lg font-bold hover:bg-gray-800 transition-colors duration-200"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us */}
      <section
        id="about-us"
        ref={(el) => (sectionRefs.current["about-us"] = el)}
        className="py-8 md:py-16 bg-gradient-to-b from-gray-200 via-gray-100 to-gray-75 relative"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-gray-300/20 via-transparent to-gray-200/30"></div>
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-gray-200/80 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-gray-75/80 to-transparent"></div>
        <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 text-center">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 md:p-10 lg:p-12 shadow-xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-8 sm:mb-10 md:mb-12 lg:mb-16">
              <span
                className={`elegant-title-word ${
                  visibleSections.has("about-us") ? "animate" : ""
                }`}
              >
                About
              </span>{" "}
              <span
                className={`elegant-title-word ${
                  visibleSections.has("about-us") ? "animate" : ""
                }`}
              >
                us
              </span>
            </h2>
            <div className="space-y-4 md:space-y-6 mb-12 md:mb-20 max-w-4xl mx-auto">
              <p
                className={`elegant-paragraph text-base md:text-lg text-gray-600 leading-loose ${
                  visibleSections.has("about-us") ? "animate" : ""
                }`}
              >
                At the forefront of modern innovation, we design technology that
                puts people first.
              </p>
              <p
                className={`elegant-paragraph text-base md:text-lg text-gray-600 leading-loose ${
                  visibleSections.has("about-us") ? "animate" : ""
                }`}
              >
                Combining intelligence with intention, we believe technology
                should adapt to your needs, not the other way around.
              </p>
              <p
                className={`elegant-paragraph text-base md:text-lg text-gray-600 leading-loose ${
                  visibleSections.has("about-us") ? "animate" : ""
                }`}
              >
                Our vision is grounded in building a more intuitive future, one
                device at a time.
              </p>
            </div>
            <Link
              to="/about"
              className="inline-block bg-black text-white px-8 py-4 md:px-12 md:py-6 rounded-full text-lg md:text-xl font-bold hover:bg-gray-800 transition-colors duration-200"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Follow Us on Social */}
      <section
        id="social-section"
        ref={(el) => (sectionRefs.current["social-section"] = el)}
        className="py-8 md:py-16 bg-gradient-to-b from-gray-75 via-gray-50 to-white relative"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-gray-100/25 via-transparent to-white/50"></div>
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-gray-75/80 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white/90 to-transparent"></div>
        <div className="relative z-10 max-w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20">
            <span
              className={`elegant-title-word ${
                visibleSections.has("social-section") ? "animate" : ""
              }`}
            >
              Follow
            </span>{" "}
            <span
              className={`elegant-title-word ${
                visibleSections.has("social-section") ? "animate" : ""
              }`}
            >
              us
            </span>{" "}
            <span
              className={`elegant-title-word ${
                visibleSections.has("social-section") ? "animate" : ""
              }`}
            >
              on
            </span>{" "}
            <span
              className={`elegant-title-word ${
                visibleSections.has("social-section") ? "animate" : ""
              }`}
            >
              social
            </span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
            <div
              className={`enhanced-video-container ${
                visibleSections.has("social-section") ? "animate" : ""
              }`}
            >
              <OptimizedImage
                src={social1Image}
                alt="Social 1"
                width={600}
                height={500}
                responsiveSizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 600px"
                className="w-full h-80 sm:h-96 md:h-[500px] object-cover rounded-2xl"
              />
            </div>
            <div
              className={`enhanced-video-container ${
                visibleSections.has("social-section") ? "animate" : ""
              }`}
              style={{ transitionDelay: "0.2s" }}
            >
              <OptimizedImage
                src={social2Image}
                alt="Social 2"
                width={600}
                height={500}
                responsiveSizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 600px"
                className="w-full h-80 sm:h-96 md:h-[500px] object-cover rounded-2xl"
              />
            </div>
            <div
              className={`enhanced-video-container sm:col-span-2 md:col-span-1 ${
                visibleSections.has("social-section") ? "animate" : ""
              }`}
              style={{ transitionDelay: "0.4s" }}
            >
              <OptimizedImage
                src={social3Image}
                alt="Social 3"
                width={600}
                height={500}
                responsiveSizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 600px"
                className="w-full h-80 sm:h-96 md:h-[500px] object-cover rounded-2xl"
              />
            </div>
          </div>

          {/* Social Media Buttons */}
          <div className="flex justify-center items-center space-x-4 md:space-x-8 mt-8 md:mt-16">
            {/* Instagram */}
            <a
              href="#"
              className="w-10 h-10 md:w-12 md:h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
            >
              <svg
                className="w-5 h-5 md:w-6 md:h-6 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            {/* Twitter */}
            <a
              href="#"
              className="w-10 h-10 md:w-12 md:h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
            >
              <svg
                className="w-5 h-5 md:w-6 md:h-6 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
            </a>
            {/* Meta */}
            <a
              href="#"
              className="w-10 h-10 md:w-12 md:h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
            >
              <svg
                className="w-5 h-5 md:w-6 md:h-6 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />

      <Footer />

      {/* Quick View Modal */}
      {isQuickViewOpen && selectedProduct && (
        <ProductQuickView
          product={selectedProduct}
          onClose={() => {
            setIsQuickViewOpen(false);
            setSelectedProduct(null);
          }}
        />
      )}
    </div>
  );
});

Home.displayName = "Home";

export default Home;
