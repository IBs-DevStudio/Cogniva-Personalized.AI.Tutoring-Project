"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, HTMLMotionProps } from "framer-motion";

interface PremiumCardProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children?: React.ReactNode;
  glowColor?: string; // CSS color string, e.g. "rgba(254, 89, 51, 0.15)"
  contentClassName?: string; // Class applied to the inner 3D container
}

export const PremiumCard: React.FC<PremiumCardProps> = ({
  children,
  className = "",
  glowColor = "rgba(254, 89, 51, 0.12)",
  contentClassName = "flex flex-col gap-4 h-full w-full",
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse position percentages relative to card center (-0.5 to 0.5)
  const relativeX = useMotionValue(0);
  const relativeY = useMotionValue(0);

  // Spring animations for rotation angles to create smooth tilt
  const springConfig = { stiffness: 150, damping: 20 };
  const rotateXSpring = useSpring(0, springConfig);
  const rotateYSpring = useSpring(0, springConfig);

  // Map position percentages to degrees of rotation (tilt limits: -8deg to 8deg)
  const mappedRotateX = useTransform(relativeY, [-0.5, 0.5], [8, -8]);
  const mappedRotateY = useTransform(relativeX, [-0.5, 0.5], [-8, 8]);

  // Update spring targets based on hover state and mapped transform values
  useEffect(() => {
    if (isHovered) {
      rotateXSpring.set(mappedRotateX.get());
      rotateYSpring.set(mappedRotateY.get());
    } else {
      rotateXSpring.set(0);
      rotateYSpring.set(0);
    }
  }, [isHovered, mappedRotateX, mappedRotateY, rotateXSpring, rotateYSpring]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Calculate mouse position relative to card boundaries
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Normalize coordinates from -0.5 to 0.5
    const normX = mouseX / width - 0.5;
    const normY = mouseY / height - 0.5;

    relativeX.set(normX);
    relativeY.set(normY);

    // Write custom properties to DOM node to update the background radial gradient spotlight
    cardRef.current.style.setProperty("--mouse-x", `${mouseX}px`);
    cardRef.current.style.setProperty("--mouse-y", `${mouseY}px`);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseEnter={(e) => {
        setIsHovered(true);
        if (props.onMouseEnter) props.onMouseEnter(e);
      }}
      onMouseLeave={(e) => {
        setIsHovered(false);
        relativeX.set(0);
        relativeY.set(0);
        if (props.onMouseLeave) props.onMouseLeave(e);
      }}
      onMouseMove={(e) => {
        handleMouseMove(e);
        if (props.onMouseMove) props.onMouseMove(e);
      }}
      style={{
        rotateX: rotateXSpring,
        rotateY: rotateYSpring,
        transformStyle: "preserve-3d",
        ...props.style,
      }}
      className={`
        relative bg-white rounded-3xl p-7 border border-gray-200/70 shadow-sm
        hover:border-gray-300/80 hover:shadow-[0_20px_45px_rgba(0,0,0,0.05)]
        transition-all duration-300 overflow-hidden cursor-pointer group
        ${className}
      `}
      {...props}
    >
      {/* Spotlight cursor radial glow */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 rounded-3xl"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(300px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), ${glowColor}, transparent 80%)`,
        }}
      />

      {/* 3D Depth contents container */}
      <div 
        style={{ transform: "translateZ(25px)", transformStyle: "preserve-3d" }}
        className={contentClassName}
      >
        {children}
      </div>
    </motion.div>
  );
};
