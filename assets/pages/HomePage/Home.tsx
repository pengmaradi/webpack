import AnimatedBox from '../../components/AnimatedBox';
import ScrollText from '../../components/ScrollText';
import ParallaxSection from '../../components/ParallaxSection';

const Home = () => {

  const images = [...Array(10)].map((_, i) => `https://mdbcdn.b-cdn.net/img/new/slides/0${i + 31}.webp`);

  return (
    <>
      <title>page not home</title>
      <ParallaxSection images={images} />
      <ScrollText text={'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi perspiciatis asperiores aspernatur, minima cupiditate magni velit sit, dolore similique delectus eius adipisci iste recusandae, distinctio in doloribus suscipit quidem optio!'} />
      <AnimatedBox content="hallo" />

      <div className="h-screen">
        <h2>columns</h2>
        <div className="columns-2 sm:columns-3 lg:columns-4 space-y-4">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="p-2 bg-sky-500/70 rounded">Item {i + 1}</div>
          ))}
        </div>
      </div>

      <div className="h-screen">
        <h2>grid-template-rows</h2>
        <div className="grid grid-flow-col grid-rows-10 md:grid-rows-6 lg:grid-rows-6 gap-4">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="p-2 bg-sky-400/50 rounded">Item {i + 1}</div>
          ))}
        </div>
      </div>

      <div className="h-screem">
        <h2>grid-template-columns</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="p-2 bg-sky-300/50 rounded">Item {i + 1}</div>
          ))}
        </div>
      </div>

    </>
  );
};
export default Home;