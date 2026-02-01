import { useState, useEffect } from 'react';
import matter from 'gray-matter';

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  category: string;
  content: string;
}

// Vite glob import for raw markdown files
const modules = import.meta.glob('../content/blog/*.md', { query: '?raw', import: 'default' });

export const useBlog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  // Filtering State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const loadPosts = async () => {
      const loadedPosts: BlogPost[] = [];

      for (const path in modules) {
        // Parse slug from filename (e.g., ../content/blog/hello-world.md -> hello-world)
        const slug = path.split('/').pop()?.replace('.md', '') || '';

        try {
          const rawContent = await modules[path]() as string;
          const { data, content } = matter(rawContent);

          loadedPosts.push({
            slug,
            title: data.title || 'Untitled',
            date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
            description: data.description || '',
            category: data.category || 'General',
            content: content,
          });
        } catch (error) {
          console.error(`Error parsing blog post ${path}:`, error);
        }
      }

      // Sort by date (newest first)
      loadedPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

      setPosts(loadedPosts);
      setLoading(false);
    };

    loadPosts();
  }, []);

  // Derived State: Categories
  const categories = Array.from(new Set(posts.map(p => p.category))).sort();

  // Derived State: Filtered Posts
  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory ? post.category === selectedCategory : true;
    const matchesSearch = searchQuery
      ? post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    return matchesCategory && matchesSearch;
  });

  const getPostBySlug = (slug: string) => {
    return posts.find((p) => p.slug === slug);
  };

  return {
    posts: filteredPosts, // Return filtered posts by default for the list
    allPosts: posts,      // Expose all if needed
    loading,
    getPostBySlug,
    categories,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory
  };
};
