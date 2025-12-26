import { useEffect, useMemo } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import type { ISourceOptions } from '@tsparticles/engine';

export default function SnowEffect() {
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    });
  }, []);

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
          value: '#ffffff',
        },
        move: {
          direction: 'bottom',
          enable: true,
          outModes: {
            default: 'out',
          },
          random: true,
          speed: 1,
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: 80,
        },
        opacity: {
          value: { min: 0.3, max: 0.8 },
        },
        shape: {
          type: 'circle',
        },
        size: {
          value: { min: 2, max: 6 },
        },
        wobble: {
          distance: 10,
          enable: true,
          speed: 5,
        },
      },
      detectRetina: true,
      reduceDuplicates: true,
    }),
    []
  );

  return (
    <Particles
      id="tsparticles"
      options={options}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
      }}
    />
  );
}
