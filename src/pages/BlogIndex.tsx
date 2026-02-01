import React from 'react';
import { Link } from 'react-router-dom';
import { useBlog } from '@hooks/useBlog';
import { SEO } from '@/components/seo/Head';

export const BlogIndex = () => {
  const { posts, loading } = useBlog();

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
        <div className="mb-16 fade-in">
          <h1 className="text-5xl font-bold mb-4 text-white">Digital Garden</h1>
          <p className="text-xl text-slate-400 max-w-2xl">
            Strategies, case studies, and tutorials on scaling paid media.
          </p>
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
