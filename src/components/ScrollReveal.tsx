'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'left' | 'right'
  duration?: number
  once?: boolean
  distance?: number
}

/** Wraps children with fade-in + slide animation on scroll */
export function Reveal({
  children,
  className,
  delay = 0,
  direction = 'up',
  duration = 0.6,
  once = true,
  distance = 50,
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion()
  const dirOffset: Record<string, { x?: number; y?: number }> = {
    up: { y: distance },
    left: { x: distance },
    right: { x: -distance },
  }

  return (
    <motion.div
      className={className}
      initial={shouldReduceMotion ? false : { opacity: 0, ...dirOffset[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount: 0.2 }}
      transition={{ duration, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

interface StaggerRevealProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
  once?: boolean
}

/** Staggers children in sequence (each direct child gets incremented delay) */
export function StaggerReveal({
  children,
  className,
  staggerDelay = 0.12,
  once = true,
}: StaggerRevealProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={shouldReduceMotion ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once, amount: 0.15 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerDelay } },
      }}
    >
      {children}
    </motion.div>
  )
}

/** A single stagger item — place as direct child of StaggerReveal */
export function StaggerItem({
  children,
  className,
  direction = 'up',
  distance = 50,
}: {
  children: ReactNode
  className?: string
  direction?: 'up' | 'left' | 'right'
  distance?: number
}) {
  const dirOffset: Record<string, { x?: number; y?: number }> = {
    up: { y: distance },
    left: { x: distance },
    right: { x: -distance },
  }

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, ...dirOffset[direction] },
        visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
      }}
    >
      {children}
    </motion.div>
  )
}
