import { useRef, type ReactNode } from "react";
import { motion, useInView, type Variants } from "framer-motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "left" | "right" | "up" | "down";
  y?: number;
  once?: boolean;
};

const variants: Variants = {
  hidden: ({ x, y }: { x: number; y: number }) => ({
    opacity: 0,
    x,
    y,
  }),
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

function getOffset(direction: "left" | "right" | "up" | "down", distance: number) {
  switch (direction) {
    case "left":
      return { x: -distance, y: 0 };
    case "right":
      return { x: distance, y: 0 };
    case "down":
      return { x: 0, y: distance };
    default:
      return { x: 0, y: -distance };
  }
}

/** Fade reveal triggered when the element scrolls into view. */
export function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
  y = 40,
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "-12% 0px -12% 0px" });
  const { x, y: offsetY } = getOffset(direction, y);

  return (
    <motion.div
      ref={ref}
      className={className}
      custom={{ x, y: offsetY }}
      variants={variants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
