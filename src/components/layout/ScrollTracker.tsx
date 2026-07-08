import { motion, MotionValue } from "motion/react";

interface ScrollTrackerProps {
  progress: MotionValue<number>;
}

export const ScrollTracker: React.FC<ScrollTrackerProps> = ({ progress }) => {
  return (
    <div className="h-1.5 w-full bg-border/40 rounded-full overflow-hidden shrink-0">
      <motion.div
        className="h-full bg-primary origin-left"
        style={{ scaleX: progress }}
      />
    </div>
  );
};