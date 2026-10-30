"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
} from "framer-motion";
import { ArrowRight } from "lucide-react";

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoDuration, setVideoDuration] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    damping: 32,
    stiffness: 240,
    mass: 0.18,
  });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mq.matches);
    const handler = () => setIsReducedMotion(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onMeta = () => {
      setVideoDuration(video.duration || 10);
      setVideoLoaded(true);
      video.pause();
    };
    if (video.readyState >= 1) onMeta();
    else video.addEventListener("loadedmetadata", onMeta);
    return () => video.removeEventListener("loadedmetadata", onMeta);
  }, []);

  const targetTimeRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  useMotionValueEvent(smoothProgress, "change", (latest) => {
    if (!videoLoaded || !videoDuration || isReducedMotion) return;
    targetTimeRef.current = Math.min(
      Math.max(latest * videoDuration, 0),
      videoDuration - 0.05
    );
  });

  useEffect(() => {
    if (!videoLoaded || isReducedMotion) return;
    let last = -1;
    const tick = () => {
      const v = videoRef.current;
      if (v && v.readyState >= 2) {
        const t = targetTimeRef.current;
        if (Math.abs(v.currentTime - t) > 0.012 && Math.abs(t - last) > 0.001) {
          v.currentTime = t;
          last = t;
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [videoLoaded, isReducedMotion]);

  // --- Motion values ---
  // Opening (0-9%) LEFT
  const t0_opacity = useTransform(smoothProgress, [0, 0.01, 0.07, 0.09], [1, 1, 1, 0]);
  const t0_y = useTransform(smoothProgress, [0, 0.09], [0, -14]);
  const t0_scale = useTransform(smoothProgress, [0, 0.09], [1, 1.025]);

  // 01 Experience (12-25%) RIGHT
  const t1_opacity = useTransform(smoothProgress, [0.12, 0.15, 0.22, 0.25], [0, 1, 1, 0]);
  const t1_y = useTransform(smoothProgress, [0.12, 0.25], [20, -10]);
  const t1_scale = useTransform(smoothProgress, [0.12, 0.25], [0.98, 1.01]);

  // 02 Interaction (25-40%) LEFT
  const t2_opacity = useTransform(smoothProgress, [0.25, 0.28, 0.37, 0.4], [0, 1, 1, 0]);
  const t2_y = useTransform(smoothProgress, [0.25, 0.4], [20, -10]);
  const t2_scale = useTransform(smoothProgress, [0.25, 0.4], [0.98, 1.01]);

  // 03 Understanding (40-55%) RIGHT
  const t3_opacity = useTransform(smoothProgress, [0.4, 0.43, 0.52, 0.55], [0, 1, 1, 0]);
  const t3_y = useTransform(smoothProgress, [0.4, 0.55], [20, -10]);
  const t3_scale = useTransform(smoothProgress, [0.4, 0.55], [0.98, 1.01]);

  // 04 Relevance (55-68%) LEFT
  const t4_opacity = useTransform(smoothProgress, [0.55, 0.58, 0.65, 0.68], [0, 1, 1, 0]);
  const t4_y = useTransform(smoothProgress, [0.55, 0.68], [20, -10]);
  const t4_scale = useTransform(smoothProgress, [0.55, 0.68], [0.98, 1.01]);

  // 05 Action (68-80%) RIGHT
  const t5_opacity = useTransform(smoothProgress, [0.68, 0.71, 0.77, 0.8], [0, 1, 1, 0]);
  const t5_y = useTransform(smoothProgress, [0.68, 0.8], [20, -10]);
  const t5_scale = useTransform(smoothProgress, [0.68, 0.8], [0.98, 1.01]);

  // 06a Growth (80-88%) LEFT
  const t6a_opacity = useTransform(smoothProgress, [0.8, 0.82, 0.86, 0.88], [0, 1, 1, 0]);
  const t6a_y = useTransform(smoothProgress, [0.8, 0.88], [20, -10]);
  const t6a_scale = useTransform(smoothProgress, [0.8, 0.88], [0.98, 1.01]);

  // 06b Growth (87-93%) LEFT
  const t6b_opacity = useTransform(smoothProgress, [0.87, 0.89, 0.91, 0.93], [0, 1, 1, 0]);
  const t6b_y = useTransform(smoothProgress, [0.87, 0.93], [20, -10]);
  const t6b_scale = useTransform(smoothProgress, [0.87, 0.93], [0.98, 1.01]);

  // Final (93-100%) CENTER - Staggered Reveal Sequence
  const t7_container_opacity = useTransform(smoothProgress, [0.93, 0.96, 1], [0, 1, 1]);
  
  // 4. DIVYNCI appears softly
  const t7_brand_opacity = useTransform(smoothProgress, [0.93, 0.955, 1], [0, 1, 1]);
  const t7_brand_y = useTransform(smoothProgress, [0.93, 0.955, 1], [14, 0, 0]);

  // 5. INTERACTIVE GROWTH EXPERIENCES appears
  const t7_sub_opacity = useTransform(smoothProgress, [0.94, 0.965, 1], [0, 1, 1]);
  const t7_sub_y = useTransform(smoothProgress, [0.94, 0.965, 1], [14, 0, 0]);

  // 6. TURN ATTENTION INTO GROWTH. enters as dominant statement
  const t7_title_opacity = useTransform(smoothProgress, [0.945, 0.975, 1], [0, 1, 1]);
  const t7_title_y = useTransform(smoothProgress, [0.945, 0.975, 1], [18, 0, 0]);
  const t7_title_scale = useTransform(smoothProgress, [0.945, 0.975, 1], [0.97, 1, 1]);

  // 7. CTA buttons appear last
  const t7_cta_opacity = useTransform(smoothProgress, [0.96, 0.99, 1], [0, 1, 1]);
  const t7_cta_y = useTransform(smoothProgress, [0.96, 0.99, 1], [18, 0, 0]);

  const labelCls =
    "text-[10px] sm:text-[11px] font-mono tracking-[0.24em] text-[#163B2C]/60 font-medium uppercase block mb-3 select-none";
  const italicAccent =
    "italic font-normal [text-shadow:0_1px_0_rgba(22,59,44,0.12),0_3px_10px_rgba(22,59,44,0.08)]";
  const bodySmall =
    "mt-4 text-[0.8rem] text-[#163B2C]/60 font-sans font-normal leading-relaxed";

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[450vh] bg-[#F3EFE6] text-[#163B2C]"
    >
      <div className="sticky top-0 left-0 w-full h-screen h-[100svh] overflow-hidden">
        {/* Cinematic video - no overlays */}
        <video
          ref={videoRef}
          src="/herovideo.mp4"
          playsInline
          muted
          preload="auto"
          autoPlay={isReducedMotion}
          loop={isReducedMotion}
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
        />

        <div className="relative z-10 w-full h-full pointer-events-none">

          {/* ---- OPENING: LEFT EDITORIAL BLOCK ---- */}
          {/* Desktop */}
          <motion.div
            style={{ opacity: t0_opacity, y: t0_y, scale: t0_scale }}
            className="hidden md:block absolute left-[10vw] xl:left-[11vw] top-1/2 -translate-y-[52%] max-w-[500px] xl:max-w-[540px] pointer-events-auto"
          >
            <p className="text-[clamp(2.8rem,4.4vw,5rem)] font-light text-[#163B2C] tracking-[-0.01em] leading-[1.03] serif-font select-none">
              EVERY BRAND
            </p>
            <p className="text-[clamp(2.8rem,4.4vw,5rem)] font-light text-[#163B2C] tracking-[-0.01em] leading-[1.03] serif-font select-none">
              STARTS WITH
            </p>
            <h1
              className="text-[clamp(3.4rem,5.5vw,6.2rem)] italic font-normal text-[#163B2C] tracking-tight leading-[0.93] serif-font mt-1 select-none"
              style={{
                textShadow:
                  "0 1px 0 #BFB9AB, 0 2px 0 #ADA69A, 0 4px 0 #9B9488, 0 6px 18px rgba(22,59,44,0.15), 0 14px 32px rgba(22,59,44,0.06)",
              }}
            >
              ATTENTION.
            </h1>
            <p className="mt-5 text-[clamp(0.74rem,0.88vw,0.94rem)] text-[#1D4A37]/65 font-sans font-normal leading-relaxed max-w-[310px] tracking-[0.01em]">
              Capture the moment that makes someone look twice.
            </p>
          </motion.div>

          {/* Mobile opening */}
          <motion.div
            style={{ opacity: t0_opacity, y: t0_y }}
            className="md:hidden absolute left-[7vw] top-1/2 -translate-y-[54%] max-w-[86vw] pointer-events-auto"
          >
            <p className="text-[clamp(2rem,8.5vw,3.2rem)] font-light text-[#163B2C] tracking-[-0.01em] leading-[1.04] serif-font select-none">
              EVERY BRAND
            </p>
            <p className="text-[clamp(2rem,8.5vw,3.2rem)] font-light text-[#163B2C] tracking-[-0.01em] leading-[1.04] serif-font select-none">
              STARTS WITH
            </p>
            <h1
              className="text-[clamp(2.4rem,10.5vw,4rem)] italic font-normal text-[#163B2C] tracking-tight leading-[0.92] serif-font mt-1 select-none"
              style={{
                textShadow: "0 1px 0 #BFB9AB, 0 2px 0 #ADA69A, 0 4px 10px rgba(22,59,44,0.14)",
              }}
            >
              ATTENTION.
            </h1>
            <p className="mt-4 text-[clamp(0.68rem,3vw,0.86rem)] text-[#1D4A37]/65 font-sans font-normal leading-relaxed max-w-[250px]">
              Capture the moment that makes someone look twice.
            </p>
          </motion.div>

          {/* ---- 01 EXPERIENCE: RIGHT ---- */}
          <motion.div
            style={{ opacity: t1_opacity, y: t1_y, scale: t1_scale }}
            className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 pointer-events-auto"
          >
            <div className="bg-[#F5F0E8]/50 backdrop-blur-md border border-[#C8BFB0]/30 rounded-2xl px-10 py-8 text-center max-w-[460px]">
              <span className={labelCls}>01 / EXPERIENCE</span>
              <h2 className="text-[clamp(2.2rem,3.8vw,4.2rem)] font-light text-[#163B2C] tracking-tight leading-[1.06] serif-font">
                ATTENTION IS<br />
                ONLY THE<br />
                <span className={italicAccent}>BEGINNING.</span>
              </h2>
              <p className={`${bodySmall} max-w-[300px] mx-auto`}>
                The moment someone looks is the moment something can begin.
              </p>
            </div>
          </motion.div>

          {/* ---- 02 INTERACTION: LEFT ---- */}
          <motion.div
            style={{ opacity: t2_opacity, y: t2_y, scale: t2_scale }}
            className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 pointer-events-auto"
          >
            <div className="bg-[#F5F0E8]/50 backdrop-blur-md border border-[#C8BFB0]/30 rounded-2xl px-10 py-8 text-center max-w-[460px]">
              <span className={labelCls}>02 / INTERACTION</span>
              <h2 className="text-[clamp(2.2rem,3.8vw,4.2rem)] font-light text-[#163B2C] tracking-tight leading-[1.06] serif-font">
                CREATE AN<br />
                <span className={italicAccent}>EXPERIENCE</span><br />
                PEOPLE WANT TO ENTER.
              </h2>
              <p className={`${bodySmall} max-w-[300px] mx-auto`}>
                Give people something worth responding to.
              </p>
            </div>
          </motion.div>

          {/* ---- 03 UNDERSTANDING: RIGHT ---- */}
          <motion.div
            style={{ opacity: t3_opacity, y: t3_y, scale: t3_scale }}
            className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 pointer-events-auto"
          >
            <div className="bg-[#F5F0E8]/50 backdrop-blur-md border border-[#C8BFB0]/30 rounded-2xl px-10 py-8 text-center max-w-[460px]">
              <span className={labelCls}>03 / UNDERSTANDING</span>
              <h2 className="text-[clamp(2.2rem,3.8vw,4.2rem)] font-light text-[#163B2C] tracking-tight leading-[1.06] serif-font">
                MAKE PEOPLE<br />
                <span className={italicAccent}>PARTICIPATE.</span>
              </h2>
              <p className={`${bodySmall} max-w-[300px] mx-auto`}>
                Every meaningful interaction tells you something.
              </p>
            </div>
          </motion.div>

          {/* ---- 04 RELEVANCE: LEFT ---- */}
          <motion.div
            style={{ opacity: t4_opacity, y: t4_y, scale: t4_scale }}
            className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 pointer-events-auto"
          >
            <div className="bg-[#F5F0E8]/50 backdrop-blur-md border border-[#C8BFB0]/30 rounded-2xl px-10 py-8 text-center max-w-[460px]">
              <span className={labelCls}>04 / RELEVANCE</span>
              <h2 className="text-[clamp(2.2rem,3.8vw,4.2rem)] font-light text-[#163B2C] tracking-tight leading-[1.06] serif-font">
                MAKE THE<br />
                EXPERIENCE<br />
                <span className={italicAccent}>FEEL PERSONAL.</span>
              </h2>
              <p className={`${bodySmall} max-w-[300px] mx-auto`}>
                The right experience changes what happens next.
              </p>
            </div>
          </motion.div>

          {/* ---- 05 ACTION: RIGHT ---- */}
          <motion.div
            style={{ opacity: t5_opacity, y: t5_y, scale: t5_scale }}
            className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 pointer-events-auto"
          >
            <div className="bg-[#F5F0E8]/50 backdrop-blur-md border border-[#C8BFB0]/30 rounded-2xl px-10 py-8 text-center max-w-[460px]">
              <span className={labelCls}>05 / ACTION</span>
              <h2 className="text-[clamp(2.2rem,3.8vw,4.2rem)] font-light text-[#163B2C] tracking-tight leading-[1.06] serif-font">
                TURN<br />
                <span className={italicAccent}>ATTENTION</span><br />
                INTO <span className={italicAccent}>ACTION.</span>
              </h2>
            </div>
          </motion.div>

          {/* ---- 06a GROWTH: LEFT ---- */}
          <motion.div
            style={{ opacity: t6a_opacity, y: t6a_y, scale: t6a_scale }}
            className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 pointer-events-auto"
          >
            <div className="bg-[#F5F0E8]/50 backdrop-blur-md border border-[#C8BFB0]/30 rounded-2xl px-10 py-8 text-center max-w-[460px]">
              <span className={labelCls}>06 / GROWTH</span>
              <h2 className="text-[clamp(2.2rem,3.8vw,4rem)] font-light text-[#163B2C] tracking-tight leading-[1.06] serif-font">
                ONE MOMENT<br />
                BECOMES A<br />
                <span className={italicAccent}>RELATIONSHIP.</span>
              </h2>
            </div>
          </motion.div>

          {/* ---- 06b GROWTH cont: LEFT ---- */}
          <motion.div
            style={{ opacity: t6b_opacity, y: t6b_y, scale: t6b_scale }}
            className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 pointer-events-auto"
          >
            <div className="bg-[#F5F0E8]/50 backdrop-blur-md border border-[#C8BFB0]/30 rounded-2xl px-10 py-8 text-center max-w-[460px]">
              <span className={labelCls}>06 / GROWTH</span>
              <h2 className="text-[clamp(2.2rem,3.8vw,4rem)] font-light text-[#163B2C] tracking-tight leading-[1.06] serif-font">
                ONE RELATIONSHIP<br />
                BECOMES<br />
                <span className={italicAccent}>GROWTH.</span>
              </h2>
            </div>
          </motion.div>

          {/* ---- FINAL REVEAL: CENTER ---- */}
          <motion.div
            style={{ opacity: t7_container_opacity }}
            className="absolute inset-x-6 sm:inset-x-10 bottom-6 sm:bottom-10 md:bottom-12 max-w-xl mx-auto text-center pointer-events-auto flex flex-col items-center space-y-4 sm:space-y-5"
          >
            {/* Subtle localized soft radial background gradient behind typography only */}
            <div
              className="absolute -inset-x-8 -inset-y-6 -z-10 rounded-3xl pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(10,28,20,0.38) 0%, rgba(10,28,20,0.15) 50%, rgba(10,28,20,0) 80%)",
              }}
            />

            {/* DIVYNCI Brand Header */}
            <motion.div
              style={{ opacity: t7_brand_opacity, y: t7_brand_y }}
              className="space-y-1"
            >
              <span className="text-[11px] sm:text-[12px] font-mono tracking-[0.36em] text-[#F5F1E8]/90 font-bold uppercase block select-none">
                DIVYNCI
              </span>
            </motion.div>

            {/* Descriptor */}
            <motion.div
              style={{ opacity: t7_sub_opacity, y: t7_sub_y }}
            >
              <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.22em] text-[#F5F1E8]/75 uppercase block select-none">
                INTERACTIVE GROWTH EXPERIENCES
              </span>
            </motion.div>

            {/* Final Dominant Headline */}
            <motion.div
              style={{
                opacity: t7_title_opacity,
                y: t7_title_y,
                scale: t7_title_scale,
              }}
              className="py-1"
            >
              <h2
                className="text-[clamp(2.2rem,4.2vw,4.4rem)] font-light text-[#F5F1E8] tracking-tight leading-[1.05] serif-font select-none"
                style={{
                  textShadow:
                    "0 2px 14px rgba(0,0,0,0.45), 0 1px 3px rgba(0,0,0,0.3)",
                }}
              >
                TURN ATTENTION<br />
                <span
                  className="text-[clamp(2.5rem,4.8vw,4.9rem)] italic font-normal text-[#F5F1E8] block mt-0.5"
                  style={{
                    textShadow:
                      "0 2px 16px rgba(0,0,0,0.5), 0 1px 3px rgba(0,0,0,0.35)",
                  }}
                >
                  INTO GROWTH.
                </span>
              </h2>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              style={{ opacity: t7_cta_opacity, y: t7_cta_y }}
              className="flex flex-col sm:flex-row gap-3 pt-2 w-full sm:w-auto justify-center items-center"
            >
              <a
                href="#experience"
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#163B2C] text-[#F5F1E8] font-mono font-medium text-[11px] tracking-wider uppercase hover:bg-[#0E271D] border border-[#2B5441] transition-all duration-200 flex items-center justify-center gap-2.5 group shadow-lg"
              >
                <span>BUILD YOUR EXPERIENCE</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#F5F1E8] group-hover:translate-x-0.5 transition-transform" />
              </a>
              <a
                href="#range"
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#F5F1E8] border border-[#F5F1E8] text-[#163B2C] font-mono font-medium text-[11px] tracking-wider uppercase hover:bg-[#EAE4D7] transition-all duration-200 flex items-center justify-center shadow-lg"
              >
                SEE HOW IT WORKS
              </a>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            style={{ opacity: t0_opacity }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 pointer-events-none"
          >
            <span className="text-[8px] font-mono text-[#163B2C]/50 font-semibold tracking-[0.24em] uppercase">
              SCROLL TO EXPLORE
            </span>
            <div className="w-3 h-5 rounded-full border border-[#163B2C]/30 p-0.5 flex justify-center">
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
                className="w-0.5 h-1 rounded-full bg-[#163B2C]"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
