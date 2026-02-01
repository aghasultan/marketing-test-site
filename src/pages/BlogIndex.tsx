import React from 'react';
import { Link } from 'react-router-dom';
import { useBlog } from '@hooks/useBlog';
import { SEO } from '@/components/seo/Head';

export const BlogIndex = () => {
  const {
    posts,
    loading,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    categories
  } = useBlog();

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-6 flex items-center justify-center">
        <div className="text-slate-400">Loading insights...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <SEO
        title="Digital Garden | Agha Sultan Naseer"
        description="Field notes on Meta Ads, Google performance, and full-funnel tracking."
      />

      <div className="max-w-7xl mx-auto">
        <div className="mb-16 fade-in space-y-8">
          <div>
            <h1 className="text-5xl font-bold mb-4 text-white">Digital Garden</h1>
            <p className="text-xl text-slate-400 max-w-2xl">
              Strategies, case studies, and tutorials on scaling paid media.
            </p>
          </div>

          {/* Search & Filter */}
          <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
            {/* Search */}
            <div className="relative w-full md:w-96">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full bg-zinc-900/50 border border-zinc-700 text-white rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all placeholder:text-zinc-600"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === null
                  ? 'bg-emerald-500 text-white'
                  : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white'
                  }`}
              >
                All
              </button>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === cat
                    ? 'bg-emerald-500 text-white'
                    : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white'
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 reveal-stagger">
          {posts.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-emerald-500/50 transition-all hover:-translate-y-1 group flex flex-col h-full"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded">
                  {post.category}
                </span>
                <span className="text-xs text-slate-500">
                  {new Date(post.date).toLocaleDateString()}
                </span>
              </div>

              <h3 className="text-xl font-bold mb-3 text-slate-100 group-hover:text-emerald-400 transition-colors">
                {post.title}
              </h3>

              <p className="text-slate-400 text-sm line-clamp-3 mb-6 flex-grow">
                {post.description}
              </p>

              <div className="text-sm font-semibold text-emerald-500 flex items-center gap-2 mt-auto">
                Read Article <span>→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
