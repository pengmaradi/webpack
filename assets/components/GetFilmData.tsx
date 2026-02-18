import { useEffect, useState, useRef } from 'react';

interface Film {
  id: number,
  title: string
  posterURL: string
  imdbId:string
}

const GetFilmData = () => {
  const types: string[] = [
    'animation',
    'classic',
    'comedy',
    'drama',
    'horror',
    'family',
    'mystery',
    'western',
  ];
    
  const [cat, setCat] = useState<string>('comedy');
  const [data, setData] = useState<Film[] | null>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const filmRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create an async function inside the effect
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
            
      try {
        const resp: Response = await fetch(`https://api.sampleapis.com/movies/${cat}`);
        if (!resp.ok) {
          throw new Error(`HTTP error! status: ${resp.status}`);
        }
        const json = await resp.json();
        setData(json);
      } catch(err: unknown) {
        if (err instanceof Error) {
          console.error(err.message);
          setError(err.message);
        }
        setData([]);
      } finally {
        setIsLoading(false);
      }
    };

    // Call the async function
    fetchData();
  }, [cat]);

  const getValue = (e: React.MouseEvent<HTMLButtonElement>) => {
    setCat(e.currentTarget.innerHTML);
    const el = filmRef.current;
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 120,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>

      {isLoading && (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
            <p className="mt-4 text-gray-600">Loading ...</p>
          </div>
        </div>
      )}
      {error && <div className="text-center py-4 text-red-500">Error: {error}</div>}
      {data && (
        <div className="relavite" ref={filmRef} >
          <div className="sticky top-30 z-10 my-5 grid grid-cols-3 md:flex gap-2">
            {types.map((type) => (
              <button 
                type="button"
                className="p-2 border rounded bg-gray-400 hover:bg-gray-300 visited:bg-gray-300 cursor-pointer" 
                onClick={getValue}
                key={type}
              >
                {type}
              </button>
            ))}
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {data.map((film) => (
              <li key={film.id} className="group">
                <h3 className="font-semibold">{film.title}</h3>
                <img className="w-60 h-60 rounded object-cover shadow-xl/30 -rotate-3 group-hover:rotate-0 transition-all duration-300 ease-in-out" src={film.posterURL} alt={film.title} />
              </li>
            ))}
          </ul>
        </div>
      )}
      
    </>
  );
};

export default GetFilmData;