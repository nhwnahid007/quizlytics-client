// src/app/(withComonLayout)/(routes)/blogs/[slug]/page.jsx

"use client"; // Ensure it's treated as a Client Component

import Image from 'next/image';
import Link from 'next/link';

export default function Post({ params }) {
  const { slug } = params;

  // Sample post content with additional fields
  const postContent = {
    'study-tips': {
      title: 'Effective Study Tips',
      content: 'Here are some effective study tips to maximize learning potential and efficiency...',
      description: 'Explore methods and techniques for successful studying.',
      photo: 'https://i.ibb.co.com/g95Gd68/photo-2024-07-06-13-14-23.jpg', // Ensure these images are in the public folder
      releaseDate: '2024-10-20',
      postOwner: 'Ahmed Junaed',
      postOwnerPic: 'https://i.ibb.co.com/g95Gd68/photo-2024-07-06-13-14-23.jpg', // Ensure these images are in the public folder
    },
    'ace-exams': {
      title: 'How to Ace Exams',
      content: 'Discover various exam strategies that can enhance performance...',
      description: 'Effective strategies to prepare well for exams.',
      photo: 'https://i.ibb.co.com/g95Gd68/photo-2024-07-06-13-14-23.jpg', // Ensure these images are in the public folder
      releaseDate: '2024-10-22',
      postOwner: 'Ahmed Junaed',
      postOwnerPic: 'https://i.ibb.co.com/g95Gd68/photo-2024-07-06-13-14-23.jpg', // Ensure these images are in the public folder
    },
  };

  const post = postContent[slug];

  if (!post) return <p>Loading...</p>;

  return (
    <div className="container mx-auto mt-10 px-4 py-8 bg-white rounded-lg shadow-lg max-w-4xl">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-4xl font-extrabold text-primary-color">{post.title}</h1>
        <p className="text-lg text-gray-500 mt-2">{post.description}</p>
      </div>

      {/* Main Image */}
      <Image 
        src={post.photo} 
        alt={post.title} 
        width={800} 
        height={600} 
        className="w-full h-96 object-cover rounded-lg shadow-md mb-6" 
      />

      {/* Author and Date */}
      <div className="flex items-center mb-8">
        <Image 
          src={post.postOwnerPic} 
          alt={post.postOwner} 
          width={45} 
          height={45} 
          className="rounded-full w-11 h-11 mr-3" 
        />
        <div>
          <p className="text-gray-700 font-medium">{post.postOwner}</p>
          <span className="text-gray-400 text-sm">{post.releaseDate}</span>
        </div>
      </div>

      {/* Content */}
      <div className="text-gray-800 text-lg leading-relaxed space-y-4">
        <p>{post.content}</p>
        {/* Add more paragraphs or sections as needed */}
      </div>

      {/* Back Link */}
      <div className="mt-10">
        <Link href="/blogs" className="text-primary-color hover:underline">← Back to Blog</Link>
      </div>
    </div>
  );
}
