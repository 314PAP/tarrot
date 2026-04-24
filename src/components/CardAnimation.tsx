import React from 'react';
import { motion } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface CardAnimationProps {
  isFlipped: boolean;
  front: React.ReactNode;
  back: React.ReactNode;
  className?: string;
  delay?: number;
}

export const CardAnimation: React.FC<CardAnimationProps> = ({
  isFlipped,
  front,
  back,
  className,
  delay = 0
}) => {
  return (
    <div className={cn("relative w-full h-full card-preserve-3d", className)}>
      <motion.div
        className="w-full h-full card-preserve-3d"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20, delay }}
      >
        {/* Card Back */}
        <div className="absolute inset-0 w-full h-full card-backface-hidden">
          {back}
        </div>

        {/* Card Front */}
        <div className="absolute inset-0 w-full h-full card-backface-hidden rotate-y-180">
          {front}
        </div>
      </motion.div>
    </div>
  );
};
