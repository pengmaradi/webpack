import { useParams, Link } from 'react-router';
import { useEffect, useState, useCallback, useMemo } from 'react';
import Loading from '../../components/Loading';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

interface PostType {
    userId: number;
    id: number;
    title: string;
    body: string;
}

type PostState = {
    data: PostType | null;
    loading: boolean;
    error: string | null;
};

const Post = () => {
  const { id } = useParams();
  const [state, setState] = useState<PostState>({
    data: null,
    loading: true,
    error: null,
  });

  const fetchPosts = useCallback(async () => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      const response = await fetch(`${API_URL}/${id}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: PostType = await response.json();
      await new Promise((resolve) => setTimeout(resolve, 500));

      setState({ data, loading: false, error: null });
    } catch (error) {
      const errorMessage =
                error instanceof Error
                  ? error.message
                  : 'Failed to fetch posts';

      setState({
        data: null,
        loading: false,
        error: errorMessage,
      });
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const post = useMemo(() => state.data, [state.data]);

  if (state.loading) {
    return (
      <Loading text={`Loading post ${id} ...`} />
    );
  }

  if (state.error) {
    return (
      <div className='flex items-center justify-center min-h-[400px]'>
        <div className='text-center p-8 max-w-md bg-red-50 rounded-lg'>
          <div className='text-red-500 text-4xl mb-4'>⚠️</div>
          <h3 className='text-xl font-semibold text-red-700 mb-2'>
                        Failed to Load
          </h3>
          <p className='text-red-600 mb-6'>{state.error}</p>
          <button
            onClick={fetchPosts}
            className='px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'>
                        Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {post && (
        <article className='group rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200'>
          <div className='p-5'>
            <h3 className='text-lg font-bold mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors'>
              {post.title}
            </h3>
            <p className='text-sm leading-relaxed line-clamp-3 mb-4'>
              {post.body}
            </p>
          </div>
        </article>
      )}
      <div className='mt-4'>
        <Link
          to='/news'
          className='inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500'>
                    ← Back to News
        </Link>
      </div>
    </>
  );
};

export default Post;
