"use client";
import { motion, AnimatePresence, LazyMotion, domAnimation, useReducedMotion } from "framer-motion";
import { usePathname } from 'next/navigation';

export default function TransitionEffect({ children }) {
    const shouldReduceMotion = useReducedMotion();
    const variants = {
        in: {
            scale: 0.8,
            y: 100,
            x: "100%",
            transition: {
                duration: 0.4
            }
        },
        center: {
            x: 0,
            scale: 0.8,
            transition: {
                duration: 0.4
            }
        },
        scaleUp: {
            scale: 1,
            y: 0,
            transition: {
                duration: 0.4,
                delay: 0.5
            }
        },
        scaleDown: {
            scale: 0.8,
            y: 100,
            transition: {
                duration: 0.4
            }
        },
        out: {
            opacity: 0,
            x: "-100%",
            transition: {
                duration: 0.4,
                delay: 0.5
            }
        }
    };
    return (
        <div>
            <LazyMotion features={domAnimation}>
                <AnimatePresence mode="wait" >
                    <motion.div
                        key={usePathname()+1}
                        variants={!shouldReduceMotion ? variants : null}
                        initial="in"
                        animate={["center", "scaleUp"]}
                        exit={["scaleDown", "out"]}>
                        {children}
                    </motion.div>
                </AnimatePresence>
            </LazyMotion>
        </div>
    );
};
