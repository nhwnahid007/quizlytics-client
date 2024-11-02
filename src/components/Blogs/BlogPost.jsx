'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import axios from 'axios';
import useRouterHook from "@/app/hooks/useRouterHook";
import LoadingSpinner from '../Spinner/LoadingSpinner';

export default function BlogPost() {
  const [posts, setPosts] = useState([]);
  const [selectedSlug, setSelectedSlug] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouterHook();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('https://quizlytics.jonomukti.org/allBlogs');
        setPosts(response.data);
        console.log('Fetched posts:', response.data); // Debug fetched data
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, []);

  // Filter posts based on selected category and search term
  const filteredPosts = posts.filter((post) => {
    const matchesSlug = selectedSlug ? post.slug === selectedSlug : true;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSlug && matchesSearch;
  });

  // Get unique slugs for the category buttons
  const relevantSlugs = [...new Set(posts.map((post) => post.slug).filter(Boolean))];

  const handleAddNewBlog = () => {
    router.push("/blogs/new");
  };

  return (
    <div className="container mx-auto mt-10 px-4 py-12 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8 text-primary-color">Our Blog</h1>

      <div className="flex justify-center mb-4">
        <button
          onClick={handleAddNewBlog}
          className="bg-primary-color text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-primary-dark transition duration-300"
        >
          Share your thoughts
        </button>
      </div>

      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-color"
        />
      </div>

      <div className="flex flex-wrap gap-4 justify-center mb-8">
        <button
          onClick={() => setSelectedSlug(null)}
          className={`px-4 py-2 rounded-lg font-semibold transition ${
            selectedSlug === null ? 'bg-primary-color text-white' : 'bg-gray-200'
          }`}
        >
          All
        </button>
        {relevantSlugs.map((slug) => (
          <button
            key={slug}
            onClick={() => setSelectedSlug(slug)}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              selectedSlug === slug ? 'bg-primary-color text-white' : 'bg-gray-200'
            }`}
          >
            {slug.replace('-', ' ')}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap lg:flex-nowrap lg:space-x-8 justify-around">
        <div className="w-4/5 lg:w-6/10 grid gap-8 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <div
                key={post._id}
                className="flex flex-col sm:flex-row items-start p-4 border border-gray-300 rounded-lg bg-white shadow-md hover:shadow-xl transition duration-300 mb-4"
              >
                <div className="w-full sm:w-1/3 sm:mr-4 mb-4 sm:mb-0">
                  <Image 
                    src={post.photo} 
                    alt={post.title} 
                    width={400} 
                    height={250} 
                    className="w-full h-52 lg:h-[300px] object-cover rounded-lg transform transition duration-300 hover:scale-105" 
                  />
                </div>
                
                <div className="w-full sm:w-2/3">
                  <div className="justify-start mb-2">
                    <span className="text-gray-700 font-medium mr-3">{post.postOwner}</span>
                    <span className="text-gray-400 text-sm">Released on {post.releaseDate}</span>
                  </div>
                  <h2 className="text-2xl font-semibold mb-1 text-secondary-color">{post.title}</h2>
                  <p className="text-gray-700 mb-2">{post.summary.slice(0,100)}</p>
                  <p className="text-gray-500 text-sm mb-4">{post.description.slice(0,200)}</p>
                  <Link href={`/blogs/${post._id}`} className="inline-block px-4 py-2">
                    <button className="inline-block px-4 py-2 text-white bg-primary-color hover:bg-primary-dark rounded-lg shadow-sm transition duration-300">
                      Read More
                    </button>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <LoadingSpinner />
          )}
        </div>
      </div>
    </div>
  );
}
