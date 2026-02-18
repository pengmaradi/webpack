import { useLocation } from 'react-router';
import { useEffect, useState } from 'react';
import Loading from '../components/Loading';

interface DelayRouterProps {
  children: React.ReactNode;
  delay?: number;
}

const DelayRouter: React.FC<DelayRouterProps> = ({ children, delay = 500 }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [pendingPath, setPendingPath] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    setPendingPath(location.pathname);

    const timer = setTimeout(() => {
      setIsLoading(false);
      setPendingPath(null);
    }, delay);

    return () => clearTimeout(timer);
  }, [location.pathname, delay]);

  return (
    <>
      {isLoading && (
        <Loading text={`Loading ${pendingPath} ...`} />
      )}
      
      {/* Render the actual content with optional delay */}
      <>
        {!isLoading && children}
      </>
    </>
  );
};

export default DelayRouter;