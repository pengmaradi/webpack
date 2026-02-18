import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const width = 30;
const height = 30;
const r = 25;
const strokeWidth = 2;

const Progress = () => {
  const circleRef = useRef<SVGCircleElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useGSAP(() => {
    const circle = circleRef.current;
    const progress = progressRef.current;

    if (!circle || !progress) return;

    // Calculate scroll progress
    const updateProgress = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = scrollTop / docHeight;

      // Update circle stroke
      const circumference = 2 * Math.PI * r; // r is the radius
      const offset = circumference - scrollPercent * circumference;
      if (scrollTop > 300) {
        setShow(true);
      } else {
        setShow(false);
      }
      
      gsap.to(circle, {
        strokeDashoffset: offset,
        duration: 0.1,
      });

      // Update percentage text
      let value = Math.round(scrollPercent * 100);

      if (Number.isNaN(value)) {
        value = 0;
      }
      progress.textContent = `${value}%`;

    };

    // Initial setup
    const circumference = 2 * Math.PI * r;
    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = `${circumference}`;

    // Add scroll listener
    window.addEventListener('scroll', updateProgress);

    return () => window.removeEventListener('scroll', updateProgress);
  }, {});

  return (
    <>
      <div className={`${show ? 'fixed': 'hidden'} right-5 top-18 md:right-20 md:top-4`}>
        <div className="relative w-15 h-15">
          <svg className="w-full h-full transform -rotate-90">
            {/* Background circle */}
            <circle
              cx={width}
              cy={height}
              r={r}
              fill="none"
              stroke="#e5e7eb"
              strokeWidth={strokeWidth}
            />
            {/* Progress circle */}
            <circle
              ref={circleRef}
              cx={width}
              cy={height}
              r={r}
              fill="none"
              stroke="#3b82f6"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
            />
          </svg>
          <div
            ref={progressRef}
            className="absolute inset-0 flex items-center justify-center text-sm font-bold text-gray-700 dark:text-gray-300"
          >0%</div>
        </div>
      </div>
    </>
  );
};

export default Progress;