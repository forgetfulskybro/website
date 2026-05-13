"use client";
import {
  LazyMotion,
  domAnimation,
  m,
  AnimatePresence,
  Variants,
  Transition,
} from "framer-motion";
import { usePathname } from "next/navigation";
import React from "react";

export default function TransitionEffect({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const transition: Transition = {
    duration: 0.6,
    ease: [0.4, 0, 0.2, 1],
  };

  const variants: Variants = {
    initial: {
      opacity: 0,
      rotateX: 20,
      y: 50,
      transition,
    },
    animate: {
      opacity: 1,
      rotateX: 0,
      y: 0,
      transition: {
        ...transition,
        delay: 0.2,
      },
    },
    exit: {
      opacity: 0,
      rotateX: -20,
      y: -50,
      transition,
    },
  };

  return (
    <LazyMotion features={domAnimation} strict>
      <AnimatePresence mode="wait">
        <m.div
          key={pathname}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {children}
        </m.div>
      </AnimatePresence>
    </LazyMotion>
  );
}
