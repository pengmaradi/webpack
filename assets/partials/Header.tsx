import Logo from './Logo';
import MainNav from './MainNav';
import Darkmode from './Darkmode';
import Progress from '../components/Progress';

const Header = () => {
  return (
    <>
      <div className="fixed z-50 w-full px-5 md:px-auto md:container top-0 flex justify-between gap-4 py-5 md:py-10 bg-gray-100/80 dark:bg-gray-900/90">
        <Progress />
        <Logo />
        <MainNav />
        <Darkmode />
      </div>
    </>
  );
};
export default Header;