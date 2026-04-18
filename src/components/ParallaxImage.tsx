"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type ParallaxImageProps = {
  src: string;
  alt: string;
  sizes: string;
  wrapperClassName?: string;
  imageClassName?: string;
  offset?: number;
  priority?: boolean;
};

export default function ParallaxImage({
  src,
  alt,
  sizes,
  wrapperClassName = "",
  imageClassName = "object-cover",
  offset = 40,
  priority = false,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${wrapperClassName}`}>
      <motion.div style={{ y }} className="absolute inset-[-7%]">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className={imageClassName}
        />
      </motion.div>
    </div>
  );
}