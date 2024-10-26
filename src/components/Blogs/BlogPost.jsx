'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import axios from 'axios';
import useRouterHook from "@/app/hooks/useRouterHook";

export default function BlogPost() {
  const [posts, setPosts] = useState([]);
  const [selectedSlug, setSelectedSlug] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouterHook();

  // Fetch blog posts from the API using axios
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('https://quizlytics.jonomukti.org/allBlogs');
        setPosts(response.data); // assuming the response data is in the correct format
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, []);

  // Filter posts based on search term and selected slug
  const filteredPosts = posts.filter((post) => {
    const matchesSlug = selectedSlug ? post.slug === selectedSlug : true;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSlug && matchesSearch;
  });

  // Create unique slugs only for posts that match the search term
  const relevantSlugs = [...new Set(filteredPosts.map((post) => post.slug))];

  const handleclick = () => {
    router.push("/quickExam");
  };

  return (
    <div className="container mx-auto mt-10 px-4 py-12 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8 text-primary-color">Our Blog</h1>

      {/* Search Input */}
      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-color"
        />
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center mb-8 space-x-4">
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

      {/* Main Content: Blog Posts and AI Card */}
      <div className="flex flex-wrap lg:flex-nowrap lg:space-x-8 justify-around">
        
        {/* Blog Posts Section */}
        <div className="w-full lg:w-7/10 grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-1">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <div
                key={post.id}
                className="flex p-4 border border-gray-300 rounded-lg bg-white shadow-md hover:shadow-xl transition duration-300"
              >
                <Link href={`/blogs/${post.slug}`} className="flex w-full">
                  <div className="flex-shrink-0 w-1/3 mr-4">
                    <Image 
                      src={post.photo} 
                      alt={post.title} 
                      width={400} 
                      height={250} 
                      className="w-full h-52 object-cover rounded-lg" 
                    />
                  </div>
                  <div className="flex-grow">
                    <div className="justify-start mb-2"> 
                      <span className="text-gray-700 mr-2 font-medium">{post.postOwner}</span>
                      <span className="ml-auto text-gray-400 text-sm">Released on {post.releaseDate}</span>
                    </div>
                    <h2 className="text-2xl font-semibold mb-1 text-secondary-color">{post.title}</h2>
                    <p className="text-gray-700 mb-2">{post.summary}</p>
                    <p className="text-gray-500 text-sm mb-4">{post.description}</p>
                    <button className="inline-block px-4 py-2 text-white bg-primary-color hover:bg-primary-dark rounded-lg shadow-sm transition duration-300">
                      Read More
                    </button>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <p className="text-center text-primary-color font-bold text-2xl">No posts found.</p>
          )}
        </div>

        {/* AI Challenge Card */}
        <div className="bg-white p-6 rounded-xl w-full lg:w-[500px] h-[580px] shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h1 className="text-stone-900 font-bold text-lg mb-4">
            Test Your Skills on AI-Generated Questions:
          </h1>
          <Image 
            src={'https://i.ibb.co/JFnCqLH/EC-Artificial-Intelligence-AI-750.jpg'} 
            alt={'ai image'} 
            width={400} 
            height={250} 
            className="w-full h-52 object-cover rounded-lg mb-4" 
          />
          <p className="text-gray-700 text-sm leading-relaxed mb-4">
            Dive into the world of artificial intelligence with our specially crafted questions, designed to challenge and enhance your understanding of AI fundamentals, advanced concepts, and real-world applications. Whether you're a beginner or an enthusiast, test your knowledge and see how well you can tackle AI-driven scenarios.
          </p>
          <button 
            onClick={handleclick} 
            className="px-4 py-2 bg-primary-color text-white font-medium rounded-lg hover:bg-primary-dark transition duration-300"
          >
            Start Your AI Challenge
          </button>
        </div>

      </div>
    </div>
  );
}
