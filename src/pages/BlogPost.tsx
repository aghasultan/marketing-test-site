import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Markdown from 'react-markdown';
import { useBlog } from '@hooks/useBlog';
import { SEO } from '@components/SEO';
import { NotFound } from '@pages/NotFound';

export const BlogPost = () => {
  const { slug } = useParams();
  const { getPostBySlug, loading } = useBlog();
  const post = slug ? getPostBySlug(slug) : null;

  if (loading) return <div className="min-h-screen pt-32 text-center text-slate-400">Loading...</div>;
  if (!post) return <NotFound />;

  return (
    <article className="min-h-screen pt-32 pb-20 px-6">
      <SEO
        title={`${post.title} | Agha Sultan Naseer`}
        description={post.description}
        canonical={`https://aghasultan.com/blog/${slug}`}
      />

      <div className="max-w-3xl mx-auto">
        <Link to="/blog" className="text-slate-400 hover:text-emerald-400 mb-8 inline-block transition-colors">
          ← Back to Garden
        </Link>

        <header className="mb-12 border-b border-slate-800 pb-12 fade-in">
          <div className="flex gap-4 mb-6 text-sm">
            <span className="text-emerald-500 font-bold uppercase">{post.category}</span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">{new Date(post.date).toLocaleDateString()}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6 text-white">
            {post.title}
          </h1>
          <p className="text-xl text-slate-400 leading-relaxed">
            {post.description}
          </p>
        </header>

        <div className="prose prose-invert prose-lg max-w-none
          prose-headings:text-white
          prose-p:text-slate-300
          prose-a:text-emerald-400 hover:prose-a:text-emerald-300
          prose-strong:text-white
          prose-code:text-emerald-300
          slide-up">
          <Markdown>{post.content}</Markdown>
        </div>
      </div>
    </article>
  );
};
