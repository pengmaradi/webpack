import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface ParallaxSectionProps {
  images: string[]; // Explicitly type as string array
}

const ParallaxSection = ({ images }: ParallaxSectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const galleryRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    const gallery = galleryRef.current;

    if (!container || !gallery) return;

    const galleryWidth = gallery.scrollWidth - container.clientWidth;

    gsap.to(gallery, {
      x: -galleryWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top 10%',
        end: `+=${galleryWidth}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        markers: false,
      },
    });
  }, {});

  return (
    <>
      <section ref={containerRef} className="h-screen overflow-hidden">
        <div ref={galleryRef} className="flex h-full">
          {images.map((src, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-screen h-full px-4 flex items-center justify-center"
            >
              <img
                src={`${src}?w=1200&h=800&fit=crop`}
                alt={`Gallery ${i + 1}`}
                className="w-full h-4/5 object-cover rounded-3xl shadow-2xl"
              />
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default ParallaxSection;
