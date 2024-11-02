'use client'
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
const img_hosting_key = process.env.NEXT_PUBLIC_IMG_HOSTING_KEY;
const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`;

const BlogFormPage = () => {
  const { data: session } = useSession();
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: '',
    slug: 'Technology', // default category
    summary: '',
    description: '',
    photo: '',
    releaseDate: new Date().toISOString().split('T')[0], // current date in YYYY-MM-DD format
  });
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const imageFormData = new FormData();
    imageFormData.append('image', file);

    try {
      const response = await axios.post(img_hosting_api, imageFormData);
      setFormData({ ...formData, photo: response.data.data.url });
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = {
      ...formData,
      postOwner: session?.user?.name || 'Anonymous',
      postOwnerPic: session?.user?.image || '',
    };

    try {
      const response = await axios.post('https://quizlytics.jonomukti.org/blog', postData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Blog posted successfully:', response.data);
      alert('Blog posted successfully!');
      router.push("/blogs");
    } catch (error) {
      console.error('Error posting blog:', error);
      alert('Failed to post the blog. Please try again.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-20">
      <div className="p-6">
        <h1 className="text-3xl font-extrabold mb-6 text-gray-800 text-center">
          What&apos;s on your Mind?
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 md:grid-cols-2 mb-8">
            {/* Blog Title */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">
                Blog Title
              </label>
              <Input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-4 border border-transparent rounded-md shadow-md focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-200 ease-in-out bg-gray-100 hover:bg-gray-50"
              />
            </div>

            {/* Category */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <Input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                className="w-full p-4 border border-transparent rounded-md shadow-md focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-200 ease-in-out bg-white hover:bg-gray-50"
              />
            </div>
          </div>

          {/* Summary */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Summary
            </label>
            <textarea
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              className="w-full p-4 border border-transparent rounded-md shadow-md focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-200 ease-in-out bg-gray-100 hover:bg-gray-50 resize-none"
            ></textarea>
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-4 border border-transparent rounded-md shadow-md focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-200 ease-in-out bg-gray-100 hover:bg-gray-50 resize-none"
              rows="4"
            ></textarea>
          </div>

          {/* Photo Upload */}
          <div className="mb-4 w-1/5 border border-solid p-3 rounded-lg">
            <label className="block text-sm font-medium text-gray-700">
              Upload Blog Photo:
            </label>
            <input
              type="file"
              onChange={handleImageUpload}
              className="mt-2 block w-full text-sm text-gray-600"
            />
          </div>

          {/* Submit Button */}
          <Button
            variant="primary"
            type="submit"
            className="w-full bg-primary-color text-white mt-5 px-4 rounded-md shadow-md hover:bg-gray-400 transition duration-200"
          >
            Post
          </Button>
        </form>
      </div>
    </div>
  );
};

export default BlogFormPage;
