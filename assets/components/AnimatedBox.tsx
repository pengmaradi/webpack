import { useEffect, useRef, type CSSProperties } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type AnimationProperties = Partial<CSSProperties> & {
  x?: number;
  y?: number;
  rotation?: number;
  scale?: number;
  scaleX?: number;
  scaleY?: number;
  skewX?: number;
  skewY?: number;
  opacity?: number;
  duration?: number;
  // Add any other GSAP-specific properties
};

type AnimationSequence = {
  properties: AnimationProperties;
  duration: number;
  ease: string;
  delay?: number;
};

type AnimatedBoxProps = {
  content?: string;
  sequences?: AnimationSequence[];
  triggers?: {
    start: string;
    end?: string;
    scrub?: boolean;
    pin?: boolean;
    markers?: boolean;
  };
}

const AnimatedBox = ({ 
  content = 'Custom Animation',
  sequences = [
    {
      properties: { x: 300, rotation: 360 },
      duration: 2,
      ease: 'power3.out',
    },
    {
      properties: { scale: 1.5, backgroundColor: '#ec4899' },
      duration: 1,
      ease: 'elastic.out(1, 0.3)',
      delay: 0.5,
    },
    {
      properties: { scale: 1, x: 0, borderRadius: '50%' },
      duration: 2,
      ease: 'back.out(1.7)',
    },
  ],
  triggers = {
    start: 'top 80%',
    end: 'bottom center',
    scrub: true,
    pin: false,
    markers: false,
  },
}: AnimatedBoxProps) => {
  const boxRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const box = boxRef.current;
    const section = sectionRef.current;
    if (!box || !section) return;

    // Create timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: triggers.start,
        end: triggers.end,
        scrub: triggers.scrub,
        pin: triggers.pin,
        markers: triggers.markers,
      },
    });

    // Add sequences to timeline
    sequences.forEach((seq, index) => {
      tl.to(box, {
        ...seq.properties,
        duration: seq.duration,
        ease: seq.ease,
        delay: seq.delay || 0,
      }, index === 0 ? undefined : '-=0.5');
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [sequences, triggers]);

  return (
    <div ref={sectionRef} className="min-h-screen flex flex-col items-center justify-center p-8">
      <div
        ref={boxRef}
        className="w-40 h-40 bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg rounded-lg shadow-2xl"
      >{content}
      </div>
    </div>
  );
};

export default AnimatedBox;