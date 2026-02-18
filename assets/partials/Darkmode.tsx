import { FiSun, FiMoon } from 'react-icons/fi';
import { useEffect, useState } from 'react'; 

type Theme = 'light' | 'dark'

const Darkmode = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem('theme') as Theme) || 'light';
  });

  const switchDarkmode = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    const root = window.document.documentElement;

    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);

  }, [theme]);
  
  return (
    <>
      <button type="button" className="darkmode cursor-pointer" onClick={switchDarkmode}>
        {theme === 'dark' ? (
          <FiSun className="w-5 h-5" />
        ): (
          <FiMoon className="w-5 h-5" />
        )}
      </button>
    </>
  );
};

export default Darkmode;
