"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { motion, useInView, useAnimation, type Variants } from "framer-motion"

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: "up" | "down" | "left" | "right" | "fade"
  duration?: number
}

// FIXED: Properly typed variants with explicit Variants type
const createVariants = (
  direction: "up" | "down" | "left" | "right" | "fade",
  duration: number,
  delay: number,
): Variants => ({
  hidden: {
    opacity: 0,
    y: direction === "up" ? 50 : direction === "down" ? -50 : 0,
    x: direction === "left" ? 50 : direction === "right" ? -50 : 0,
    scale: direction === "fade" ? 0.8 : 1,
  },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
    transition: {
      duration,
      delay,
      ease: [0.25, 0.25, 0.25, 0.75],
    },
  },
})

export function AnimatedSection({
  children,
  className = "",
  delay = 0,
  direction = "up",
  duration = 0.6,
}: AnimatedSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const controls = useAnimation()

  // FIXED: Use the properly typed variants function
  const variants = createVariants(direction, duration, delay)

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  return (
    <motion.div ref={ref} initial="hidden" animate={controls} variants={variants} className={className}>
      {children}
    </motion.div>
  )
}

export function AnimatedImage({
  src,
  alt,
  width,
  height,
  className = "",
  delay = 0,
}: {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  delay?: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8, y: 30 }}
      animate={
        isInView
          ? {
              opacity: 1,
              scale: 1,
              y: 0,
              transition: {
                duration: 0.8,
                delay,
                ease: [0.25, 0.25, 0.25, 0.75],
              },
            }
          : {}
      }
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.3 },
      }}
      className={className}
    >
      <img
        src={src || "/placeholder.svg"}
        alt={alt}
        width={width}
        height={height}
        className="w-full h-full object-cover"
      />
    </motion.div>
  )
}

export function AnimatedCard({
  children,
  className = "",
  delay = 0,
  hoverScale = 1.02,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  hoverScale?: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={
        isInView
          ? {
              opacity: 1,
              y: 0,
              scale: 1,
              transition: {
                duration: 0.6,
                delay,
                ease: [0.25, 0.25, 0.25, 0.75],
              },
            }
          : {}
      }
      whileHover={{
        scale: hoverScale,
        y: -5,
        transition: { duration: 0.3 },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function StaggeredContainer({
  children,
  className = "",
  staggerDelay = 0.1,
}: {
  children: React.ReactNode
  className?: string
  staggerDelay?: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function StaggeredItem({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) {
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.25, 0.25, 0.75],
      },
    },
  }

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  )
}

// ADDED: New animation components for better variety
export function FadeInUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={
        isInView
          ? {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, delay, ease: "easeOut" },
            }
          : {}
      }
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function SlideInLeft({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -50 }}
      animate={
        isInView
          ? {
              opacity: 1,
              x: 0,
              transition: { duration: 0.8, delay, ease: "easeOut" },
            }
          : {}
      }
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function SlideInRight({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 50 }}
      animate={
        isInView
          ? {
              opacity: 1,
              x: 0,
              transition: { duration: 0.8, delay, ease: "easeOut" },
            }
          : {}
      }
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function ScaleIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={
        isInView
          ? {
              opacity: 1,
              scale: 1,
              transition: { duration: 0.6, delay, ease: "easeOut" },
            }
          : {}
      }
      whileHover={{ scale: 1.05 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
