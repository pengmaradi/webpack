import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollTextProps {
  text: string;
  className?: string;
  animationType?: 'slideUp' | 'fadeIn' | 'scale' | 'chars';
  stagger?: number;
  startOffset?: string;
}

function ScrollText({
  text = '',
  className = '',
  animationType = 'slideUp',
  stagger = 0.05,
  startOffset = 'top 10%',
}: ScrollTextProps) {
  const textRef = useRef<HTMLParagraphElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!textRef.current || !containerRef.current) return;

    // Clear existing content
    textRef.current.innerHTML = '';

    // Split text into words
    const words = text.split(' ');
    const wordSpans: HTMLElement[] = [];

    words.forEach((word, index) => {
      const wordSpan = document.createElement('span');
      wordSpan.className = 'inline-block overflow-hidden mx-1';
      
      const innerSpan = document.createElement('span');
      innerSpan.className = 'inline-block';
      innerSpan.textContent = word;
      
      const tl = gsap.timeline();
      // Set initial state based on animation type
      switch (animationType) {
      case 'slideUp':
        tl.set(innerSpan, { rotation: -3, y: '100%' });
        break;
      case 'fadeIn':
        tl.set(innerSpan, { opacity: 0.2, y: 20 });
        break;
      case 'scale':
        tl.set(innerSpan, { scale: 0, opacity: 0.5 });
        break;
      case 'chars': {
        // Split words into characters for char-by-char animation
        const chars = word.split('');
        innerSpan.innerHTML = chars.map(char => 
          `<span class="inline-block overflow-hidden">
                  <span class="inline-block translate-y-full">${char}</span>
                </span>`,
        ).join('');
        break;
      }
      }
      
      wordSpan.appendChild(innerSpan);
      textRef.current?.appendChild(wordSpan);
      if (animationType !== 'chars') {
        wordSpans.push(innerSpan);
      } else {
        wordSpans.push(
          ...Array.from(
            wordSpan.querySelectorAll<HTMLElement>('span > span'),
          ),
        );
      }
      
      // Add space between words (except last)
      if (index < words.length - 1) {
        textRef.current?.appendChild(document.createTextNode(' '));
      }
    });

    // Create animation based on type
    let animationVars: gsap.TweenVars = {};
    
    switch (animationType) {
    case 'slideUp':
      animationVars = { opacity: 1, y: 0, stagger };
      break;
    case 'fadeIn':
      animationVars = { opacity: 1, y: 0, stagger };
      break;
    case 'scale':
      animationVars = { scale: 1, opacity: 1, stagger };
      break;
    case 'chars':
      animationVars = { y: 0, stagger: 0.03 };
      break;
    }

    // Create ScrollTrigger animation
    gsap.to(wordSpans, {
      ...animationVars,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: startOffset,
        end: 'bottom bottom',
        scrub: true,
        markers: false, // Set to true for debugging
        toggleActions: 'play none none reverse',
      },
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [text, animationType, stagger, startOffset]);

  return (
    <section 
      ref={containerRef}
      className={`min-h-screen flex items-center justify-center p-8 ${className}`}
    >
      <p
        ref={textRef}
        className="text-3xl md:text-5xl font-bold max-w-4xl leading-relaxed"
      />
    </section>
  );
}

export default ScrollText;