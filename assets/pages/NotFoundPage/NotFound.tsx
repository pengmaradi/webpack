import { Link } from 'react-router';

const NotFound = () => {
  return ( 
    <>
      <title>page not found</title>
      <h2 className='text-3xl font-bold underline'>page not found</h2>
      <Link to="/">Back to home</Link>
    </>
  );
};
export default NotFound;