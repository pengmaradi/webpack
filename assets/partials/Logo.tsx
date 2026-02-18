import { FaTypo3 } from 'react-icons/fa';

const Logo = ({ color = '#ff8700', size = 30 }) => {

  return (
    <>
      <FaTypo3 size={size} fill={color} />
    </>
  );
};

export default Logo;