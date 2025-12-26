import { useEffect, useMemo, useState, useRef } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import type { ISourceOptions } from '@tsparticles/engine';

interface ConfettiEffectProps {
  trigger?: number; // Trigger prop to restart confetti
}

export default function ConfettiEffect({ trigger }: ConfettiEffectProps) {
  const [engineReady, setEngineReady] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const prevTriggerRef = useRef(trigger);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
      setEngineReady(true);
    });

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  // Trigger confetti when trigger prop changes
  useEffect(() => {
    if (trigger !== undefined && trigger !== prevTriggerRef.current && engineReady) {
      setIsActive(true);
      prevTriggerRef.current = trigger;

      // Auto-disable after 2 seconds
      const timer = setTimeout(() => {
        setIsActive(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [trigger, engineReady]);

  const options: ISourceOptions = useMemo(
    () => ({
      background: {
        color: {
          value: 'transparent',
        },
      },
      fpsLimit: 60,
      particles: {
        color: {
          value: ['#C41E3A', '#0F5132', '#FFD700'], // Red, green, gold
        },
        move: {
          enable: isActive && !prefersReducedMotion,
          direction: 'none',
          outModes: {
            default: 'destroy',
          },
          random: true,
          speed: { min: 2, max: 5 },
          gravity: {
            enable: true,
            acceleration: 0.5,
          },
        },
        number: {
          value: isActive && !prefersReducedMotion ? 50 : 0,
        },
        opacity: {
          value: { min: 0.5, max: 1 },
        },
        shape: {
          type: ['circle', 'square', 'triangle'],
        },
        size: {
          value: { min: 4, max: 8 },
        },
        life: {
          duration: {
            value: 2,
          },
        },
      },
      detectRetina: true,
      reduceDuplicates: true,
    }),
    [isActive, prefersReducedMotion]
  );

  if (!engineReady || !isActive || prefersReducedMotion) {
    return null;
  }

  return (
    <Particles
      id="confetti-particles"
      options={options}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    />
  );
}

