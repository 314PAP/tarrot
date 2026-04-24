import React from 'react';

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
}) => {
  return (
    <div className={`relative w-full h-full ${className || ''}`}>
      <div
        className="w-full h-full transition-transform duration-600"
        style={{
          transformStyle: 'preserve-3d',
          perspective: '1000px',
        }}
      >
        {/* Card Back */}
        <div
          className="absolute inset-0 w-full h-full transition-opacity duration-300"
          style={{
            backfaceVisibility: 'hidden',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            opacity: isFlipped ? 0 : 1,
          }}
        >
          {back}
        </div>

        {/* Card Front */}
        <div
          className="absolute inset-0 w-full h-full transition-opacity duration-300"
          style={{
            backfaceVisibility: 'hidden',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            opacity: isFlipped ? 1 : 0,
          }}
        >
          {front}
        </div>
      </div>
    </div>
  );
};
