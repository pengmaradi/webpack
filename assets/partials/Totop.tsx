import { BiSolidToTop } from 'react-icons/bi';
import { useEffect, useState } from 'react';

const Totop = () => {
  const [visible, setVisible] = useState(false);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <>
      <button onClick={scrollToTop} type="button" className="fixed right-10 bottom-10 cursor-pointer border rounded-full p-2 animate-bounce">
        <BiSolidToTop />
        <span className="sr-only">totop</span>
      </button>
    </>
  );
};

export default Totop;