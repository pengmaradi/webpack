import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router';

const navItems = [
  { path: '/', label: 'home' },
  { path: '/about', label: 'about' },
  { path: '/product', label: 'product' },
  { path: '/news', label: 'news' },
  { path: '/contact', label: 'contact' },
];

const MainNav = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  const [show, setShow] = useState(false);

  const toggleMenu = () => {
    setShow(!show);
  };

  const handleLinkClick = () => {
    setShow(false);
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        show && 
        !target.closest('#hamburger-btn') && 
        !target.closest('ul')
      ) {
        setShow(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [show]);

  return (
    <>
      {/* 装饰层 - 只在移动端菜单打开时显示 */}
      <div 
        className={`
          deco
          ${show ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
      />
      
      <ul 
        className={`
          main-nav
          ${show 
      ? 'opacity-100 translate-y-0 pointer-events-auto flex' 
      : 'opacity-0 -translate-y-5 pointer-events-none hidden'
    }
        `}
      >
        {navItems.map(item => (
          <li key={item.path}>
            <Link
              to={item.path}
              onClick={handleLinkClick}
              className={`text-sky-500/80 ${
                isActive(item.path) 
                  ? 'active text-sky-500' 
                  : 'hover:text-sky-500'
              }`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>


      <div className="flex md:hidden absolute right-12 items-center gap-3">
        <button 
          id="hamburger-btn"
          type="button"
          className="flex flex-col gap-1 p-2"
          onClick={toggleMenu}
          aria-label="Toggle menu">
          <span className={`
              block w-6 h-0.5 bg-sky-500 
              transition-all duration-300
              ${show ? 'rotate-45 translate-y-2' : ''}
            `}></span>
          <span className={`
              block w-6 h-0.5 bg-sky-500 
              transition-all duration-300
              ${show ? 'opacity-0' : ''}
            `}></span>
          <span className={`
              block w-6 h-0.5 bg-sky-500 
              transition-all duration-300
              ${show ? '-rotate-45 -translate-y-1' : ''}
            `}></span>
        </button>
      </div>
    </>
  );
};

export default MainNav;