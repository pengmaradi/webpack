import {
  useLayoutEffect,
  useRef,
  useState,
  useMemo,
} from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';

const BLOB_COUNT = 10;

export default function Morphing() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const blobsRef = useRef<HTMLDivElement[]>([]);
  const [mounted, setMounted] = useState(false);
  const boundsRef = useRef({ width: 0, height: 0 });

  // SSR 安全
  useLayoutEffect(() => {
    setMounted(true);
  }, []);

  // resize 监听
  useLayoutEffect(() => {
    if (!mounted) return;

    const updateBounds = () => {
      boundsRef.current = {
        width: window.innerWidth,
        height: window.innerHeight,
      };
    };

    updateBounds();
    window.addEventListener('resize', updateBounds);

    return () => window.removeEventListener('resize', updateBounds);
  }, [mounted]);

  // 生成 blob 配置（纯函数）
  const blobConfigs = useMemo(() => {
    return Array.from({ length: BLOB_COUNT }).map((_, i) => ({
      size: 100 + Math.sin(i) * 50,
      hue: i * 72,
      delay: i * 0.2,
    }));
  }, []);

  // GSAP 动画
  useLayoutEffect(() => {
    if (!mounted || !containerRef.current) return;

    const ctx = gsap.context(() => {
      blobsRef.current.forEach((el, i) => {
        const { size, hue, delay } = blobConfigs[i];

        gsap.set(el, {
          width: size,
          height: size,
          borderRadius: '50%',
          opacity: 0.8,
          filter: 'blur(24px)',
          background: `radial-gradient(
            circle at 30% 30%,
            hsl(${hue}, 100%, 70%),
            hsl(${hue + 40}, 100%, 50%)
          )`,
          x: gsap.utils.random(0, boundsRef.current.width),
          y: gsap.utils.random(0, boundsRef.current.height),
        });

        gsap.to(el, {
          duration: 6,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay,
          repeatRefresh: true,
          keyframes: {
            borderRadius: [
              '30% 70% 70% 30% / 30% 30% 70% 70%',
              '60% 40% 40% 60% / 60% 30% 70% 40%',
              '50% 50% 50% 50% / 50% 50% 50% 50%',
            ],
          },
          x: () => gsap.utils.random(0, boundsRef.current.width),
          y: () => gsap.utils.random(0, boundsRef.current.height),
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [mounted, blobConfigs]);

  if (!mounted) return null;

  return createPortal(
    <div
      ref={containerRef}
      className="morphing-container"
    >
      {blobConfigs.map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) blobsRef.current[i] = el;
          }}
          className="morphing-blob"
        />
      ))}
    </div>,
    document.body,
  );
}
