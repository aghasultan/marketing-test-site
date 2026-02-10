import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Markdown from 'react-markdown';
import { useBlog } from '@hooks/useBlog';
import { SEO } from '@/components/seo/Head';
import { NotFound } from '@pages/NotFound';

export const BlogPost = () => {
  const { slug } = useParams();
  const { getPostBySlug, loading, allPosts } = useBlog();
  const post = slug ? getPostBySlug(slug) : null;

  if (loading) return <div className="min-h-screen pt-32 text-center text-muted-foreground">Loading...</div>;
  if (!post) return <NotFound />;

  return (
    <article className="min-h-screen pt-32 pb-20 px-6">
      <SEO
        title={`${post.title} | Agha Sultan Naseer`}
        description={post.description}
        canonical={`https://aghasultan.com/blog/${slug}`}
      />

      <div className="max-w-3xl mx-auto">
        <Link to="/blog" className="text-zinc-500 dark:text-slate-400 hover:text-emerald-500 dark:hover:text-emerald-400 mb-8 inline-block transition-colors">
          ← Back to Garden
        </Link>

        <header className="mb-12 border-b border-zinc-200 dark:border-slate-800 pb-12 fade-in">
          <div className="flex gap-4 mb-6 text-sm">
            <span className="text-emerald-500 font-bold uppercase">{post.category}</span>
            <span className="text-zinc-400 dark:text-slate-600">|</span>
            <span className="text-zinc-500 dark:text-slate-400">{new Date(post.date).toLocaleDateString()}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6 text-zinc-900 dark:text-white">
            {post.title}
          </h1>
          <p className="text-xl text-zinc-600 dark:text-slate-400 leading-relaxed">
            {post.description}
          </p>
        </header>

        <div className="prose dark:prose-invert prose-lg max-w-none
          prose-headings:text-zinc-900 dark:prose-headings:text-white
          prose-p:text-zinc-700 dark:prose-p:text-slate-300
          prose-a:text-emerald-500 dark:prose-a:text-emerald-400 hover:prose-a:text-emerald-400 dark:hover:prose-a:text-emerald-300
          prose-strong:text-zinc-900 dark:prose-strong:text-white
          prose-code:text-emerald-600 dark:prose-code:text-emerald-300
          slide-up">
          <Markdown>{post.content}</Markdown>
        </div>

        {/* Related Articles */}
        <div className="mt-20 pt-12 border-t border-zinc-200 dark:border-slate-800">
          <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-8">Related Intelligence</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {allPosts
              .filter(p => p.category === post.category && p.slug !== post.slug)
              .slice(0, 2)
              .map(related => (
                <Link key={related.slug} to={`/blog/${related.slug}`} className="block group bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-white/5 rounded-xl p-6 hover:border-emerald-500/30 transition-all">
                  <span className="text-xs font-mono text-emerald-500 mb-2 block">{related.category}</span>
                  <h4 className="text-lg font-bold text-zinc-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors mb-2">{related.title}</h4>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">{related.description}</p>
                </Link>
              ))
            }
          </div>
          {/* Fallback if no related posts */}
          {allPosts.filter(p => p.category === post.category && p.slug !== post.slug).length === 0 && (
            <div className="text-zinc-500 italic">No related articles found.</div>
          )}
        </div>
      </div>
    </article>
  );
};
