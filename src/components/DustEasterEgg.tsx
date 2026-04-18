"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/content";

type DustEasterEggProps = {
  locale: Locale;
};

type OrbState = {
  id: number;
  direction: "ltr" | "rtl";
  top: number;
  duration: number;
};

type Particle = {
  id: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
};

const STORAGE_KEY = "podeser-dust-unlocked";

const PARTICLE_COLORS = [
  "rgba(155, 55, 53, 0.95)",
  "rgba(121, 166, 160, 0.92)",
  "rgba(221, 206, 176, 0.95)",
  "rgba(255,255,255,0.88)",
];

const AMBIENT_DUST = [
  { left: "8%", top: "12%", size: 8, delay: 0.0, duration: 5.4 },
  { left: "18%", top: "72%", size: 6, delay: 0.4, duration: 6.1 },
  { left: "28%", top: "24%", size: 10, delay: 0.8, duration: 5.8 },
  { left: "36%", top: "80%", size: 7, delay: 0.3, duration: 6.3 },
  { left: "46%", top: "14%", size: 9, delay: 1.0, duration: 5.2 },
  { left: "58%", top: "74%", size: 6, delay: 0.6, duration: 6.0 },
  { left: "67%", top: "20%", size: 8, delay: 1.1, duration: 5.9 },
  { left: "76%", top: "64%", size: 11, delay: 0.5, duration: 6.5 },
  { left: "84%", top: "18%", size: 7, delay: 0.9, duration: 5.6 },
  { left: "90%", top: "76%", size: 6, delay: 0.2, duration: 6.2 },
];

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function DustOrbVisual({ small = false }: { small?: boolean }) {
  return (
    <span
      className={`relative flex items-center justify-center ${
        small ? "h-12 w-12" : "h-16 w-16"
      }`}
    >
      <span
        className={`absolute rounded-full bg-[var(--brand)]/14 blur-2xl ${
          small ? "h-12 w-12" : "h-16 w-16"
        }`}
      />
      <span
        className={`absolute rounded-full bg-[#ddceb0]/95 ring-1 ring-white/60 ${
          small ? "h-8 w-8" : "h-12 w-12"
        }`}
      />
      <span
        className={`absolute rounded-full bg-[var(--brand)] ${
          small ? "left-2 top-2 h-2 w-2" : "left-2 top-2 h-3 w-3"
        }`}
      />
      <span
        className={`absolute rounded-full bg-[#79a6a0] ${
          small ? "right-2 top-3 h-2 w-2" : "right-2 top-4 h-2.5 w-2.5"
        }`}
      />
      <span
        className={`absolute rounded-full bg-[var(--brand)]/70 ${
          small ? "bottom-2 left-2 h-1.5 w-1.5" : "bottom-3 left-3 h-2 w-2"
        }`}
      />
      <span
        className={`absolute rounded-full bg-white/80 ${
          small ? "bottom-2 right-3 h-2 w-2" : "bottom-2 right-4 h-2.5 w-2.5"
        }`}
      />
      <span
        className={`absolute rounded-full bg-[var(--ink)]/55 ${
          small ? "right-4 top-1 h-1 w-1" : "right-5 top-1 h-1.5 w-1.5"
        }`}
      />
      <span
        className={`absolute rounded-full bg-[var(--ink)]/45 ${
          small ? "bottom-1 left-4 h-1 w-1" : "bottom-1 left-6 h-1.5 w-1.5"
        }`}
      />
      <span className={`relative text-[var(--ink)] ${small ? "text-sm" : "text-lg"}`}>
        ✦
      </span>
    </span>
  );
}

