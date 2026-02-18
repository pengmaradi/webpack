import { useEffect, useState, useCallback, useMemo } from 'react';
import { Link } from 'react-router';
import GetFilmData from '../../components/GetFilmData';
import Loading from '../../components/Loading';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

interface PostType {
    userId: number;
    id: number;
    title: string;
    body: string;
}

type PostState = {
    data: PostType[] | null;
    loading: boolean;
    error: string | null;
};

const News = () => {
  const [state, setState] = useState<PostState>({
    data: null,
    loading: true,
    error: null,
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const fetchPosts = useCallback(async () => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: PostType[] = await response.json();
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

  const userIds = useMemo(() => {
    if (!state.data) return [];
    const ids = state.data.map(item => item.userId);
    return Array.from(new Set(ids));
  }, [state.data]);

  // Search handler
  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
    },
    [],
  );

  // Clear search handler
  const handleClearSearch = useCallback(() => {
    setSearchTerm('');
  }, []);

  const filteredPosts = useMemo(() => {
    let result = state.data || [];

    // 先按用户过滤
    if (selectedUserId !== null) {
      result = result.filter(post => post.userId === selectedUserId);
    }

    // 再按搜索词过滤
    const searchLower = searchTerm.trim().toLowerCase();
    if (searchLower) {
      result = result.filter(post => 
        `${post.title} ${post.body}`.toLowerCase().includes(searchLower),
      );
    }

    return result;
        
  }, [state.data, searchTerm, selectedUserId]);

  // Calculate statistics
  const searchStats = useMemo(() => {
    const totalPosts = state.data?.length || 0;
    const showingPosts = filteredPosts.length;
    return { showingPosts, totalPosts };
  }, [state.data, filteredPosts]);

  // Memoize the posts to prevent unnecessary re-renders
  const posts = useMemo(() => state.data, [state.data]);

  const filterPostByUser = (id: number) => {
    setSelectedUserId(prevId => prevId === id ? null : id);
  };

  const groupedPosts = useMemo(() => {
    const groups: Record<number, PostType[]> = {};
    
    filteredPosts.forEach(post => {
      if (!groups[post.userId]) {
        groups[post.userId] = [];
      }
      groups[post.userId].push(post);
    });
    
    return groups;
  }, [filteredPosts]);

  const truncateText = (text = '', maxLength = 30) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  // Debounce search input
  useEffect(() => {
    if (searchTerm.trim()) {
      setIsSearching(true);
      const timer = setTimeout(() => {
        setIsSearching(false);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setIsSearching(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  if (state.loading) {
    return <Loading text={'Loading News ...'} />;
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
      <title>news</title>
      <div className='p-4 md:p-6'>
        <div className='mb-8 text-center'>
          <h1 className='text-3xl font-bold mb-2'>News</h1>
        </div>

        {posts && (
          <>
            {isSearching ? (
              <span className='h-2 w-2 bg-blue-500 rounded-full animate-pulse'>
                Searching...
              </span>
            ) : (
              <p className='text-gray-300'>
                                Showing {searchStats.showingPosts} of{' '}
                {searchStats.totalPosts} posts
              </p>
            )}

            <div className='search relative flex w-1/3 my-5'>
              <input
                type='text'
                placeholder='Search by title ...'
                className='w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                value={searchTerm}
                onChange={handleSearch}
                aria-label='Search users'
              />
              <div className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'>
                                🔍
              </div>
              {searchTerm && (
                <button
                  onClick={handleClearSearch}
                  className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600'
                  aria-label='Clear search'
                  type='button'>
                                    ✕
                </button>
              )}
            </div>

            {userIds && (
              <div className="gap-4 my-4 grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:flex">
                <button type="button"
                  onClick={() => setSelectedUserId(null)}
                  className={`p-2 border rounded ${selectedUserId === null ? 'bg-gray-800 text-white' : 'bg-gray-200'}`}
                >
                All
                </button>
                {userIds.map((item) => (
                  <button 
                    type="button"
                    onClick={() =>filterPostByUser(item)}
                    className={`p-2 border rounded cursor-pointer transition-colors ${
                      selectedUserId === item 
                        ? 'bg-sky-700 text-white border-sky-800' 
                        : 'bg-sky-400 text-black hover:bg-sky-300'
                    }`}
                    key={item}>
                      User {item}
                  </button>
                ))}
              </div>
            )}

            <div className="space-y-10">
              {Object.entries(groupedPosts).map(([userId, userPosts]) => (
                <section key={userId} className="user-section">
                  {/* 分组标题 */}
                  <div className="flex items-center justify-between mb-4 px-2">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                      <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">
                        {userId}
                      </span>
                      User {userId} 的作品展
                    </h2>
                    <span className="text-sm text-gray-400">{userPosts.length} 篇帖子</span>
                  </div>

                  {/* 横向滚动容器 */}
                  <div className="flex overflow-x-auto gap-6 pb-6 px-2 snap-x scroll-smooth scrollbar-hide">
                    {userPosts.map((post) => (
                      <article
                        key={post.id}
                        className="min-w-[280px] md:min-w-[320px] snap-center group rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 bg-white/50"
                      >
                        <div className="p-5 flex flex-col h-full">
                          <Link to={`/news/${post.id}`} className="flex-grow">
                            <h3 className="text-lg font-bold mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                              {truncateText(post.title, 30)}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-900 leading-relaxed line-clamp-4">
                              {truncateText(post.body, 80)}
                            </p>
                          </Link>
                          
                          <div className="mt-4 pt-4 border-t border-gray-50 flex justify-between items-center">
                            <span className="text-xs text-gray-300">#{post.id}</span>
                            <Link to={`/news/${post.id}`} className="">
                              <button type="button" className="text-blue-500 text-sm font-medium hover:underline">
                                阅读全文 →
                              </button>
                            </Link>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              ))}

              {/* 无搜索结果处理 */}
              {Object.keys(groupedPosts).length === 0 && (
                <div className="text-center py-20 text-gray-500">
                  未找到匹配该用户或关键词的帖子
                </div>
              )}
            </div>
          </>
        )}

        <GetFilmData />
      </div>
    </>
  );
};

export default News;
