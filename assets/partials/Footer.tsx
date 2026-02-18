import Logo from './Logo';
import Totop from './Totop';
import AnalogClock from '../components/AnalogClock';
import Morphing from '../components/Morphing';

const Footer = () => {
  return (
    <>
      <Morphing />
      <div className="">
        <Logo color={'gray'} />
            @copyright {new Date().getFullYear()}
      </div>
      <AnalogClock />
      <Totop />
    </>
  );
};
export default Footer;