export default function DustEasterEgg({ locale }: DustEasterEggProps) {
  const [hasMounted, setHasMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [orb, setOrb] = useState<OrbState | null>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const timerRef = useRef<number | null>(null);
  const hintTimerRef = useRef<number | null>(null);
  const orbIdRef = useRef(0);
  const particleIdRef = useRef(0);

  const nextOrbId = () => {
    orbIdRef.current += 1;
    return orbIdRef.current;
  };

  const nextParticleId = () => {
    particleIdRef.current += 1;
    return particleIdRef.current;
  };

  const copy =
    locale === "pt"
      ? {
          openLabel: "Abrir a história do Pó",
          closeLabel: "Fechar",
          hint: "História do Pó",
          eyebrow: "Um pequeno mito da Pó de Ser",
          title: "Que Pó é este?",
          paragraphs: [
            "Deste Pó nunca ouviste falar.",
            "Isto não é um Pó qualquer, o pó que encontras debaixo da tua cama.",
            "Este Pó que se espalha por toda a parte... vem de ti.",
            "Emergidos duma explosão cósmica, sonhos e matéria colidem criando algo único. De uma partícula de Pó nasce uma nova forma de Ser.",
            "Sem dares conta, estas pequenas partículas transcendem a tua consciência e alma.",
            "Este Pó não tem barreiras, indo além do que tu e eu alguma vez imaginámos.",
            "Este Pó não anda sozinho. Está sempre contigo e, por sua vez, nutre-se das experiências e das interações que os Seres proporcionam. É como se absorvesse a sabedoria e a emoção de cada encontro, transformando-se em algo maior e mais complexo. É uma sinfonia cósmica em constante evolução.",
            "Portanto, abre os olhos e deixa-te envolver. Permite que se desperte em ti a curiosidade, a paixão e a busca pelo desconhecido. Dentro de cada partícula deste Pó reside a capacidade de criar, de sonhar e de nos tornarmos extraordinários.",
          ],
          ending: "Torna-te no Ser que és.",
        }
      : {
          openLabel: "Open the Dust story",
          closeLabel: "Close",
          hint: "Dust story",
          eyebrow: "A small Pó de Ser myth",
          title: "What Dust is this?",
          paragraphs: [
            "This Dust you have never heard of.",
            "This is not just any Dust, the dust you find under your bed.",
            "This Dust that is spreading everywhere... comes from you.",
            "Emerging from a cosmic explosion, dreams and matter collide creating something unique. From a particle of Dust a new form of Being is born.",
            "Without realizing it, these tiny particles transcend your consciousness and soul.",
            "This Dust has no barriers, going beyond what you and I ever imagined.",
            "This Dust does not walk alone. It is always with you and therefore nourishes itself from the experiences and interactions that Beings provide. It is as if it absorbs the wisdom and emotion of each encounter, transforming itself into something greater and more complex. It is a cosmic symphony in constant evolution.",
            "So open your eyes and let yourself be involved. Allow curiosity, passion, and the search for the unknown to awaken in you. Within every particle of this Dust lies the ability to create, to dream, and to become extraordinary.",
          ],
          ending: "Become the Being that you are.",
        };

  function clearScheduledOrb() {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }

  function clearHintTimer() {
    if (hintTimerRef.current !== null) {
      window.clearTimeout(hintTimerRef.current);
      hintTimerRef.current = null;
    }
  }

  function removeParticles(ids: number[]) {
    window.setTimeout(() => {
      setParticles((prev) => prev.filter((item) => !ids.includes(item.id)));
    }, 2800);
  }

  function createBurstParticles(x: number, y: number, count = 20): Particle[] {
    return Array.from({ length: count }, (_, index) => {
      const angle = (Math.PI * 2 * index) / count + randomBetween(-0.16, 0.16);
      const distance = randomBetween(36, 120);

      return {
        id: nextParticleId(),
        x,
        y,
        dx: Math.cos(angle) * distance,
        dy: Math.sin(angle) * distance,
        size: randomBetween(3, 10),
        duration: randomBetween(1.0, 1.8),
        delay: randomBetween(0, 0.18),
        color: PARTICLE_COLORS[index % PARTICLE_COLORS.length],
      };
    });
  }

  function triggerBurst(x: number, y: number, count = 20) {
    const created = createBurstParticles(x, y, count);
    const ids = created.map((item) => item.id);
    setParticles((prev) => [...prev, ...created]);
    removeParticles(ids);
  }

  function triggerMagicField() {
    const points = [
      { x: window.innerWidth * 0.24, y: window.innerHeight * 0.24 },
      { x: window.innerWidth * 0.76, y: window.innerHeight * 0.26 },
      { x: window.innerWidth * 0.2, y: window.innerHeight * 0.72 },
      { x: window.innerWidth * 0.8, y: window.innerHeight * 0.7 },
      { x: window.innerWidth * 0.5, y: window.innerHeight * 0.18 },
      { x: window.innerWidth * 0.5, y: window.innerHeight * 0.82 },
      { x: window.innerWidth * 0.5, y: window.innerHeight * 0.5 },
    ];

    points.forEach((point, index) => {
      window.setTimeout(() => {
        triggerBurst(point.x, point.y, 16 + index * 2);
      }, index * 90);
    });
  }

  function scheduleNextOrb() {
    clearScheduledOrb();

    if (open || unlocked) return;

    const delay = randomBetween(14000, 28000);

    timerRef.current = window.setTimeout(() => {
      setOrb({
        id: nextOrbId(),
        direction: Math.random() > 0.5 ? "ltr" : "rtl",
        top: randomBetween(18, 78),
        duration: randomBetween(16, 24),
      });
    }, delay);
  }

  function activateHintTemporarily() {
    clearHintTimer();
    setShowHint(true);
    hintTimerRef.current = window.setTimeout(() => {
      setShowHint(false);
    }, 5000);
  }

  function openStory(event?: React.MouseEvent<HTMLButtonElement>) {
    const rect = event?.currentTarget.getBoundingClientRect();
    const x = rect ? rect.left + rect.width / 2 : window.innerWidth * 0.5;
    const y = rect ? rect.top + rect.height / 2 : window.innerHeight * 0.5;

    triggerBurst(x, y, 24);
    triggerMagicField();

    clearScheduledOrb();
    setOrb(null);

    if (!unlocked) {
      setUnlocked(true);
      window.localStorage.setItem(STORAGE_KEY, "true");
      activateHintTemporarily();
    }

    setOpen(true);
  }

  function closeStory() {
    triggerMagicField();
    setOpen(false);
  }

  useEffect(() => {
    setHasMounted(true);
    const saved = window.localStorage.getItem(STORAGE_KEY) === "true";
    setUnlocked(saved);
    setShowHint(saved);
    if (saved) activateHintTemporarily();
  }, []);

  useEffect(() => {
    if (!hasMounted) return;
    scheduleNextOrb();

    return () => {
      clearScheduledOrb();
      clearHintTimer();
    };
  }, [hasMounted, open, unlocked]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = previousOverflow || "";
    }

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        closeStory();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  if (!hasMounted) return null;

  return (
    <>
      <AnimatePresence>
        {!unlocked && orb && !open ? (
          <motion.button
            key={orb.id}
            type="button"
            aria-label={copy.openLabel}
            className="fixed left-0 z-[70]"
            style={{ top: `${orb.top}vh` }}
            initial={{
              x: orb.direction === "ltr" ? "-12vw" : "108vw",
              opacity: 0,
              scale: 0.88,
            }}
            animate={{
              x: orb.direction === "ltr" ? "108vw" : "-12vw",
              opacity: [0, 1, 1, 0],
              scale: [0.88, 1, 1, 0.92],
              rotate: [0, 8, -7, 4, 0],
            }}
            transition={{
              duration: orb.duration,
              ease: "linear",
            }}
            onAnimationComplete={() => {
              setOrb(null);
              scheduleNextOrb();
            }}
            onClick={openStory}
          >
            <motion.span
              animate={{ y: [0, -4, 3, -2, 0] }}
              transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
              className="relative block"
            >
              <DustOrbVisual />
            </motion.span>
          </motion.button>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {unlocked && !open ? (
          <motion.div
            className="fixed bottom-5 right-5 z-[72] flex items-center gap-3"
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <AnimatePresence>
              {showHint ? (
                <motion.div
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 6 }}
                  className="rounded-full bg-white/80 px-3 py-2 text-xs uppercase tracking-[0.14em] text-[var(--muted)] shadow-sm ring-1 ring-black/5 backdrop-blur-md"
                >
                  {copy.hint}
                </motion.div>
              ) : null}
            </AnimatePresence>

            <motion.button
              type="button"
              aria-label={copy.openLabel}
              className="rounded-full bg-white/70 p-2 shadow-lg ring-1 ring-black/5 backdrop-blur-md transition hover:bg-white"
              onClick={() => openStory()}
            >
              <motion.span
                animate={{
                  y: [0, -2, 1, 0],
                  scale: [1, 1.03, 1],
                }}
                transition={{
                  duration: 4.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="block"
              >
                <DustOrbVisual small />
              </motion.span>
            </motion.button>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {open ? (
          <>
            <motion.div
              className="fixed inset-0 z-[80] bg-[var(--ink)]/68 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeStory}
            />

            <div className="pointer-events-none fixed inset-0 z-[81] overflow-hidden">
              {AMBIENT_DUST.map((item, index) => (
                <motion.span
                  key={`ambient-${index}`}
                  className="absolute rounded-full"
                  style={{
                    left: item.left,
                    top: item.top,
                    width: item.size,
                    height: item.size,
                    background: PARTICLE_COLORS[index % PARTICLE_COLORS.length],
                    boxShadow: `0 0 18px ${
                      PARTICLE_COLORS[index % PARTICLE_COLORS.length]
                    }`,
                  }}
                  animate={{
                    y: [0, -12, 6, 0],
                    x: [0, 6, -5, 0],
                    opacity: [0.14, 0.8, 0.35, 0.18],
                    scale: [0.8, 1.08, 0.95, 0.8],
                  }}
                  transition={{
                    duration: item.duration,
                    delay: item.delay,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>

            <motion.div
              className="fixed inset-x-4 top-1/2 z-[82] mx-auto max-h-[88vh] w-full max-w-3xl -translate-y-1/2 overflow-y-auto rounded-[2rem] bg-white p-6 shadow-2xl ring-1 ring-black/5 md:p-8"
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.98 }}
              transition={{ duration: 0.26, ease: "easeOut" }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.22em] text-[var(--brand)]">
                    {copy.eyebrow}
                  </p>
                  <h3 className="mt-2 text-3xl font-semibold text-[var(--ink)]">
                    {copy.title}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={closeStory}
                  className="rounded-full border border-black/10 px-4 py-2 text-sm text-[var(--ink)] transition hover:bg-[var(--ink)] hover:text-white"
                >
                  {copy.closeLabel}
                </button>
              </div>

              <div className="mt-8 space-y-5 text-lg leading-8 text-[var(--muted)]">
                {copy.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}

                <p className="pt-2 text-xl font-semibold text-[var(--brand)]">
                  {copy.ending}
                </p>
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>

      <div className="pointer-events-none fixed inset-0 z-[90]">
        <AnimatePresence>
          {particles.map((particle) => (
            <motion.span
              key={particle.id}
              className="absolute rounded-full"
              style={{
                left: 0,
                top: 0,
                width: particle.size,
                height: particle.size,
                background: particle.color,
                boxShadow: `0 0 14px ${particle.color}`,
              }}
              initial={{
                x: particle.x,
                y: particle.y,
                opacity: 0,
                scale: 0.35,
              }}
              animate={{
                x: particle.x + particle.dx,
                y: particle.y + particle.dy,
                opacity: [0, 1, 0],
                scale: [0.35, 1, 0.18],
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: particle.duration,
                delay: particle.delay,
                ease: "easeOut",
              }}
            />
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}